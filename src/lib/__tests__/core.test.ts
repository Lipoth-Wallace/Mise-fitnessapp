import { describe, expect, it } from 'vitest'
import { bmr, computeTargets, movingAverage } from '../nutrition'
import { RECIPES, ING, RECIPE } from '../catalog'
import { adaptRecipe, allergenHits, checkIngredient, renderStep, type SafetyContext } from '../safety'
import { scoreRecipes, deckQueue, smartSuggestions, type Behaviour } from '../recommend'
import { buildShoppingItems, sortForDisplay } from '../shopping'
import { parseReceiptText, extractQuantity, bestMatch, lineStatus, reconcile, matchScore, receiptHash } from '../receipt'
import type { Allergen, Diet, MealPlan, Profile, ReceiptLine, ShopItem } from '../../types'
import { ALLERGENS } from '../../types'

const baseProfile: Profile = {
  name: 'Test', dob: '1990-06-15', gender: 'male', calcSex: 'male', heightCm: 180, weightKg: 80,
  units: { weight: 'kg', height: 'cm' }, activity: 'moderate', direction: 'maintain', physique: 'maintain', targetWeightKg: null,
  circumstances: [], diets: [], tryDiets: [], allergens: [], allergyIngredients: [], allergyNotes: '', cuisines: [], dislikes: [],
  shopping: { timesPerWeek: 1, days: [5], reminderTime: '09:00', supermarket: '' }, createdAt: '2026-01-01',
}
const today = new Date('2026-11-05T12:00:00')
const noBehaviour: Behaviour = { liked: [], rejected: [], favourites: [], reviews: {}, cookedCounts: {} }
const ctx = (over: Partial<SafetyContext> = {}): SafetyContext => ({ allergens: [], allergyIngredients: [], diets: [], dislikes: [], ...over })

describe('calorie targets', () => {
  it('uses Mifflin-St Jeor', () => {
    expect(bmr(80, 180, 36, 'male')).toBeCloseTo(10 * 80 + 6.25 * 180 - 5 * 36 + 5)
    expect(bmr(60, 165, 30, 'female')).toBeCloseTo(600 + 1031.25 - 150 - 161)
  })
  it('macros are internally consistent with energy', () => {
    for (const physique of ['lose-fat', 'build-muscle', 'recomp', 'maintain', 'fitness'] as const) {
      for (const direction of ['lose', 'maintain', 'gain'] as const) {
        const t = computeTargets({ ...baseProfile, physique, direction }, {}, today)
        const energy = t.protein * 4 + t.carbs * 4 + t.fat * 9
        expect(Math.abs(energy - t.kcal)).toBeLessThan(15)
      }
    }
  })
  it('applies a conservative deficit capped at 500 kcal', () => {
    const m = computeTargets(baseProfile, {}, today)
    const l = computeTargets({ ...baseProfile, direction: 'lose' }, {}, today)
    expect(m.kcal - l.kcal).toBeGreaterThan(0)
    expect(m.kcal - l.kcal).toBeLessThanOrEqual(510)
  })
  it('never puts under-18s or guided users into a deficit', () => {
    const teen = computeTargets({ ...baseProfile, dob: '2010-01-01', direction: 'lose' }, {}, today)
    expect(teen.guarded).toBe(true)
    expect(teen.adjustment).toBe(0)
    const guided = computeTargets({ ...baseProfile, circumstances: ['pregnant'], direction: 'lose' }, { kcal: 1000 }, today)
    expect(guided.kcal).toBeGreaterThanOrEqual(guided.tdee - 10)
  })
  it('never goes below max(BMR, 1200)', () => {
    const t = computeTargets({ ...baseProfile, weightKg: 45, heightCm: 150, calcSex: 'female', activity: 'sedentary', direction: 'lose' }, { kcal: 800 }, today)
    expect(t.kcal).toBeGreaterThanOrEqual(Math.max(t.bmr, 1200) - 10)
  })
  it('7-day average', () => {
    const pts = [{ date: '2026-11-01', kg: 80 }, { date: '2026-11-02', kg: 82 }, { date: '2026-11-03', kg: 81 }]
    expect(movingAverage(pts).at(-1)!.avg).toBeCloseTo(81)
  })
})

