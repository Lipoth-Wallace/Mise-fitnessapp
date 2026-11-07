import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Receipt as ReceiptIcon, PiggyBank, Home, Trash2, ChevronRight, Package } from 'lucide-react'
import { useStore } from '../store'
import { useActiveList, useCurrentPlan } from '../hooks'
import { Button, Card, Empty, Field, Notice, PageHeader, Segmented, Sheet } from '../components/ui'
import { AISLES, type Aisle, type ShopItem, type PantryItem } from '../types'
import { shopQty, ING, INGREDIENTS } from '../lib/catalog'
import { remaining } from '../lib/shopping'
import { fmtDate, isoDate, money, uid } from '../lib/util'
import { generateList } from '../lib/actions'

export default function Shop() {
  const [tab, setTab] = useState<'list' | 'pantry' | 'history'>('list')
  return (
    <div>
      <PageHeader title="Shopping" />
      <div className="mb-4 grid grid-cols-2 gap-3">
        <Link to="/shop/receipts" className="card flex items-center gap-3 p-4"><ReceiptIcon size={22} className="text-primary" aria-hidden /><span className="flex-1"><span className="block font-semibold">Scan receipt</span><span className="text-[13px] text-muted">Tick off what you bought</span></span></Link>
        <Link to="/shop/budget" className="card flex items-center gap-3 p-4"><PiggyBank size={22} className="text-primary" aria-hidden /><span className="flex-1"><span className="block font-semibold">Budget</span><span className="text-[13px] text-muted">Spending & trends</span></span></Link>
      </div>
      <div className="mb-4"><Segmented label="Shopping section" value={tab} onChange={setTab} options={[{ id: 'list', label: 'List' }, { id: 'pantry', label: 'Pantry' }, { id: 'history', label: 'History' }]} /></div>
      {tab === 'list' && <ListView />}
      {tab === 'pantry' && <Pantry />}
      {tab === 'history' && <History />}
    </div>
  )
}

function ListView() {
  const list = useActiveList()
  const plan = useCurrentPlan()
  const updateList = useStore((s) => s.updateList)
  const [adding, setAdding] = useState(false)
  const [edit, setEdit] = useState<ShopItem | null>(null)
  if (!list) return <Empty title="No shopping list yet" body="Finalise a meal plan and your list builds itself, with duplicates combined and pantry stock taken off." action={plan ? <Button onClick={() => generateList(plan)}>Make list from this week’s plan</Button> : <Link to="/plan"><Button>Plan your week</Button></Link>} />
  const open = list.items.filter((i) => !i.checked && !i.haveAtHome)
  const done = list.items.filter((i) => i.checked || i.haveAtHome)
  const toggle = (id: string) => updateList(list.id, (items) => items.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)))
  const est = open.reduce((s, i) => s + (i.estCost * remaining(i)) / Math.max(i.qty, 1), 0)
  return (
    <div>
      <Card className="mb-4 flex items-center justify-between p-4">
        <div><p className="text-sm text-muted">Week of {fmtDate(list.weekStart)}</p><p className="font-semibold">{open.length} to buy · {done.length} done</p></div>
        <div className="text-right"><p className="num display text-lg font-semibold">≈{money(est)}</p><p className="text-[12px] text-muted">estimated</p></div>
      </Card>
      {AISLES.map((a) => {
        const items = open.filter((i) => i.aisle === a.id)
        if (!items.length) return null
        return (
          <section key={a.id} className="mb-4" aria-label={a.label}>
            <h3 className="mb-1.5 px-1 text-muted">{a.label}</h3>
            <ul className="card divide-y divide-line px-4">{items.map((i) => <Row key={i.id} item={i} onToggle={() => toggle(i.id)} onEdit={() => setEdit(i)} />)}</ul>
          </section>
        )
      })}
      {open.length === 0 && <div className="mb-4"><Notice tone="good">Everything’s ticked off.</Notice></div>}
      <Button variant="soft" className="mb-6 w-full" onClick={() => setAdding(true)}><Plus size={16} /> Add an item</Button>
      {done.length > 0 && (
        <section aria-label="Done">
          <h3 className="mb-1.5 px-1 text-muted">In your basket or at home</h3>
          <ul className="card divide-y divide-line px-4 opacity-80">{done.map((i) => <Row key={i.id} item={i} onToggle={() => i.haveAtHome ? updateList(list.id, (it) => it.map((x) => (x.id === i.id ? { ...x, haveAtHome: false } : x))) : toggle(i.id)} onEdit={() => setEdit(i)} />)}</ul>
        </section>
      )}
      <AddItem open={adding} onClose={() => setAdding(false)} onAdd={(it) => updateList(list.id, (items) => [...items, it])} />
      <EditItem item={edit} onClose={() => setEdit(null)} onSave={(it) => updateList(list.id, (items) => items.map((x) => (x.id === it.id ? it : x)))} onRemove={(id) => updateList(list.id, (items) => items.filter((x) => x.id !== id))} />
    </div>
  )
}

