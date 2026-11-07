import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Plus, RotateCcw, Shuffle, Trash2, MoveRight, Utensils, Repeat2 } from 'lucide-react'
import { useStore, type Planning } from '../store'
import { useBehaviour, useCurrentPlan, useTargets } from '../hooks'
import { Button, Card, Chip, Empty, Field, Notice, PageHeader, Segmented, Sheet, Stepper } from '../components/ui'
import { SwipeDeck } from '../components/SwipeDeck'
import { RecipeArt, RecipeDetail } from '../components/recipe'
import { CATEGORIES, CATEGORY_LABEL, DIETS, ZERO, type MealCategory, type MealPlan, type PlannedMeal, type Macros } from '../types'
import { deckQueue, scoreRecipes, type Scored } from '../lib/recommend'
import { RECIPE } from '../lib/catalog'
import { adaptRecipe } from '../lib/safety'
import { safetyContext } from '../lib/recommend'
import { addMacros } from '../lib/nutrition'
import { DAY_NAMES, DAY_SHORT, addDays, fmtDate, uid, isoDate, weekStart, dayIndex } from '../lib/util'
import { generateList, logPlannedMeal, plannedMacros } from '../lib/actions'
import { ReviewForm } from '../components/ReviewForm'

export default function Plan() {
  const planning = useStore((s) => s.planning)
  const latest = useCurrentPlan()
  const plans = useStore((s) => s.plans)
  const [planId, setPlanId] = useState<string | null>(null)
  const plan = plans.find((p) => p.id === planId) ?? plans.find((p) => planning?.stage === 'calendar' && p.weekStart === planning.weekStart) ?? plans.find((p) => p.weekStart === weekStart()) ?? latest
  const [view, setView] = useState<'auto' | 'setup'>('auto')
  if (view === 'setup' || planning?.stage === 'setup' || (!planning && !plan)) return <Setup onDone={() => setView('auto')} />
  if (planning && planning.stage === 'decks') return <Decks planning={planning} />
  if (plan) return <Calendar plan={plan} plans={plans} onPick={setPlanId} onNewWeek={() => setView('setup')} />
  return <Setup onDone={() => setView('auto')} />
}