describe('recipe data integrity', () => {
  it('every recipe uses known ingredients and every step token resolves', () => {
    for (const r of RECIPES) {
      for (const [id, g] of r.ingredients) { expect(ING.has(id), `${r.id}: ${id}`).toBe(true); expect(g).toBeGreaterThan(0) }
      for (const s of r.steps) for (const m of s.matchAll(/\{([a-z0-9-]+)\}/g)) expect(r.ingredients.some(([id]) => id === m[1]), `${r.id} step token ${m[1]}`).toBe(true)
    }
  })
  it('has at least 10 recipes in each of the five decks', () => {
    for (const c of ['breakfast', 'lunch', 'dinner', 'dessert', 'snack']) expect(RECIPES.filter((r) => r.category === c).length).toBeGreaterThanOrEqual(10)
  })
  it('calculates nutrition from ingredient quantities', () => {
    const r = RECIPE.get('s-apple-pb')!
    const res = adaptRecipe(r, ctx())
    if (!res.ok) throw new Error()
    const expected = (ING.get('apple')!.per100.kcal * 1.8) + (ING.get('peanut-butter')!.per100.kcal * 0.2)
    expect(res.adapted.perServing.kcal).toBeCloseTo(expected, 0)
  })
})

// The critical safety property, tested exhaustively: for every single allergen and for every diet,
// nothing unsafe reaches recommendations, recipe details, meal plans or shopping lists.
describe('allergy exclusions across the whole pipeline', () => {
  const singles: Allergen[][] = ALLERGENS.map((a) => [a.id])
  const combos: Allergen[][] = [['milk', 'eggs'], ['gluten', 'soya'], ['nuts', 'peanuts', 'sesame'], ['fish', 'crustaceans', 'molluscs'], ALLERGENS.map((a) => a.id)]

  for (const allergens of [...singles, ...combos]) {
    it(`never surfaces ${allergens.join('+')}`, () => {
      const p = { ...baseProfile, allergens }
      const t = computeTargets(p, {}, today)
      const c = ctx({ allergens })
      // recommendations (all decks)
      for (const cat of ['breakfast', 'lunch', 'dinner', 'dessert', 'snack'] as const) {
        for (const s of deckQueue(cat, p, t, noBehaviour, [])) expect(allergenHits(s.adapted.ingredients.map((x) => x.id), c)).toEqual([])
      }
      // recipe details: every recipe either adapts safely or is excluded
      for (const r of RECIPES) {
        const res = adaptRecipe(r, c)
        if (res.ok) {
          expect(allergenHits(res.adapted.ingredients.map((x) => x.id), c)).toEqual([])
          for (const step of r.steps) {
            const { parts } = renderStep(step, res.adapted)
            for (const part of parts) if (part.ingredientId) expect(allergenHits([part.ingredientId], c)).toEqual([])
          }
        }
      }
      // meal plan + shopping list built from EVERY recipe (as if planned before the allergy was added)
      const plan: MealPlan = { id: 'p', weekStart: '2026-11-02', meals: RECIPES.map((r, i) => ({ id: 'm' + i, day: i % 7, category: r.category, recipeId: r.id, servings: 2 })) }
      const list = buildShoppingItems(plan, c, [])
      expect(allergenHits(list.map((x) => x.ingredientId!), c)).toEqual([])
    })
  }

  it('treats named allergy ingredients as strict exclusions', () => {
    const c = ctx({ allergyIngredients: ['banana'] })
    for (const r of RECIPES) {
      const res = adaptRecipe(r, c)
      if (res.ok) expect(res.adapted.ingredients.some((x) => x.id === 'banana')).toBe(false)
    }
    expect(adaptRecipe(RECIPE.get('de-nice-cream')!, c).ok).toBe(false)
  })

  it('treats "may contain" as an allergy exclusion', () => {
    expect(checkIngredient('oats', ctx({ allergens: ['gluten'] })).ok).toBe(false)
    expect(checkIngredient('oats-gf', ctx({ allergens: ['gluten'] })).ok).toBe(true)
    expect(checkIngredient('dark-chocolate', ctx({ allergens: ['milk'] })).ok).toBe(false)
  })

  it('only substitutes when the replacement is also safe', () => {
    // milk → soy milk normally; with a soya allergy it must go to almond milk; with soya + nuts there is no option
    const porridge = RECIPE.get('b-blueberry-porridge')!
    const a = adaptRecipe(porridge, ctx({ diets: ['dairy-free'] }))
    // porridge also has whey (milk) which has no safe substitute → excluded entirely
    expect(a.ok).toBe(false)
    const pancakes = RECIPE.get('b-banana-pancakes')!
    const p1 = adaptRecipe(pancakes, ctx({ allergens: ['milk'] }))
    expect(p1.ok && p1.adapted.substitutions.find((s) => s.from === 'milk')?.to).toBe('soy-milk')
    const p2 = adaptRecipe(pancakes, ctx({ allergens: ['milk', 'soya'] }))
    expect(p2.ok && p2.adapted.substitutions.find((s) => s.from === 'milk')?.to).toBe('almond-milk')
    const p3 = adaptRecipe(pancakes, ctx({ allergens: ['milk', 'soya', 'nuts'] }))
    expect(p3.ok).toBe(false)
  })

  it('updates the method text and removes the original from the shopping list', () => {
    const r = RECIPE.get('d-bolognese')!
    const c = ctx({ allergens: ['gluten'] })
    const res = adaptRecipe(r, c)
    expect(res.ok).toBe(true)
    if (!res.ok) return
    const step = renderStep(r.steps[3], res.adapted).text
    expect(step).toContain('gluten-free pasta')
    const plan: MealPlan = { id: 'p', weekStart: '2026-11-02', meals: [{ id: 'm', day: 0, category: 'dinner', recipeId: r.id, servings: 4 }] }
    const items = buildShoppingItems(plan, c, [])
    expect(items.some((i) => i.ingredientId === 'pasta')).toBe(false)
    expect(items.some((i) => i.ingredientId === 'gf-pasta')).toBe(true)
  })
})

