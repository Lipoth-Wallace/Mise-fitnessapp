/**
 * Local-first data store. Everything persists in this device's browser storage (localStorage for records,
 * IndexedDB for photos). The shape mirrors the planned Supabase tables so a sync layer can be added later.
 */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  DiaryEntry, MealCategory, MealPlan, PantryItem, PlannedMeal, Profile, Receipt, Review, Routine, ShoppingList, ShopItem, ThemeId, Workout, Diet,
} from './types'
import { CATEGORIES } from './types'
import { uid } from './lib/util'
import type { TargetOverrides } from './lib/nutrition'

export interface Planning {
  weekStart: string
  counts: Record<MealCategory, number>
  selected: Record<MealCategory, string[]>
  trial: { diet: Diet; days: number } | null
  trialPicks: string[]
  filters: { maxTime: 20 | 30 | 45 | null; difficulty: string | null; budget: boolean }
  stage: 'setup' | 'decks' | 'calendar'
}

export interface Settings {
  theme: ThemeId | null
  currency: 'GBP' | 'EUR' | 'USD'
  waterGoal: number
  waterServings: number[]
  budget: { period: 'week' | 'month'; amount: number } | null
  overrides: TargetOverrides
  showProgress: boolean
  hideNumbers: boolean
  trackSurplus: boolean
  notify: Record<'shopping' | 'mealPrep' | 'meals' | 'water' | 'weighIn' | 'workout' | 'planning', boolean>
  workoutsEnabled: boolean
}

export interface State {
  profile: Profile | null
  settings: Settings
  diary: DiaryEntry[]
  weights: { id: string; date: string; kg: number }[]
  water: { id: string; date: string; ml: number; at: string }[]
  activity: { id: string; date: string; steps: number | null; minutes: number | null; note: string }[]
  swipes: Record<MealCategory, { liked: string[]; rejected: string[] }>
  favourites: string[]
  reviews: Record<string, Review>
  planning: Planning | null
  plans: MealPlan[]
  lists: ShoppingList[]
  pantry: PantryItem[]
  receipts: Receipt[]
  workouts: Workout[]
  routines: Routine[]
  schedule: Record<number, string | null>
  photos: { id: string; date: string; key: string; note: string }[]
  dismissed: Record<string, string>

  set: (fn: (s: State) => Partial<State>) => void
  setProfile: (p: Profile) => void
  updateProfile: (p: Partial<Profile>) => void
  updateSettings: (p: Partial<Settings>) => void
  addDiary: (e: Omit<DiaryEntry, 'id' | 'createdAt'>) => string
  updateDiary: (id: string, patch: Partial<DiaryEntry>) => void
  removeDiary: (id: string) => void
  swipe: (cat: MealCategory, recipeId: string, dir: 'right' | 'left', trial?: boolean) => void
  unpick: (cat: MealCategory, recipeId: string) => void
  toggleFavourite: (recipeId: string) => void
  startPlanning: (counts: Record<MealCategory, number>, trial: Planning['trial'], filters: Planning['filters'], week: string) => void
  updatePlan: (planId: string, fn: (meals: PlannedMeal[]) => PlannedMeal[]) => void
  updateList: (listId: string, fn: (items: ShopItem[]) => ShopItem[]) => void
  resetAll: () => void
}

const emptySwipes = () => Object.fromEntries(CATEGORIES.map((c) => [c, { liked: [], rejected: [] }])) as unknown as State['swipes']

export const defaultSettings: Settings = {
  theme: null, currency: 'GBP', waterGoal: 2000, waterServings: [250, 330, 500], budget: null, overrides: {},
  showProgress: true, hideNumbers: false, trackSurplus: false,
  notify: { shopping: true, mealPrep: false, meals: false, water: false, weighIn: false, workout: false, planning: true },
  workoutsEnabled: true,
}

