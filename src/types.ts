export type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack'
export const CATEGORIES: MealCategory[] = ['breakfast', 'lunch', 'dinner', 'dessert', 'snack']
export const CATEGORY_LABEL: Record<MealCategory, string> = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', dessert: 'Desserts', snack: 'Snacks' }

export type Allergen = 'celery' | 'gluten' | 'crustaceans' | 'eggs' | 'fish' | 'lupin' | 'milk' | 'molluscs' | 'mustard' | 'nuts' | 'peanuts' | 'sesame' | 'soya' | 'sulphites'
export const ALLERGENS: { id: Allergen; label: string }[] = [
  { id: 'celery', label: 'Celery' }, { id: 'gluten', label: 'Gluten (wheat, barley, rye, oats)' }, { id: 'crustaceans', label: 'Crustaceans' },
  { id: 'eggs', label: 'Eggs' }, { id: 'fish', label: 'Fish' }, { id: 'lupin', label: 'Lupin' }, { id: 'milk', label: 'Milk' },
  { id: 'molluscs', label: 'Molluscs' }, { id: 'mustard', label: 'Mustard' }, { id: 'nuts', label: 'Tree nuts' }, { id: 'peanuts', label: 'Peanuts' },
  { id: 'sesame', label: 'Sesame' }, { id: 'soya', label: 'Soya' }, { id: 'sulphites', label: 'Sulphites' },
]

export type Diet = 'vegan' | 'vegetarian' | 'pescatarian' | 'keto' | 'paleo' | 'gluten-free' | 'dairy-free' | 'mediterranean' | 'low-carb'
export const DIETS: { id: Diet; label: string }[] = [
  { id: 'vegan', label: 'Vegan' }, { id: 'vegetarian', label: 'Vegetarian' }, { id: 'pescatarian', label: 'Pescatarian' },
  { id: 'keto', label: 'Keto' }, { id: 'paleo', label: 'Paleo' }, { id: 'gluten-free', label: 'Gluten-free' },
  { id: 'dairy-free', label: 'Dairy-free' }, { id: 'mediterranean', label: 'Mediterranean' }, { id: 'low-carb', label: 'Low-carb' },
]

export interface Per100 { kcal: number; protein: number; carbs: number; fat: number; sugar: number; fibre: number; satFat: number; salt: number }
export interface Ingredient {
  id: string; name: string; usda: string; unit: 'g' | 'ml' | 'each'; gPerUnit: number | null; aisle: Aisle
  allergens: Allergen[]; diet: string[]; mayContain: Allergen[]; pricePerKg: number; synonyms: string[]; per100: Per100
}
export type Aisle = 'produce' | 'meat' | 'fish' | 'dairy' | 'bakery' | 'dry' | 'frozen' | 'sauces' | 'household'
export const AISLES: { id: Aisle; label: string }[] = [
  { id: 'produce', label: 'Fruit & vegetables' }, { id: 'meat', label: 'Meat & poultry' }, { id: 'fish', label: 'Fish & seafood' },
  { id: 'dairy', label: 'Dairy, eggs & chilled' }, { id: 'bakery', label: 'Bakery' }, { id: 'dry', label: 'Dry goods & grains' },
  { id: 'frozen', label: 'Frozen' }, { id: 'sauces', label: 'Sauces, oils & condiments' }, { id: 'household', label: 'Household & other' },
]

export interface RecipeSeed {
  id: string; name: string; category: MealCategory; cuisine: string; servings: number; prep: number; cook: number
  difficulty: 'Easy' | 'Intermediate' | 'Advanced'; spice: 0 | 1 | 2 | 3; description: string; art: string[]; hue: number
  ingredients: [string, number][]; steps: string[]
}

export interface Macros { kcal: number; protein: number; carbs: number; fat: number; sugar: number; fibre: number }
export const ZERO: Macros = { kcal: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fibre: 0 }

export type Gender = 'female' | 'male' | 'non-binary' | 'other' | 'prefer-not'
export type CalcSex = 'male' | 'female' | 'unspecified'
export type Activity = 'sedentary' | 'light' | 'moderate' | 'very' | 'extreme'
export type Direction = 'lose' | 'maintain' | 'gain'
export type Physique = 'lose-fat' | 'build-muscle' | 'recomp' | 'maintain' | 'fitness'
export type ThemeId = 'rose' | 'noir' | 'sage'

export interface Profile {
  name: string; dob: string; gender: Gender; calcSex: CalcSex
  heightCm: number; weightKg: number; units: { weight: 'kg' | 'lb'; height: 'cm' | 'ftin' }
  activity: Activity; direction: Direction; physique: Physique; targetWeightKg: number | null
  circumstances: string[]
  diets: Diet[]; tryDiets: Diet[]
  allergens: Allergen[]; allergyIngredients: string[]; allergyNotes: string
  cuisines: string[]; dislikes: string[]
  shopping: { timesPerWeek: number; days: number[]; reminderTime: string; supermarket: string }
  createdAt: string
}

export interface DiaryEntry {
  id: string; date: string; meal: 'breakfast' | 'lunch' | 'dinner' | 'snack'; name: string; detail: string
  source: 'food' | 'recipe' | 'barcode' | 'manual' | 'plan'; macros: Macros; plannedMealId?: string; recipeId?: string; createdAt: string
}

export interface PlannedMeal {
  id: string; day: number; category: MealCategory; recipeId: string | null; customName?: string; customMacros?: Macros
  servings: number; leftoverOf?: string; eatenEntryId?: string; trial?: boolean
}
export interface MealPlan { id: string; weekStart: string; meals: PlannedMeal[]; finalisedAt?: string }

export interface ShopItem {
  id: string; ingredientId: string | null; name: string; qty: number; unit: string; aisle: Aisle
  checked: boolean; haveAtHome: boolean; manual: boolean; purchased: number; estCost: number
}
export interface ShoppingList { id: string; planId: string | null; weekStart: string; createdAt: string; items: ShopItem[]; archived: boolean }

export interface PantryItem { id: string; ingredientId: string | null; name: string; qty: number; unit: string; purchaseDate: string; expiry?: string }

export type MatchStatus = 'full' | 'partial' | 'none' | 'unmatched' | 'confirm'
export interface ReceiptLine {
  id: string; raw: string; name: string; price: number; discount: number; qty: number | null; unit: 'g' | 'ml' | 'each' | null
  matchItemId: string | null; confidence: number; confirmed: boolean; addToPantry: boolean
}
export interface Receipt {
  id: string; retailer: string; date: string; total: number; lines: ReceiptLine[]; imageKeys: string[]
  hash: string; listId: string | null; createdAt: string; ocrConfidence: number; finalised: boolean
}

export interface WorkoutSet { reps: number; kg: number }
export interface Workout { id: string; date: string; name: string; durationMin: number; notes: string; exercises: { name: string; sets: WorkoutSet[] }[] }
export interface Routine { id: string; name: string; exercises: string[] }

export interface Review { rating: number; enjoyed: boolean | null; easy: boolean | null; again: boolean | null; notes: string; variation: string; updatedAt: string }