describe('dietary restrictions', () => {
  const cases: [Diet, (ids: string[]) => boolean][] = [
    ['vegan', (ids) => ids.every((id) => !ING.get(id)!.allergens.some((a) => ['milk', 'eggs', 'fish', 'crustaceans', 'molluscs'].includes(a)) && !ING.get(id)!.diet.some((d) => ['meat', 'seafood', 'honey'].includes(d)))],
    ['vegetarian', (ids) => ids.every((id) => !ING.get(id)!.diet.some((d) => ['meat', 'seafood'].includes(d)))],
    ['pescatarian', (ids) => ids.every((id) => !ING.get(id)!.diet.includes('meat'))],
    ['gluten-free', (ids) => ids.every((id) => !ING.get(id)!.allergens.includes('gluten') && !ING.get(id)!.mayContain.includes('gluten'))],
    ['dairy-free', (ids) => ids.every((id) => !ING.get(id)!.allergens.includes('milk'))],
    ['paleo', (ids) => ids.every((id) => !ING.get(id)!.diet.some((d) => ['grain', 'legume', 'sugar'].includes(d)) && !ING.get(id)!.allergens.includes('milk'))],
  ]
  for (const [diet, ok] of cases) {
    it(`${diet}: every recommended recipe complies`, () => {
      const p = { ...baseProfile, diets: [diet] }
      const t = computeTargets(p, {}, today)
      for (const s of scoreRecipes('any', p, t, noBehaviour)) expect(ok(s.adapted.ingredients.map((x) => x.id)), s.adapted.recipe.id).toBe(true)
    })
  }
  it('keto and low-carb limit carbs per serving', () => {
    for (const [diet, max] of [['keto', 10], ['low-carb', 25]] as const) {
      const p = { ...baseProfile, diets: [diet] as Diet[] }
      for (const s of scoreRecipes('any', p, computeTargets(p, {}, today), noBehaviour)) expect(s.adapted.perServing.carbs).toBeLessThanOrEqual(max)
    }
  })
  it('dislikes are excluded', () => {
    const p = { ...baseProfile, dislikes: ['group:fish'] }
    for (const s of scoreRecipes('any', p, computeTargets(p, {}, today), noBehaviour)) expect(s.adapted.ingredients.some((x) => ING.get(x.id)!.allergens.includes('fish'))).toBe(false)
  })
})

describe('decks', () => {
  it('rejected recipes are not shown again and picked recipes leave the deck', () => {
    const t = computeTargets(baseProfile, {}, today)
    const first = deckQueue('dinner', baseProfile, t, noBehaviour, [])
    const rejected = first[0].adapted.recipe.id
    const picked = first[1].adapted.recipe.id
    const next = deckQueue('dinner', baseProfile, t, { ...noBehaviour, rejected: [rejected] }, [picked])
    expect(next.some((s) => s.adapted.recipe.id === rejected || s.adapted.recipe.id === picked)).toBe(false)
  })
  it('favourites rank higher', () => {
    const t = computeTargets(baseProfile, {}, today)
    const last = deckQueue('lunch', baseProfile, t, noBehaviour, []).at(-1)!.adapted.recipe.id
    const withFav = deckQueue('lunch', baseProfile, t, { ...noBehaviour, favourites: [last] }, [])
    expect(withFav.findIndex((s) => s.adapted.recipe.id === last)).toBeLessThan(withFav.length - 1)
  })
  it('smart adjustments stay within remaining energy', () => {
    const t = computeTargets(baseProfile, {}, today)
    const sug = smartSuggestions({ kcal: 900, protein: 90, carbs: 80, fat: 30 }, baseProfile, t, noBehaviour, new Set())
    expect(sug.length).toBeGreaterThan(0)
    for (const s of sug) expect(s.kcal).toBeLessThanOrEqual(990)
  })
})