// ── Setup ──────────────────────────────────────────────────────
function Setup({ onDone }: { onDone: () => void }) {
  const profile = useStore((s) => s.profile)!
  const prev = useStore((s) => s.planning)
  const start = useStore((s) => s.startPlanning)
  const [counts, setCounts] = useState<Record<MealCategory, number>>(prev?.counts ?? { breakfast: 5, lunch: 5, dinner: 7, dessert: 2, snack: 3 })
  const [trialOn, setTrialOn] = useState(false)
  const [trialDiet, setTrialDiet] = useState(profile.tryDiets[0] ?? null)
  const [trialDays, setTrialDays] = useState(3)
  const [filters, setFilters] = useState<Planning['filters']>(prev?.filters ?? { maxTime: null, difficulty: null, budget: false })
  const plans = useStore((s) => s.plans)
  const thisWeek = weekStart(), nextWeek = addDays(weekStart(), 7)
  const defaultWeek = prev && prev.stage !== 'calendar' ? prev.weekStart : dayIndex(isoDate()) >= 3 || plans.some((p) => p.weekStart === thisWeek) ? nextWeek : thisWeek
  const [week, setWeek] = useState(defaultWeek)
  return (
    <div>
      <PageHeader title="Plan your week" sub="Step 1 of 3" />
      <Card className="mb-4">
        <h2 className="mb-3">Which week?</h2>
        <Segmented label="Week to plan" value={week} onChange={setWeek} options={[{ id: thisWeek, label: `This week (${fmtDate(thisWeek, { day: 'numeric', month: 'short' })})` }, { id: nextWeek, label: `Next week (${fmtDate(nextWeek, { day: 'numeric', month: 'short' })})` }]} />
        {plans.some((p) => p.weekStart === week) && <p className="mt-2 text-[13px] text-warn">You already have a plan for this week. Building a new one will replace it.</p>}
      </Card>
      <Card className="mb-4">
        <h2 className="mb-1">How many recipes?</h2>
        <p className="mb-4 text-sm text-muted">Pick how many different recipes you want in each deck. Choose 0 to skip one. You can repeat meals across days later.</p>
        <ul className="divide-y divide-line">
          {CATEGORIES.map((c) => (
            <li key={c} className="flex items-center justify-between py-2.5"><span className="font-semibold">{CATEGORY_LABEL[c]}</span><Stepper label={`${CATEGORY_LABEL[c]} recipes`} value={counts[c]} min={0} max={14} onChange={(n) => setCounts({ ...counts, [c]: n })} /></li>
          ))}
        </ul>
      </Card>
      {profile.tryDiets.length > 0 && (
        <Card className="mb-4">
          <h2 className="mb-1">Try something new?</h2>
          <p className="mb-3 text-sm text-muted">You said you’re interested in {profile.tryDiets.map((d) => DIETS.find((x) => x.id === d)!.label.toLowerCase()).join(', ')}. Your allergies and existing diets still apply.</p>
          <label className="mb-3 flex items-center gap-3"><input type="checkbox" className="h-5 w-5 accent-[var(--primary)]" checked={trialOn} onChange={(e) => setTrialOn(e.target.checked)} /> Yes, try one this week</label>
          {trialOn && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">{profile.tryDiets.map((d) => <Chip key={d} active={trialDiet === d} onClick={() => setTrialDiet(d)}>{DIETS.find((x) => x.id === d)!.label}</Chip>)}</div>
              <div className="flex items-center justify-between"><span>Days to follow it</span><Stepper label="trial days" value={trialDays} min={1} max={7} onChange={setTrialDays} /></div>
            </div>
          )}
        </Card>
      )}
      <Card className="mb-6">
        <h2 className="mb-3">Filters</h2>
        <Field label="Total time">
          <div className="flex flex-wrap gap-2">
            {([null, 20, 30, 45] as const).map((t) => <Chip key={String(t)} active={filters.maxTime === t} onClick={() => setFilters({ ...filters, maxTime: t })}>{t ? `Under ${t} min` : 'Any'}</Chip>)}
          </div>
        </Field>
        <div className="mt-4"><Field label="Difficulty">
          <div className="flex flex-wrap gap-2">{[null, 'Easy', 'Intermediate', 'Advanced'].map((d) => <Chip key={String(d)} active={filters.difficulty === d} onClick={() => setFilters({ ...filters, difficulty: d })}>{d ?? 'Any'}</Chip>)}</div>
        </Field></div>
        <label className="mt-4 flex items-center gap-3"><input type="checkbox" className="h-5 w-5 accent-[var(--primary)]" checked={filters.budget} onChange={(e) => setFilters({ ...filters, budget: e.target.checked })} /> Prioritise cheaper recipes</label>
      </Card>
      <Button size="lg" className="w-full" disabled={Object.values(counts).every((n) => n === 0)} onClick={() => { start(counts, trialOn && trialDiet ? { diet: trialDiet, days: trialDays } : null, filters, week); onDone() }}>Start swiping <ArrowRight size={18} /></Button>
    </div>
  )
}

