import type { ThemeId } from '../types'
import { Check } from 'lucide-react'

export const THEMES: { id: ThemeId; name: string; swatch: string[] }[] = [
  { id: 'rose', name: 'Rose', swatch: ['#FFC5D3', '#9C51B6', '#FFFFFF', '#D1B765'] },
  { id: 'noir', name: 'Noir', swatch: ['#000000', '#D1B765', '#980002', '#0000FF'] },
  { id: 'sage', name: 'Sage', swatch: ['#F6F7F2', '#2F6B4F', '#E2B04A', '#1F2A22'] },
]

export function ThemePicker({ value, onChange }: { value: ThemeId; onChange: (t: ThemeId) => void }) {
  return (
    <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Colour theme">
      {THEMES.map((t) => (
        <button key={t.id} role="radio" aria-checked={value === t.id} onClick={() => onChange(t.id)}
          className={`relative rounded-2xl border-2 p-2 text-left ${value === t.id ? 'border-primary' : 'border-line'}`}>
          <div className="grid h-20 grid-cols-2 overflow-hidden rounded-xl">{t.swatch.map((c) => <span key={c} style={{ background: c }} />)}</div>
          <span className="mt-2 block text-sm font-semibold">{t.name}</span>
          {value === t.id && <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-primary text-on-primary"><Check size={14} /></span>}
        </button>
      ))}
    </div>
  )
}