describe('shopping list', () => {
  const c = ctx()
  it('combines duplicate ingredients and scales by servings', () => {
    const plan: MealPlan = { id: 'p', weekStart: '2026-11-02', meals: [
      { id: 'a', day: 0, category: 'lunch', recipeId: 'l-chicken-quinoa-bowl', servings: 2 }, // 300 g chicken for 2
      { id: 'b', day: 1, category: 'lunch', recipeId: 'l-chicken-pesto-pasta', servings: 4 }, // 250 g for 2 → 500 g
    ] }
    const items = buildShoppingItems(plan, c, [])
    expect(items.filter((i) => i.ingredientId === 'chicken-breast')).toHaveLength(1)
    expect(items.find((i) => i.ingredientId === 'chicken-breast')!.qty).toBeCloseTo(800)
  })
  it('leftovers cook once and do not duplicate ingredients', () => {
    const plan: MealPlan = { id: 'p', weekStart: '2026-11-02', meals: [
      { id: 'a', day: 0, category: 'dinner', recipeId: 'd-turkey-chilli', servings: 2 },
      { id: 'b', day: 1, category: 'lunch', recipeId: 'd-turkey-chilli', servings: 2, leftoverOf: 'a' },
    ] }
    expect(buildShoppingItems(plan, c, []).find((i) => i.ingredientId === 'turkey-mince')!.qty).toBeCloseTo(500)
  })
  it('pantry stock reduces quantities', () => {
    const plan: MealPlan = { id: 'p', weekStart: '2026-11-02', meals: [{ id: 'a', day: 0, category: 'dinner', recipeId: 'd-bolognese', servings: 4 }] }
    const items = buildShoppingItems(plan, c, [
      { id: 'x', ingredientId: 'pasta', name: 'Pasta', qty: 500, unit: 'g', purchaseDate: '2026-11-01' },
      { id: 'y', ingredientId: 'beef-mince', name: 'Mince', qty: 200, unit: 'g', purchaseDate: '2026-11-01' },
    ])
    expect(items.some((i) => i.ingredientId === 'pasta')).toBe(false)
    expect(items.find((i) => i.ingredientId === 'beef-mince')!.qty).toBeCloseTo(300)
  })
  it('ticked items move to the bottom but stay', () => {
    const mk = (id: string, checked: boolean): ShopItem => ({ id, ingredientId: null, name: id, qty: 1, unit: '', aisle: 'dry', checked, haveAtHome: false, manual: true, purchased: 0, estCost: 0 })
    expect(sortForDisplay([mk('a', true), mk('b', false)]).map((i) => i.id)).toEqual(['b', 'a'])
  })
})