const initial = {
  profile: null, settings: defaultSettings, diary: [], weights: [], water: [], activity: [], swipes: emptySwipes(), favourites: [], reviews: {},
  planning: null, plans: [], lists: [], pantry: [], receipts: [], workouts: [], routines: [], schedule: {}, photos: [], dismissed: {},
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      ...initial,
      set: (fn) => set((s) => fn(s)),
      setProfile: (p) => set({ profile: p }),
      updateProfile: (patch) => set((s) => ({ profile: s.profile ? { ...s.profile, ...patch } : s.profile })),
      updateSettings: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),
      addDiary: (e) => {
        const id = uid()
        set((s) => ({ diary: [...s.diary, { ...e, id, createdAt: new Date().toISOString() }] }))
        return id
      },
      updateDiary: (id, patch) => set((s) => ({ diary: s.diary.map((d) => (d.id === id ? { ...d, ...patch } : d)) })),
      removeDiary: (id) => set((s) => ({
        diary: s.diary.filter((d) => d.id !== id),
        // un-link the planned meal so it can be logged again
        plans: s.plans.map((p) => ({ ...p, meals: p.meals.map((m) => (m.eatenEntryId === id ? { ...m, eatenEntryId: undefined } : m)) })),
      })),
      swipe: (cat, recipeId, dir, trial) => set((s) => {
        const sw = { ...s.swipes, [cat]: { liked: [...s.swipes[cat].liked], rejected: [...s.swipes[cat].rejected] } }
        if (dir === 'right') {
          if (!sw[cat].liked.includes(recipeId)) sw[cat].liked.push(recipeId)
          const planning = s.planning ? { ...s.planning, selected: { ...s.planning.selected, [cat]: [...new Set([...s.planning.selected[cat], recipeId])] }, trialPicks: trial ? [...new Set([...s.planning.trialPicks, recipeId])] : s.planning.trialPicks } : s.planning
          return { swipes: sw, planning }
        }
        if (!sw[cat].rejected.includes(recipeId)) sw[cat].rejected.push(recipeId)
        return { swipes: sw }
      }),
      unpick: (cat, recipeId) => set((s) => (s.planning ? { planning: { ...s.planning, trialPicks: s.planning.trialPicks.filter((x) => x !== recipeId), selected: { ...s.planning.selected, [cat]: s.planning.selected[cat].filter((x) => x !== recipeId) } } } : {})),
      toggleFavourite: (id) => set((s) => ({ favourites: s.favourites.includes(id) ? s.favourites.filter((x) => x !== id) : [...s.favourites, id] })),
      startPlanning: (counts, trial, filters, week) => {
        const cur = get().planning
        const prev = cur && cur.stage !== 'calendar' && cur.weekStart === week ? cur : null // keep picks only for the same week
        set({ planning: { weekStart: week, counts, trial, filters, trialPicks: prev?.trialPicks ?? [], stage: 'decks', selected: prev?.selected ?? (Object.fromEntries(CATEGORIES.map((c) => [c, []])) as unknown as Planning['selected']) } })
      },
      updatePlan: (planId, fn) => set((s) => ({ plans: s.plans.map((p) => (p.id === planId ? { ...p, meals: fn(p.meals) } : p)) })),
      updateList: (listId, fn) => set((s) => ({ lists: s.lists.map((l) => (l.id === listId ? { ...l, items: fn(l.items) } : l)) })),
      resetAll: () => set({ ...initial, swipes: emptySwipes() }),
    }),
    {
      name: 'mise-v1',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => Object.fromEntries(Object.entries(s).filter(([, v]) => typeof v !== 'function')) as Partial<State>,
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<State>
        return { ...current, ...p, settings: { ...defaultSettings, ...(p.settings ?? {}), notify: { ...defaultSettings.notify, ...(p.settings?.notify ?? {}) } }, swipes: { ...emptySwipes(), ...(p.swipes ?? {}) } }
      },
    },
  ),
)

