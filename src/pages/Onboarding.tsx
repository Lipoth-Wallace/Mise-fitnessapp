import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useStore } from '../store'
import type { Profile } from '../types'
import { Button, Field, Notice } from '../components/ui'
import { AboutFields, ActivityFields, GoalFields, HealthFields, DietFields, AllergyFields, FoodFields, ShoppingFields } from '../components/ProfileFields'
import { ThemePicker } from '../components/ThemePicker'
import { computeTargets, ageFromDob } from '../lib/nutrition'
import { isoDate } from '../lib/util'

const blank: Profile = {
  name: '', dob: '', gender: 'prefer-not', calcSex: 'unspecified', heightCm: 170, weightKg: 70,
  units: { weight: 'kg', height: 'cm' }, activity: 'light', direction: 'maintain', physique: 'maintain', targetWeightKg: null,
  circumstances: [], diets: [], tryDiets: [], allergens: [], allergyIngredients: [], allergyNotes: '', cuisines: [], dislikes: [],
  shopping: { timesPerWeek: 1, days: [5], reminderTime: '09:00', supermarket: '' }, createdAt: '',
}

export default function Onboarding() {
  const [p, setP] = useState<Profile>(blank)
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const settings = useStore((s) => s.settings)
  const [theme, setTheme] = useState(settings.theme ?? 'sage')
  const save = useStore((s) => s.setProfile)
  const updateSettings = useStore((s) => s.updateSettings)
  const set = (patch: Partial<Profile>) => setP((x) => ({ ...x, ...patch }))
  const age = p.dob ? ageFromDob(p.dob) : NaN
  const aboutValid = !!p.dob && age >= 13 && age < 110 && p.heightCm >= 100 && p.heightCm <= 250 && p.weightKg >= 30 && p.weightKg <= 300

  const steps: { title: string; sub?: string; body: React.ReactNode; valid?: boolean; skippable?: boolean }[] = [
    { title: 'Plan, cook and train around you.', sub: 'A few questions, about three minutes. You can change every answer later.',
      body: <Field label="What should we call you?"><input className="field" autoFocus value={p.name} onChange={(e) => set({ name: e.target.value })} placeholder="First name" /></Field>, valid: p.name.trim().length > 0 },
    { title: 'About you', body: <><AboutFields p={p} set={set} />{p.dob && age < 13 && <div className="mt-4"><Notice tone="bad">Mise is for people aged 13 and over.</Notice></div>}</>, valid: aboutValid },
    { title: 'How active are you?', sub: 'Your typical week, not your best one.', body: <ActivityFields p={p} set={set} /> },
    { title: 'Your goals', body: <GoalFields p={p} set={set} /> },
    { title: 'Anything we should know?', sub: 'Optional', body: <HealthFields p={p} set={set} />, skippable: true },
    { title: 'How you eat', body: <DietFields p={p} set={set} />, skippable: true },
    { title: 'Allergies & intolerances', body: <AllergyFields p={p} set={set} />, skippable: true },
    { title: 'Food you love (and don’t)', sub: 'Skip this and fill it in from Settings whenever you like.', body: <FoodFields p={p} set={set} />, skippable: true },
    { title: 'When do you shop?', body: <ShoppingFields p={p} set={set} />, skippable: true },
    { title: 'Pick your colours', sub: ['male', 'female'].includes(p.gender) ? 'We’ve picked one based on your answer. Switch any time.' : 'Choose the look you like best.',
      body: <ThemePicker value={theme} onChange={(t) => { setTheme(t); document.documentElement.dataset.theme = t }} /> },
  ]

  const t = step === steps.length && aboutValid ? computeTargets(p) : null
  const go = (d: number) => {
    setDir(d)
    const next = step + d
    if (next === 9 && step === 8 && settings.theme == null) {
      const auto = p.gender === 'male' ? 'noir' : p.gender === 'female' ? 'rose' : 'sage'
      setTheme(auto); document.documentElement.dataset.theme = auto
    }
    setStep(next)
  }
  const finish = () => {
    updateSettings({ theme })
    save({ ...p, name: p.name.trim(), createdAt: new Date().toISOString() })
    useStore.setState((s) => ({ weights: [...s.weights, { id: crypto.randomUUID(), date: isoDate(), kg: p.weightKg }] }))
  }

  const cur = steps[step]
  return (
    <div className="safe-top mx-auto flex min-h-full max-w-xl flex-col px-5 pb-8">
      <div className="mb-6 flex items-center gap-3 pt-2">
        {step > 0 ? <button aria-label="Back" onClick={() => go(-1)} className="grid h-10 w-10 place-items-center rounded-full bg-surface"><ArrowLeft size={18} /></button> : <span className="display text-xl font-bold">mise</span>}
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface" role="progressbar" aria-label="Setup progress" aria-valuenow={step} aria-valuemax={steps.length}>
          <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${(step / steps.length) * 100}%` }} />
        </div>
      </div>
      <AnimatePresence mode="wait" custom={dir}>
        <motion.section key={step} className="flex-1" initial={{ opacity: 0, x: 24 * dir }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 * dir }} transition={{ duration: 0.2 }}>
          {cur ? (
            <>
              <h1 className={step === 0 ? 'mb-3 text-[2.6rem]' : 'mb-2'}>{cur.title}</h1>
              {cur.sub && <p className="mb-6 text-muted">{cur.sub}</p>}
              {!cur.sub && <div className="mb-5" />}
              {cur.body}
            </>
          ) : t && (
            <>
              <h1 className="mb-2">Your starting targets, {p.name}</h1>
              <p className="mb-6 text-muted">Estimates from the Mifflin-St Jeor equation × your activity level{t.adjustment ? `, ${t.adjustment > 0 ? '+' : ''}${t.adjustment} kcal for your goal` : ''}. Adjust them any time in Settings.</p>
              <div className="card mb-4 p-6">
                <p className="num display text-6xl font-bold">{t.kcal.toLocaleString()}</p>
                <p className="text-muted">kcal a day</p>
                <dl className="mt-5 grid grid-cols-3 gap-3">
                  {[['Protein', t.protein], ['Carbs', t.carbs], ['Fat', t.fat]].map(([k, v]) => (
                    <div key={k}><dd className="num display text-2xl font-semibold">{v}g</dd><dt className="text-sm text-muted">{k}</dt></div>
                  ))}
                </dl>
              </div>
              <p className="text-sm text-muted">Resting energy (BMR) {t.bmr} kcal · daily burn (TDEE) about {t.tdee} kcal.</p>
              {t.guarded && <div className="mt-4"><Notice tone="warn">Based on your answers we've kept this at maintenance. A GP or registered dietitian can give you personalised advice.</Notice></div>}
              {t.floorApplied && <div className="mt-4"><Notice>We've kept your target at a safe minimum.</Notice></div>}
            </>
          )}
        </motion.section>
      </AnimatePresence>
      <div className="mt-8 flex gap-3">
        {cur?.skippable && <Button variant="ghost" className="flex-1" onClick={() => go(1)}>Skip</Button>}
        {cur ? <Button className="flex-[2]" size="lg" disabled={cur.valid === false} onClick={() => go(1)}>{step === 0 ? 'Get started' : 'Continue'}</Button>
          : <Button className="w-full" size="lg" onClick={finish}>Start using Mise</Button>}
      </div>
    </div>
  )
}
