import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Droplets, Plus, Footprints, Sparkles, Dumbbell, ChevronRight } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useStore } from '../store'
import { useBehaviour, useCurrentPlan, useDayTotals, useTargets } from '../hooks'
import { Bar, Button, Card, Field, Notice, Sheet } from '../components/ui'
import { fmtWeight, movingAverage } from '../lib/nutrition'
import { addDays, isoDate, dayIndex, uid, fmtDate } from '../lib/util'
import { smartSuggestions } from '../lib/recommend'
import { RECIPE } from '../lib/catalog'
import { logPlannedMeal, plannedMacros } from '../lib/actions'
import { RecipeArt, RecipeDetail } from '../components/recipe'
import { CATEGORY_LABEL } from '../types'
import type { AdaptedRecipe } from '../lib/safety'

export default function Today() {
  const profile = useStore((s) => s.profile)!
  const settings = useStore((s) => s.settings)
  const t = useTargets()!
  const today = isoDate()
  const eaten = useDayTotals(today)
  const hide = settings.hideNumbers
  const remaining = t.kcal - eaten.kcal
  const hour = new Date().getHours()
  const greet = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-4">
      <header className="mb-2">
        <p className="text-sm text-muted">{fmtDate(today, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        <h1>{greet}, {profile.name}</h1>
      </header>
      {t.guarded && <Notice tone="warn">Your targets are set at maintenance. For personalised advice, speak to your GP or a registered dietitian.</Notice>}

      <Card className="p-6">
        {hide ? (
          <div><h2 className="mb-1">Today’s food</h2><p className="text-muted">Calorie numbers are hidden. Change this in Settings.</p></div>
        ) : (
          <div className="flex items-center gap-5">
            <CalorieRing eaten={eaten.kcal} target={t.kcal} />
            <dl className="flex-1 space-y-2.5">
              <div><dt className="text-[13px] text-muted">Target</dt><dd className="num display text-xl font-semibold">{t.kcal.toLocaleString()} kcal</dd></div>
              <div><dt className="text-[13px] text-muted">Eaten</dt><dd className="num display text-xl font-semibold">{Math.round(eaten.kcal).toLocaleString()}</dd></div>
              <div><dt className="text-[13px] text-muted">{remaining >= 0 ? 'Remaining' : 'Above target'}</dt><dd className={`num display text-xl font-semibold ${remaining < 0 ? 'text-warn' : ''}`}>{Math.abs(Math.round(remaining)).toLocaleString()}</dd></div>
            </dl>
          </div>
        )}
        <p className="mt-4 text-[12px] text-muted">Targets are estimates. Adjust them in Settings if they don’t feel right.</p>
      </Card>

      {!hide && <Macros eaten={eaten} t={t} />}
      <SmartAdjustments remaining={{ kcal: remaining, protein: t.protein - eaten.protein, carbs: t.carbs - eaten.carbs, fat: t.fat - eaten.fat }} />
      <UpcomingMeals />
      <div className="grid grid-cols-2 gap-4">
        <Water />
        <Steps />
      </div>
      <WeightCard />
      {settings.workoutsEnabled && <WorkoutSummary />}
      <WeekSummary />
      {settings.showProgress && !hide && <DailyProgress eaten={eaten} />}
    </div>
  )
}

function CalorieRing({ eaten, target }: { eaten: number; target: number }) {
  const r = 52, c = 2 * Math.PI * r
  const pct = Math.min(eaten / target, 1)
  const over = eaten > target
  return (
    <svg width="132" height="132" viewBox="0 0 132 132" role="img" aria-label={`${Math.round(eaten)} of ${target} kcal eaten`}>
      <circle cx="66" cy="66" r={r} fill="none" stroke="var(--ring-track)" strokeWidth="14" />
      {pct > 0 && <circle cx="66" cy="66" r={r} fill="none" stroke={over ? 'var(--warn)' : 'var(--primary)'} strokeWidth="14" strokeLinecap="round"
        strokeDasharray={`${c * pct} ${c}`} transform="rotate(-90 66 66)" style={{ transition: 'stroke-dasharray .6s cubic-bezier(.2,.8,.2,1)' }} />}
      <text x="66" y="62" textAnchor="middle" className="num" style={{ font: '700 24px var(--font-display)', fill: 'var(--ink)' }}>{Math.round(pct * 100)}%</text>
      <text x="66" y="82" textAnchor="middle" style={{ font: '500 12px var(--font-sans)', fill: 'var(--muted)' }}>of target</text>
    </svg>
  )
}

function Macros({ eaten, t }: { eaten: ReturnType<typeof useDayTotals>; t: NonNullable<ReturnType<typeof useTargets>> }) {
  const data = [
    { name: 'Protein', g: eaten.protein, kcal: eaten.protein * 4, target: t.protein, color: 'var(--protein)' },
    { name: 'Carbs', g: eaten.carbs, kcal: eaten.carbs * 4, target: t.carbs, color: 'var(--carb)' },
    { name: 'Fat', g: eaten.fat, kcal: eaten.fat * 9, target: t.fat, color: 'var(--fat)' },
  ]
  const total = data.reduce((s, d) => s + d.kcal, 0)
  return (
    <Card>
      <h2 className="mb-4">Macros</h2>
      <div className="flex items-center gap-5">
        <div className="h-28 w-28 shrink-0" aria-label="Share of energy from protein, carbs and fat" role="img">
          {total > 0 ? (
            <ResponsiveContainer><PieChart><Pie data={data} dataKey="kcal" innerRadius={34} outerRadius={52} paddingAngle={3} stroke="none" isAnimationActive>{data.map((d) => <Cell key={d.name} fill={d.color} />)}</Pie></PieChart></ResponsiveContainer>
          ) : <div className="grid h-full place-items-center rounded-full border-[14px] text-center text-[11px] text-muted" style={{ borderColor: 'var(--ring-track)' }}>No food yet</div>}
        </div>
        <div className="flex-1 space-y-3">
          {data.map((d) => (
            <div key={d.name}>
              <div className="mb-1 flex justify-between text-sm"><span className="font-semibold"><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />{d.name}</span><span className="num text-muted">{Math.round(d.g)} / {d.target}g{total > 0 && ` · ${Math.round((d.kcal / total) * 100)}%`}</span></div>
              <Bar value={d.g} max={d.target} color={d.color} label={`${d.name} eaten`} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 border-t border-line pt-3">
        <div className="mb-1 flex justify-between text-sm"><span>Sugar <span className="text-muted">(part of carbs)</span></span><span className="num text-muted">{Math.round(eaten.sugar)} / {t.sugar}g reference intake</span></div>
        <Bar value={eaten.sugar} max={t.sugar} color="var(--muted)" label="Sugar eaten" />
      </div>
    </Card>
  )
}

function SmartAdjustments({ remaining }: { remaining: { kcal: number; protein: number; carbs: number; fat: number } }) {
  const profile = useStore((s) => s.profile)!
  const t = useTargets()!
  const b = useBehaviour()
  const pantry = useStore((s) => s.pantry)
  const hide = useStore((s) => s.settings.hideNumbers)
  const [open, setOpen] = useState<{ a: AdaptedRecipe; portion: number } | null>(null)
  const add = useStore((s) => s.addDiary)
  const pantryIds = useMemo(() => new Set(pantry.filter((p) => p.ingredientId && p.qty > 0).map((p) => p.ingredientId!)), [pantry])
  const sug = useMemo(() => smartSuggestions(remaining, profile, t, b, pantryIds), [remaining.kcal, remaining.protein, profile, t, b, pantryIds]) // eslint-disable-line react-hooks/exhaustive-deps
  if (new Date().getHours() < 11 || remaining.kcal < 150) return null
  return (
    <Card>
      <div className="mb-1 flex items-center gap-2"><Sparkles size={18} className="text-primary" aria-hidden /><h2>Smart Adjustments</h2></div>
      <p className="mb-4 text-sm text-muted">{hide ? 'Ideas that fit the rest of your day.' : `About ${Math.round(remaining.kcal)} kcal and ${Math.max(0, Math.round(remaining.protein))}g protein left today. These fit, if you're hungry.`}</p>
      {sug.length === 0 ? <p className="text-sm text-muted">No recipes fit what's left today. That's fine; eat to your appetite.</p> : (
        <ul className="space-y-2">
          {sug.map((x) => (
            <li key={x.s.adapted.recipe.id}>
              <button onClick={() => setOpen({ a: x.s.adapted, portion: x.portion })} className="flex w-full items-center gap-3 rounded-2xl bg-bg p-2 text-left">
                <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl"><RecipeArt size="sm" art={x.s.adapted.recipe.art} hue={x.s.adapted.recipe.hue} label={x.s.adapted.recipe.name} /></span>
                <span className="flex-1">
                  <span className="block font-semibold leading-tight">{x.s.adapted.recipe.name}</span>
                  <span className="text-[13px] text-muted">{x.portion !== 1 && `${x.portion} serving · `}{!hide && `${x.kcal} kcal`}{x.reasons.length > 0 && ` · ${x.reasons.join(' · ')}`}</span>
                </span>
                <ChevronRight size={18} className="text-muted" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}
      <Sheet open={!!open} onClose={() => setOpen(null)} title={open?.a.recipe.name ?? ''}>
        {open && <RecipeDetail a={open.a} addLabel={`Log ${open.portion} serving${open.portion === 1 ? '' : 's'} to today`} onAdd={() => {
          const m = open.a.perServing
          add({ date: isoDate(), meal: new Date().getHours() >= 16 ? 'dinner' : 'snack', name: open.a.recipe.name, detail: `${open.portion} serving · Smart Adjustment`, source: 'recipe', recipeId: open.a.recipe.id, macros: { kcal: m.kcal * open.portion, protein: m.protein * open.portion, carbs: m.carbs * open.portion, fat: m.fat * open.portion, sugar: m.sugar * open.portion, fibre: m.fibre * open.portion } })
          setOpen(null)
        }} />}
      </Sheet>
    </Card>
  )
}

function UpcomingMeals() {
  const plan = useCurrentPlan()
  const today = isoDate()
  if (!plan) return (
    <Card><h2 className="mb-1">Planned meals</h2><p className="mb-3 text-sm text-muted">Swipe through recipes to build your week.</p><Link to="/plan"><Button size="sm">Plan your week</Button></Link></Card>
  )
  const d = Math.round((new Date(today).getTime() - new Date(plan.weekStart).getTime()) / 86400000)
  const meals = plan.meals.filter((m) => m.day === d).sort((a, b) => ['breakfast', 'lunch', 'dinner', 'dessert', 'snack'].indexOf(a.category) - ['breakfast', 'lunch', 'dinner', 'dessert', 'snack'].indexOf(b.category))
  return (
    <Card>
      <div className="mb-3 flex items-center justify-between"><h2>Planned today</h2><Link to="/plan" className="text-sm font-semibold text-primary">Week</Link></div>
      {d < 0 || d > 6 || !meals.length ? <p className="text-sm text-muted">{d < 0 ? `Your plan starts ${fmtDate(plan.weekStart)}.` : 'Nothing planned for today.'}</p> : (
        <ul className="divide-y divide-line">
          {meals.map((m) => {
            const name = m.recipeId ? RECIPE.get(m.recipeId)?.name : m.customName
            const mac = plannedMacros(m)
            return (
              <li key={m.id} className="flex items-center justify-between gap-3 py-2.5">
                <span><span className="block text-[12px] text-muted">{CATEGORY_LABEL[m.category]}{m.leftoverOf && ' · leftovers'}</span><span className="font-semibold">{name}</span></span>
                {m.eatenEntryId ? <span className="text-sm font-semibold text-good">Logged</span> : <Button size="sm" variant="soft" onClick={() => logPlannedMeal(plan, m, m.servings)} aria-label={`Log ${name} as eaten`}>I ate this{mac && ` · ${Math.round(mac.kcal)}`}</Button>}
              </li>
            )
          })}
        </ul>
      )}
      <p className="mt-2 text-[12px] text-muted">Planned food only counts once you log it.</p>
    </Card>
  )
}

function Water() {
  const water = useStore((s) => s.water)
  const goal = useStore((s) => s.settings.waterGoal)
  const servings = useStore((s) => s.settings.waterServings)
  const today = isoDate()
  const total = water.filter((w) => w.date === today).reduce((s, w) => s + w.ml, 0)
  const add = (ml: number) => useStore.setState((s) => ({ water: [...s.water, { id: uid(), date: today, ml, at: new Date().toISOString() }] }))
  const undo = () => useStore.setState((s) => { const todays = s.water.filter((w) => w.date === today); const last = todays[todays.length - 1]; return last ? { water: s.water.filter((w) => w.id !== last.id) } : {} })
  return (
    <Card className="p-4">
      <div className="mb-2 flex items-center gap-1.5"><Droplets size={18} className="text-info" aria-hidden style={{ color: 'var(--info)' }} /><h3>Water</h3></div>
      <p className="num display text-2xl font-semibold">{(total / 1000).toFixed(2)}<span className="text-sm font-normal text-muted"> / {(goal / 1000).toFixed(1)} L</span></p>
      <div className="my-2"><Bar value={total} max={goal} color="var(--info)" label="Water drunk today" /></div>
      <div className="flex flex-wrap gap-1.5">
        {servings.slice(0, 2).map((ml) => <button key={ml} onClick={() => add(ml)} className="rounded-full px-2.5 py-1 text-[13px] font-semibold text-on-info" style={{ background: 'var(--info)' }} aria-label={`Add ${ml} millilitres`}>+{ml}</button>)}
        {total > 0 && <button onClick={undo} className="px-1 text-[13px] text-muted underline">Undo</button>}
      </div>
    </Card>
  )
}

function Steps() {
  const activity = useStore((s) => s.activity)
  const today = isoDate()
  const a = activity.find((x) => x.date === today)
  const [open, setOpen] = useState(false)
  const [steps, setSteps] = useState(a?.steps?.toString() ?? '')
  const [mins, setMins] = useState(a?.minutes?.toString() ?? '')
  const save = () => {
    useStore.setState((s) => ({ activity: [...s.activity.filter((x) => x.date !== today), { id: a?.id ?? uid(), date: today, steps: steps ? Number(steps) : null, minutes: mins ? Number(mins) : null, note: '' }] }))
    setOpen(false)
  }
  return (
    <Card className="p-4">
      <div className="mb-2 flex items-center gap-1.5"><Footprints size={18} className="text-primary" aria-hidden /><h3>Activity</h3></div>
      {a?.steps != null || a?.minutes != null ? (
        <p className="num display text-2xl font-semibold">{a.steps != null ? a.steps.toLocaleString() : '—'}<span className="text-sm font-normal text-muted"> steps</span></p>
      ) : <p className="text-sm text-muted">Not logged yet</p>}
      {a?.minutes != null && <p className="text-[13px] text-muted">{a.minutes} active minutes</p>}
      <button onClick={() => setOpen(true)} className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-primary"><Plus size={14} /> Log</button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Today’s activity">
        <div className="space-y-4">
          <Notice>A website can’t read Apple Health, so enter today’s steps from your Health or Fitness app.</Notice>
          <Field label="Steps"><input className="field num" type="number" inputMode="numeric" value={steps} onChange={(e) => setSteps(e.target.value)} /></Field>
          <Field label="Active minutes"><input className="field num" type="number" inputMode="numeric" value={mins} onChange={(e) => setMins(e.target.value)} /></Field>
          <Button className="w-full" onClick={save}>Save</Button>
        </div>
      </Sheet>
    </Card>
  )
}

function WeightCard() {
  const weights = useStore((s) => s.weights)
  const profile = useStore((s) => s.profile)!
  const sorted = [...weights].sort((a, b) => a.date.localeCompare(b.date))
  const last = sorted.at(-1)
  const ma = movingAverage(sorted)
  const weekAgo = ma.filter((p) => p.date <= addDays(isoDate(), -7)).at(-1)
  const trend = last && weekAgo ? ma.at(-1)!.avg - weekAgo.avg : null
  const u = profile.units.weight
  return (
    <Link to="/more/weight" className="card block p-5">
      <div className="flex items-center justify-between"><h2>Weight</h2><ChevronRight size={18} className="text-muted" aria-hidden /></div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        <div><p className="text-[13px] text-muted">Current</p><p className="num display text-lg font-semibold">{last ? fmtWeight(last.kg, u) : '—'}</p></div>
        <div><p className="text-[13px] text-muted">7-day avg</p><p className="num display text-lg font-semibold">{ma.length ? fmtWeight(ma.at(-1)!.avg, u) : '—'}</p></div>
        <div><p className="text-[13px] text-muted">Target</p><p className="num display text-lg font-semibold">{profile.targetWeightKg ? fmtWeight(profile.targetWeightKg, u) : '—'}</p></div>
      </div>
      {trend != null && <p className="mt-2 text-sm text-muted">{Math.abs(trend) < 0.05 ? 'Steady over the last week' : `${trend > 0 ? 'Up' : 'Down'} ${fmtWeight(Math.abs(trend), u)} on last week’s average`}</p>}
    </Link>
  )
}

function WorkoutSummary() {
  const workouts = useStore((s) => s.workouts)
  const ws = addDays(isoDate(), -dayIndex(isoDate()))
  const thisWeek = workouts.filter((w) => w.date >= ws)
  const mins = thisWeek.reduce((s, w) => s + w.durationMin, 0)
  return (
    <Link to="/more/workouts" className="card flex items-center gap-4 p-5">
      <Dumbbell size={22} className="text-primary" aria-hidden />
      <div className="flex-1"><h3>Workouts this week</h3><p className="text-sm text-muted">{thisWeek.length ? `${thisWeek.length} session${thisWeek.length > 1 ? 's' : ''} · ${mins} min` : 'None logged yet'}</p></div>
      <ChevronRight size={18} className="text-muted" aria-hidden />
    </Link>
  )
}

function WeekSummary() {
  const diary = useStore((s) => s.diary)
  const water = useStore((s) => s.water)
  const t = useTargets()!
  const goal = useStore((s) => s.settings.waterGoal)
  const hide = useStore((s) => s.settings.hideNumbers)
  const days = Array.from({ length: 7 }, (_, i) => addDays(isoDate(), i - 6))
  const kcal = days.map((d) => diary.filter((e) => e.date === d).reduce((s, e) => s + e.macros.kcal, 0))
  const logged = kcal.filter((k) => k > 0)
  const avg = logged.length ? logged.reduce((a, b) => a + b, 0) / logged.length : 0
  const prot = days.map((d) => diary.filter((e) => e.date === d).reduce((s, e) => s + e.macros.protein, 0)).filter((x) => x > 0)
  const waterDays = days.filter((d) => water.filter((w) => w.date === d).reduce((s, w) => s + w.ml, 0) >= goal).length
  const max = Math.max(t.kcal * 1.2, ...kcal)
  return (
    <Card>
      <h2 className="mb-4">Last 7 days</h2>
      {!hide && (
        <div className="mb-4 flex h-24 items-end gap-2" role="img" aria-label="Calories eaten each day for the last week">
          {kcal.map((k, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className="w-full rounded-t-lg" style={{ height: `${(k / max) * 80}px`, minHeight: 3, background: k > t.kcal * 1.05 ? 'var(--warn)' : 'var(--primary)', opacity: k ? 1 : 0.25 }} />
              <span className="text-[11px] text-muted">{fmtDate(days[i], { weekday: 'narrow' })}</span>
            </div>
          ))}
        </div>
      )}
      <dl className="grid grid-cols-3 gap-3 text-sm">
        <div><dt className="text-muted">Days logged</dt><dd className="num display text-lg font-semibold">{logged.length}/7</dd></div>
        {!hide && <div><dt className="text-muted">Avg kcal</dt><dd className="num display text-lg font-semibold">{logged.length ? Math.round(avg).toLocaleString() : '—'}</dd></div>}
        <div><dt className="text-muted">Avg protein</dt><dd className="num display text-lg font-semibold">{prot.length ? `${Math.round(prot.reduce((a, b) => a + b, 0) / prot.length)}g` : '—'}</dd></div>
        <div><dt className="text-muted">Water goal hit</dt><dd className="num display text-lg font-semibold">{waterDays}/7</dd></div>
      </dl>
    </Card>
  )
}

function DailyProgress({ eaten }: { eaten: ReturnType<typeof useDayTotals> }) {
  const t = useTargets()!
  const water = useStore((s) => s.water)
  const goal = useStore((s) => s.settings.waterGoal)
  const today = isoDate()
  const drank = water.filter((w) => w.date === today).reduce((s, w) => s + w.ml, 0)
  const items = [
    { label: 'Logged your food', done: eaten.kcal > 0 },
    { label: 'Reached your protein', done: eaten.protein >= t.protein * 0.9 },
    { label: 'Within 10% of your energy target', done: eaten.kcal >= t.kcal * 0.9 && eaten.kcal <= t.kcal * 1.1 },
    { label: 'Drank your water', done: drank >= goal },
  ]
  return (
    <Card>
      <h2 className="mb-1">Today’s check-ins</h2>
      <p className="mb-3 text-sm text-muted">Small habits, not a score. Some days won’t tick every box, and that’s normal.</p>
      <ul className="space-y-2">{items.map((i) => <li key={i.label} className="flex items-center gap-3"><span className={`grid h-6 w-6 place-items-center rounded-full text-[12px] font-bold ${i.done ? 'bg-primary text-on-primary' : 'border-2 border-line'}`} aria-hidden>{i.done ? '✓' : ''}</span><span className={i.done ? '' : 'text-muted'}>{i.label}</span><span className="sr-only">{i.done ? 'done' : 'not yet'}</span></li>)}</ul>
    </Card>
  )
}
