import type { Activity, CalcSex, Direction, Macros, Physique, Profile, Diet } from '../types'

export const ACTIVITY: Record<Activity, { label: string; detail: string; factor: number }> = {
  sedentary: { label: 'Sedentary', detail: 'Desk job, little exercise', factor: 1.2 },
  light: { label: 'Lightly active', detail: 'Exercise 1–3 days a week', factor: 1.375 },
  moderate: { label: 'Moderately active', detail: 'Exercise 3–5 days a week', factor: 1.55 },
  very: { label: 'Very active', detail: 'Hard exercise 6–7 days a week', factor: 1.725 },
  extreme: { label: 'Extremely active', detail: 'Physical job plus training', factor: 1.9 },
}

export const PHYSIQUE: Record<Physique, { label: string; proteinPerKg: number }> = {
  'lose-fat': { label: 'Lose body fat and become more defined', proteinPerKg: 2.0 },
  'build-muscle': { label: 'Build muscle', proteinPerKg: 1.8 },
  recomp: { label: 'Recomposition (lose fat, gain muscle)', proteinPerKg: 2.0 },
  maintain: { label: 'Maintain my current physique', proteinPerKg: 1.6 },
  fitness: { label: 'Improve general fitness', proteinPerKg: 1.4 },
}

export const CIRCUMSTANCES = [
  { id: 'pregnant', label: 'Pregnant or breastfeeding' },
  { id: 'medical', label: 'A medical condition affected by diet (e.g. diabetes, kidney disease)' },
  { id: 'ed', label: 'A current or past eating disorder' },
  { id: 'medication', label: 'Medication that affects appetite or weight' },
]

export function ageFromDob(dob: string, today = new Date()): number {
  const d = new Date(dob)
  let age = today.getFullYear() - d.getFullYear()
  const m = today.getMonth() - d.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--
  return age
}

/** Mifflin-St Jeor BMR. 'unspecified' uses the midpoint of the male (+5) and female (−161) constants. */
export function bmr(weightKg: number, heightCm: number, age: number, sex: CalcSex): number {
  const s = sex === 'male' ? 5 : sex === 'female' ? -161 : -78
  return 10 * weightKg + 6.25 * heightCm - 5 * age + s
}

export function goalAdjustment(tdee: number, direction: Direction, physique: Physique): number {
  if (direction === 'lose') return -Math.min(physique === 'recomp' ? tdee * 0.1 : tdee * 0.15, 500)
  if (direction === 'gain') return Math.min(tdee * 0.1, 300)
  if (physique === 'build-muscle') return Math.min(tdee * 0.05, 150)
  return 0
}

export interface Targets extends Macros { bmr: number; tdee: number; adjustment: number; floorApplied: boolean; guarded: boolean; water: number }

export interface TargetOverrides { kcal?: number; protein?: number; fat?: number }

/**
 * Daily targets. Internally consistent by construction: carbs fill the energy left after protein and fat,
 * so 4·protein + 4·carbs + 9·fat ≈ kcal (rounding only).
 * Safeguards: under-18s and anyone indicating circumstances needing professional guidance get no deficit;
 * energy never drops below max(BMR, 1200 kcal).
 */
export function computeTargets(p: Pick<Profile, 'dob' | 'calcSex' | 'heightCm' | 'weightKg' | 'activity' | 'direction' | 'physique' | 'circumstances' | 'diets'>, overrides: TargetOverrides = {}, today = new Date()): Targets {
  const age = ageFromDob(p.dob, today)
  const b = bmr(p.weightKg, p.heightCm, age, p.calcSex)
  const tdee = b * ACTIVITY[p.activity].factor
  const guarded = age < 18 || p.circumstances.length > 0
  let adj = goalAdjustment(tdee, p.direction, p.physique)
  if (guarded && adj < 0) adj = 0
  let kcal = tdee + adj
  const floor = Math.max(b, 1200)
  let floorApplied = false
  if (kcal < floor) { kcal = floor; floorApplied = true }
  if (overrides.kcal) {
    kcal = guarded ? Math.max(overrides.kcal, tdee) : Math.max(overrides.kcal, floor)
  }
  kcal = Math.round(kcal / 10) * 10

  const keto = p.diets.includes('keto')
  let protein = overrides.protein ?? Math.min(PHYSIQUE[p.physique].proteinPerKg, 2.2) * p.weightKg
  let fat = overrides.fat ?? (keto ? 0 : Math.max((kcal * 0.27) / 9, 0.6 * p.weightKg))
  let carbs: number
  if (keto && overrides.fat == null) {
    carbs = 25
    fat = Math.max(0, (kcal - protein * 4 - carbs * 4) / 9)
  } else {
    carbs = (kcal - protein * 4 - fat * 9) / 4
    if (carbs < 0) { // protein/fat overrides exceed energy: trim fat first, then protein
      fat = Math.max(0, (kcal - protein * 4) / 9); carbs = 0
      if (protein * 4 > kcal) { protein = kcal / 4; fat = 0 }
    }
  }
  return {
    kcal, protein: Math.round(protein), carbs: Math.round(carbs), fat: Math.round(fat),
    sugar: 90, // UK reference intake for total sugars (adult)
    fibre: 30, // UK SACN recommendation
    bmr: Math.round(b), tdee: Math.round(tdee), adjustment: Math.round(adj), floorApplied, guarded, water: 2000,
  }
}

export function addMacros(a: Macros, b: Macros): Macros {
  return { kcal: a.kcal + b.kcal, protein: a.protein + b.protein, carbs: a.carbs + b.carbs, fat: a.fat + b.fat, sugar: a.sugar + b.sugar, fibre: a.fibre + b.fibre }
}
export function scaleMacros(m: Macros, f: number): Macros {
  return { kcal: m.kcal * f, protein: m.protein * f, carbs: m.carbs * f, fat: m.fat * f, sugar: m.sugar * f, fibre: m.fibre * f }
}
export function roundMacros(m: Macros): Macros {
  const r = (n: number) => Math.round(n * 10) / 10
  return { kcal: Math.round(m.kcal), protein: r(m.protein), carbs: r(m.carbs), fat: r(m.fat), sugar: r(m.sugar), fibre: r(m.fibre) }
}

export const kgToLb = (kg: number) => kg * 2.2046226218
export const lbToKg = (lb: number) => lb / 2.2046226218
export const cmToFtIn = (cm: number) => { const total = cm / 2.54; let ft = Math.floor(total / 12); let inch = Math.round(total - ft * 12); if (inch === 12) { ft++; inch = 0 } return { ft, inch } }
export const ftInToCm = (ft: number, inch: number) => (ft * 12 + inch) * 2.54

export function fmtWeight(kg: number, unit: 'kg' | 'lb', dp = 1) {
  return unit === 'kg' ? `${kg.toFixed(dp)} kg` : `${kgToLb(kg).toFixed(dp)} lb`
}

/** Simple trailing moving average over the previous `days` calendar days (inclusive). */
export function movingAverage(points: { date: string; kg: number }[], days = 7) {
  const sorted = [...points].sort((a, b) => a.date.localeCompare(b.date))
  return sorted.map((p) => {
    const end = new Date(p.date).getTime()
    const start = end - (days - 1) * 86400000
    const win = sorted.filter((q) => { const t = new Date(q.date).getTime(); return t >= start && t <= end })
    return { date: p.date, kg: p.kg, avg: win.reduce((s, q) => s + q.kg, 0) / win.length }
  })
}

export const isCarbDiet = (d: Diet) => d === 'keto' || d === 'low-carb'