describe('receipts', () => {
  const sample = `TESCO STORES LTD
Macclesfield
CHICKEN FILLETS 1.0KG      £5.50
LARGE FREE RANGE EGGS X12  £3.15
SEMI SKIMMED MILK 2L       £1.65
BASMATI RICE 500G          £1.20
CLUBCARD PRICE             -0.30
CHOCOLATE BAR              £0.85
SUBTOTAL                  £12.35
TOTAL                     £12.05
VISA CONTACTLESS          £12.05
05/11/26 18:42`

  it('extracts retailer, date, total, items and discounts', () => {
    const r = parseReceiptText(sample)
    expect(r.retailer).toBe('Tesco')
    expect(r.date).toBe('2026-11-05')
    expect(r.total).toBe(12.05)
    expect(r.lines.map((l) => l.name)).toEqual(['CHICKEN FILLETS 1.0KG', 'LARGE FREE RANGE EGGS X12', 'SEMI SKIMMED MILK 2L', 'BASMATI RICE 500G', 'CHOCOLATE BAR'])
    expect(r.lines[3].discount).toBeCloseTo(0.3)
  })
  it('extracts quantities with unit conversion', () => {
    expect(extractQuantity('CHICKEN FILLETS 1.0KG')).toEqual({ qty: 1000, unit: 'g' })
    expect(extractQuantity('EGGS X12')).toEqual({ qty: 12, unit: 'each' })
    expect(extractQuantity('MILK 2L')).toEqual({ qty: 2000, unit: 'ml' })
    expect(extractQuantity('4 X 330ML COLA')).toEqual({ qty: 1320, unit: 'ml' })
    expect(extractQuantity('BROCCOLI')).toEqual({ qty: null, unit: null })
  })
  it('matches differently worded products', () => {
    expect(matchScore('CHICKEN FILLETS 1.0KG', 'chicken-breast')).toBeGreaterThanOrEqual(0.75)
    expect(matchScore('LARGE FREE RANGE EGGS X12', 'eggs')).toBeGreaterThanOrEqual(0.75)
    expect(matchScore('SEMI SKIMMED MILK 2L', 'milk')).toBeGreaterThanOrEqual(0.75)
    expect(matchScore('CHOCOLATE BAR', 'milk')).toBeLessThan(0.35)
  })

  const list: ShopItem[] = [
    { id: 'chk', ingredientId: 'chicken-breast', name: 'Chicken breast', qty: 1000, unit: 'g', aisle: 'meat', checked: false, haveAtHome: false, manual: false, purchased: 0, estCost: 0 },
    { id: 'rice', ingredientId: 'white-rice', name: 'Basmati rice', qty: 1000, unit: 'g', aisle: 'dry', checked: false, haveAtHome: false, manual: false, purchased: 0, estCost: 0 },
    { id: 'milk', ingredientId: 'milk', name: 'Milk', qty: 2000, unit: 'ml', aisle: 'dairy', checked: false, haveAtHome: false, manual: false, purchased: 0, estCost: 0 },
    { id: 'egg', ingredientId: 'eggs', name: 'Eggs', qty: 600, unit: 'g', aisle: 'dairy', checked: false, haveAtHome: false, manual: false, purchased: 0, estCost: 0 },
    { id: 'broc', ingredientId: 'broccoli', name: 'Broccoli', qty: 300, unit: 'g', aisle: 'produce', checked: false, haveAtHome: false, manual: false, purchased: 0, estCost: 0 },
  ]
  const toLines = (text: string): ReceiptLine[] => parseReceiptText(text).lines.map((l) => { const m = bestMatch(l.name, list); return { ...l, matchItemId: m.itemId, confidence: m.confidence, confirmed: false, addToPantry: false } })

  it('reconciles full and partial purchases', () => {
    const lines = toLines(sample)
    const status = Object.fromEntries(lines.map((l) => [l.name, lineStatus(l, list.find((i) => i.id === l.matchItemId)).status]))
    expect(status['CHICKEN FILLETS 1.0KG']).toBe('full')
    expect(status['BASMATI RICE 500G']).toBe('partial')
    expect(status['SEMI SKIMMED MILK 2L']).toBe('full')
    expect(status['LARGE FREE RANGE EGGS X12']).toBe('full')
    expect(status['CHOCOLATE BAR']).toBe('unmatched')
    const { items } = reconcile(list, lines)
    expect(items.find((i) => i.id === 'chk')!.checked).toBe(true)
    expect(items.find((i) => i.id === 'rice')!.qty - items.find((i) => i.id === 'rice')!.purchased).toBeCloseTo(500)
    expect(items.find((i) => i.id === 'rice')!.checked).toBe(false)
  })
  it('never marks an unknown quantity as fully purchased', () => {
    const lines = toLines('TESCO\nBROCCOLI   £0.79\nTOTAL £0.79')
    expect(lines[0].matchItemId).toBe('broc')
    expect(lineStatus(lines[0], list[4]).status).toBe('confirm')
    const { items } = reconcile(list, lines)
    expect(items.find((i) => i.id === 'broc')!.purchased).toBe(0)
    expect(items.find((i) => i.id === 'broc')!.checked).toBe(false)
  })
  it('records surplus rather than adding it to the list', () => {
    const lines = toLines('TESCO\nCHICKEN BREAST FILLETS 2KG £10.00\nTOTAL £10.00')
    const { items, surplus } = reconcile(list, lines)
    expect(items.find((i) => i.id === 'chk')!.purchased).toBe(1000)
    expect(surplus[0].base).toBeCloseTo(1000)
  })
  it('flags duplicate receipts by fingerprint', () => {
    const a = parseReceiptText(sample), b = parseReceiptText(sample)
    expect(receiptHash(a.retailer, a.date, a.total, a.lines.length)).toBe(receiptHash(b.retailer, b.date, b.total, b.lines.length))
  })
  it('drops repeated seam lines from overlapping photos', () => {
    const r = parseReceiptText('TESCO\nBANANAS LOOSE £0.80\nBANANAS LOOSE £0.80\nTOTAL £0.80')
    expect(r.lines).toHaveLength(1)
  })
})
