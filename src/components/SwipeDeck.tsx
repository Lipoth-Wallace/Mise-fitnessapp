import { animate, motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { X, Heart, Info, Clock, ChefHat, ChevronsUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Scored } from '../lib/recommend'
import { RecipeArt, Tags, HeartButton } from './recipe'
import { money } from '../lib/util'

const GREEN = '#1F9D55'
const RED = '#D93025'

export type SwipeDir = 'right' | 'left' | 'up'

/**
 * One recipe card at a time. Drag right to add, left to pass, up to skip (decide later); buttons and
 * ←/→/↑ keys do the same. Skipping records nothing — the card just moves to the back of the deck.
 * The next two cards are already rendered underneath, so there is no wait between cards.
 */
export function SwipeDeck({ queue, onSwipe, onInfo, hideNumbers }: { queue: Scored[]; onSwipe: (id: string, dir: SwipeDir) => void; onInfo: (s: Scored) => void; hideNumbers: boolean }) {
  const [flying, setFlying] = useState<{ id: string; dir: SwipeDir } | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const visible = queue.slice(0, 3)
  const top = visible[0]
  const trigger = (dir: SwipeDir) => { if (top && !flying && (dir !== 'up' || queue.length > 1)) setFlying({ id: top.adapted.recipe.id, dir }) }
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (!ref.current?.contains(document.activeElement) && document.activeElement !== document.body) return
      if (e.key === 'ArrowRight') trigger('right')
      if (e.key === 'ArrowLeft') trigger('left')
      if (e.key === 'ArrowUp') { e.preventDefault(); trigger('up') }
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  })
  return (
    <div ref={ref}>
      <div className="relative mx-auto aspect-[3/4.35] w-full max-w-sm" aria-live="polite">
        <AnimatePresence>
          {visible.map((s, i) => (
            <Card key={s.adapted.recipe.id} s={s} depth={i} hideNumbers={hideNumbers}
              fly={flying?.id === s.adapted.recipe.id ? flying.dir : null}
              onDone={(dir) => { setFlying(null); onSwipe(s.adapted.recipe.id, dir) }} onInfo={() => onInfo(s)} />
          )).reverse()}
        </AnimatePresence>
      </div>
      {top && (
        <div className="mt-5 flex items-center justify-center gap-4">
          <button aria-label={`Pass on ${top.adapted.recipe.name}`} onClick={() => trigger('left')} className="grid h-16 w-16 place-items-center rounded-full border-2 bg-bg shadow-lg active:scale-95" style={{ borderColor: RED, color: RED }}><X size={30} strokeWidth={2.6} /></button>
          <button aria-label={`Skip ${top.adapted.recipe.name} for now`} disabled={queue.length < 2} onClick={() => trigger('up')} className="flex h-12 flex-col items-center justify-center rounded-full bg-surface px-3.5 text-[11px] font-bold leading-none shadow active:scale-95 disabled:opacity-40"><ChevronsUp size={18} aria-hidden />Skip</button>
          <button aria-label={`Details for ${top.adapted.recipe.name}`} onClick={() => onInfo(top)} className="grid h-12 w-12 place-items-center rounded-full bg-surface shadow active:scale-95"><Info size={20} /></button>
          <button aria-label={`Add ${top.adapted.recipe.name} to this week`} onClick={() => trigger('right')} className="grid h-16 w-16 place-items-center rounded-full border-2 bg-bg shadow-lg active:scale-95" style={{ borderColor: GREEN, color: GREEN }}><Heart size={28} strokeWidth={2.6} /></button>
        </div>
      )}
    </div>
  )
}

