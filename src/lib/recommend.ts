import type { MealCategory, Profile, Review, Diet } from '../types'
import { RECIPES, ING } from './catalog'
import { adaptRecipe, type AdaptedRecipe, type SafetyContext } from './safety'
import type { Targets } from './nutrition'
import { recipeTotalTime } from './catalog'

export const MEAL_SHARE: Record<MealCategory, number> = { breakfast: 0.25, lunch: 0.3, dinner: 0.35, dessert: 0.1, snack: 0.1 }

export interface Behaviour {
  liked: string[]        // all-time right swipes
  rejected: string[]     // all-time left swipes
  favourites: string[]
  reviews: Record<string, Review>
  cookedCounts: Record<string, number>
}

export interface DeckFilters { maxTime?: 20 | 30 | 45 | null; overTime?: boolean; difficulty?: string | null; budget?: boolean }

export function safetyContext(p: Profile, extraDiets: Diet[] = []): SafetyContext {
  return { allergens: p.allergens, allergyIngredients: p.allergyIngredients, diets: [...new Set([...p.diets, ...extraDiets])], dislikes: p.dislikes }
}

/** Learned affinities from swipes: cuisines and ingredients that appear in liked vs rejected recipes. */
function affinities(b: Behaviour) {
  const cuisine = new Map<string, number>()
  const ingredient = new Map<string, number>()
  const bump = (id: string, w: number) => {
    const r = RECIPES.find((x) => x.id === id)
    if (!r) return
    cuisine.set(r.cuisine, (cuisine.get(r.cuisine) ?? 0) + w)
    for (const [iid] of r.ingredients) ingredient.set(iid, (ingredient.get(iid) ?? 0) + w * 0.15)
  }
  b.liked.forEach((id) => bump(id, 0.5))
  b.rejected.forEach((id) => bump(id, -0.3))
  b.favourites.forEach((id) => bump(id, 0.8))
  return { cuisine, ingredient }
}

export interface Scored { adapted: AdaptedRecipe; score: number; why: string[] }

export function scoreRecipes(category: MealCategory | 'any', p: Profile, t: Targets, b: Behaviour, f: DeckFilters = {}, extraDiets: Diet[] = []): Scored[] {
  const ctx = safetyContext(p, extraDiets)
  const aff = affinities(b)
  const out: Scored[] = []
  for (const r of RECIPES) {
    if (category !== 'any' && r.category !== category) continue
    const total = recipeTotalTime(r)
    if (f.maxTime && total >= f.maxTime) continue
    if (f.overTime && total <= 45) continue
    if (f.difficulty && r.difficulty !== f.difficulty) continue
    const res = adaptRecipe(r, ctx)
    if (!res.ok) continue
    const a = res.adapted
    let score = 0
    const why: string[] = []
    if (p.cuisines.includes(r.cuisine)) { score += 2; why.push(`You enjoy ${r.cuisine} food`) }
    if (b.favourites.includes(r.id)) { score += 3; why.push('In your favourites') }
    const rv = b.reviews[r.id]
    if (rv) { score += (rv.rating - 3) * 0.8 + (rv.again === false ? -2 : rv.again ? 1 : 0) }
    score += Math.max(-2, Math.min(2, aff.cuisine.get(r.cuisine) ?? 0))
    score += Math.max(-1.5, Math.min(1.5, r.ingredients.reduce((s, [iid]) => s + (aff.ingredient.get(iid) ?? 0), 0)))
    // Energy fit for this meal slot
    if (category !== 'any') {
      const slot = t.kcal * MEAL_SHARE[category]
      const diff = Math.abs(a.perServing.kcal - slot) / slot
      score -= diff * 2
      if (diff < 0.2) why.push(`Fits your ${Math.round(slot)} kcal ${category} budget`)
    }
    // Protein emphasis for muscle/fat-loss goals
    if (['build-muscle', 'recomp', 'lose-fat'].includes(p.physique)) {
      const density = (a.perServing.protein * 4) / Math.max(a.perServing.kcal, 1)
      score += density * 4
      if (density > 0.3) why.push('High in protein')
    }
    if (p.diets.includes('mediterranean') && ['Mediterranean', 'Italian', 'Middle Eastern'].includes(r.cuisine)) score += 1.5
    if (f.budget) score -= a.costPerServing * 0.8
    score -= (b.cookedCounts[r.id] ?? 0) * 0.4 // variety
    out.push({ adapted: a, score, why })
  }
  return out.sort((x, y) => y.score - x.score)
}

/**
 * The swipe deck for one category: safe recipes, minus anything rejected or already picked.
 * Favourites float up via scoring. Returned in batches (pagination) so the UI can preload the next page.
 */
export function deckQueue(category: MealCategory, p: Profile, t: Targets, b: Behaviour, picked: string[], f: DeckFilters = {}, extraDiets: Diet[] = []) {
  return scoreRecipes(category, p, t, b, f, extraDiets).filter((s) => !b.rejected.includes(s.adapted.recipe.id) && !picked.includes(s.adapted.recipe.id))
}

/** Smart Adjustments: what fits the energy and macros still remaining today. */
export function smartSuggestions(remaining: { kcal: number; protein: number; carbs: number; fat: number }, p: Profile, t: Targets, b: Behaviour, pantryIds: Set<string>, maxTime?: number) {
  if (remaining.kcal < 80) return []
  // Suggest one normal-sized meal at most, never a "catch-up" portion to hit a number.
  const room = Math.min(remaining.kcal, t.kcal * 0.4)
  const all = scoreRecipes('any', p, t, b, maxTime ? { maxTime: maxTime as 20 | 30 | 45 } : {})
  return all
    .map((s) => {
      const m = s.adapted.perServing
      // portion that fits, in half servings, between ½ and 1½
      const portion = Math.max(0.5, Math.min(1.5, Math.floor((room / Math.max(m.kcal, 1)) * 2) / 2))
      const kcal = m.kcal * portion
      const protein = m.protein * portion
      const fit = 1 - Math.abs(room - kcal) / room
      const proteinFit = remaining.protein > 0 ? Math.min(protein / remaining.protein, 1) : 0.5
      const overFat = Math.max(0, m.fat * portion - Math.max(remaining.fat, 0)) / 20
      const pantryHits = s.adapted.ingredients.filter((x) => pantryIds.has(x.id)).length
      const pantryShare = pantryHits / s.adapted.ingredients.length
      const score = fit * 3 + proteinFit * 3 - overFat + pantryShare * 2 + s.score * 0.2
      const reasons: string[] = []
      if (proteinFit > 0.6) reasons.push(`${Math.round(protein)}g protein`)
      if (pantryHits) reasons.push(`${pantryHits} ingredient${pantryHits > 1 ? 's' : ''} in your pantry`)
      return { s, portion, kcal: Math.round(kcal), protein: Math.round(protein), score, reasons }
    })
    .filter((x) => x.kcal <= room * 1.1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
}

export const ingredientName = (id: string) => ING.get(id)?.name ?? id
