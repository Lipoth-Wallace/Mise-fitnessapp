/** Profile editors shared by onboarding and settings, so every original answer stays editable. */
import type { Profile, Gender, Diet, Allergen } from '../types'
import { ALLERGENS, DIETS } from '../types'
import { ACTIVITY, PHYSIQUE, CIRCUMSTANCES, cmToFtIn, ftInToCm, kgToLb, lbToKg, ageFromDob } from '../lib/nutrition'
import { Chip, Field, Notice } from './ui'
import { IngredientSearch } from './IngredientSearch'
import { DAY_SHORT } from '../lib/util'

type P = { p: Profile; set: (patch: Partial<Profile>) => void }

export const CUISINES = ['Italian', 'Mexican', 'Indian', 'Chinese', 'Japanese', 'Mediterranean', 'Thai', 'British', 'American', 'Middle Eastern']
const GENDERS: { id: Gender; label: string }[] = [
  { id: 'female', label: 'Woman' }, { id: 'male', label: 'Man' }, { id: 'non-binary', label: 'Non-binary' }, { id: 'other', label: 'Another identity' }, { id: 'prefer-not', label: 'Prefer not to say' },
]
const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])

export function AboutFields({ p, set }: P) {
  const h = cmToFtIn(p.heightCm)
  const age = p.dob ? ageFromDob(p.dob) : null
  return (
    <div className="space-y-5">
      <Field label="Date of birth" hint={age != null && age >= 0 ? `${age} years old` : undefined}>
        <input className="field" type="date" value={p.dob} max={new Date().toISOString().slice(0, 10)} onChange={(e) => set({ dob: e.target.value })} />
      </Field>
      {age != null && age < 18 && age >= 0 && <Notice tone="warn">You're under 18. Mise won't set a calorie deficit for you; your targets will support growth. Talk to your GP or a registered dietitian before changing how you eat.</Notice>}
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Gender</legend>
        <div className="flex flex-wrap gap-2">{GENDERS.map((g) => <Chip key={g.id} active={p.gender === g.id} onClick={() => set({ gender: g.id, calcSex: g.id === 'male' ? 'male' : g.id === 'female' ? 'female' : p.calcSex })}>{g.label}</Chip>)}</div>
        <p className="mt-1.5 text-[13px] text-muted">Used to pick a starting colour theme only. It never changes your nutrition.</p>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Sex for the calorie formula (optional)</legend>
        <div className="flex flex-wrap gap-2">
          {(['female', 'male', 'unspecified'] as const).map((s) => <Chip key={s} active={p.calcSex === s} onClick={() => set({ calcSex: s })}>{s === 'unspecified' ? 'Skip' : s === 'male' ? 'Male' : 'Female'}</Chip>)}
        </div>
        <p className="mt-1.5 text-[13px] text-muted">The Mifflin-St Jeor equation has a different constant for male and female bodies. If you skip, we use the midpoint, which can be about 80 kcal a day out either way.</p>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Units</legend>
        <div className="flex flex-wrap gap-2">
          <Chip active={p.units.weight === 'kg'} onClick={() => set({ units: { ...p.units, weight: 'kg' } })}>kg</Chip>
          <Chip active={p.units.weight === 'lb'} onClick={() => set({ units: { ...p.units, weight: 'lb' } })}>lb</Chip>
          <span className="w-3" />
          <Chip active={p.units.height === 'cm'} onClick={() => set({ units: { ...p.units, height: 'cm' } })}>cm</Chip>
          <Chip active={p.units.height === 'ftin'} onClick={() => set({ units: { ...p.units, height: 'ftin' } })}>ft / in</Chip>
        </div>
      </fieldset>
      <div className="grid grid-cols-2 gap-3">
        {p.units.height === 'cm' ? (
          <Field label="Height (cm)"><input className="field num" inputMode="decimal" type="number" min={100} max={250} value={Math.round(p.heightCm) || ''} onChange={(e) => set({ heightCm: Number(e.target.value) })} /></Field>
        ) : (
          <Field label="Height">
            <div className="flex gap-2">
              <input aria-label="Feet" className="field num" type="number" inputMode="numeric" value={h.ft} onChange={(e) => set({ heightCm: ftInToCm(Number(e.target.value), h.inch) })} />
              <input aria-label="Inches" className="field num" type="number" inputMode="numeric" value={h.inch} onChange={(e) => set({ heightCm: ftInToCm(h.ft, Number(e.target.value)) })} />
            </div>
          </Field>
        )}
        <Field label={`Weight (${p.units.weight})`}>
          <input className="field num" type="number" inputMode="decimal" step="0.1" value={p.weightKg ? +(p.units.weight === 'kg' ? p.weightKg : kgToLb(p.weightKg)).toFixed(1) : ''}
            onChange={(e) => set({ weightKg: p.units.weight === 'kg' ? Number(e.target.value) : lbToKg(Number(e.target.value)) })} />
        </Field>
      </div>
    </div>
  )
}

