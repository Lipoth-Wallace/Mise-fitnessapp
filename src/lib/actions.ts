import { useStore } from '../store'
import type { PlannedMeal, MealPlan, ShoppingList, DiaryEntry } from '../types'
import { RECIPE } from './catalog'
import { adaptRecipe } from './safety'
import { safetyContext } from './recommend'
import { scaleMacros, roundMacros } from './nutrition'
import { addDays } from './util'
import { buildShoppingItems } from './shopping'
import { uid } from './util'

const toDiaryMeal = (c: PlannedMeal['category']): DiaryEntry['meal'] => (c === 'dessert' ? 'snack' : c)

export function plannedMacros(m: PlannedMeal) {
  const p = useStore.getState().profile
  if (m.customMacros) return scaleMacros(m.customMacros, m.servings)
  if (!m.recipeId || !p) return null
  const r = RECIPE.get(m.recipeId)
  if (!r) return null
  const res = adaptRecipe(r, safetyContext(p))
  return res.ok ? scaleMacros(res.adapted.perServing, m.servings) : null
}

/** Log a planned meal once. A planned meal that's already linked to a diary entry is never logged again. */
export function logPlannedMeal(plan: MealPlan, meal: PlannedMeal, portion = 1) {
  const s = useStore.getState()
  if (meal.eatenEntryId && s.diary.some((d) => d.id === meal.eatenEntryId)) return null
  const m = plannedMacros({ ...meal, servings: portion })
  if (!m) return null
  const name = meal.recipeId ? RECIPE.get(meal.recipeId)!.name : meal.customName ?? 'Meal'
  const id = s.addDiary({ date: addDays(plan.weekStart, meal.day), meal: toDiaryMeal(meal.category), name, detail: `${portion} serving${portion === 1 ? '' : 's'} · from your plan`, source: 'plan', plannedMealId: meal.id, recipeId: meal.recipeId ?? undefined, macros: roundMacros(m) })
  s.updatePlan(plan.id, (meals) => meals.map((x) => (x.id === meal.id ? { ...x, eatenEntryId: id } : x)))
  return id
}

/** Generate a fresh list for a plan; the previous list is archived into shopping history. */
export function generateList(plan: MealPlan): ShoppingList | null {
  const s = useStore.getState()
  if (!s.profile) return null
  const items = buildShoppingItems(plan, safetyContext(s.profile), s.pantry)
  const list: ShoppingList = { id: uid(), planId: plan.id, weekStart: plan.weekStart, createdAt: new Date().toISOString(), items, archived: false }
  useStore.setState((st) => ({ lists: [...st.lists.map((l) => ({ ...l, archived: true })), list] }))
  return list
}
