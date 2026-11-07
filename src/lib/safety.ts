/**
 * Allergy & dietary safety. This module is the single gate every recipe passes through before it
 * reaches a deck, a recipe page, the meal plan or the shopping list.
 *
 * Rules:
 *  - Allergens (incl. "may contain") and named allergy ingredients are strict exclusions.
 *  - A substitution is only used when the replacement itself passes every one of the user's
 *    constraints, checked with the same ingredient data. Otherwise the recipe is excluded.
 *  - Keto / low-carb are checked on the adapted recipe's carbs per serving.
 */
import type { Allergen, Diet, Ingredient, Macros, RecipeSeed } from '../types'
import { ING, ingredientCost, ingredientMacros } from './catalog'
import { roundMacros, scaleMacros } from './nutrition'

export interface SafetyContext {
  allergens: Allergen[]
  allergyIngredients: string[]
  diets: Diet[]
  dislikes: string[] // ingredient ids or group:<name>
}

export const DISLIKE_GROUPS: Record<string, { label: string; test: (i: Ingredient) => boolean }> = {
  'group:fish': { label: 'Fish', test: (i) => i.allergens.includes('fish') },
  'group:shellfish': { label: 'Shellfish', test: (i) => i.allergens.includes('crustaceans') || i.allergens.includes('molluscs') },
  'group:red-meat': { label: 'Red meat', test: (i) => i.diet.includes('meat') && !i.diet.includes('poultry') },
  'group:pork': { label: 'Pork', test: (i) => i.diet.includes('pork') },
  'group:poultry': { label: 'Poultry', test: (i) => i.diet.includes('poultry') },
  'group:nuts': { label: 'Nuts', test: (i) => i.allergens.includes('nuts') || i.allergens.includes('peanuts') },
  'group:dairy': { label: 'Dairy', test: (i) => i.allergens.includes('milk') },
  'group:legumes': { label: 'Beans & pulses', test: (i) => i.diet.includes('legume') },
}

type Check = { ok: true } | { ok: false; reason: string; kind: 'allergy' | 'diet' | 'dislike' }

const ANIMAL_ALLERGENS: Allergen[] = ['milk', 'eggs', 'fish', 'crustaceans', 'molluscs']

export function dietViolation(i: Ingredient, diet: Diet): string | null {
  const d = (f: string) => i.diet.includes(f)
  const a = (x: Allergen) => i.allergens.includes(x)
  switch (diet) {
    case 'vegan':
      if (ANIMAL_ALLERGENS.some(a) || d('meat') || d('seafood') || d('honey') || d('gelatin')) return 'not vegan'
      return null
    case 'vegetarian':
      if (d('meat') || d('seafood') || a('fish') || a('crustaceans') || a('molluscs') || d('gelatin')) return 'not vegetarian'
      return null
    case 'pescatarian':
      if (d('meat') || d('gelatin')) return 'not pescatarian'
      return null
    case 'gluten-free':
      if (a('gluten') || i.mayContain.includes('gluten')) return 'contains or may contain gluten'
      return null
    case 'dairy-free':
      return a('milk') ? 'contains dairy' : null
    case 'paleo':
      if (d('grain') || d('legume') || a('milk') || d('sugar')) return 'not paleo'
      return null
    default:
      return null // keto / low-carb are recipe-level; mediterranean is a preference
  }
}

export function checkIngredient(id: string, ctx: SafetyContext): Check {
  const i = ING.get(id)
  if (!i) return { ok: false, reason: 'unknown ingredient', kind: 'allergy' }
  if (ctx.allergyIngredients.includes(id)) return { ok: false, reason: `${i.name} is on your allergy list`, kind: 'allergy' }
  const hit = i.allergens.find((x) => ctx.allergens.includes(x))
  if (hit) return { ok: false, reason: `contains ${hit}`, kind: 'allergy' }
  const may = i.mayContain.find((x) => ctx.allergens.includes(x))
  if (may) return { ok: false, reason: `may contain ${may}`, kind: 'allergy' }
  for (const diet of ctx.diets) {
    const v = dietViolation(i, diet)
    if (v) return { ok: false, reason: v, kind: 'diet' }
  }
  for (const dl of ctx.dislikes) {
    if (dl === id || DISLIKE_GROUPS[dl]?.test(i)) return { ok: false, reason: 'on your dislikes', kind: 'dislike' }
  }
  return { ok: true }
}

