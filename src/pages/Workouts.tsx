import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useStore } from '../store'
import { Button, Card, Empty, Field, PageHeader, Segmented, Sheet } from '../components/ui'
import type { Workout } from '../types'
import { DAY_SHORT, fmtDate, isoDate, uid } from '../lib/util'

const blank = (): Workout => ({ id: uid(), date: isoDate(), name: '', durationMin: 45, notes: '', exercises: [{ name: '', sets: [{ reps: 8, kg: 20 }] }] })

export default function Workouts() {
  const [tab, setTab] = useState<'log' | 'progress' | 'schedule'>('log')
  const workouts = useStore((s) => s.workouts)
  const routines = useStore((s) => s.routines)
  const [editing, setEditing] = useState<Workout | null>(null)
  const sorted = [...workouts].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <div>
      <Link to="/more" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"><ArrowLeft size={16} /> More</Link>
      <PageHeader title="Workouts" right={<Button size="sm" onClick={() => setEditing(blank())}><Plus size={14} /> Log</Button>} />
      <div className="mb-4"><Segmented label="Workout section" value={tab} onChange={setTab} options={[{ id: 'log', label: 'Sessions' }, { id: 'progress', label: 'Progress' }, { id: 'schedule', label: 'Schedule' }]} /></div>
      {tab === 'log' && (
        <>
          {routines.length > 0 && (
            <div className="mb-4"><h3 className="mb-2">Start from a routine</h3>
              <div className="flex flex-wrap gap-2">{routines.map((r) => <Button key={r.id} size="sm" variant="soft" onClick={() => setEditing({ ...blank(), name: r.name, exercises: r.exercises.map((name) => ({ name, sets: [lastSet(workouts, name)] })) })}>{r.name}</Button>)}</div>
            </div>
          )}
          {sorted.length === 0 ? <Empty title="No workouts logged" body="Log sets, reps and weight to see progress for each exercise. This section is optional; turn it off in Settings." action={<Button size="sm" onClick={() => setEditing(blank())}>Log a workout</Button>} /> : (
            <ul className="space-y-3">
              {sorted.map((w) => (
                <li key={w.id}><button className="card w-full p-4 text-left" onClick={() => setEditing(w)}>
                  <div className="flex justify-between"><span className="font-semibold">{w.name || 'Workout'}</span><span className="text-sm text-muted">{fmtDate(w.date)}</span></div>
                  <p className="text-[13px] text-muted">{w.durationMin} min · {w.exercises.filter((e) => e.name).map((e) => `${e.name} ${e.sets.length}×`).join(', ')}</p>
                </button></li>
              ))}
            </ul>
          )}
        </>
      )}
      {tab === 'progress' && <Progress workouts={workouts} />}
      {tab === 'schedule' && <Schedule />}
      <Editor w={editing} onClose={() => setEditing(null)} />
    </div>
  )
}

function lastSet(ws: Workout[], name: string) {
  const prev = [...ws].sort((a, b) => b.date.localeCompare(a.date)).flatMap((w) => w.exercises).find((e) => e.name.toLowerCase() === name.toLowerCase())
  return prev?.sets.at(-1) ?? { reps: 8, kg: 20 }
}