function Card({ s, depth, fly, onDone, onInfo, hideNumbers }: { s: Scored; depth: number; fly: SwipeDir | null; onDone: (d: SwipeDir) => void; onInfo: () => void; hideNumbers: boolean }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const skipOpacity = useTransform(y, [-110, -25], [1, 0])
  const rotate = useTransform(x, [-240, 240], [-14, 14])
  const border = useTransform(x, [-140, -24, 0, 24, 140], [RED, RED, 'rgba(0,0,0,0)', GREEN, GREEN])
  const likeOpacity = useTransform(x, [20, 110], [0, 1])
  const nopeOpacity = useTransform(x, [-110, -20], [1, 0])
  const done = useRef(false)
  const go = (dir: SwipeDir) => {
    if (done.current) return
    done.current = true
    const ease = [0.3, 0.7, 0.4, 1] as const
    if (dir === 'up') animate(y, -720, { duration: 0.3, ease }).then(() => {
      // the card may stay mounted at the back of a short deck, so put it back in place
      onDone(dir); y.set(0); done.current = false
    })
    else animate(x, dir === 'right' ? 520 : -520, { duration: 0.28, ease }).then(() => onDone(dir))
  }
  useEffect(() => { if (fly) go(fly) }) // eslint-disable-line react-hooks/exhaustive-deps
  const a = s.adapted, r = a.recipe, m = a.perServing
  const isTop = depth === 0
  return (
    <motion.article
      aria-label={isTop ? `${r.name}. ${Math.round(m.kcal)} kcal per serving.` : undefined} aria-hidden={!isTop}
      className={`absolute inset-0 flex select-none flex-col overflow-hidden rounded-[28px] border-[5px] bg-surface shadow-xl ${isTop ? 'touch-none' : ''}`}
      style={{ x, y, rotate, borderColor: border, zIndex: 10 - depth }}
      initial={{ scale: 0.92, y: 18, opacity: 0 }}
      animate={{ scale: 1 - depth * 0.045, y: depth * 14, opacity: depth > 1 ? 0.6 : 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      drag={isTop} dragSnapToOrigin dragElastic={0.9}
      onDragEnd={(_, info) => {
        const { x: ox, y: oy } = info.offset, { x: vx, y: vy } = info.velocity
        const upward = -oy > Math.abs(ox) * 1.2
        if (upward && (oy < -110 || vy < -700)) go('up')
        else if (!upward && (ox > 110 || vx > 700)) go('right')
        else if (!upward && (ox < -110 || vx < -700)) go('left')
      }}>
      <div className="relative min-h-0 flex-1">
        <RecipeArt art={r.art} hue={r.hue} label={r.name} />
        <HeartButton recipeId={r.id} className="absolute right-3 top-3" />
        <motion.span style={{ opacity: likeOpacity, borderColor: GREEN, color: GREEN }} className="absolute left-4 top-5 -rotate-12 rounded-xl border-4 bg-white/85 px-3 py-1 text-2xl font-black">ADD</motion.span>
        <motion.span style={{ opacity: nopeOpacity, borderColor: RED, color: RED }} className="absolute right-16 top-5 rotate-12 rounded-xl border-4 bg-white/85 px-3 py-1 text-2xl font-black">PASS</motion.span>
        <motion.span style={{ opacity: skipOpacity }} className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-xl border-4 border-[#5b5b5b] bg-white/85 px-3 py-1 text-2xl font-black text-[#3b3b3b]">SKIP</motion.span>
        {a.substitutions.length > 0 && <span className="absolute bottom-3 left-3 rounded-full bg-primary px-3 py-1 text-[12px] font-bold text-on-primary">Adapted for you</span>}
      </div>
      <div className="flex shrink-0 flex-col p-4">
        <h2 className="line-clamp-2 text-[1.3rem] leading-tight">{r.name}</h2>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{r.description}</p>
        {!hideNumbers && (
          <dl className="mt-3 grid grid-cols-4 gap-1.5 text-center">
            {[['kcal', Math.round(m.kcal)], ['protein', `${Math.round(m.protein)}g`], ['carbs', `${Math.round(m.carbs)}g`], ['fat', `${Math.round(m.fat)}g`]].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-bg py-1.5"><dd className="num display font-semibold">{v}</dd><dt className="text-[11px] text-muted">{k}</dt></div>
            ))}
          </dl>
        )}
        <div className="space-y-2 pt-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted">
            <span className="inline-flex items-center gap-1"><Clock size={14} aria-hidden /> {r.prep} prep · {r.cook} cook</span>
            <span className="inline-flex items-center gap-1"><ChefHat size={14} aria-hidden /> {r.difficulty}</span>
            <span>≈{money(a.costPerServing)}/serving</span>
          </div>
          <div className="flex items-center justify-between">
            <Tags a={a} compact />
            {isTop && <button onClick={onInfo} onPointerDown={(e) => e.stopPropagation()} className="text-[13px] font-semibold text-primary">Full recipe</button>}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
