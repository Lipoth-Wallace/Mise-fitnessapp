-- Mise — planned Supabase schema for the accounts & sync milestone.
-- Not used by the current local-first build. Mirrors src/types.ts so local data can be uploaded as-is.
-- Every user table has Row Level Security: a row is visible only to the user who owns it.

create extension if not exists "pgcrypto";

-- Shared reference data (read-only for users)
create table ingredients (
  id text primary key, name text not null, usda_name text, unit text check (unit in ('g','ml','each')),
  grams_per_unit numeric, aisle text not null, allergens text[] not null default '{}', diet_flags text[] not null default '{}',
  may_contain text[] not null default '{}', est_price_per_kg numeric, synonyms text[] not null default '{}',
  kcal numeric, protein numeric, carbs numeric, fat numeric, sugar numeric, fibre numeric, sat_fat numeric, salt numeric,
  source text not null default 'USDA SR Legacy via TempoLife (CC-BY-4.0)'
);
create table recipes (
  id text primary key, name text not null, description text, category text not null check (category in ('breakfast','lunch','dinner','dessert','snack')),
  cuisine text, servings int not null, prep_min int, cook_min int, difficulty text, spice smallint, image_url text, image_credit text,
  steps text[] not null, nutrition_status text not null default 'calculated' check (nutrition_status in ('calculated','verified')), created_at timestamptz default now()
);
create table recipe_ingredients (recipe_id text references recipes on delete cascade, ingredient_id text references ingredients, grams numeric not null, primary key (recipe_id, ingredient_id));
alter table ingredients enable row level security; create policy "read ingredients" on ingredients for select using (true);
alter table recipes enable row level security; create policy "read recipes" on recipes for select using (true);
alter table recipe_ingredients enable row level security; create policy "read recipe ingredients" on recipe_ingredients for select using (true);

-- Per-user data
create table profiles (
  user_id uuid primary key references auth.users on delete cascade,
  name text, dob date, gender text, calc_sex text, height_cm numeric, weight_kg numeric, units jsonb,
  activity text, direction text, physique text, target_weight_kg numeric, circumstances text[] default '{}',
  diets text[] default '{}', try_diets text[] default '{}', allergens text[] default '{}', allergy_ingredients text[] default '{}', allergy_notes text,
  cuisines text[] default '{}', dislikes text[] default '{}', shopping jsonb, settings jsonb, updated_at timestamptz default now()
);
create table diary_entries (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users on delete cascade, date date not null, meal text not null,
  name text not null, detail text, source text, recipe_id text, planned_meal_id uuid,
  kcal numeric, protein numeric, carbs numeric, fat numeric, sugar numeric, fibre numeric, created_at timestamptz default now()); -- macros snapshotted so recipe edits never rewrite history
create table weights (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users on delete cascade, date date not null, kg numeric not null);
create table water_entries (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users on delete cascade, date date not null, ml int not null, at timestamptz default now());
create table activity (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users on delete cascade, date date not null, steps int, minutes int, note text);
create table progress_photos (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users on delete cascade, date date not null, storage_path text not null, note text);
create table swipes (user_id uuid not null references auth.users on delete cascade, recipe_id text references recipes, category text not null, direction text check (direction in ('right','left')), at timestamptz default now(), primary key (user_id, recipe_id, category));
create table favourites (user_id uuid not null references auth.users on delete cascade, recipe_id text references recipes, at timestamptz default now(), primary key (user_id, recipe_id));
create table reviews (user_id uuid not null references auth.users on delete cascade, recipe_id text references recipes, rating smallint, enjoyed bool, easy bool, again bool, notes text, variation text, updated_at timestamptz default now(), primary key (user_id, recipe_id));
create table meal_plans (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users on delete cascade, week_start date not null, finalised_at timestamptz, unique (user_id, week_start));
create table planned_meals (id uuid primary key default gen_random_uuid(), plan_id uuid not null references meal_plans on delete cascade, user_id uuid not null references auth.users on delete cascade,
  day smallint check (day between 0 and 6), category text not null, recipe_id text references recipes, custom_name text, custom_macros jsonb, servings numeric not null default 1,
  leftover_of uuid references planned_meals on delete cascade, eaten_entry_id uuid references diary_entries on delete set null, trial bool default false);
create table shopping_lists (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users on delete cascade, plan_id uuid references meal_plans on delete set null, week_start date, archived bool default false, created_at timestamptz default now());
create table shopping_list_items (id uuid primary key default gen_random_uuid(), list_id uuid not null references shopping_lists on delete cascade, user_id uuid not null references auth.users on delete cascade,
  ingredient_id text references ingredients, name text not null, qty numeric not null, unit text, aisle text, checked bool default false, have_at_home bool default false, manual bool default false, purchased numeric default 0, est_cost numeric);
create table pantry_items (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users on delete cascade, ingredient_id text references ingredients, name text not null, qty numeric, unit text, purchase_date date, expiry date);
create table receipts (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users on delete cascade, retailer text, date date, total numeric, list_id uuid references shopping_lists on delete set null,
  fingerprint text, ocr_confidence numeric, finalised bool default false, created_at timestamptz default now(), unique (user_id, fingerprint));
create table receipt_images (id uuid primary key default gen_random_uuid(), receipt_id uuid not null references receipts on delete cascade, user_id uuid not null references auth.users on delete cascade, storage_path text not null);
create table receipt_lines (id uuid primary key default gen_random_uuid(), receipt_id uuid not null references receipts on delete cascade, user_id uuid not null references auth.users on delete cascade,
  raw text, name text, price numeric, discount numeric default 0, qty numeric, unit text, matched_item_id uuid references shopping_list_items on delete set null, confidence numeric, confirmed bool, add_to_pantry bool);
create table workouts (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users on delete cascade, date date not null, name text, duration_min int, notes text, exercises jsonb not null default '[]');
create table routines (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users on delete cascade, name text not null, exercises text[] not null default '{}');
create table training_schedule (user_id uuid not null references auth.users on delete cascade, weekday smallint check (weekday between 0 and 6), routine_id uuid references routines on delete set null, primary key (user_id, weekday));

-- Owner-only RLS on every per-user table
do $$ declare t text; begin
  foreach t in array array['diary_entries','weights','water_entries','activity','progress_photos','swipes','favourites','reviews','meal_plans','planned_meals','shopping_lists','shopping_list_items','pantry_items','receipts','receipt_images','receipt_lines','workouts','routines','training_schedule'] loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy "owner" on %I for all using (auth.uid() = user_id) with check (auth.uid() = user_id)', t);
  end loop;
end $$;
alter table profiles enable row level security;
create policy "owner" on profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- Storage: private buckets 'progress-photos' and 'receipts', objects stored under <user_id>/..., with owner-only storage policies.