// ── Decks ──────────────────────────────────────────────────────
function Decks({ planning }: { planning: Planning }) {
  const profile = useStore((s) => s.profile)!
  const t = useTargets()!
  const b = useBehaviour()
  const swipe = useStore((s) => s.swipe)
  const unpick = useStore((s) => s.unpick)
  const hide = useStore((s) => s.settings.hideNumbers)
  const active = CATEGORIES.filter((c) => planning.counts[c] > 0)
  const [cat, setCat] = useState<MealCategory>(active.find((c) => planning.selected[c].length < planning.counts[c]) ?? active[0])
  const [info, setInfo] = useState<Scored | null>(null)
  const [trialMode, setTrialMode] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  // Skipped cards go to the back of their own deck for this session; nothing is recorded.
  const [skipped, setSkipped] = useState<Record<string, string[]>>({})
  const extra = trialMode && planning.trial ? [planning.trial.diet] : []
  const allPicked = Object.values(planning.selected).flat()
  const baseQueue = useMemo(() => deckQueue(cat, profile, t, b, allPicked, planning.filters, extra), [cat, profile, t, b, allPicked.join(), planning.filters, extra.join()]) // eslint-disable-line react-hooks/exhaustive-deps
  const skippedHere = skipped[cat] ?? NONE
  const queue = useMemo(() => [
    ...baseQueue.filter((s) => !skippedHere.includes(s.adapted.recipe.id)),
    ...skippedHere.map((id) => baseQueue.find((s) => s.adapted.recipe.id === id)).filter((s): s is Scored => !!s),
  ], [baseQueue, skippedHere])
  const picked = planning.selected[cat]
  const target = planning.counts[cat]
  const full = picked.length >= target
  const allDone = active.every((c) => planning.selected[c].length >= planning.counts[c])
  const nextCat = active.find((c) => c !== cat && planning.selected[c].length < planning.counts[c])
  const build = () => {
    const plan = buildPlan(planning)
    useStore.setState((s) => ({ plans: [...s.plans.filter((p) => p.weekStart !== plan.weekStart), plan], planning: { ...planning, stage: 'calendar' } }))
  }
  const resetRejected = () => useStore.setState((s) => ({ swipes: { ...s.swipes, [cat]: { ...s.swipes[cat], rejected: [] } } }))

  return (
    <div>
      <PageHeader title="Pick your recipes" sub={`Step 2 of 3 · week of ${fmtDate(planning.weekStart)}`} right={<button className="text-sm font-semibold text-primary" onClick={() => useStore.setState({ planning: { ...planning, stage: 'setup' } as Planning })}>Counts</button>} />
      <div role="tablist" aria-label="Recipe decks" className="no-scrollbar -mx-5 mb-4 flex gap-2 overflow-x-auto px-5">
        {active.map((c) => {
          const n = planning.selected[c].length, m = planning.counts[c]
          return (
            <button key={c} role="tab" aria-selected={c === cat} onClick={() => { setCat(c); setReviewing(false) }}
              className={`shrink-0 rounded-2xl border-2 px-4 py-2 text-left ${c === cat ? 'border-primary bg-surface' : 'border-line'}`}>
              <span className="block text-sm font-semibold">{CATEGORY_LABEL[c]}</span>
              <span className={`num text-[13px] ${n >= m ? 'font-semibold text-good' : 'text-muted'}`}>{n >= m && <Check size={12} className="mr-0.5 inline" aria-hidden />}{n}/{m} selected</span>
            </button>
          )
        })}
      </div>
      {planning.trial && (
        <label className="mb-3 flex items-center gap-3 rounded-2xl bg-surface px-4 py-2.5 text-sm">
          <input type="checkbox" className="h-5 w-5 accent-[var(--primary)]" checked={trialMode} onChange={(e) => setTrialMode(e.target.checked)} />
          Show only {DIETS.find((d) => d.id === planning.trial!.diet)!.label.toLowerCase()} recipes for your {planning.trial.days} trial day{planning.trial.days > 1 ? 's' : ''}
        </label>
      )}

      {reviewing || full ? (
        <Card>
          <h2 className="mb-1">{full ? `${CATEGORY_LABEL[cat]} done` : `Your ${CATEGORY_LABEL[cat].toLowerCase()} picks`}</h2>
          <p className="mb-3 text-sm text-muted">Remove any you’ve changed your mind about to keep swiping.</p>
          <ul className="mb-4 space-y-2">
            {picked.map((id) => { const r = RECIPE.get(id)!; return (
              <li key={id} className="flex items-center gap-3">
                <span className="h-12 w-12 shrink-0 overflow-hidden rounded-xl"><RecipeArt size="sm" art={r.art} hue={r.hue} label={r.name} /></span>
                <span className="flex-1 font-semibold">{r.name}{planning.trialPicks.includes(id) && <span className="ml-2 rounded-full bg-surface-2 px-2 py-0.5 text-[11px]">trial</span>}</span>
                <Button size="sm" variant="ghost" onClick={() => unpick(cat, id)} aria-label={`Replace ${r.name}`}><Shuffle size={14} /> Replace</Button>
              </li>
            ) })}
          </ul>
          <div className="flex flex-wrap gap-3">
            {!full && <Button variant="soft" onClick={() => setReviewing(false)}>Keep swiping</Button>}
            {nextCat && <Button onClick={() => { setCat(nextCat); setReviewing(false) }}>Next: {CATEGORY_LABEL[nextCat]} <ArrowRight size={16} /></Button>}
          </div>
        </Card>
      ) : queue.length === 0 ? (
        <Empty title="You’ve seen every match" body={`There are no more ${CATEGORY_LABEL[cat].toLowerCase()} recipes that fit your diet, allergies and filters. You can look again at ones you passed on, loosen your filters, or move on.`}
          action={<div className="flex flex-wrap gap-2"><Button size="sm" variant="soft" onClick={resetRejected}><RotateCcw size={14} /> Show passed recipes again</Button>{nextCat && <Button size="sm" onClick={() => setCat(nextCat)}>Next deck</Button>}</div>} />
      ) : (
        <>
          <SwipeDeck queue={queue} hideNumbers={hide} onInfo={setInfo} onSwipe={(id, dir) => {
            if (dir === 'up') setSkipped((sk) => ({ ...sk, [cat]: [...(sk[cat] ?? []).filter((x) => x !== id), id] }))
            else swipe(cat, id, dir, trialMode)
          }} />
          <p className="mt-2 text-center text-[12px] text-muted">Swipe right to add · left to pass · up to skip for now</p>
          <p className="mt-1 text-center text-[13px] text-muted">{queue.length} recipe{queue.length === 1 ? '' : 's'} left in this deck{picked.length > 0 && ' · '}{picked.length > 0 && <button className="font-semibold text-primary" onClick={() => setReviewing(true)}>See picks</button>}</p>
        </>
      )}

      <div className="mt-6">
        <Button size="lg" className="w-full" variant={allDone ? 'primary' : 'ghost'} disabled={allPicked.length === 0} onClick={build}>
          {allDone ? 'Build my week' : `Build my week with ${allPicked.length} recipe${allPicked.length === 1 ? '' : 's'}`} <ArrowRight size={18} />
        </Button>
      </div>
      <Sheet open={!!info} onClose={() => setInfo(null)} title={info?.adapted.recipe.name ?? ''}>
        {info && (<>
          {info.why.length > 0 && <p className="mb-3 text-sm text-muted">Why you’re seeing this: {info.why.join(' · ')}</p>}
          <RecipeDetail a={info.adapted} addLabel={full ? undefined : 'Add to this week'} onAdd={full ? undefined : () => { swipe(cat, info.adapted.recipe.id, 'right', trialMode); setInfo(null) }} />
        </>)}
      </Sheet>
    </div>
  )
}

