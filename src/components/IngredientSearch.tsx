import { useId, useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { INGREDIENTS } from '../lib/catalog'
import { DISLIKE_GROUPS } from '../lib/safety'

const label = (id: string) => DISLIKE_GROUPS[id]?.label ?? INGREDIENTS.find((i) => i.id === id)?.name ?? id

/** Multi-select ingredient autocomplete ("fi" → Fish, Figs…). */
export function IngredientSearch({ value, onChange, groups = false, placeholder, ariaLabel }: { value: string[]; onChange: (v: string[]) => void; groups?: boolean; placeholder: string; ariaLabel: string }) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const listId = useId()
  const options = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return []
    const pool = [
      ...(groups ? Object.entries(DISLIKE_GROUPS).map(([id, g]) => ({ id, name: g.label, group: true })) : []),
      ...INGREDIENTS.filter((i) => !i.id.endsWith('-gf')).map((i) => ({ id: i.id, name: i.name, group: false })),
    ]
    return pool
      .filter((o) => !value.includes(o.id))
      .map((o) => { const n = o.name.toLowerCase(); const rank = n.startsWith(t) ? 0 : n.split(/[\s(-]/).some((w) => w.startsWith(t)) ? 1 : n.includes(t) ? 2 : 9; return { ...o, rank } })
      .filter((o) => o.rank < 9)
      .sort((a, b) => a.rank - b.rank || Number(b.group) - Number(a.group) || a.name.localeCompare(b.name))
      .slice(0, 8)
  }, [q, value, groups])

  const pick = (id: string) => { onChange([...value, id]); setQ(''); setActive(0) }

  return (
    <div>
      {value.length > 0 && (
        <ul className="mb-3 flex flex-wrap gap-2" aria-label="Selected">
          {value.map((id) => (
            <li key={id} className="inline-flex items-center gap-1 rounded-full bg-primary py-1.5 pl-3.5 pr-1.5 text-sm font-semibold text-on-primary">
              {label(id)}
              <button type="button" aria-label={`Remove ${label(id)}`} className="grid h-6 w-6 place-items-center rounded-full bg-black/15" onClick={() => onChange(value.filter((x) => x !== id))}><X size={14} /></button>
            </li>
          ))}
        </ul>
      )}
      <div className="relative">
        <input className="field" role="combobox" aria-expanded={options.length > 0} aria-controls={listId} aria-label={ariaLabel} aria-autocomplete="list"
          aria-activedescendant={options[active] ? `${listId}-${active}` : undefined}
          placeholder={placeholder} value={q} onChange={(e) => { setQ(e.target.value); setActive(0) }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, options.length - 1)) }
            if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
            if (e.key === 'Enter' && options[active]) { e.preventDefault(); pick(options[active].id) }
          }} />
        {options.length > 0 && (
          <ul id={listId} role="listbox" className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-2xl border border-line bg-bg shadow-xl">
            {options.map((o, i) => (
              <li key={o.id} id={`${listId}-${i}`} role="option" aria-selected={i === active}
                onMouseDown={(e) => { e.preventDefault(); pick(o.id) }}
                className={`flex cursor-pointer items-center justify-between px-4 py-3 ${i === active ? 'bg-surface' : ''}`}>
                <span>{o.name}</span>{o.group && <span className="text-[12px] text-muted">all {o.name.toLowerCase()}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
