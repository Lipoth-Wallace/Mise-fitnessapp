/** Generic food search (USDA SR Legacy, bundled) and barcode lookup (Open Food Facts, live). */
import type { Macros } from '../types'

export type FoodRow = [string, number, number, number, number, number, number] // name, kcal, protein, carbs, fat, sugar, fibre per 100 g
let cache: Promise<FoodRow[]> | null = null
export function loadFoods() {
  cache ??= fetch(`${import.meta.env.BASE_URL}data/foods.json`).then((r) => { if (!r.ok) throw new Error('Food database unavailable'); return r.json() })
  return cache
}

export function searchFoods(rows: FoodRow[], q: string, limit = 30): FoodRow[] {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  return rows
    .filter((r) => { const n = r[0].toLowerCase(); return terms.every((t) => n.includes(t)) })
    .map((r) => ({ r, score: (r[0].toLowerCase().startsWith(terms[0]) ? 0 : 1) + r[0].length / 200 + (/\b(raw|fresh)\b/i.test(r[0]) ? -0.2 : 0) + (/[A-Z]{3,}/.test(r[0]) ? 0.5 : 0) }))
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map((x) => x.r)
}

export const rowMacros = (r: FoodRow, grams: number): Macros => {
  const f = grams / 100
  return { kcal: r[1] * f, protein: r[2] * f, carbs: r[3] * f, fat: r[4] * f, sugar: r[5] * f, fibre: r[6] * f }
}

export interface Product { code: string; name: string; brand: string; servingG: number | null; servingLabel: string; per100: Macros; complete: boolean }

/** Open Food Facts (ODbL). Returns null when the product isn't in the database. Never fills gaps with guesses. */
export async function lookupBarcode(code: string, signal?: AbortSignal): Promise<Product | null> {
  const url = `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(code)}.json?fields=product_name,product_name_en,brands,serving_size,serving_quantity,nutriments`
  const res = await fetch(url, { signal })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Open Food Facts returned ${res.status}`)
  const j = await res.json()
  if (j.status !== 1 || !j.product) return null
  const n = j.product.nutriments ?? {}
  const num = (k: string) => (typeof n[k] === 'number' ? n[k] : n[k] != null && !isNaN(Number(n[k])) ? Number(n[k]) : null)
  const kcal = num('energy-kcal_100g') ?? (num('energy_100g') != null ? num('energy_100g')! / 4.184 : null)
  const vals = { kcal, protein: num('proteins_100g'), carbs: num('carbohydrates_100g'), fat: num('fat_100g'), sugar: num('sugars_100g'), fibre: num('fiber_100g') }
  return {
    code, name: j.product.product_name_en || j.product.product_name || 'Unnamed product', brand: (j.product.brands ?? '').split(',')[0].trim(),
    servingG: typeof j.product.serving_quantity === 'number' ? j.product.serving_quantity : Number(j.product.serving_quantity) || null,
    servingLabel: j.product.serving_size ?? '',
    per100: { kcal: vals.kcal ?? 0, protein: vals.protein ?? 0, carbs: vals.carbs ?? 0, fat: vals.fat ?? 0, sugar: vals.sugar ?? 0, fibre: vals.fibre ?? 0 },
    complete: vals.kcal != null && vals.protein != null && vals.carbs != null && vals.fat != null,
  }
}
