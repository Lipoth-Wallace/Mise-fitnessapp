# Mise: plan, eat, train

A mobile-first Progressive Web App for nutrition tracking, swipe-to-plan meal planning, automatic shopping lists, receipt scanning and fitness tracking. Built to install on an iPhone Home Screen from GitHub Pages.

## Put it on your iPhone

1. Push this repo to GitHub (branch `main`).
2. On GitHub, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` runs the tests, builds the app and publishes it. The URL appears under **Actions → the latest run → deploy**, for example `https://<user>.github.io/<repo>/`.
4. Open that URL in **Safari** on your iPhone, tap **Share → Add to Home Screen**. It opens full-screen like an app and works offline.

GitHub Pages on a **private** repo needs a paid GitHub plan. On a free plan, make the repo public (your data is never in the repo; it stays on your phone).

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # 55 unit tests: calorie maths, allergy safety, shopping, receipts
npm run build      # production build in dist/
```

## Architecture

| Layer | Choice | Why |
|---|---|---|
| UI | React 19 + TypeScript + Vite | GitHub Pages serves static files only, so Next.js server features would be unused. Vite gives a smaller, faster static PWA. |
| Styling | Tailwind CSS 4 with theme tokens | Rose / Noir / Sage themes switch CSS variables only, so every function stays identical. |
| State | Zustand, persisted to localStorage; photos and receipts in IndexedDB | Local-first: works offline, no backend needed. The shape mirrors `supabase/schema.sql`. |
| Routing | Hash router | Deep links work on GitHub Pages without server rewrites. |
| PWA | vite-plugin-pwa (Workbox) | Precached app shell, offline food database, cached OCR engine. |
| Charts | Recharts plus a custom SVG calorie ring | |
| Barcodes | ZXing (in-browser) + Open Food Facts API | iOS Safari has no native BarcodeDetector. |
| Receipts | Tesseract.js, self-hosted under `/ocr` | Runs on the phone; images never leave the device. |

Modules: `lib/nutrition` (targets), `lib/safety` (allergy/diet gate and substitutions), `lib/recommend` (decks, scoring, Smart Adjustments), `lib/shopping` (consolidation, leftovers, pantry), `lib/receipt` (parsing, matching, reconciliation), `lib/ocr`, `lib/foods` (USDA search, barcode lookup).

### Data sources
- **Nutrition:** USDA FoodData Central SR Legacy (public domain), via the TempoLife dataset (CC-BY-4.0). `scripts/build-data.mjs` joins 145 catalogue ingredients to exact USDA entries and fails the build if any is missing, so no value is invented. Carbs are converted to the UK basis (excluding fibre).
- **Recipes:** 50 original recipes (10 per deck). Nutrition is calculated from gram quantities and always labelled "calculated estimate".
- **Barcodes:** Open Food Facts (ODbL). Missing products fall back to manual entry; missing nutrients are flagged, never guessed.

## Status

### Working now
- Onboarding with every spec question, editable later in Settings
- Gender-based starting theme (Rose / Noir), free choice of theme (including Sage); nutrition never depends on gender
- Mifflin-St Jeor targets with conservative goal adjustments, protein by physique goal, internally consistent macros, overrides
- Safeguards: no deficit for under-18s or anyone ticking health circumstances; floor of max(BMR, 1,200 kcal); option to hide numbers
- Dashboard: calorie doughnut, macro distribution chart, sugar tracked separately, water, manual steps/activity, weight trend, planned meals, Smart Adjustments, 7-day summary, workout summary, non-judgemental daily check-ins
- Food diary: USDA search (7,233 foods, offline), barcode scanning, recipes, manual entry, edit/delete; planned meals logged once only
- Five independent swipe decks with per-deck counters, drag or button controls, keyboard arrows, green/red swipe borders, favourites (heart), rejections remembered, preloaded cards
- Strict allergy and diet filtering with verified substitutions shown in a labelled "Adapted for you" panel; method text and shopping list update too
- Trial diets for a chosen number of days, time/difficulty/budget filters, preference learning from swipes, favourites, ratings and variety
- Weekly calendar (Mon–Sun × 5 slots): add, move, replace, remove, repeat, servings, leftovers, custom meals, daily totals, multiple weeks
- Shopping list: combined duplicates, serving scaling, leftovers counted once, pantry deducted, aisles, manual items, "have at home", ticked items crossed out and moved to the bottom, history
- Receipt scanning: camera or upload, multiple photos per receipt, preprocessing, retailer/date/total/discount extraction, fuzzy matching with confidence, unit conversion, partial purchases, review screen with green/amber/red/grey, manual correction, duplicate detection, unmatched items to pantry, never auto-completes uncertain items
- Budget: weekly or monthly budget, actual spend, by supermarket, weekly trend, estimated plan and shop costs, estimate vs receipt comparison
- Weight tracking with 7-day average, week/month/all views, edit/delete; private progress photos with side-by-side compare and permanent delete
- Optional workout tracker: sets/reps/weight, routines, weekly schedule, per-exercise progress graph
- Reminders per category (in-app, plus system notifications while the app is open)
- JSON data export and full data deletion

### Known limitations
- **Single device, no account.** Data lives in the phone's browser storage. Removing the Home Screen app or clearing Safari data deletes it. Export regularly. Sync needs the Supabase milestone below.
- **No background push.** Static hosting has no server to send Web Push, so reminders appear when you open the app.
- **No Apple Health.** Websites can't read HealthKit; steps are entered by hand.
- **Recipe photos.** Cards use generated plate illustrations. Real photography needs a licensed source.
- **Recipe library size.** 50 recipes. Strict diets (e.g. vegan + gluten-free) leave small decks. Scaling up needs a licensed recipe API, with every recipe re-validated by the safety module.
- **Costs** are rough UK estimates until receipts provide real prices.
- **OCR** suits clear, flat receipts. The review screen is the safeguard: nothing changes until you confirm.

### Next milestones
1. **Accounts & sync:** Supabase Auth + Postgres using `supabase/schema.sql` (owner-only row-level security already defined), private storage buckets for photos and receipts, and a one-tap upload of existing local data.
2. **Push notifications:** a Supabase Edge Function with VAPID keys for real scheduled reminders (iOS 16.4+ Home Screen apps support Web Push).
3. **Larger recipe library** with licensed photography.
4. **Native apps:** wrap with Capacitor for HealthKit / Google Fit steps, reusing the same code and backend.
5. **End-to-end tests in CI** (Playwright) for onboarding → plan → shop → receipt.

## Licences & credits
Food data © TempoLife (CC-BY-4.0) from USDA FoodData Central (public domain). Product data © Open Food Facts contributors (ODbL). Tesseract.js and ZXing are Apache 2.0. Not medical advice: talk to your GP or a registered dietitian about your nutrition.
