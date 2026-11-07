// Quality gate for the recipe library: nothing ships unless it passes these checks.
import { describe, expect, it } from 'vitest'
import { RECIPES, ING } from '../catalog'
import { adaptRecipe } from '../safety'
import type { MealCategory } from '../../types'

const KCAL: Record<MealCategory, [number, number]> = { breakfast: [150, 900], lunch: [180, 1000], dinner: [300, 1150], dessert: [70, 650], snack: [40, 450] }
const CUISINES = ['Italian', 'Mexican', 'Indian', 'Chinese', 'Japanese', 'Mediterranean', 'Thai', 'British', 'American', 'Middle Eastern', 'Korean', 'Spanish', 'French', 'Greek', 'Caribbean', 'Vietnamese']
const none = { allergens: [], allergyIngredients: [], diets: [], dislikes: [] }

describe('recipe library quality', () => {
  it('ids and names are unique', () => {
    expect(new Set(RECIPES.map((r) => r.id)).size).toBe(RECIPES.length)
    expect(new Set(RECIPES.map((r) => r.name.toLowerCase())).size).toBe(RECIPES.length)
  })
  for (const r of RECIPES) {
    it(`${r.id} is well-formed and plausible`, () => {
      const problems: string[] = []
      if (!CUISINES.includes(r.cuisine)) problems.push(`cuisine ${r.cuisine}`)
      if (r.servings < 1 || r.servings > 12) problems.push('servings')
      if (r.prep < 1 || r.prep + r.cook > 240) problems.push('time')
      if (!['Easy', 'Intermediate', 'Advanced'].includes(r.difficulty)) problems.push('difficulty')
      if (![0, 1, 2, 3].includes(r.spice)) problems.push('spice')
      if (r.art.length < 1 || r.art.length > 4) problems.push('art')
      if (r.steps.length < 1 || r.description.length < 20) problems.push('text')
      const ids = r.ingredients.map(([id]) => id)
      if (new Set(ids).size !== ids.length) problems.push('duplicate ingredient')
      const tokens = new Set(r.steps.flatMap((s) => [...s.matchAll(/\{([a-z0-9-]+)\}/g)].map((m) => m[1])))
      for (const [id, g] of r.ingredients) {
        if (!ING.has(id)) problems.push(`unknown ${id}`)
        if (!(g > 0) || g / r.servings > 700) problems.push(`quantity ${id} ${g}`)
        if (!tokens.has(id)) problems.push(`${id} never used in method`)
      }
      for (const t of tokens) if (!ids.includes(t)) problems.push(`method mentions ${t} not in ingredients`)
      const res = adaptRecipe(r, none)
      if (!res.ok) problems.push('fails with no restrictions')
      else {
        const [lo, hi] = KCAL[r.category]
        const k = res.adapted.perServing.kcal
        if (k < lo || k > hi) problems.push(`${Math.round(k)} kcal/serving outside ${lo}–${hi}`)
      }
      expect(problems).toEqual([])
    })
  }
})
