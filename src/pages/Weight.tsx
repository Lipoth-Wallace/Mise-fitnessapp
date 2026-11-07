import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Camera, Trash2, Lock, Columns2 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from 'recharts'
import { set as idbSet, get as idbGet, del as idbDel } from 'idb-keyval'
import { useStore } from '../store'
import { Button, Card, Field, PageHeader, Segmented, Sheet, Empty } from '../components/ui'
import { fmtWeight, kgToLb, lbToKg, movingAverage } from '../lib/nutrition'
import { addDays, fmtDate, isoDate, uid } from '../lib/util'

export default function Weight() {
  const weights = useStore((s) => s.weights)
  const profile = useStore((s) => s.profile)!
  const u = profile.units.weight
  const [range, setRange] = useState<'week' | 'month' | 'all'>('month')
  const [val, setVal] = useState('')
  const [date, setDate] = useState(isoDate())
  const [edit, setEdit] = useState<{ id: string; date: string; kg: number } | null>(null)
  const sorted = useMemo(() => [...weights].sort((a, b) => a.date.localeCompare(b.date)), [weights])
  const ma = movingAverage(sorted)
  const from = range === 'week' ? addDays(isoDate(), -6) : range === 'month' ? addDays(isoDate(), -29) : '0000'
  const conv = (kg: number) => +(u === 'kg' ? kg : kgToLb(kg)).toFixed(1)
  const data = ma.filter((p) => p.date >= from).map((p) => ({ date: p.date, label: fmtDate(p.date, { day: 'numeric', month: 'short' }), weight: conv(p.kg), avg: conv(p.avg) }))
  const change = sorted.length > 1 ? sorted.at(-1)!.kg - sorted[0].kg : 0
  const add = (e: React.FormEvent) => {
    e.preventDefault()
    const kg = u === 'kg' ? Number(val) : lbToKg(Number(val))
    if (!kg) return
    useStore.setState((s) => ({ weights: [...s.weights, { id: uid(), date, kg }] }))
    useStore.getState().updateProfile({ weightKg: date >= (sorted.at(-1)?.date ?? '') ? kg : profile.weightKg })
    setVal('')
  }
  return (
    <div>
      <Link to="/more" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"><ArrowLeft size={16} /> More</Link>
      <PageHeader title="Weight" />
      <Card className="mb-4">
        <form onSubmit={add} className="flex items-end gap-2">
          <div className="flex-1"><Field label={`Weight (${u})`}><input className="field num" type="number" step="0.1" inputMode="decimal" value={val} onChange={(e) => setVal(e.target.value)} /></Field></div>
          <div className="w-36"><Field label="Date"><input className="field" type="date" max={isoDate()} value={date} onChange={(e) => setDate(e.target.value)} /></Field></div>
          <Button type="submit" disabled={!val}>Log</Button>
        </form>
      </Card>
      <Card className="mb-4">
        <dl className="mb-4 grid grid-cols-3 gap-3">
          <div><dt className="text-[13px] text-muted">Current</dt><dd className="num display text-lg font-semibold">{sorted.length ? fmtWeight(sorted.at(-1)!.kg, u) : '—'}</dd></div>
          <div><dt className="text-[13px] text-muted">Change</dt><dd className="num display text-lg font-semibold">{sorted.length > 1 ? `${change > 0 ? '+' : change < 0 ? '−' : ''}${fmtWeight(Math.abs(change), u)}` : '—'}</dd></div>
          <div><dt className="text-[13px] text-muted">Target</dt><dd className="num display text-lg font-semibold">{profile.targetWeightKg ? fmtWeight(profile.targetWeightKg, u) : '—'}</dd></div>
        </dl>
        <Segmented label="Range" value={range} onChange={setRange} options={[{ id: 'week', label: 'Week' }, { id: 'month', label: 'Month' }, { id: 'all', label: 'All' }]} />
        <div className="mt-4 h-56" role="img" aria-label={`Weight history with 7-day average, ${range}`}>
          {data.length ? (
            <ResponsiveContainer>
              <LineChart data={data} margin={{ left: -18, right: 8, top: 8 }}>
                <CartesianGrid stroke="var(--line)" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--muted)' }} axisLine={false} tickLine={false} minTickGap={20} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fontSize: 11, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--line)', background: 'var(--bg)', color: 'var(--ink)' }} formatter={(v, n) => [`${v} ${u}`, n === 'avg' ? '7-day average' : 'Weigh-in']} />
                {profile.targetWeightKg && <ReferenceLine y={conv(profile.targetWeightKg)} stroke="var(--accent)" strokeDasharray="5 4" label={{ value: 'Target', fill: 'var(--muted)', fontSize: 11, position: 'insideTopRight' }} />}
                <Line type="monotone" dataKey="weight" stroke="var(--muted)" strokeWidth={0} dot={{ r: 3.5, fill: 'var(--muted)' }} isAnimationActive={false} />
                <Line type="monotone" dataKey="avg" stroke="var(--primary)" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : <p className="pt-16 text-center text-sm text-muted">No weigh-ins in this range.</p>}
        </div>
        <p className="mt-2 text-[12px] text-muted">Dots are weigh-ins; the line is your 7-day average, which smooths out day-to-day water changes.</p>
      </Card>
      <Card className="mb-4 px-4 py-2">
        <h2 className="px-1 pt-2">History</h2>
        <ul className="divide-y divide-line">
          {[...sorted].reverse().map((w) => (
            <li key={w.id}><button className="flex w-full justify-between py-3 text-left" onClick={() => setEdit(w)}><span>{fmtDate(w.date)}</span><span className="num font-semibold">{fmtWeight(w.kg, u)}</span></button></li>
          ))}
        </ul>
      </Card>
      <Photos />
      <EditWeigh w={edit} unit={u} onClose={() => setEdit(null)} />
    </div>
  )
}

