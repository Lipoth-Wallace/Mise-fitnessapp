import type { MealPlan, PantryItem, ShopItem } from '../types'
import { ING, RECIPE, baseUnit, ingredientCost } from './catalog'
import { adaptRecipe, type SafetyContext } from './safety'
import { uid } from './util'

/**
 * Builds the consolidated shopping list for a plan.
 *  - Ingredients come from the ADAPTED recipe, so a substituted allergen never reaches the list.
 *  - A meal with leftovers is cooked once at (own servings + leftover servings); leftover slots add nothing.
 *  - Pantry stock (same ingredient) is subtracted; fully covered items are left off.
 */
export function buildShoppingItems(plan: MealPlan, ctx: SafetyContext, pantry: PantryItem[]): ShopItem[] {
  const need = new Map<string, number>()
  const leftoverServings = new Map<string, number>()
  for (const m of plan.meals) if (m.leftoverOf) leftoverServings.set(m.leftoverOf, (leftoverServings.get(m.leftoverOf) ?? 0) + m.servings)

  for (const m of plan.meals) {
    if (!m.recipeId || m.leftoverOf) continue
    const recipe = RECIPE.get(m.recipeId)
    if (!recipe) continue
    const res = adaptRecipe(recipe, ctx)
    if (!res.ok) continue // unsafe after a profile change: never shopped for
    const cookServings = m.servings + (leftoverServings.get(m.id) ?? 0)
    const factor = cookServings / recipe.servings
    for (const x of res.adapted.ingredients) need.set(x.id, (need.get(x.id) ?? 0) + x.grams * factor)
  }

  for (const p of pantry) {
    if (!p.ingredientId || !need.has(p.ingredientId)) continue
    const have = toBase(p.ingredientId, p.qty, p.unit)
    if (have == null) continue
    need.set(p.ingredientId, need.get(p.ingredientId)! - have)
  }

  const items: ShopItem[] = []
  for (const [id, qty] of need) {
    if (qty <= 0.5) continue
    const i = ING.get(id)!
    items.push({ id: uid(), ingredientId: id, name: i.name, qty: Math.round(qty * 10) / 10, unit: baseUnit(id), aisle: i.aisle, checked: false, haveAtHome: false, manual: false, purchased: 0, estCost: ingredientCost(id, qty) })
  }
  return items.sort((a, b) => a.aisle.localeCompare(b.aisle) || a.name.localeCompare(b.name))
}

/** Convert a quantity in a given unit to the ingredient's base unit (g or ml). Returns null if unknown. */
export function toBase(ingredientId: string, qty: number, unit: string): number | null {
  const i = ING.get(ingredientId)
  if (!i) return null
  const u = unit.toLowerCase()
  if (u === 'g') return qty
  if (u === 'kg') return qty * 1000
  if (u === 'ml') return qty
  if (u === 'l') return qty * 1000
  if (u === 'cl') return qty * 10
  if (u === 'each' || u === 'x' || u === '') return i.gPerUnit ? qty * i.gPerUnit : null
  return null
}

export function remaining(item: ShopItem) {
  return Math.max(0, item.qty - item.purchased)
}

/** Ticked items move to the bottom but stay visible. */
export function sortForDisplay(items: ShopItem[]) {
  return [...items].sort((a, b) => Number(a.checked || a.haveAtHome) - Number(b.checked || b.haveAtHome))
}
