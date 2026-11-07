import { useState } from 'react'
import { Star } from 'lucide-react'
import { useStore } from '../store'
import { Button, Field } from './ui'
import type { AdaptedRecipe } from '../lib/safety'
import type { Review } from '../types'

/** Ratings and personal notes feed back into recommendations; "your version" never edits the shared recipe. */
export function ReviewForm({ a }: { a: AdaptedRecipe }) {
  const existing = useStore((s) => s.reviews[a.recipe.id])
  const [r, setR] = useState<Review>(existing ?? { rating: 0, enjoyed: null, easy: null, again: null, notes: '', variation: '', updatedAt: '' })
  const [saved, setSaved] = useState(false)
  const yn = (k: 'enjoyed' | 'easy' | 'again', label: string) => (
    <div className="flex items-center justify-between"><span>{label}</span>
      <div className="flex gap-1.5">{[true, false].map((v) => <button key={String(v)} aria-pressed={r[k] === v} onClick={() => setR({ ...r, [k]: v })} className={`rounded-full border px-3 py-1 text-sm font-semibold ${r[k] === v ? 'border-primary bg-primary text-on-primary' : 'border-line'}`}>{v ? 'Yes' : 'No'}</button>)}</div>
    </div>
  )
  return (
    <div className="space-y-3 rounded-2xl bg-surface p-4">
      <h3>Made it? Rate it</h3>
      <div className="flex gap-1" role="radiogroup" aria-label="Rating">{[1, 2, 3, 4, 5].map((n) => <button key={n} role="radio" aria-checked={r.rating === n} aria-label={`${n} star${n > 1 ? 's' : ''}`} onClick={() => setR({ ...r, rating: n })}><Star size={28} style={{ color: 'var(--accent)', fill: n <= r.rating ? 'var(--accent)' : 'transparent' }} /></button>)}</div>
      {yn('enjoyed', 'Enjoyed it?')}{yn('easy', 'Easy to make?')}{yn('again', 'Make it again?')}
      <Field label="Notes"><textarea className="field" rows={2} value={r.notes} onChange={(e) => setR({ ...r, notes: e.target.value })} /></Field>
      <Field label="Your version" hint="Saved for you only; the original recipe stays the same."><textarea className="field" rows={2} placeholder="e.g. Used half the chilli, added spinach" value={r.variation} onChange={(e) => setR({ ...r, variation: e.target.value })} /></Field>
      <Button className="w-full" disabled={!r.rating} onClick={() => { useStore.setState((s) => ({ reviews: { ...s.reviews, [a.recipe.id]: { ...r, updatedAt: new Date().toISOString() } } })); setSaved(true) }}>{saved ? 'Saved' : 'Save review'}</Button>
    </div>
  )
}