/** Spread picks across Monday–Sunday. Trial-diet picks go on the first N days. Repeats fill remaining days. */
const NONE: string[] = []

export function buildPlan(planning: Planning): MealPlan {
  const meals: PlannedMeal[] = []
  for (const c of CATEGORIES) {
    const picks = planning.selected[c]
    if (!picks.length) continue
    const trial = picks.filter((id) => planning.trialPicks.includes(id))
    const normal = picks.filter((id) => !planning.trialPicks.includes(id))
    const days = c === 'dessert' || c === 'snack' ? Math.min(7, Math.max(picks.length, planning.counts[c])) : 7
    const trialDays = planning.trial ? planning.trial.days : 0
    for (let d = 0; d < Math.min(days, 7); d++) {
      const pool = d < trialDays && trial.length ? trial : normal.length ? normal : trial
      const idx = d < trialDays ? d : d - (pool === normal ? Math.min(trialDays, d) : 0)
      const id = pool[idx % pool.length]
      meals.push({ id: uid(), day: d, category: c, recipeId: id, servings: 1, trial: planning.trialPicks.includes(id) })
    }
  }
  return { id: uid(), weekStart: planning.weekStart, meals }
}

// ── Calendar ───────────────────────────────────────────────────
function Calendar({ plan, plans, onPick, onNewWeek }: { plan: MealPlan; plans: MealPlan[]; onPick: (id: string) => void; onNewWeek: () => void }) {
  const nav = useNavigate()
  const profile = useStore((s) => s.profile)!
  const update = useStore((s) => s.updatePlan)
  const hide = useStore((s) => s.settings.hideNumbers)
  const t = useTargets()!
  const todayIdx = Math.round((new Date(isoDate()).getTime() - new Date(plan.weekStart).getTime()) / 86400000)
  const [day, setDay] = useState(todayIdx >= 0 && todayIdx < 7 ? todayIdx : 0)
  const [adding, setAdding] = useState<MealCategory | null>(null)
  const [editing, setEditing] = useState<PlannedMeal | null>(null)
  const [viewing, setViewing] = useState<string | null>(null)
  const ctx = safetyContext(profile)
  const meals = plan.meals.filter((m) => m.day === day)
  const totals = meals.reduce((a, m) => addMacros(a, plannedMacros(m) ?? ZERO), ZERO as Macros)
  const unsafe = plan.meals.filter((m) => m.recipeId && !adaptRecipe(RECIPE.get(m.recipeId)!, ctx).ok)
  const finalise = () => {
    useStore.setState((s) => ({ plans: s.plans.map((p) => (p.id === plan.id ? { ...p, finalisedAt: new Date().toISOString() } : p)), planning: null }))
    generateList({ ...plan })
    nav('/shop')
  }
  const viewed = viewing ? adaptRecipe(RECIPE.get(viewing)!, ctx) : null

  return (
    <div>
      <PageHeader title="Your week" sub={`${fmtDate(plan.weekStart)} – ${fmtDate(addDays(plan.weekStart, 6))}`} right={<Button size="sm" variant="ghost" onClick={onNewWeek}>Plan a week</Button>} />
      {plans.length > 1 && (
        <div className="no-scrollbar -mx-5 mb-4 flex gap-2 overflow-x-auto px-5" role="tablist" aria-label="Planned weeks">
          {[...plans].sort((a, b) => a.weekStart.localeCompare(b.weekStart)).map((p) => <Chip key={p.id} role="tab" aria-selected={p.id === plan.id} active={p.id === plan.id} onClick={() => onPick(p.id)}>{p.weekStart === weekStart() ? 'This week' : `w/c ${fmtDate(p.weekStart, { day: 'numeric', month: 'short' })}`}</Chip>)}
        </div>
      )}
      {unsafe.length > 0 && <div className="mb-4"><Notice tone="bad">{unsafe.length} planned meal{unsafe.length > 1 ? 's no longer fit' : ' no longer fits'} your updated allergies or diet. They’re left off your shopping list. Replace or remove them.</Notice></div>}
      <div role="tablist" aria-label="Day" className="mb-4 grid grid-cols-7 gap-1">
        {DAY_SHORT.map((d, i) => (
          <button key={d} role="tab" aria-selected={day === i} aria-label={DAY_NAMES[i]} onClick={() => setDay(i)}
            className={`rounded-2xl py-2 text-center ${day === i ? 'bg-primary text-on-primary' : 'bg-surface'}`}>
            <span className="block text-[12px] font-semibold">{d}</span>
            <span className="num block text-lg font-semibold display">{new Date(addDays(plan.weekStart, i) + 'T12:00').getDate()}</span>
          </button>
        ))}
      </div>
      {!hide && (
        <Card className="mb-4 p-4">
          <div className="flex items-baseline justify-between"><h3>{DAY_NAMES[day]} planned</h3><span className="text-[12px] text-muted">estimate</span></div>
          <p className="num mt-1 text-sm"><strong className="display text-lg">{Math.round(totals.kcal)}</strong> / {t.kcal} kcal · P {Math.round(totals.protein)}g · C {Math.round(totals.carbs)}g · F {Math.round(totals.fat)}g</p>
        </Card>
      )}
      <div className="space-y-3">
        {CATEGORIES.map((c) => {
          const slot = meals.filter((m) => m.category === c)
          return (
            <section key={c} className="card p-4" aria-label={CATEGORY_LABEL[c]}>
              <div className="mb-1 flex items-center justify-between"><h3>{CATEGORY_LABEL[c]}</h3><button className="inline-flex items-center gap-1 text-sm font-semibold text-primary" onClick={() => setAdding(c)}><Plus size={15} /> Add</button></div>
              {slot.length === 0 && <p className="py-1 text-sm text-muted">Nothing planned</p>}
              <ul className="divide-y divide-line">
                {slot.map((m) => {
                  const r = m.recipeId ? RECIPE.get(m.recipeId) : null
                  const mac = plannedMacros(m)
                  const bad = r && !adaptRecipe(r, ctx).ok
                  return (
                    <li key={m.id} className="flex items-center gap-3 py-2.5">
                      {r ? <button onClick={() => setViewing(r.id)} className="h-12 w-12 shrink-0 overflow-hidden rounded-xl" aria-label={`View ${r.name}`}><RecipeArt size="sm" art={r.art} hue={r.hue} label={r.name} /></button> : <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-surface-2"><Utensils size={18} aria-hidden /></span>}
                      <button className="flex-1 text-left" onClick={() => setEditing(m)}>
                        <span className={`block font-semibold leading-tight ${bad ? 'text-bad' : ''}`}>{r?.name ?? m.customName}</span>
                        <span className="text-[13px] text-muted">{m.servings} serving{m.servings === 1 ? '' : 's'}{m.leftoverOf && ' · leftovers'}{m.trial && ' · trial'}{!hide && mac && ` · ${Math.round(mac.kcal)} kcal`}{bad && ' · no longer suitable'}</span>
                      </button>
                      {m.eatenEntryId ? <span className="text-[13px] font-semibold text-good">Eaten</span> : !bad && <Button size="sm" variant="soft" onClick={() => logPlannedMeal(plan, m, m.servings)}>I ate this</Button>}
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>
      <div className="mt-6 space-y-3">
        <Button size="lg" className="w-full" onClick={finalise}>{plan.finalisedAt ? 'Update shopping list' : 'Finalise & make shopping list'}</Button>
        <p className="text-center text-[13px] text-muted">{plan.finalisedAt ? 'Updating makes a fresh list; the current one moves to your shopping history.' : 'You can keep editing your plan after this.'}</p>
      </div>

      <AddMeal plan={plan} day={day} category={adding} onClose={() => setAdding(null)} />
      <EditMeal plan={plan} meal={editing} onClose={() => setEditing(null)} onReplace={() => { const m = editing!; setEditing(null); setAdding(m.category); update(plan.id, (ms) => ms.filter((x) => x.id !== m.id)) }} />
      <Sheet open={!!viewed} onClose={() => setViewing(null)} title={viewing ? RECIPE.get(viewing)!.name : ''}>
        {viewed?.ok ? <><RecipeDetail a={viewed.adapted} /><div className="mt-6"><ReviewForm a={viewed.adapted} /></div></> : viewed && <Notice tone="bad">This recipe is no longer suitable: {viewed.reason}.</Notice>}
      </Sheet>
    </div>
  )
}

function AddMeal({ plan, day, category, onClose }: { plan: MealPlan; day: number; category: MealCategory | null; onClose: () => void }) {
  const profile = useStore((s) => s.profile)!
  const t = useTargets()!
  const b = useBehaviour()
  const favourites = useStore((s) => s.favourites)
  const update = useStore((s) => s.updatePlan)
  const [src, setSrc] = useState<'suggested' | 'favourites' | 'custom'>('suggested')
  const [name, setName] = useState('')
  const [kcal, setKcal] = useState(0); const [protein, setProtein] = useState(0); const [carbs, setCarbs] = useState(0); const [fat, setFat] = useState(0)
  const options = useMemo(() => (category ? scoreRecipes(category, profile, t, b) : []), [category, profile, t, b])
  const favOptions = useMemo(() => (category ? scoreRecipes('any', profile, t, b).filter((s) => favourites.includes(s.adapted.recipe.id)) : []), [category, profile, t, b, favourites])
  const inPlan = new Set(plan.meals.map((m) => m.recipeId))
  const add = (recipeId: string) => { update(plan.id, (ms) => [...ms, { id: uid(), day, category: category!, recipeId, servings: 1 }]); onClose() }
  const list = (src === 'favourites' ? favOptions : options).sort((a, z) => Number(inPlan.has(z.adapted.recipe.id)) - Number(inPlan.has(a.adapted.recipe.id)))
  return (
    <Sheet open={!!category} onClose={onClose} title={category ? `Add to ${CATEGORY_LABEL[category].toLowerCase()} · ${DAY_SHORT[day]}` : ''}>
      <div className="mb-4"><Segmented label="Source" value={src} onChange={setSrc} options={[{ id: 'suggested', label: 'Suggested' }, { id: 'favourites', label: 'Favourites' }, { id: 'custom', label: 'My own' }]} /></div>
      {src === 'custom' ? (
        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); update(plan.id, (ms) => [...ms, { id: uid(), day, category: category!, recipeId: null, customName: name, customMacros: { kcal, protein, carbs, fat, sugar: 0, fibre: 0 }, servings: 1 }]); onClose() }}>
          <Field label="Meal name"><input className="field" required value={name} onChange={(e) => setName(e.target.value)} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="kcal"><input className="field num" type="number" value={kcal || ''} onChange={(e) => setKcal(+e.target.value)} /></Field>
            <Field label="Protein (g)"><input className="field num" type="number" value={protein || ''} onChange={(e) => setProtein(+e.target.value)} /></Field>
            <Field label="Carbs (g)"><input className="field num" type="number" value={carbs || ''} onChange={(e) => setCarbs(+e.target.value)} /></Field>
            <Field label="Fat (g)"><input className="field num" type="number" value={fat || ''} onChange={(e) => setFat(+e.target.value)} /></Field>
          </div>
          <p className="text-[13px] text-muted">Your own meals aren't added to the shopping list. Add their ingredients to the list by hand.</p>
          <Button type="submit" className="w-full">Add meal</Button>
        </form>
      ) : list.length === 0 ? <p className="text-muted">{src === 'favourites' ? 'No favourites yet. Tap the heart on any recipe.' : 'No suitable recipes.'}</p> : (
        <ul className="space-y-1">
          {list.map((s) => (
            <li key={s.adapted.recipe.id}>
              <button className="flex w-full items-center gap-3 rounded-2xl p-2 text-left hover:bg-surface" onClick={() => add(s.adapted.recipe.id)}>
                <span className="h-12 w-12 shrink-0 overflow-hidden rounded-xl"><RecipeArt size="sm" art={s.adapted.recipe.art} hue={s.adapted.recipe.hue} label={s.adapted.recipe.name} /></span>
                <span className="flex-1"><span className="block font-semibold">{s.adapted.recipe.name}</span><span className="text-[13px] text-muted">{inPlan.has(s.adapted.recipe.id) ? 'Already in your week · ' : ''}{Math.round(s.adapted.perServing.kcal)} kcal · {s.adapted.recipe.prep + s.adapted.recipe.cook} min</span></span>
                <Plus size={18} className="text-primary" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Sheet>
  )
}

function EditMeal({ plan, meal, onClose, onReplace }: { plan: MealPlan; meal: PlannedMeal | null; onClose: () => void; onReplace: () => void }) {
  const update = useStore((s) => s.updatePlan)
  const [leftDay, setLeftDay] = useState(1)
  const [leftCat, setLeftCat] = useState<MealCategory>('lunch')
  if (!meal) return <Sheet open={false} onClose={onClose} title="">{null}</Sheet>
  const r = meal.recipeId ? RECIPE.get(meal.recipeId) : null
  const patch = (p: Partial<PlannedMeal>) => update(plan.id, (ms) => ms.map((m) => (m.id === meal.id ? { ...m, ...p } : m)))
  const cur = plan.meals.find((m) => m.id === meal.id) ?? meal
  const leftovers = plan.meals.filter((m) => m.leftoverOf === meal.id)
  return (
    <Sheet open onClose={onClose} title={r?.name ?? meal.customName ?? 'Meal'}>
      <div className="space-y-5">
        <div className="flex items-center justify-between"><span className="font-semibold">Servings</span><Stepper label="servings" value={cur.servings} min={0.5} max={12} step={0.5} onChange={(n) => patch({ servings: n })} /></div>
        <Field label="Move to">
          <div className="flex flex-wrap gap-1.5">{DAY_SHORT.map((d, i) => <Chip key={d} active={cur.day === i} onClick={() => patch({ day: i })}>{d}</Chip>)}</div>
        </Field>
        <Field label="Slot">
          <div className="flex flex-wrap gap-1.5">{CATEGORIES.map((c) => <Chip key={c} active={cur.category === c} onClick={() => patch({ category: c })}>{CATEGORY_LABEL[c]}</Chip>)}</div>
        </Field>
        {r && !meal.leftoverOf && (
          <div className="rounded-2xl bg-surface p-4">
            <h3 className="mb-1">Cook extra for leftovers</h3>
            <p className="mb-3 text-sm text-muted">Adds a portion on another day without adding ingredients twice. You’ll cook it once, scaled up.</p>
            {leftovers.length > 0 && <p className="mb-2 text-sm">Leftovers planned: {leftovers.map((l) => `${DAY_SHORT[l.day]} ${CATEGORY_LABEL[l.category].toLowerCase()}`).join(', ')}</p>}
            <div className="mb-3 flex flex-wrap gap-1.5">{DAY_SHORT.map((d, i) => <Chip key={d} active={leftDay === i} onClick={() => setLeftDay(i)}>{d}</Chip>)}</div>
            <div className="mb-3 flex flex-wrap gap-1.5">{CATEGORIES.map((c) => <Chip key={c} active={leftCat === c} onClick={() => setLeftCat(c)}>{CATEGORY_LABEL[c]}</Chip>)}</div>
            <Button size="sm" variant="soft" onClick={() => { update(plan.id, (ms) => [...ms, { id: uid(), day: leftDay, category: leftCat, recipeId: meal.recipeId, servings: cur.servings, leftoverOf: meal.id }]); onClose() }}><Repeat2 size={14} /> Add leftovers</Button>
          </div>
        )}
        {r && (
          <Button variant="ghost" size="sm" onClick={() => { update(plan.id, (ms) => [...ms, { ...cur, id: uid(), day: (cur.day + 1) % 7, eatenEntryId: undefined }]); onClose() }}><MoveRight size={14} /> Repeat on {DAY_SHORT[(cur.day + 1) % 7]}</Button>
        )}
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => { update(plan.id, (ms) => ms.filter((m) => m.id !== meal.id && m.leftoverOf !== meal.id)); onClose() }}><Trash2 size={16} /> Remove</Button>
          <Button className="flex-1" variant="soft" onClick={onReplace}><Shuffle size={16} /> Replace</Button>
        </div>
      </div>
    </Sheet>
  )
}
