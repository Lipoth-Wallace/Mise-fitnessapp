import { useCallback, useEffect, useMemo, useState } from 'react'
import { Search, ScanBarcode, ChefHat, PencilLine } from 'lucide-react'
import { useStore } from '../store'
import type { DiaryEntry, Macros } from '../types'
import { Button, Field, Notice, Segmented, Sheet, Stepper } from './ui'
import { loadFoods, searchFoods, rowMacros, lookupBarcode, type FoodRow, type Product } from '../lib/foods'
import { BarcodeScanner } from './BarcodeScanner'
import { RECIPES } from '../lib/catalog'
import { adaptRecipe } from '../lib/safety'
import { useSafety, useCurrentPlan } from '../hooks'
import { roundMacros, scaleMacros } from '../lib/nutrition'
import { RecipeArt } from './recipe'
import { dayIndex } from '../lib/util'

type Meal = DiaryEntry['meal']
const MEALS: { id: Meal; label: string }[] = [{ id: 'breakfast', label: 'Breakfast' }, { id: 'lunch', label: 'Lunch' }, { id: 'dinner', label: 'Dinner' }, { id: 'snack', label: 'Snacks' }]

export function AddFoodSheet({ open, onClose, date, meal: initialMeal }: { open: boolean; onClose: () => void; date: string; meal: Meal }) {
  const [tab, setTab] = useState<'search' | 'scan' | 'recipe' | 'manual'>('search')
  const [meal, setMeal] = useState<Meal>(initialMeal)
  useEffect(() => { if (open) setMeal(initialMeal) }, [open, initialMeal])
  const add = useStore((s) => s.addDiary)
  const done = (e: Omit<DiaryEntry, 'id' | 'createdAt' | 'date' | 'meal'>) => { add({ ...e, date, meal, macros: roundMacros(e.macros) }); onClose() }
  return (
    <Sheet open={open} onClose={onClose} title="Add food">
      <div className="mb-4 space-y-3">
        <Segmented label="Meal" value={meal} onChange={setMeal} options={MEALS} />
        <Segmented label="Add by" value={tab} onChange={setTab} options={[
          { id: 'search', label: <span className="inline-flex items-center gap-1"><Search size={14} /> Search</span> },
          { id: 'scan', label: <span className="inline-flex items-center gap-1"><ScanBarcode size={14} /> Scan</span> },
          { id: 'recipe', label: <span className="inline-flex items-center gap-1"><ChefHat size={14} /> Recipe</span> },
          { id: 'manual', label: <span className="inline-flex items-center gap-1"><PencilLine size={14} /> Manual</span> },
        ]} />
      </div>
      {tab === 'search' && <FoodSearch onAdd={done} />}
      {tab === 'scan' && <Scan onAdd={done} onManual={() => setTab('manual')} />}
      {tab === 'recipe' && <RecipePick date={date} onAdd={done} />}
      {tab === 'manual' && <Manual onAdd={done} />}
    </Sheet>
  )
}

type AddFn = (e: Omit<DiaryEntry, 'id' | 'createdAt' | 'date' | 'meal'>) => void

