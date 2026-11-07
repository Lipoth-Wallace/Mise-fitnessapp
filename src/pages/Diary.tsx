import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react'
import { useStore } from '../store'
import { useDayTotals, useTargets } from '../hooks'
import { Button, Field, PageHeader, Sheet } from '../components/ui'
import { AddFoodSheet } from '../components/AddFood'
import { addDays, fmtDate, isoDate } from '../lib/util'
import type { DiaryEntry, Macros } from '../types'

const MEALS: { id: DiaryEntry['meal']; label: string }[] = [{ id: 'breakfast', label: 'Breakfast' }, { id: 'lunch', label: 'Lunch' }, { id: 'dinner', label: 'Dinner' }, { id: 'snack', label: 'Snacks & desserts' }]

export default function Diary() {
  const [date, setDate] = useState(isoDate())
  const [adding, setAdding] = useState<DiaryEntry['meal'] | null>(null)
  const [editing, setEditing] = useState<DiaryEntry | null>(null)
  const diary = useStore((s) => s.diary)
  const totals = useDayTotals(date)
  const t = useTargets()!
  const hide = useStore((s) => s.settings.hideNumbers)
  const entries = diary.filter((d) => d.date === date)
  return (
    <div>
      <PageHeader title="Food diary" sub="What you actually ate" />
      <div className="mb-4 flex items-center justify-between rounded-full bg-surface p-1">
        <button aria-label="Previous day" className="grid h-10 w-10 place-items-center rounded-full" onClick={() => setDate(addDays(date, -1))}><ChevronLeft size={20} /></button>
        <span className="font-semibold">{date === isoDate() ? 'Today' : fmtDate(date)}</span>
        <button aria-label="Next day" className="grid h-10 w-10 place-items-center rounded-full disabled:opacity-30" disabled={date >= isoDate()} onClick={() => setDate(addDays(date, 1))}><ChevronRight size={20} /></button>
      </div>
      {!hide && (
        <div className="card mb-5 grid grid-cols-4 gap-2 p-4 text-center">
          {[['kcal', totals.kcal, t.kcal], ['Protein', totals.protein, t.protein], ['Carbs', totals.carbs, t.carbs], ['Fat', totals.fat, t.fat]].map(([k, v, g]) => (
            <div key={k as string}><p className="num display text-lg font-semibold">{Math.round(v as number)}</p><p className="text-[12px] text-muted">{k} / {g}</p></div>
          ))}
        </div>
      )}
      <div className="space-y-4">
        {MEALS.map((m) => {
          const list = entries.filter((e) => e.meal === m.id)
          const kcal = list.reduce((s, e) => s + e.macros.kcal, 0)
          return (
            <section key={m.id} className="card p-4" aria-label={m.label}>
              <div className="mb-1 flex items-center justify-between">
                <h2 className="text-lg">{m.label}</h2>
                <span className="num text-sm text-muted">{!hide && list.length > 0 && `${Math.round(kcal)} kcal`}</span>
              </div>
              <ul className="divide-y divide-line">
                {list.map((e) => (
                  <li key={e.id}>
                    <button className="flex w-full items-center justify-between gap-3 py-2.5 text-left" onClick={() => setEditing(e)}>
                      <span><span className="block font-medium">{e.name}</span><span className="text-[13px] text-muted">{e.detail}</span></span>
                      {!hide && <span className="num shrink-0 text-sm">{Math.round(e.macros.kcal)}</span>}
                    </button>
                  </li>
                ))}
              </ul>
              <button className="mt-1 inline-flex items-center gap-1 py-2 text-sm font-semibold text-primary" onClick={() => setAdding(m.id)}><Plus size={16} /> Add food</button>
            </section>
          )
        })}
      </div>
      <AddFoodSheet open={!!adding} onClose={() => setAdding(null)} date={date} meal={adding ?? 'breakfast'} />
      <EditEntry entry={editing} onClose={() => setEditing(null)} />
    </div>
  )
}

function EditEntry({ entry, onClose }: { entry: DiaryEntry | null; onClose: () => void }) {
  const update = useStore((s) => s.updateDiary)
  const remove = useStore((s) => s.removeDiary)
  const [scale, setScale] = useState(1)
  const [name, setName] = useState('')
  const [meal, setMeal] = useState<DiaryEntry['meal']>('breakfast')
  const [lastId, setLastId] = useState<string | null>(null)
  if (entry && entry.id !== lastId) { setLastId(entry.id); setScale(1); setName(entry.name); setMeal(entry.meal) }
  if (!entry) return <Sheet open={false} onClose={onClose} title="">{null}</Sheet>
  const m: Macros = Object.fromEntries(Object.entries(entry.macros).map(([k, v]) => [k, Math.round(v * scale * 10) / 10])) as unknown as Macros
  return (
    <Sheet open={!!entry} onClose={onClose} title="Edit entry">
      <div className="space-y-4">
        <Field label="Name"><input className="field" value={name} onChange={(e) => setName(e.target.value)} /></Field>
        <Field label="Meal">
          <select className="field" value={meal} onChange={(e) => setMeal(e.target.value as DiaryEntry['meal'])}>{MEALS.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}</select>
        </Field>
        <Field label="Portion" hint={entry.detail}>
          <div className="flex flex-wrap gap-2">{[0.5, 0.75, 1, 1.25, 1.5, 2].map((f) => <button key={f} onClick={() => setScale(f)} className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${scale === f ? 'border-primary bg-primary text-on-primary' : 'border-line'}`}>×{f}</button>)}</div>
        </Field>
        <p className="num text-muted">{Math.round(m.kcal)} kcal · P {m.protein}g · C {m.carbs}g · F {m.fat}g · sugar {m.sugar}g</p>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => { remove(entry.id); onClose() }} aria-label="Delete entry"><Trash2 size={16} /> Delete</Button>
          <Button className="flex-1" onClick={() => { update(entry.id, { name, meal, macros: m, detail: scale === 1 ? entry.detail : `${entry.detail} ×${scale}` }); onClose() }}>Save changes</Button>
        </div>
      </div>
    </Sheet>
  )
}