export function ActivityFields({ p, set }: P) {
  return (
    <div className="space-y-2" role="radiogroup" aria-label="Activity level">
      {Object.entries(ACTIVITY).map(([id, a]) => (
        <button key={id} role="radio" aria-checked={p.activity === id} onClick={() => set({ activity: id as Profile['activity'] })}
          className={`flex w-full items-center justify-between rounded-2xl border-2 px-4 py-3.5 text-left ${p.activity === id ? 'border-primary bg-surface' : 'border-line'}`}>
          <span><span className="block font-semibold">{a.label}</span><span className="text-sm text-muted">{a.detail}</span></span>
          <span className="num text-sm text-muted">×{a.factor}</span>
        </button>
      ))}
    </div>
  )
}

export function GoalFields({ p, set }: P) {
  const minor = p.dob ? ageFromDob(p.dob) < 18 : false
  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Weight direction</legend>
        <div className="grid grid-cols-3 gap-2">
          {(['lose', 'maintain', 'gain'] as const).map((d) => (
            <Chip key={d} className="justify-center" disabled={minor && d === 'lose'} active={p.direction === d} onClick={() => set({ direction: d })}>{d === 'lose' ? 'Lose' : d === 'gain' ? 'Gain' : 'Maintain'}</Chip>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-1 text-sm font-semibold">What do you want physically?</legend>
        <p className="mb-2 text-[13px] text-muted">Separate from weight: you can build muscle while keeping your weight steady.</p>
        <div className="space-y-2" role="radiogroup">
          {Object.entries(PHYSIQUE).map(([id, g]) => (
            <button key={id} role="radio" aria-checked={p.physique === id} onClick={() => set({ physique: id as Profile['physique'] })}
              className={`w-full rounded-2xl border-2 px-4 py-3 text-left font-medium ${p.physique === id ? 'border-primary bg-surface' : 'border-line'}`}>{g.label}</button>
          ))}
        </div>
      </fieldset>
      <Field label={`Target weight (${p.units.weight}, optional)`}>
        <input className="field num" type="number" inputMode="decimal" step="0.1"
          value={p.targetWeightKg ? +(p.units.weight === 'kg' ? p.targetWeightKg : kgToLb(p.targetWeightKg)).toFixed(1) : ''}
          onChange={(e) => set({ targetWeightKg: e.target.value ? (p.units.weight === 'kg' ? Number(e.target.value) : lbToKg(Number(e.target.value))) : null })} />
      </Field>
    </div>
  )
}

export function HealthFields({ p, set }: P) {
  return (
    <div className="space-y-3">
      <p className="text-muted">Tick anything that applies. If you do, Mise won't suggest eating less than you burn and will point you towards professional advice. This stays on your device.</p>
      {CIRCUMSTANCES.map((c) => (
        <label key={c.id} className="flex items-start gap-3 rounded-2xl border border-line px-4 py-3">
          <input type="checkbox" className="mt-1 h-5 w-5 accent-[var(--primary)]" checked={p.circumstances.includes(c.id)} onChange={() => set({ circumstances: toggle(p.circumstances, c.id) })} />
          <span>{c.label}</span>
        </label>
      ))}
      {p.circumstances.length > 0 && <Notice tone="warn">Please speak to your GP or a registered dietitian about your energy and nutrient needs. Mise will show maintenance-level estimates only. You can hide calorie numbers in Settings.</Notice>}
    </div>
  )
}

export function DietFields({ p, set }: P) {
  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Diets you follow</legend>
        <div className="flex flex-wrap gap-2">{DIETS.map((d) => <Chip key={d.id} active={p.diets.includes(d.id)} onClick={() => set({ diets: toggle(p.diets, d.id) })}>{d.label}</Chip>)}</div>
        <p className="mt-1.5 text-[13px] text-muted">These are strict: recipes that break them are never shown. Mediterranean is treated as a preference.</p>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Diets you'd like to try</legend>
        <div className="flex flex-wrap gap-2">{DIETS.filter((d) => !p.diets.includes(d.id)).map((d) => <Chip key={d.id} active={p.tryDiets.includes(d.id)} onClick={() => set({ tryDiets: toggle(p.tryDiets, d.id as Diet) })}>{d.label}</Chip>)}</div>
        <p className="mt-1.5 text-[13px] text-muted">When you plan a week, we'll ask if you want to try one for a few days.</p>
      </fieldset>
      <Field label="Anything else? (optional)"><input className="field" placeholder="e.g. halal, no alcohol" value={p.allergyNotes} onChange={(e) => set({ allergyNotes: e.target.value })} /></Field>
    </div>
  )
}

export function AllergyFields({ p, set }: P) {
  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">The 14 major allergens</legend>
        <div className="flex flex-wrap gap-2">{ALLERGENS.map((a) => <Chip key={a.id} active={p.allergens.includes(a.id)} onClick={() => set({ allergens: toggle(p.allergens, a.id as Allergen) })}>{a.label}</Chip>)}</div>
      </fieldset>
      <Field label="Other allergies or intolerances" hint="Search ingredients and add as many as you need.">
        <IngredientSearch value={p.allergyIngredients} onChange={(v) => set({ allergyIngredients: v })} placeholder="Search ingredients, e.g. banana" ariaLabel="Search allergy ingredients" />
      </Field>
      <Notice>Allergies are strict exclusions, including "may contain" ingredients. Mise only suggests a swap when the replacement passes every one of your restrictions. Always read labels.</Notice>
    </div>
  )
}