function EditWeigh({ w, unit, onClose }: { w: { id: string; date: string; kg: number } | null; unit: 'kg' | 'lb'; onClose: () => void }) {
  const [v, setV] = useState('')
  const [d, setD] = useState('')
  const [last, setLast] = useState<string | null>(null)
  if (w && w.id !== last) { setLast(w.id); setV(String(+(unit === 'kg' ? w.kg : kgToLb(w.kg)).toFixed(1))); setD(w.date) }
  if (!w) return <Sheet open={false} onClose={onClose} title="">{null}</Sheet>
  return (
    <Sheet open onClose={onClose} title="Edit weigh-in">
      <div className="space-y-4">
        <Field label={`Weight (${unit})`}><input className="field num" type="number" step="0.1" value={v} onChange={(e) => setV(e.target.value)} /></Field>
        <Field label="Date"><input className="field" type="date" value={d} onChange={(e) => setD(e.target.value)} /></Field>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => { useStore.setState((s) => ({ weights: s.weights.filter((x) => x.id !== w.id) })); onClose() }}><Trash2 size={16} /> Delete</Button>
          <Button className="flex-1" onClick={() => { const kg = unit === 'kg' ? Number(v) : lbToKg(Number(v)); useStore.setState((s) => ({ weights: s.weights.map((x) => (x.id === w.id ? { ...x, kg, date: d } : x)) })); onClose() }}>Save</Button>
        </div>
      </div>
    </Sheet>
  )
}

function useBlobUrl(key: string | null) {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    let u: string | null = null
    if (key) idbGet(key).then((b) => { if (b) { u = URL.createObjectURL(b as Blob); setUrl(u) } })
    return () => { if (u) URL.revokeObjectURL(u); setUrl(null) }
  }, [key])
  return url
}
function Thumb({ k, alt, className = '' }: { k: string; alt: string; className?: string }) {
  const url = useBlobUrl(k)
  return url ? <img src={url} alt={alt} className={`object-cover ${className}`} /> : <div className={`bg-surface-2 ${className}`} />
}