function Editor({ w, onClose }: { w: Workout | null; onClose: () => void }) {
  const [d, setD] = useState<Workout | null>(null)
  const exists = useStore((s) => (w ? s.workouts.some((x) => x.id === w.id) : false))
  if (w && d?.id !== w.id) setD(structuredClone(w))
  if (!w || !d) return <Sheet open={false} onClose={onClose} title="">{null}</Sheet>
  const names = [...new Set(useStore.getState().workouts.flatMap((x) => x.exercises.map((e) => e.name)).filter(Boolean))]
  const save = () => { const clean = { ...d, exercises: d.exercises.filter((e) => e.name.trim()) }; useStore.setState((s) => ({ workouts: exists ? s.workouts.map((x) => (x.id === d.id ? clean : x)) : [...s.workouts, clean] })); onClose() }
  const ex = (i: number, patch: Partial<Workout['exercises'][number]>) => setD({ ...d, exercises: d.exercises.map((e, j) => (j === i ? { ...e, ...patch } : e)) })
  return (
    <Sheet open onClose={onClose} title={exists ? 'Edit workout' : 'Log workout'}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Name"><input className="field" placeholder="e.g. Push day" value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} /></Field>
          <Field label="Date"><input className="field" type="date" value={d.date} onChange={(e) => setD({ ...d, date: e.target.value })} /></Field>
        </div>
        <Field label="Duration (min)"><input className="field num" type="number" value={d.durationMin} onChange={(e) => setD({ ...d, durationMin: Number(e.target.value) })} /></Field>
        <datalist id="ex-names">{names.map((n) => <option key={n} value={n} />)}</datalist>
        {d.exercises.map((e, i) => (
          <div key={i} className="rounded-2xl bg-surface p-3">
            <div className="mb-2 flex gap-2"><input className="field py-2 font-semibold" list="ex-names" placeholder="Exercise" aria-label="Exercise name" value={e.name} onChange={(ev) => ex(i, { name: ev.target.value })} />
              <button aria-label="Remove exercise" className="px-2 text-muted" onClick={() => setD({ ...d, exercises: d.exercises.filter((_, j) => j !== i) })}><Trash2 size={16} /></button></div>
            <table className="w-full text-sm"><thead><tr className="text-muted"><th className="w-10 text-left font-medium">Set</th><th className="font-medium">Reps</th><th className="font-medium">kg</th><th /></tr></thead>
              <tbody>{e.sets.map((s, k) => (
                <tr key={k}><td className="num">{k + 1}</td>
                  <td><input className="field num py-1.5 text-center" type="number" aria-label={`Set ${k + 1} reps`} value={s.reps} onChange={(ev) => ex(i, { sets: e.sets.map((x, m) => (m === k ? { ...x, reps: Number(ev.target.value) } : x)) })} /></td>
                  <td><input className="field num py-1.5 text-center" type="number" step="0.5" aria-label={`Set ${k + 1} weight`} value={s.kg} onChange={(ev) => ex(i, { sets: e.sets.map((x, m) => (m === k ? { ...x, kg: Number(ev.target.value) } : x)) })} /></td>
                  <td><button aria-label={`Remove set ${k + 1}`} className="px-2 text-muted" onClick={() => ex(i, { sets: e.sets.filter((_, m) => m !== k) })}><Trash2 size={14} /></button></td></tr>
              ))}</tbody></table>
            <button className="mt-2 text-sm font-semibold text-primary" onClick={() => ex(i, { sets: [...e.sets, { ...(e.sets.at(-1) ?? { reps: 8, kg: 20 }) }] })}>+ Add set</button>
          </div>
        ))}
        <Button variant="soft" size="sm" onClick={() => setD({ ...d, exercises: [...d.exercises, { name: '', sets: [{ reps: 8, kg: 20 }] }] })}><Plus size={14} /> Exercise</Button>
        <Field label="Notes"><textarea className="field" rows={2} value={d.notes} onChange={(e) => setD({ ...d, notes: e.target.value })} /></Field>
        <div className="flex flex-wrap gap-3">
          {exists && <Button variant="ghost" onClick={() => { useStore.setState((s) => ({ workouts: s.workouts.filter((x) => x.id !== d.id) })); onClose() }}><Trash2 size={16} /> Delete</Button>}
          <Button variant="ghost" disabled={!d.name.trim()} onClick={() => useStore.setState((s) => ({ routines: [...s.routines.filter((r) => r.name !== d.name), { id: uid(), name: d.name, exercises: d.exercises.map((e) => e.name).filter(Boolean) }] }))}><Save size={16} /> Save as routine</Button>
          <Button className="flex-1" onClick={save}>Save workout</Button>
        </div>
      </div>
    </Sheet>
  )
}

function Progress({ workouts }: { workouts: Workout[] }) {
  const names = useMemo(() => [...new Set(workouts.flatMap((w) => w.exercises.map((e) => e.name)).filter(Boolean))].sort(), [workouts])
  const [sel, setSel] = useState(names[0] ?? '')
  const data = workouts.filter((w) => w.exercises.some((e) => e.name === sel)).sort((a, b) => a.date.localeCompare(b.date)).map((w) => {
    const sets = w.exercises.filter((e) => e.name === sel).flatMap((e) => e.sets)
    const top = Math.max(...sets.map((s) => s.kg))
    const e1rm = Math.max(...sets.map((s) => s.kg * (1 + s.reps / 30))) // Epley estimate
    return { label: fmtDate(w.date, { day: 'numeric', month: 'short' }), top, e1rm: Math.round(e1rm * 10) / 10, volume: sets.reduce((s, x) => s + x.kg * x.reps, 0) }
  })
  if (!names.length) return <Empty title="No exercises yet" body="Log a workout to see progress graphs for each exercise." />
  return (
    <Card>
      <Field label="Exercise"><select className="field" value={sel} onChange={(e) => setSel(e.target.value)}>{names.map((n) => <option key={n}>{n}</option>)}</select></Field>
      <div className="mt-4 h-52" role="img" aria-label={`Progress for ${sel}`}>
        <ResponsiveContainer><LineChart data={data} margin={{ left: -18, right: 8 }}>
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--muted)' }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--line)', background: 'var(--bg)' }} formatter={(v, n) => [`${v} kg`, n === 'top' ? 'Heaviest set' : 'Estimated 1-rep max']} />
          <Line dataKey="top" stroke="var(--primary)" strokeWidth={3} dot={{ r: 3 }} /><Line dataKey="e1rm" stroke="var(--accent)" strokeWidth={2} strokeDasharray="5 4" dot={false} />
        </LineChart></ResponsiveContainer>
      </div>
      <p className="mt-2 text-[12px] text-muted">Solid: heaviest set. Dashed: estimated one-rep max (Epley formula).</p>
    </Card>
  )
}

function Schedule() {
  const routines = useStore((s) => s.routines)
  const schedule = useStore((s) => s.schedule)
  if (!routines.length) return <Empty title="No routines yet" body="Log a workout and tap “Save as routine”, then assign routines to days here." />
  return (
    <Card>
      <h2 className="mb-3">Weekly training plan</h2>
      <ul className="divide-y divide-line">
        {DAY_SHORT.map((d, i) => (
          <li key={d} className="flex items-center justify-between gap-3 py-2.5"><span className="w-12 font-semibold">{d}</span>
            <select className="field py-2" aria-label={`Routine for ${d}`} value={schedule[i] ?? ''} onChange={(e) => useStore.setState((s) => ({ schedule: { ...s.schedule, [i]: e.target.value || null } }))}>
              <option value="">Rest</option>{routines.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select></li>
        ))}
      </ul>
    </Card>
  )
}
