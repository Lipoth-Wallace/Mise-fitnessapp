import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus } from 'lucide-react'
import { useEffect, type ButtonHTMLAttributes, type ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'soft' | 'danger' | 'accent'
export function Button({ variant = 'primary', className = '', size = 'md', ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: 'sm' | 'md' | 'lg' }) {
  const v = {
    primary: 'bg-primary text-on-primary',
    accent: 'bg-accent text-on-accent',
    soft: 'bg-surface-2 text-ink',
    ghost: 'bg-transparent text-ink border border-line',
    danger: 'bg-bad text-white',
  }[variant]
  const s = { sm: 'h-9 px-3.5 text-sm', md: 'h-12 px-5 text-[15px]', lg: 'h-14 px-6 text-base' }[size]
  return <button {...p} className={`${v} ${s} inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-transform active:scale-[.97] disabled:opacity-45 disabled:active:scale-100 ${className}`} />
}

export function Card({ children, className = '', ...p }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return <div {...p} className={`card p-5 ${className}`}>{children}</div>
}

export function Chip({ active, children, onClick, className = '', ...p }: { active?: boolean; children: ReactNode; onClick?: () => void; className?: string } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick} {...p}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${active ? 'border-primary bg-primary text-on-primary' : 'border-line bg-bg text-ink'} ${className}`}>
      {children}
    </button>
  )
}

export function Field({ label, hint, children }: { label: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-[13px] text-muted">{hint}</span>}
    </label>
  )
}

export function Stepper({ value, onChange, min = 0, max = 99, step = 1, label }: { value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number; label: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-bg" role="group" aria-label={label}>
      <button type="button" aria-label={`Decrease ${label}`} className="grid h-10 w-10 place-items-center disabled:opacity-30" disabled={value <= min} onClick={() => onChange(Math.max(min, +(value - step).toFixed(2)))}><Minus size={16} /></button>
      <span className="num min-w-8 text-center font-semibold" aria-live="polite">{value}</span>
      <button type="button" aria-label={`Increase ${label}`} className="grid h-10 w-10 place-items-center disabled:opacity-30" disabled={value >= max} onClick={() => onChange(Math.min(max, +(value + step).toFixed(2)))}><Plus size={16} /></button>
    </div>
  )
}

export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [open, onClose])
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div className="absolute inset-0 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div className="safe-bottom absolute inset-x-0 bottom-0 mx-auto max-h-[92dvh] max-w-xl overflow-y-auto rounded-t-[28px] bg-bg px-5 pt-3"
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 32, stiffness: 340 }}>
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-line" />
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2>{title}</h2>
              <button aria-label="Close" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-surface"><X size={18} /></button>
            </div>
            <div className="pb-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export function Segmented<T extends string>({ value, options, onChange, label }: { value: T; options: { id: T; label: ReactNode }[]; onChange: (v: T) => void; label: string }) {
  return (
    <div role="tablist" aria-label={label} className="no-scrollbar flex gap-1 overflow-x-auto rounded-full bg-surface p-1">
      {options.map((o) => (
        <button key={o.id} role="tab" aria-selected={value === o.id} onClick={() => onChange(o.id)}
          className={`shrink-0 grow rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${value === o.id ? 'bg-primary text-on-primary' : 'text-muted'}`}>{o.label}</button>
      ))}
    </div>
  )
}

export function Empty({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="card flex flex-col items-start gap-3 p-6">
      <h3>{title}</h3>
      <p className="text-muted">{body}</p>
      {action}
    </div>
  )
}

export function PageHeader({ title, sub, right }: { title: string; sub?: ReactNode; right?: ReactNode }) {
  return (
    <header className="mb-5 flex items-end justify-between gap-3">
      <div>
        {sub && <p className="mb-1 text-sm text-muted">{sub}</p>}
        <h1>{title}</h1>
      </div>
      {right}
    </header>
  )
}

export function Bar({ value, max, color = 'var(--primary)', label }: { value: number; max: number; color?: string; label: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full" style={{ background: 'var(--ring-track)' }} role="progressbar" aria-label={label} aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={Math.round(max)}>
      <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}

export function Notice({ tone = 'info', children }: { tone?: 'info' | 'warn' | 'bad' | 'good'; children: ReactNode }) {
  const c = { info: 'border-primary/30', warn: 'border-warn/50', bad: 'border-bad/60', good: 'border-good/50' }[tone]
  return <div role={tone === 'bad' ? 'alert' : 'note'} className={`rounded-2xl border-l-4 bg-surface px-4 py-3 text-sm ${c}`}>{children}</div>
}
