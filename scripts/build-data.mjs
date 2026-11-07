// Joins the ingredient catalogue to USDA SR Legacy values (TempoLife CC-BY-4.0 dataset)
// and writes the generic-food search index. Fails loudly if any catalogue row has no match,
// so nutrition values are never silently invented.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { CATALOG } from './ingredients.catalog.mjs'

const require = createRequire(import.meta.url)
const datasetPath = require.resolve('tempo-food-db/data/tempolife-foods.json')
const foods = JSON.parse(readFileSync(datasetPath, 'utf8')).filter((f) => f.source === 'usda_sr_legacy')

const ALLERGENS = new Set(['celery', 'gluten', 'crustaceans', 'eggs', 'fish', 'lupin', 'milk', 'molluscs', 'mustard', 'nuts', 'peanuts', 'sesame', 'soya', 'sulphites'])
const DIET = new Set(['meat', 'poultry', 'pork', 'seafood', 'honey', 'grain', 'legume', 'sugar', 'gelatin'])

const r1 = (n) => (n == null ? 0 : Math.round(n * 10) / 10)
const errors = []
const out = []

for (const line of CATALOG.trim().split('\n')) {
  const [id, name, usda, kcal, unit, gPerUnit, aisle, flags, may, price, syn] = line.split('|')
  const flagList = flags ? flags.split(',') : []
  const mayList = may ? may.split(',') : []
  for (const f of [...flagList, ...mayList]) if (!ALLERGENS.has(f) && !DIET.has(f)) errors.push(`${id}: unknown flag ${f}`)
  let per100 = null
  if (usda === '—') {
    per100 = { kcal: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fibre: 0, satFat: 0, salt: 0 }
  } else {
    const matches = foods.filter((f) => f.name === usda)
    const m = matches.find((f) => Math.round(f.kcal_per_100g) === Number(kcal)) ?? (matches.length === 1 ? matches[0] : null)
    if (!m) { errors.push(`${id}: no USDA match for "${usda}" @ ${kcal} kcal (${matches.length} same-name rows)`); continue }
    per100 = { kcal: r1(m.kcal_per_100g), protein: r1(m.protein_g), carbs: r1(Math.max(0, (m.carbs_g ?? 0) - (m.fiber_g ?? 0))), fat: r1(m.fat_g), sugar: r1(m.sugar_g), fibre: r1(m.fiber_g), satFat: r1(m.saturated_fat_g), salt: r1(m.salt_g) }
  }
  out.push({
    id, name, usda, unit, gPerUnit: gPerUnit ? Number(gPerUnit) : null, aisle,
    allergens: flagList.filter((f) => ALLERGENS.has(f)), diet: flagList.filter((f) => DIET.has(f)),
    mayContain: mayList, pricePerKg: Number(price), synonyms: syn ? syn.split(',') : [], per100,
  })
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1) }

mkdirSync('src/data', { recursive: true })
writeFileSync('src/data/ingredients.json', JSON.stringify(out))

// Generic food search index for the food diary (name, kcal, protein, carbs, fat, sugar, fibre per 100 g)
// USDA carbohydrate is 'by difference' (includes fibre); UK labels exclude fibre, so convert.
const idx = foods.map((f) => [f.name, r1(f.kcal_per_100g), r1(f.protein_g), r1(Math.max(0, (f.carbs_g ?? 0) - (f.fiber_g ?? 0))), r1(f.fat_g), r1(f.sugar_g), r1(f.fiber_g)])
mkdirSync('public/data', { recursive: true })
writeFileSync('public/data/foods.json', JSON.stringify(idx))
console.log(`ingredients: ${out.length}, food index: ${idx.length}`)