function FoodSearch({ onAdd }: { onAdd: AddFn }) {
  const [rows, setRows] = useState<FoodRow[] | null>(null)
  const [err, setErr] = useState('')
  const [q, setQ] = useState('')
  const [sel, setSel] = useState<FoodRow | null>(null)
  const [grams, setGrams] = useState(100)
  useEffect(() => { loadFoods().then(setRows).catch((e) => setErr(e.message)) }, [])
  const results = useMemo(() => (rows ? searchFoods(rows, q) : []), [rows, q])
  if (sel) {
    const m = rowMacros(sel, grams)
    return (
      <div className="space-y-4">
        <p className="font-semibold">{sel[0]}</p>
        <Field label="Amount (g)"><input className="field num" type="number" inputMode="decimal" value={grams} onChange={(e) => setGrams(Number(e.target.value))} /></Field>
        <p className="num text-muted">{Math.round(m.kcal)} kcal · P {m.protein.toFixed(1)}g · C {m.carbs.toFixed(1)}g · F {m.fat.toFixed(1)}g · sugar {m.sugar.toFixed(1)}g</p>
        <div className="flex gap-3"><Button variant="ghost" onClick={() => setSel(null)}>Back</Button><Button className="flex-1" disabled={!grams} onClick={() => onAdd({ name: sel[0], detail: `${grams} g · USDA`, source: 'food', macros: m })}>Add to diary</Button></div>
      </div>
    )
  }
  return (
    <div>
      <input className="field" autoFocus placeholder="Search foods, e.g. banana raw" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search foods" />
      {err && <div className="mt-3"><Notice tone="bad">{err}. Check your connection the first time you search; it works offline after that.</Notice></div>}
      {!rows && !err && <p className="mt-4 text-sm text-muted">Loading the food database…</p>}
      <ul className="mt-2 divide-y divide-line">
        {results.map((r) => (
          <li key={r[0]}><button className="flex w-full justify-between gap-3 py-3 text-left" onClick={() => setSel(r)}><span>{r[0]}</span><span className="num shrink-0 text-sm text-muted">{Math.round(r[1])} kcal/100g</span></button></li>
        ))}
      </ul>
      {rows && q && !results.length && <p className="mt-4 text-sm text-muted">Nothing found. Try fewer words, or add it manually.</p>}
      <p className="mt-4 text-[12px] text-muted">Generic foods from USDA FoodData Central (SR Legacy). Carbohydrates shown excluding fibre, as on UK labels.</p>
    </div>
  )
}

function Scan({ onAdd, onManual }: { onAdd: AddFn; onManual: () => void }) {
  const [code, setCode] = useState('')
  const [state, setState] = useState<'scan' | 'loading' | 'found' | 'missing' | 'error'>('scan')
  const [p, setP] = useState<Product | null>(null)
  const [grams, setGrams] = useState(100)
  const [msg, setMsg] = useState('')
  const look = useCallback(async (c: string) => {
    setCode(c); setState('loading')
    try {
      const r = await lookupBarcode(c)
      if (!r) { setState('missing'); return }
      setP(r); setGrams(r.servingG ?? 100); setState('found')
    } catch (e) { setMsg(e instanceof Error ? e.message : 'Lookup failed'); setState('error') }
  }, [])
  if (state === 'found' && p) {
    const m = scaleMacros(p.per100, grams / 100)
    return (
      <div className="space-y-4">
        <div><p className="font-semibold">{p.name}</p><p className="text-sm text-muted">{p.brand}{p.servingLabel && ` · serving ${p.servingLabel}`}</p></div>
        {!p.complete && <Notice tone="warn">Open Food Facts doesn't have full nutrition for this product. Missing values show as 0. Check the pack.</Notice>}
        <Field label="How much did you have? (g or ml)"><input className="field num" type="number" inputMode="decimal" value={grams} onChange={(e) => setGrams(Number(e.target.value))} /></Field>
        <p className="num text-muted">{Math.round(m.kcal)} kcal · P {m.protein.toFixed(1)}g · C {m.carbs.toFixed(1)}g · F {m.fat.toFixed(1)}g · sugar {m.sugar.toFixed(1)}g</p>
        <div className="flex gap-3"><Button variant="ghost" onClick={() => setState('scan')}>Scan again</Button><Button className="flex-1" onClick={() => onAdd({ name: p.name, detail: `${p.brand ? p.brand + ' · ' : ''}${grams} g · Open Food Facts`, source: 'barcode', macros: m })}>Add to diary</Button></div>
      </div>
    )
  }
  return (
    <div className="space-y-4">
      {state === 'scan' && <BarcodeScanner onCode={look} />}
      {state === 'loading' && <p className="py-6 text-center text-muted">Looking up {code}…</p>}
      {state === 'missing' && <Notice>No product found for barcode {code}. You can add it manually with the values from the pack.</Notice>}
      {state === 'error' && <Notice tone="bad">Couldn't reach Open Food Facts ({msg}). Check your connection or add it manually.</Notice>}
      <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (code.trim()) look(code.trim()) }}>
        <input className="field num" inputMode="numeric" placeholder="Or type the barcode" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} aria-label="Barcode number" />
        <Button type="submit" variant="soft">Look up</Button>
      </form>
      {(state === 'missing' || state === 'error') && <Button variant="ghost" className="w-full" onClick={onManual}>Enter manually</Button>}
      <p className="text-[12px] text-muted">Product data from Open Food Facts (ODbL), a free community database. Coverage of UK products is good but not complete.</p>
    </div>
  )
}

