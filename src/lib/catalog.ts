import ingredientsJson from '../data/ingredients.json'
import { RECIPES as BASE } from '../data/recipes'
import { MORE_RECIPES } from '../data/more'
import type { Ingredient, Macros, RecipeSeed } from '../types'

export const INGREDIENTS = ingredientsJson as Ingredient[]
export const RECIPES = [...BASE, ...MORE_RECIPES]
export const ING = new Map(INGREDIENTS.map((i) => [i.id, i]))
export const RECIPE = new Map(RECIPES.map((r) => [r.id, r]))

export function ing(id: string): Ingredient {
  const i = ING.get(id)
  if (!i) throw new Error(`Unknown ingredient ${id}`)
  return i
}

/** Nutrition for `grams` of an ingredient (ml treated as g — a small approximation for water-based liquids). */
export function ingredientMacros(id: string, grams: number): Macros {
  const p = ing(id).per100
  const f = grams / 100
  return { kcal: p.kcal * f, protein: p.protein * f, carbs: p.carbs * f, fat: p.fat * f, sugar: p.sugar * f, fibre: p.fibre * f }
}

export function ingredientCost(id: string, grams: number) {
  return (grams / 1000) * ing(id).pricePerKg
}

/** Display a base quantity (g or ml) in the ingredient's natural unit. */
export function displayQty(id: string | null, base: number, unitHint?: string): string {
  if (!id) return `${fmtNum(base)}${unitHint ? ' ' + unitHint : ''}`
  const i = ING.get(id)
  if (!i) return `${fmtNum(base)} g`
  if (i.unit === 'each' && i.gPerUnit) {
    const n = base / i.gPerUnit
    const shown = n < 1 ? Math.round(n * 4) / 4 : Math.round(n * 2) / 2
    return `${fmtNum(shown || 0.25)} × ${i.name.toLowerCase()} (≈${fmtNum(base)} g)`
  }
  if (base >= 1000) return `${fmtNum(base / 1000, 2)} ${i.unit === 'ml' ? 'L' : 'kg'}`
  return `${fmtNum(base)} ${i.unit === 'ml' ? 'ml' : 'g'}`
}

export function shopQty(id: string | null, base: number, unit: string): string {
  if (!id) return `${fmtNum(base)} ${unit}`.trim()
  const i = ING.get(id)
  if (i?.unit === 'each' && i.gPerUnit) return `${Math.max(1, Math.ceil(base / i.gPerUnit - 0.05))}`
  if (base >= 1000) return `${fmtNum(base / 1000, 2)} ${unit === 'ml' ? 'L' : 'kg'}`
  return `${fmtNum(Math.ceil(base))} ${unit}`
}

export function fmtNum(n: number, dp = 1) {
  return Number.isInteger(n) ? String(n) : n.toFixed(dp).replace(/\.0+$/, '')
}

export function baseUnit(id: string): 'g' | 'ml' {
  return ing(id).unit === 'ml' ? 'ml' : 'g'
}

export const recipeTotalTime = (r: RecipeSeed) => r.prep + r.cook