/** Replacement candidates, in preference order, with a quantity ratio. */
export const SUBSTITUTIONS: Record<string, { to: string; ratio: number }[]> = {
  oats: [{ to: 'oats-gf', ratio: 1 }],
  pasta: [{ to: 'gf-pasta', ratio: 1 }],
  'soy-sauce': [{ to: 'tamari', ratio: 1 }],
  couscous: [{ to: 'quinoa', ratio: 1 }],
  'flour-tortilla': [{ to: 'corn-tortilla', ratio: 1 }],
  'egg-noodles': [{ to: 'rice-noodles', ratio: 1 }],
  milk: [{ to: 'soy-milk', ratio: 1 }, { to: 'almond-milk', ratio: 1 }],
  'almond-milk': [{ to: 'soy-milk', ratio: 1 }, { to: 'milk', ratio: 1 }],
  'soy-milk': [{ to: 'almond-milk', ratio: 1 }, { to: 'milk', ratio: 1 }],
  butter: [{ to: 'olive-oil', ratio: 0.8 }],
  'double-cream': [{ to: 'coconut-milk', ratio: 1 }],
  honey: [{ to: 'maple-syrup', ratio: 1 }],
  'peanut-butter': [{ to: 'tahini', ratio: 1 }],
  peanuts: [{ to: 'pumpkin-seeds', ratio: 1 }],
  almonds: [{ to: 'pumpkin-seeds', ratio: 1 }],
  cashews: [{ to: 'pumpkin-seeds', ratio: 1 }],
  walnuts: [{ to: 'pumpkin-seeds', ratio: 1 }],
  'chicken-breast': [{ to: 'tofu', ratio: 1 }],
  'chicken-thigh': [{ to: 'tofu', ratio: 1 }],
  prawns: [{ to: 'chicken-breast', ratio: 1 }, { to: 'tofu', ratio: 1 }],
  'turkey-mince': [{ to: 'beef-mince', ratio: 1 }],
  'beef-mince': [{ to: 'turkey-mince', ratio: 1 }],
}

/** Garnishes that can simply be left out without breaking the dish. */
export const OMITTABLE = new Set(['parsley', 'coriander', 'mint', 'basil', 'black-pepper', 'chia', 'pumpkin-seeds', 'spring-onion', 'parmesan', 'cinnamon', 'salt'])

export interface ActiveIngredient { id: string; grams: number; originalId?: string }
export interface Substitution { from: string; to: string | null; reason: string }
export interface AdaptedRecipe {
  recipe: RecipeSeed
  ingredients: ActiveIngredient[]
  substitutions: Substitution[]
  perServing: Macros
  costPerServing: number
  labelWarnings: string[]
  tags: { vegan: boolean; vegetarian: boolean; seafood: boolean }
}
export type AdaptResult = { ok: true; adapted: AdaptedRecipe } | { ok: false; reason: string }

export function recipeMacros(ings: ActiveIngredient[], servings: number): Macros {
  let total: Macros = { kcal: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fibre: 0 }
  for (const x of ings) {
    const m = ingredientMacros(x.id, x.grams)
    total = { kcal: total.kcal + m.kcal, protein: total.protein + m.protein, carbs: total.carbs + m.carbs, fat: total.fat + m.fat, sugar: total.sugar + m.sugar, fibre: total.fibre + m.fibre }
  }
  return roundMacros(scaleMacros(total, 1 / servings))
}

