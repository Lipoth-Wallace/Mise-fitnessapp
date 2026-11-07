// Extended recipe library (original recipes). Every recipe here must pass src/lib/__tests__/recipes.test.ts.
import breakfast from './breakfast'
import lunch from './lunch'
import dinner from './dinner'
import dessert from './dessert'
import snack from './snack'
import type { RecipeSeed } from '../../types'

export const MORE_RECIPES: RecipeSeed[] = [...breakfast, ...lunch, ...dinner, ...dessert, ...snack]
