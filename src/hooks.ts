import { useMemo } from 'react'
import { useStore } from './store'
import { computeTargets, addMacros } from './lib/nutrition'
import type { Behaviour } from './lib/recommend'
import { safetyContext } from './lib/recommend'
import { ZERO, type Macros } from './types'

export function useTargets() {
  const profile = useStore((s) => s.profile)
  const overrides = useStore((s) => s.settings.overrides)
  return useMemo(() => (profile ? computeTargets(profile, overrides) : null), [profile, overrides])
}

export function useBehaviour(): Behaviour {
  const swipes = useStore((s) => s.swipes)
  const favourites = useStore((s) => s.favourites)
  const reviews = useStore((s) => s.reviews)
  const diary = useStore((s) => s.diary)
  return useMemo(() => {
    const cooked: Record<string, number> = {}
    for (const d of diary) if (d.recipeId) cooked[d.recipeId] = (cooked[d.recipeId] ?? 0) + 1
    return {
      liked: Object.values(swipes).flatMap((s) => s.liked),
      rejected: Object.values(swipes).flatMap((s) => s.rejected),
      favourites, reviews, cookedCounts: cooked,
    }
  }, [swipes, favourites, reviews, diary])
}

export function useSafety() {
  const profile = useStore((s) => s.profile)
  return useMemo(() => (profile ? safetyContext(profile) : null), [profile])
}

export function useDayTotals(date: string): Macros {
  const diary = useStore((s) => s.diary)
  return useMemo(() => diary.filter((d) => d.date === date).reduce((a, d) => addMacros(a, d.macros), ZERO), [diary, date])
}

export function useCurrentPlan() {
  const plans = useStore((s) => s.plans)
  return plans.length ? [...plans].sort((a, b) => b.weekStart.localeCompare(a.weekStart))[0] : null
}

export function useActiveList() {
  const lists = useStore((s) => s.lists)
  return lists.filter((l) => !l.archived).sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0] ?? null
}