function Row({ item, onToggle, onEdit }: { item: ShopItem; onToggle: () => void; onEdit: () => void }) {
  const done = item.checked || item.haveAtHome
  const rem = remaining(item)
  const partial = item.purchased > 0 && !item.checked
  return (
    <li className="flex items-center gap-3 py-3">
      <input type="checkbox" checked={done} onChange={onToggle} aria-label={`${done ? 'Untick' : 'Tick'} ${item.name}`} className="h-6 w-6 shrink-0 rounded-md accent-[var(--primary)]" />
      <button className="flex flex-1 items-center justify-between gap-3 text-left" onClick={onEdit}>
        <span className={done ? 'strike text-muted' : ''}>{item.name}{item.haveAtHome && <span className="ml-1 text-[12px] no-underline">(at home)</span>}</span>
        <span className={`num shrink-0 text-sm ${partial ? 'font-semibold text-warn' : 'text-muted'}`}>
          {partial ? `${shopQty(item.ingredientId, rem, item.unit)} still needed` : shopQty(item.ingredientId, item.qty, item.unit)}
        </span>
      </button>
    </li>
  )
}

function AddItem({ open, onClose, onAdd }: { open: boolean; onClose: () => void; onAdd: (i: ShopItem) => void }) {
  const [name, setName] = useState('')
  const [qty, setQty] = useState('1')
  const [unit, setUnit] = useState('')
  const [aisle, setAisle] = useState<Aisle>('household')
  const match = INGREDIENTS.find((i) => i.name.toLowerCase() === name.trim().toLowerCase())
  return (
    <Sheet open={open} onClose={onClose} title="Add an item">
      <form className="space-y-4" onSubmit={(e) => {
        e.preventDefault()
        onAdd({ id: uid(), ingredientId: match?.id ?? null, name: name.trim(), qty: Number(qty) || 1, unit: match ? (match.unit === 'ml' ? 'ml' : 'g') : unit, aisle: match?.aisle ?? aisle, checked: false, haveAtHome: false, manual: true, purchased: 0, estCost: 0 })
        setName(''); setQty('1'); setUnit(''); onClose()
      }}>
        <Field label="Item"><input className="field" list="ing-names" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Kitchen roll" /></Field>
        <datalist id="ing-names">{INGREDIENTS.map((i) => <option key={i.id} value={i.name} />)}</datalist>
        <div className="grid grid-cols-2 gap-3">
          <Field label={match ? `Quantity (${match.unit === 'ml' ? 'ml' : 'g'})` : 'Quantity'}><input className="field num" type="number" inputMode="decimal" value={qty} onChange={(e) => setQty(e.target.value)} /></Field>
          {!match && <Field label="Unit"><input className="field" placeholder="e.g. pack" value={unit} onChange={(e) => setUnit(e.target.value)} /></Field>}
        </div>
        {!match && <Field label="Aisle"><select className="field" value={aisle} onChange={(e) => setAisle(e.target.value as Aisle)}>{AISLES.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}</select></Field>}
        <Button type="submit" className="w-full">Add to list</Button>
      </form>
    </Sheet>
  )
}