function RecipePick({ date, onAdd }: { date: string; onAdd: AddFn }) {
  const ctx = useSafety()
  const plan = useCurrentPlan()
  const [portion, setPortion] = useState(1)
  const [sel, setSel] = useState<string | null>(null)
  const safe = useMemo(() => (ctx ? RECIPES.map((r) => adaptRecipe(r, ctx)).flatMap((r) => (r.ok ? [r.adapted] : [])) : []), [ctx])
  const planned = plan ? new Set(plan.meals.filter((m) => m.day === dayIndex(date) && m.recipeId).map((m) => m.recipeId!)) : new Set<string>()
  const sorted = [...safe].sort((a, b) => Number(planned.has(b.recipe.id)) - Number(planned.has(a.recipe.id)))
  const chosen = safe.find((a) => a.recipe.id === sel)
  if (chosen) {
    const m = scaleMacros(chosen.perServing, portion)
    return (
      <div className="space-y-4">
        <p className="font-semibold">{chosen.recipe.name}</p>
        <div className="flex items-center justify-between"><span>Servings eaten</span><Stepper label="servings" value={portion} min={0.25} max={6} step={0.25} onChange={setPortion} /></div>
        <p className="num text-muted">{Math.round(m.kcal)} kcal · P {m.protein.toFixed(0)}g · C {m.carbs.toFixed(0)}g · F {m.fat.toFixed(0)}g</p>
        <p className="text-[13px] text-muted">To log a meal from your plan and mark it eaten, use the plan's "I ate this" button so it isn't counted twice.</p>
        <div className="flex gap-3"><Button variant="ghost" onClick={() => setSel(null)}>Back</Button><Button className="flex-1" onClick={() => onAdd({ name: chosen.recipe.name, detail: `${portion} serving${portion === 1 ? '' : 's'} · recipe estimate`, source: 'recipe', recipeId: chosen.recipe.id, macros: m })}>Add to diary</Button></div>
      </div>
    )
  }
  return (
    <ul className="space-y-2">
      {sorted.map((a) => (
        <li key={a.recipe.id}>
          <button className="flex w-full items-center gap-3 rounded-2xl p-2 text-left hover:bg-surface" onClick={() => setSel(a.recipe.id)}>
            <span className="h-12 w-12 shrink-0 overflow-hidden rounded-xl"><RecipeArt size="sm" art={a.recipe.art} hue={a.recipe.hue} label={a.recipe.name} /></span>
            <span className="flex-1"><span className="block font-semibold">{a.recipe.name}</span><span className="text-sm text-muted">{planned.has(a.recipe.id) ? 'Planned today · ' : ''}{Math.round(a.perServing.kcal)} kcal per serving</span></span>
          </button>
        </li>
      ))}
    </ul>
  )
}

function Manual({ onAdd }: { onAdd: AddFn }) {
  const [name, setName] = useState('')
  const [m, setM] = useState<Macros>({ kcal: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fibre: 0 })
  const f = (k: keyof Macros, label: string) => (
    <Field label={label}><input className="field num" type="number" inputMode="decimal" min={0} value={m[k] || ''} onChange={(e) => setM({ ...m, [k]: Number(e.target.value) })} /></Field>
  )
  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); onAdd({ name: name.trim(), detail: 'Manual entry', source: 'manual', macros: m }) }}>
      <Field label="Food or meal"><input className="field" required value={name} onChange={(e) => setName(e.target.value)} /></Field>
      <div className="grid grid-cols-2 gap-3">{f('kcal', 'Calories (kcal)')}{f('protein', 'Protein (g)')}{f('carbs', 'Carbs (g)')}{f('fat', 'Fat (g)')}{f('sugar', 'of which sugar (g)')}{f('fibre', 'Fibre (g)')}</div>
      <Button type="submit" className="w-full" disabled={!name.trim()}>Add to diary</Button>
    </form>
  )
}
