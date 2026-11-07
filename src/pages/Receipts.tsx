import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Camera, ImagePlus, Trash2, ChevronRight, AlertTriangle } from 'lucide-react'
import { set as idbSet, del as idbDel, get as idbGet } from 'idb-keyval'
import { useStore } from '../store'
import { useActiveList } from '../hooks'
import { Button, Card, Empty, Field, Notice, PageHeader, Sheet } from '../components/ui'
import type { Receipt, ReceiptLine, ShopItem } from '../types'
import { parseReceiptText, bestMatch, lineStatus, reconcile, receiptHash, guessIngredient, CONFIDENT } from '../lib/receipt'
import { recogniseReceipt } from '../lib/ocr'
import { shopQty, ING } from '../lib/catalog'
import { fmtDate, isoDate, money, uid } from '../lib/util'

const STATUS = {
  full: { label: 'Fully purchased', color: '#1F9D55' },
  partial: { label: 'Partly purchased', color: '#D98E04' },
  none: { label: 'Still required', color: '#D93025' },
  confirm: { label: 'Needs your check', color: '#D98E04' },
  unmatched: { label: 'Not on your list', color: '#8A8A8A' },
} as const

export default function Receipts() {
  const receipts = useStore((s) => s.receipts)
  const [draft, setDraft] = useState<Receipt | null>(null)
  const [viewing, setViewing] = useState<Receipt | null>(null)
  const [busy, setBusy] = useState<{ stage: string; p: number } | null>(null)
  const [error, setError] = useState('')
  const camRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const list = useActiveList()

  const process = async (files: FileList | null) => {
    if (!files?.length) return
    setError('')
    const blobs = [...files]
    try {
      setBusy({ stage: 'Preparing photo', p: 0 })
      const { text, confidence } = await recogniseReceipt(blobs, (stage, p) => setBusy({ stage, p }))
      setBusy({ stage: 'Matching against your list', p: 1 })
      const parsed = parseReceiptText(text)
      const items = list?.items ?? []
      const lines: ReceiptLine[] = parsed.lines.map((l) => {
        const m = bestMatch(l.name, items.filter((i) => !i.checked))
        return { ...l, matchItemId: m.itemId, confidence: m.confidence, confirmed: false, addToPantry: false }
      })
      const id = uid()
      const keys: string[] = []
      for (let i = 0; i < blobs.length; i++) { const k = `receipt-${id}-${i}`; await idbSet(k, blobs[i]); keys.push(k) }
      setDraft({ id, retailer: parsed.retailer, date: parsed.date ?? isoDate(), total: parsed.total ?? lines.reduce((s, l) => s + l.price - l.discount, 0), lines, imageKeys: keys, hash: receiptHash(parsed.retailer, parsed.date, parsed.total, lines.length), listId: list?.id ?? null, createdAt: new Date().toISOString(), ocrConfidence: confidence, finalised: false })
    } catch (e) {
      setError(e instanceof Error ? `Couldn’t read the receipt: ${e.message}` : 'Couldn’t read the receipt.')
    } finally { setBusy(null) }
  }

  if (draft) return <Review draft={draft} setDraft={setDraft} onClose={() => setDraft(null)} />

  const totalSpent = receipts.filter((r) => r.finalised).reduce((s, r) => s + r.total, 0)
  return (
    <div>
      <Link to="/shop" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"><ArrowLeft size={16} /> Shopping</Link>
      <PageHeader title="Receipts" sub={receipts.length ? `${money(totalSpent)} recorded` : undefined} />
      <Card className="mb-4">
        <h2 className="mb-1">Scan a receipt</h2>
        <p className="mb-4 text-sm text-muted">Lay it flat in good light. For a long receipt, take several overlapping photos and select them together. Text is read on your phone; images stay on this device.</p>
        <input ref={camRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { process(e.target.files); e.target.value = '' }} />
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { process(e.target.files); e.target.value = '' }} />
        {busy ? (
          <div aria-live="polite">
            <p className="mb-2 font-semibold">{busy.stage}…</p>
            <div className="h-2.5 overflow-hidden rounded-full" style={{ background: 'var(--ring-track)' }}><div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${Math.round(busy.p * 100)}%` }} /></div>
            <p className="mt-2 text-[13px] text-muted">The first scan downloads the text-reading engine (about 7 MB). After that it works offline.</p>
          </div>
        ) : (
          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => camRef.current?.click()}><Camera size={18} /> Take photo</Button>
            <Button variant="soft" className="flex-1" onClick={() => fileRef.current?.click()}><ImagePlus size={18} /> Upload</Button>
          </div>
        )}
        {error && <div className="mt-3"><Notice tone="bad">{error}</Notice></div>}
        {!list && <div className="mt-3"><Notice>You don’t have an active shopping list, so purchases will be recorded for spending only.</Notice></div>}
      </Card>
      <h2 className="mb-2">History</h2>
      {receipts.length === 0 ? <Empty title="No receipts yet" body="Scanned receipts appear here with what you bought and what you spent." /> : (
        <ul className="card divide-y divide-line px-4">
          {[...receipts].sort((a, b) => b.date.localeCompare(a.date)).map((r) => (
            <li key={r.id}><button className="flex w-full items-center justify-between gap-3 py-3 text-left" onClick={() => r.finalised ? setViewing(r) : setDraft(r)}>
              <span><span className="block font-medium">{r.retailer}</span><span className="text-[13px] text-muted">{fmtDate(r.date)} · {r.lines.length} items · {r.lines.filter((l) => l.matchItemId).length} matched{!r.finalised && ' · not confirmed'}</span></span>
              <span className="num flex items-center gap-1 font-semibold">{money(r.total)}<ChevronRight size={16} className="text-muted" aria-hidden /></span>
            </button></li>
          ))}
        </ul>
      )}
      <ReceiptDetail r={viewing} onClose={() => setViewing(null)} />
    </div>
  )
}

function Review({ draft, setDraft, onClose }: { draft: Receipt; setDraft: (r: Receipt) => void; onClose: () => void }) {
  const list = useStore((s) => s.lists.find((l) => l.id === draft.listId)) ?? null
  const receipts = useStore((s) => s.receipts)
  const trackSurplus = useStore((s) => s.settings.trackSurplus)
  const [override, setOverride] = useState(false)
  const [saving, setSaving] = useState(false)
  const items = list?.items ?? []
  const duplicate = receipts.find((r) => r.finalised && r.id !== draft.id && r.hash === draft.hash)
  const poor = draft.ocrConfidence < 55 || draft.lines.length === 0
  const setLine = (id: string, patch: Partial<ReceiptLine>) => setDraft({ ...draft, lines: draft.lines.map((l) => (l.id === id ? { ...l, ...patch } : l)) })
  const itemTotal = draft.lines.reduce((s, l) => s + l.price - l.discount, 0)

  const finalise = () => {
    setSaving(true)
    const s = useStore.getState()
    const { items: next, surplus } = list ? reconcile(list.items, draft.lines) : { items: [], surplus: [] }
    const pantryAdds = []
    for (const l of draft.lines) {
      const item = items.find((i) => i.id === l.matchItemId)
      if (!item && l.addToPantry) {
        const ingId = guessIngredient(l.name)
        pantryAdds.push({ id: uid(), ingredientId: ingId, name: ingId ? ING.get(ingId)!.name : l.name, qty: l.qty ?? 1, unit: l.unit ?? 'each', purchaseDate: draft.date })
      }
    }
    if (trackSurplus) for (const sp of surplus) {
      const it = items.find((i) => i.id === sp.itemId)!
      pantryAdds.push({ id: uid(), ingredientId: it.ingredientId, name: it.name, qty: Math.round(sp.base), unit: it.unit, purchaseDate: draft.date })
    }
    useStore.setState({
      lists: list ? s.lists.map((l) => (l.id === list.id ? { ...l, items: next } : l)) : s.lists,
      pantry: [...s.pantry, ...pantryAdds],
      receipts: [...s.receipts.filter((r) => r.id !== draft.id), { ...draft, finalised: true }],
    })
    setSaving(false)
    onClose()
  }
  const saveForLater = () => { useStore.setState((s) => ({ receipts: [...s.receipts.filter((r) => r.id !== draft.id), draft] })); onClose() }

  return (
    <div>
      <button onClick={saveForLater} className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"><ArrowLeft size={16} /> Save and finish later</button>
      <PageHeader title="Check your receipt" sub="Nothing changes until you confirm" />
      {poor && <div className="mb-4"><Notice tone="warn"><strong>The photo was hard to read.</strong> Retake it flat and in brighter light, or correct the items below by hand.</Notice></div>}
      {duplicate && !override && (
        <div className="mb-4"><Notice tone="bad"><p className="mb-2"><strong>This looks like a receipt you’ve already added</strong> ({duplicate.retailer}, {fmtDate(duplicate.date)}, {money(duplicate.total)}). Confirming again would double-count it.</p><Button size="sm" variant="ghost" onClick={() => setOverride(true)}>It’s a different receipt</Button></Notice></div>
      )}
      <Card className="mb-4 grid grid-cols-2 gap-3 p-4">
        <div className="col-span-2"><Field label="Shop"><input className="field" value={draft.retailer} onChange={(e) => setDraft({ ...draft, retailer: e.target.value })} /></Field></div>
        <Field label="Date"><input className="field" type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} /></Field>
        <Field label="Total (£)"><input className="field num" type="number" step="0.01" value={draft.total} onChange={(e) => setDraft({ ...draft, total: Number(e.target.value) })} /></Field>
        {Math.abs(itemTotal - draft.total) > 0.05 && draft.lines.length > 0 && <p className="col-span-2 text-[13px] text-warn">Items add up to {money(itemTotal)}. Check the total or any missing lines.</p>}
      </Card>
      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px]">{Object.values(STATUS).map((s) => <span key={s.label} className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-full" style={{ background: s.color }} />{s.label}</span>)}</div>
      <ul className="space-y-3">
        {draft.lines.map((l) => <LineRow key={l.id} line={l} items={items} onChange={(p) => setLine(l.id, p)} onRemove={() => setDraft({ ...draft, lines: draft.lines.filter((x) => x.id !== l.id) })} />)}
      </ul>
      <Button variant="ghost" className="mt-3 w-full" onClick={() => setDraft({ ...draft, lines: [...draft.lines, { id: uid(), raw: '', name: '', price: 0, discount: 0, qty: null, unit: null, matchItemId: null, confidence: 0, confirmed: true, addToPantry: false }] })}>Add a missing line</Button>
      <div className="mt-6 space-y-2">
        <Button size="lg" className="w-full" disabled={saving || (!!duplicate && !override)} onClick={finalise}>Confirm & update my list</Button>
        <p className="text-center text-[13px] text-muted">Only green items are ticked off. Amber items reduce what’s left to buy. Anything you haven’t checked is left unchanged.</p>
      </div>
    </div>
  )
}

function LineRow({ line, items, onChange, onRemove }: { line: ReceiptLine; items: ShopItem[]; onChange: (p: Partial<ReceiptLine>) => void; onRemove: () => void }) {
  const item = items.find((i) => i.id === line.matchItemId)
  const st = lineStatus(line, item)
  const unit = item ? (item.ingredientId ? (ING.get(item.ingredientId)!.unit === 'each' ? 'each' : ING.get(item.ingredientId)!.unit === 'ml' ? 'ml' : 'g') : item.unit) : line.unit ?? 'each'
  return (
    <li className="card overflow-hidden p-0">
      <div className="flex">
        <span className="w-1.5 shrink-0" style={{ background: STATUS[st.status].color }} aria-hidden />
        <div className="flex-1 space-y-3 p-4">
          <input className="field py-2 font-semibold" aria-label="Product" value={line.name} onChange={(e) => onChange({ name: e.target.value })} />
          <label className="flex items-center justify-between gap-3 text-sm"><span className="text-muted">Price paid (£)</span>
            <input className="field num w-28 py-2 text-right" aria-label="Price" type="number" step="0.01" value={line.price} onChange={(e) => onChange({ price: Number(e.target.value) })} /></label>
          {line.discount > 0 && <p className="text-[13px] text-good">Discount −{money(line.discount)}</p>}
          <p className="text-[13px] font-semibold" style={{ color: STATUS[st.status].color }}>{STATUS[st.status].label}{item && ` · match ${Math.round(line.confidence * 100)}%${line.confidence < CONFIDENT ? ' (low)' : ''}`}</p>
          <Field label="On your list as">
            <select className="field py-2" value={line.matchItemId ?? ''} onChange={(e) => onChange({ matchItemId: e.target.value || null, confidence: e.target.value ? 1 : 0, confirmed: !!e.target.value })}>
              <option value="">Not on my list</option>
              {items.map((i) => <option key={i.id} value={i.id}>{i.name} ({shopQty(i.ingredientId, i.qty - i.purchased, i.unit)} needed)</option>)}
            </select>
          </Field>
          {item && (
            <div className="grid grid-cols-2 gap-3">
              <Field label={`Bought (${unit === 'each' ? 'count' : unit})`}>
                <input className="field num py-2" type="number" inputMode="decimal" placeholder="Enter amount"
                  value={line.qty == null ? '' : unit === 'each' && line.unit !== 'each' && item.ingredientId ? Math.round(line.qty / (ING.get(item.ingredientId)!.gPerUnit ?? 1)) : line.qty}
                  onChange={(e) => onChange({ qty: e.target.value === '' ? null : Number(e.target.value), unit: unit === 'each' ? 'each' : (unit as 'g' | 'ml') })} />
              </Field>
              <div><span className="mb-1.5 block text-sm font-semibold">Still needed</span><p className="num py-2">{st.remaining == null ? '—' : st.remaining <= 0 ? 'None' : shopQty(item.ingredientId, st.remaining, item.unit)}</p></div>
            </div>
          )}
          {item && st.status === 'confirm' && (
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-5 w-5 accent-[var(--primary)]" checked={line.confirmed} disabled={line.qty == null} onChange={(e) => onChange({ confirmed: e.target.checked })} />
              {line.qty == null ? 'Enter how much you bought to confirm this match' : 'Yes, this is the right item'}</label>
          )}
          {!item && <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-5 w-5 accent-[var(--primary)]" checked={line.addToPantry} onChange={(e) => onChange({ addToPantry: e.target.checked })} /> Add to my pantry</label>}
          <button onClick={onRemove} className="inline-flex items-center gap-1 text-[13px] text-muted"><Trash2 size={13} /> Not a product line</button>
        </div>
      </div>
    </li>
  )
}

function ReceiptDetail({ r, onClose }: { r: Receipt | null; onClose: () => void }) {
  const [url, setUrl] = useState<string | null>(null)
  const lists = useStore((s) => s.lists)
  useEffect(() => {
    let u: string | null = null
    if (r?.imageKeys[0]) idbGet(r.imageKeys[0]).then((b) => { if (b) { u = URL.createObjectURL(b as Blob); setUrl(u) } })
    return () => { if (u) URL.revokeObjectURL(u); setUrl(null) }
  }, [r])
  const items = useMemo(() => (r ? lists.find((l) => l.id === r.listId)?.items ?? [] : []), [r, lists])
  if (!r) return <Sheet open={false} onClose={onClose} title="">{null}</Sheet>
  const remove = async () => {
    for (const k of r.imageKeys) await idbDel(k)
    useStore.setState((s) => ({ receipts: s.receipts.filter((x) => x.id !== r.id) }))
    onClose()
  }
  return (
    <Sheet open onClose={onClose} title={`${r.retailer} · ${fmtDate(r.date)}`}>
      <div className="space-y-4">
        <p className="num display text-3xl font-semibold">{money(r.total)}</p>
        <ul className="divide-y divide-line">
          {r.lines.map((l) => { const it = items.find((i) => i.id === l.matchItemId); return (
            <li key={l.id} className="flex justify-between gap-3 py-2.5"><span><span className="block">{l.name}</span><span className="text-[13px] text-muted">{it ? `Matched: ${it.name}` : 'Not on list'}</span></span><span className="num">{money(l.price - l.discount)}</span></li>
          ) })}
        </ul>
        {url && <img src={url} alt="Receipt photo" className="max-h-96 w-full rounded-2xl object-contain" />}
        <Notice><AlertTriangle size={14} className="mr-1 inline" aria-hidden />Deleting removes the receipt, its photos and its spending record. Items already ticked off your list stay ticked.</Notice>
        <Button variant="danger" className="w-full" onClick={remove}><Trash2 size={16} /> Delete receipt</Button>
      </div>
    </Sheet>
  )
}
