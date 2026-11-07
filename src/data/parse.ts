/**
 * Compact recipe format used for the extended library (one block per recipe, blank line between):
 *
 *   # Name | Cuisine | servings | prep min | cook min | Easy|Intermediate|Advanced | spice 0-3 | 🍳 🥬 🍞 | hue 0-359
 *   One-line description.
 *   ingredient-id grams, ingredient-id grams, ...      (whole recipe; ml for liquids)
 *   - Step text using {ingredient-id} tokens.
 *   - Another step.
 *
 * Nutrition is never written here; it is calculated from ingredient quantities (see lib/safety.ts).
 */
import type { MealCategory, RecipeSeed } from '../types'

const PREFIX: Record<MealCategory, string> = { breakfast: 'b', lunch: 'l', dinner: 'd', dessert: 'de', snack: 's' }

export const slug = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export function parseRecipes(category: MealCategory, src: string): RecipeSeed[] {
  return src.trim().split(/\n\s*\n/).map((block) => {
    const lines = block.trim().split('\n').map((l) => l.trim()).filter(Boolean)
    const head = lines[0].replace(/^#\s*/, '').split('|').map((x) => x.trim())
    if (head.length !== 9) throw new Error(`Bad recipe header: ${lines[0]}`)
    const [name, cuisine, servings, prep, cook, difficulty, spice, art, hue] = head
    const ingredients = lines[2].split(',').map((x) => {
      const m = x.trim().match(/^([a-z0-9-]+)\s+([\d.]+)$/)
      if (!m) throw new Error(`Bad ingredient "${x}" in ${name}`)
      return [m[1], Number(m[2])] as [string, number]
    })
    const steps = lines.slice(3).map((l) => l.replace(/^-\s*/, ''))
    return {
      id: `${PREFIX[category]}-${slug(name)}`, name, category, cuisine, servings: Number(servings), prep: Number(prep), cook: Number(cook),
      difficulty: difficulty as RecipeSeed['difficulty'], spice: Number(spice) as RecipeSeed['spice'], art: art.split(/\s+/), hue: Number(hue),
      description: lines[1], ingredients, steps,
    }
  })
}