function Photos() {
  const photos = useStore((s) => s.photos)
  const ref = useRef<HTMLInputElement>(null)
  const [compare, setCompare] = useState<string[]>([])
  const [comparing, setComparing] = useState(false)
  const [view, setView] = useState<string | null>(null)
  const sorted = [...photos].sort((a, b) => b.date.localeCompare(a.date))
  const upload = async (files: FileList | null) => {
    if (!files) return
    for (const f of files) { const id = uid(); const key = `photo-${id}`; await idbSet(key, f); useStore.setState((s) => ({ photos: [...s.photos, { id, date: isoDate(), key, note: '' }] })) }
  }
  const remove = async (id: string) => {
    const p = photos.find((x) => x.id === id)!
    await idbDel(p.key)
    useStore.setState((s) => ({ photos: s.photos.filter((x) => x.id !== id) }))
    setView(null)
  }
  const viewing = photos.find((p) => p.id === view)
  const toggle = (id: string) => setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c.slice(-1), id]))
  return (
    <Card>
      <div className="mb-1 flex items-center justify-between"><h2>Progress photos</h2>{compare.length === 2 && <Button size="sm" variant="soft" onClick={() => setComparing(true)}><Columns2 size={14} /> Compare</Button>}</div>
      <p className="mb-3 flex items-center gap-1.5 text-[13px] text-muted"><Lock size={13} aria-hidden /> Private. Stored only on this device and never uploaded.</p>
      <input ref={ref} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { upload(e.target.files); e.target.value = '' }} />
      {sorted.length === 0 ? <Empty title="No photos yet" body="Photos taken in the same spot and light make the clearest comparison." action={<Button size="sm" onClick={() => ref.current?.click()}><Camera size={14} /> Add photo</Button>} /> : (
        <>
          <p className="mb-2 text-[13px] text-muted">Tap a photo to view it. Tap the circles on two photos to compare them.</p>
          <ul className="grid grid-cols-3 gap-2">
            {sorted.map((p) => (
              <li key={p.id} className="relative">
                <button className="block w-full" onClick={() => setView(p.id)} aria-label={`Photo from ${fmtDate(p.date)}`}><Thumb k={p.key} alt="" className="aspect-[3/4] w-full rounded-xl" /></button>
                <button onClick={() => toggle(p.id)} aria-pressed={compare.includes(p.id)} aria-label={`Select photo from ${fmtDate(p.date)} to compare`} className={`absolute right-1.5 top-1.5 h-7 w-7 rounded-full border-2 border-white ${compare.includes(p.id) ? 'bg-primary' : 'bg-black/30'}`} />
                <span className="mt-1 block text-[12px] text-muted">{fmtDate(p.date, { day: 'numeric', month: 'short', year: '2-digit' })}</span>
              </li>
            ))}
          </ul>
          <Button size="sm" variant="soft" className="mt-3" onClick={() => ref.current?.click()}><Camera size={14} /> Add photo</Button>
        </>
      )}
      <Sheet open={!!viewing} onClose={() => setView(null)} title={viewing ? fmtDate(viewing.date) : ''}>
        {viewing && <div className="space-y-4">
          <Thumb k={viewing.key} alt={`Progress photo, ${fmtDate(viewing.date)}`} className="max-h-[60dvh] w-full rounded-2xl !object-contain" />
          <Field label="Date"><input className="field" type="date" value={viewing.date} onChange={(e) => useStore.setState((s) => ({ photos: s.photos.map((x) => (x.id === viewing.id ? { ...x, date: e.target.value } : x)) }))} /></Field>
          <Button variant="danger" className="w-full" onClick={() => remove(viewing.id)}><Trash2 size={16} /> Delete permanently</Button>
        </div>}
      </Sheet>
      <Sheet open={comparing} onClose={() => setComparing(false)} title="Compare">
        <div className="grid grid-cols-2 gap-2">
          {compare.map((id) => { const p = photos.find((x) => x.id === id)!; return p && <figure key={id}><Thumb k={p.key} alt={`Progress photo, ${fmtDate(p.date)}`} className="aspect-[3/4] w-full rounded-xl" /><figcaption className="mt-1 text-center text-sm">{fmtDate(p.date)}</figcaption></figure> })}
        </div>
      </Sheet>
    </Card>
  )
}