function EditItem({ item, onClose, onSave, onRemove }: { item: ShopItem | null; onClose: () => void; onSave: (i: ShopItem) => void; onRemove: (id: string) => void }) {
  const [qty, setQty] = useState('')
  const [last, setLast] = useState<string | null>(null)
  if (item && item.id !== last) { setLast(item.id); setQty(String(Math.round(item.qty))) }
  if (!item) return <Sheet open={false} onClose={onClose} title="">{null}</Sheet>
  const unit = item.ingredientId ? (ING.get(item.ingredientId)!.unit === 'ml' ? 'ml' : 'g') : item.unit
  return (
    <Sheet open onClose={onClose} title={item.name}>
      <div className="space-y-4">
        <Field label={`Quantity needed (${unit || 'items'})`} hint={item.ingredientId && ING.get(item.ingredientId)!.unit === 'each' ? `Shown on the list as ${shopQty(item.ingredientId, Number(qty) || 0, unit)}` : undefined}>
          <input className="field num" type="number" inputMode="decimal" value={qty} onChange={(e) => setQty(e.target.value)} />
        </Field>
        {item.purchased > 0 && <p className="text-sm text-muted">Bought so far: {shopQty(item.ingredientId, item.purchased, unit)}</p>}
        <Button variant="soft" className="w-full" onClick={() => { onSave({ ...item, haveAtHome: !item.haveAtHome }); onClose() }}><Home size={16} /> {item.haveAtHome ? 'I need to buy this' : 'I already have this at home'}</Button>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => { onRemove(item.id); onClose() }}><Trash2 size={16} /> Remove</Button>
          <Button className="flex-1" onClick={() => { onSave({ ...item, qty: Number(qty) || item.qty }); onClose() }}>Save</Button>
        </div>
      </div>
    </Sheet>
  )
}

function Pantry() {
  const pantry = useStore((s) => s.pantry)
  const [edit, setEdit] = useState<PantryItem | null>(null)
  const [adding, setAdding] = useState(false)
  const save = (p: PantryItem) => useStore.setState((s) => ({ pantry: s.pantry.some((x) => x.id === p.id) ? s.pantry.map((x) => (x.id === p.id ? p : x)) : [...s.pantry, p] }))
  const remove = (id: string) => useStore.setState((s) => ({ pantry: s.pantry.filter((x) => x.id !== id) }))
  const today = isoDate()
  return (
    <div>
      <p className="mb-4 text-sm text-muted">What you have at home. Pantry stock is taken off new shopping lists and helps Smart Adjustments suggest meals.</p>
      {pantry.length === 0 ? <Empty title="Your pantry is empty" body="Add items by hand, or from a scanned receipt." /> : (
        <ul className="card mb-4 divide-y divide-line px-4">
          {[...pantry].sort((a, b) => a.name.localeCompare(b.name)).map((p) => (
            <li key={p.id}><button className="flex w-full items-center justify-between gap-3 py-3 text-left" onClick={() => setEdit(p)}>
              <span><span className="block font-medium">{p.name}</span><span className="text-[13px] text-muted">Bought {fmtDate(p.purchaseDate)}{p.expiry && ` · use by ${fmtDate(p.expiry)}`}{p.expiry && p.expiry < today && ' · expired'}</span></span>
              <span className="num shrink-0 text-sm text-muted">≈{p.ingredientId ? shopQty(p.ingredientId, p.qty, p.unit) : `${p.qty} ${p.unit}`}</span>
            </button></li>
          ))}
        </ul>
      )}
      <Button variant="soft" className="mt-4 w-full" onClick={() => setAdding(true)}><Package size={16} /> Add to pantry</Button>
      <PantryEditor item={edit ?? (adding ? { id: uid(), ingredientId: null, name: '', qty: 0, unit: 'g', purchaseDate: today } : null)} onClose={() => { setEdit(null); setAdding(false) }} onSave={save} onRemove={edit ? () => remove(edit.id) : undefined} />
    </div>
  )
}