export function adaptRecipe(recipe: RecipeSeed, ctx: SafetyContext): AdaptResult {
  const out: ActiveIngredient[] = []
  const subs: Substitution[] = []
  for (const [id, grams] of recipe.ingredients) {
    const c = checkIngredient(id, ctx)
    if (c.ok) { out.push({ id, grams }); continue }
    const candidate = (SUBSTITUTIONS[id] ?? []).find((s) => checkIngredient(s.to, ctx).ok && !recipe.ingredients.some(([rid]) => rid === s.to && rid !== id))
      ?? (SUBSTITUTIONS[id] ?? []).find((s) => checkIngredient(s.to, ctx).ok)
    if (candidate) {
      out.push({ id: candidate.to, grams: grams * candidate.ratio, originalId: id })
      subs.push({ from: id, to: candidate.to, reason: c.reason })
    } else if (OMITTABLE.has(id)) {
      subs.push({ from: id, to: null, reason: c.reason })
    } else {
      return { ok: false, reason: `${ING.get(id)?.name ?? id}: ${c.reason}` }
    }
  }
  // Merge duplicates created by substitution
  const merged = new Map<string, ActiveIngredient>()
  for (const x of out) {
    const e = merged.get(x.id)
    if (e) e.grams += x.grams
    else merged.set(x.id, { ...x })
  }
  const ingredients = [...merged.values()]
  const perServing = recipeMacros(ingredients, recipe.servings)
  if (ctx.diets.includes('keto') && perServing.carbs > 10) return { ok: false, reason: `${perServing.carbs}g carbs per serving is above the keto limit (10g)` }
  if (ctx.diets.includes('low-carb') && perServing.carbs > 25) return { ok: false, reason: `${perServing.carbs}g carbs per serving is above the low-carb limit (25g)` }

  const costPerServing = ingredients.reduce((s, x) => s + ingredientCost(x.id, x.grams), 0) / recipe.servings
  const warnings = new Set<string>()
  for (const x of ingredients) {
    const i = ING.get(x.id)!
    if (i.mayContain.length) warnings.add(`${i.name}: products often carry "may contain ${i.mayContain.join(', ')}" warnings. Check the label.`)
  }
  const ids = ingredients.map((x) => x.id)
  const tags = {
    vegan: ids.every((id) => !dietViolation(ING.get(id)!, 'vegan')),
    vegetarian: ids.every((id) => !dietViolation(ING.get(id)!, 'vegetarian')),
    seafood: ids.some((id) => ING.get(id)!.diet.includes('seafood')),
  }
  return { ok: true, adapted: { recipe, ingredients, substitutions: subs, perServing, costPerServing, labelWarnings: [...warnings], tags } }
}

/** Every allergen and allergy ingredient present in a list of ingredient ids — used by tests and as a final guard. */
export function allergenHits(ids: string[], ctx: Pick<SafetyContext, 'allergens' | 'allergyIngredients'>): string[] {
  const hits: string[] = []
  for (const id of ids) {
    const i = ING.get(id)
    if (!i) continue
    if (ctx.allergyIngredients.includes(id)) hits.push(id)
    if (i.allergens.some((a) => ctx.allergens.includes(a)) || i.mayContain.some((a) => ctx.allergens.includes(a))) hits.push(id)
  }
  return hits
}

/** Render step text with the active (possibly substituted) ingredient names. */
export function renderStep(step: string, adapted: AdaptedRecipe): { text: string; parts: { text: string; sub?: boolean; ingredientId?: string }[] } {
  const parts: { text: string; sub?: boolean; ingredientId?: string }[] = []
  const re = /\{([a-z0-9-]+)\}/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(step))) {
    if (m.index > last) parts.push({ text: step.slice(last, m.index) })
    const id = m[1]
    const sub = adapted.substitutions.find((s) => s.from === id)
    if (sub && sub.to) parts.push({ text: ING.get(sub.to)!.name.toLowerCase(), sub: true, ingredientId: sub.to })
    else if (sub && !sub.to) parts.push({ text: '' })
    else parts.push({ text: (ING.get(id)?.name ?? id).toLowerCase(), ingredientId: id })
    last = re.lastIndex
  }
  if (last < step.length) parts.push({ text: step.slice(last) })
  const text = parts.map((p) => p.text).join('').replace(/\s{2,}/g, ' ').replace(/\s+([,.;])/g, '$1')
  return { text, parts }
}

export const costTier = (perServing: number): 1 | 2 | 3 => (perServing < 1.5 ? 1 : perServing < 3 ? 2 : 3)