export function FoodFields({ p, set }: P) {
  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Cuisines you enjoy</legend>
        <div className="flex flex-wrap gap-2">{CUISINES.map((c) => <Chip key={c} active={p.cuisines.includes(c)} onClick={() => set({ cuisines: toggle(p.cuisines, c) })}>{c}</Chip>)}</div>
      </fieldset>
      <Field label="Foods you dislike" hint="Try typing “fi”.">
        <IngredientSearch groups value={p.dislikes} onChange={(v) => set({ dislikes: v })} placeholder="Search foods" ariaLabel="Search disliked foods" />
      </Field>
    </div>
  )
}

export function ShoppingFields({ p, set }: P) {
  const s = p.shopping
  return (
    <div className="space-y-5">
      <Field label="Shops per week">
        <div className="flex gap-2">{[1, 2, 3, 4].map((n) => <Chip key={n} active={s.timesPerWeek === n} onClick={() => set({ shopping: { ...s, timesPerWeek: n } })}>{n === 4 ? '4+' : n}</Chip>)}</div>
      </Field>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Usual shopping days</legend>
        <div className="flex flex-wrap gap-2">{DAY_SHORT.map((d, i) => <Chip key={d} active={s.days.includes(i)} onClick={() => set({ shopping: { ...s, days: toggle(s.days, i).sort() } })}>{d}</Chip>)}</div>
      </fieldset>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Reminder time"><input className="field num" type="time" value={s.reminderTime} onChange={(e) => set({ shopping: { ...s, reminderTime: e.target.value } })} /></Field>
        <Field label="Supermarket"><input className="field" placeholder="e.g. Tesco" value={s.supermarket} onChange={(e) => set({ shopping: { ...s, supermarket: e.target.value } })} /></Field>
      </div>
      <p className="text-[13px] text-muted">We use these to remind you on the days you normally shop that your list is ready.</p>
    </div>
  )
}