function PantryEditor({ item, onClose, onSave, onRemove }: { item: PantryItem | null; onClose: () => void; onSave: (p: PantryItem) => void; onRemove?: () => void }) {
  const [p, setP] = useState<PantryItem | null>(null)
  if (item && p?.id !== item.id) setP(item)
  if (!item || !p) return <Sheet open={false} onClose={onClose} title="">{null}</Sheet>
  const match = INGREDIENTS.find((i) => i.name.toLowerCase() === p.name.trim().toLowerCase())
  return (
    <Sheet open onClose={onClose} title={onRemove ? 'Edit pantry item' : 'Add to pantry'}>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSave({ ...p, ingredientId: match?.id ?? p.ingredientId, unit: match ? (match.unit === 'ml' ? 'ml' : 'g') : p.unit }); onClose() }}>
        <Field label="Item"><input className="field" list="ing-names-p" required value={p.name} onChange={(e) => setP({ ...p, name: e.target.value, ingredientId: null })} /></Field>
        <datalist id="ing-names-p">{INGREDIENTS.map((i) => <option key={i.id} value={i.name} />)}</datalist>
        <div className="grid grid-cols-2 gap-3">
          <Field label={`Amount left (${match ? (match.unit === 'ml' ? 'ml' : 'g') : p.unit || 'units'})`}><input className="field num" type="number" inputMode="decimal" value={p.qty || ''} onChange={(e) => setP({ ...p, qty: Number(e.target.value) })} /></Field>
          {!match && !p.ingredientId && <Field label="Unit"><input className="field" value={p.unit} onChange={(e) => setP({ ...p, unit: e.target.value })} /></Field>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Bought"><input className="field" type="date" value={p.purchaseDate} onChange={(e) => setP({ ...p, purchaseDate: e.target.value })} /></Field>
          <Field label="Use by (optional)"><input className="field" type="date" value={p.expiry ?? ''} onChange={(e) => setP({ ...p, expiry: e.target.value || undefined })} /></Field>
        </div>
        <div className="flex gap-3">
          {onRemove && <Button type="button" variant="ghost" onClick={() => { onRemove(); onClose() }}><Trash2 size={16} /> Remove</Button>}
          <Button type="submit" className="flex-1">Save</Button>
        </div>
      </form>
    </Sheet>
  )
}

function History() {
  const lists = useStore((s) => s.lists)
  const [open, setOpen] = useState<string | null>(null)
  const past = lists.filter((l) => l.archived).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  const sel = past.find((l) => l.id === open)
  if (!past.length) return <Empty title="No previous lists" body="When you make a new list, the old one is kept here." />
  return (
    <>
      <ul className="card divide-y divide-line px-4">
        {past.map((l) => (
          <li key={l.id}><button className="flex w-full items-center justify-between py-3 text-left" onClick={() => setOpen(l.id)}>
            <span><span className="block font-medium">Week of {fmtDate(l.weekStart)}</span><span className="text-[13px] text-muted">{l.items.length} items · {l.items.filter((i) => i.checked).length} bought</span></span><ChevronRight size={18} className="text-muted" aria-hidden />
          </button></li>
        ))}
      </ul>
      <Sheet open={!!sel} onClose={() => setOpen(null)} title={sel ? `Week of ${fmtDate(sel.weekStart)}` : ''}>
        <ul className="divide-y divide-line">{sel?.items.map((i) => <li key={i.id} className="flex justify-between py-2.5"><span className={i.checked ? 'strike text-muted' : ''}>{i.name}</span><span className="num text-sm text-muted">{shopQty(i.ingredientId, i.qty, i.unit)}</span></li>)}</ul>
      </Sheet>
    </>
  )
}
