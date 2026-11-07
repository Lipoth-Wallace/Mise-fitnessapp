import { motion } from 'framer-motion'
import { Fish, Leaf, Sprout, Flame, Heart, Clock, ChefHat, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '../store'
import type { AdaptedRecipe } from '../lib/safety'
import { costTier, renderStep } from '../lib/safety'
import { ING, displayQty } from '../lib/catalog'
import { money } from '../lib/util'
import { Button, Stepper, Notice } from './ui'

/** Illustrated plate standing in for a photo until a licensed photo source is configured. */
export function RecipeArt({ art, hue, size = 'lg', label }: { art: string[]; hue: number; size?: 'sm' | 'lg'; label: string }) {
  const big = size === 'lg'
  const pos = [
    { x: 50, y: 46, s: 1 }, { x: 28, y: 62, s: 0.62 }, { x: 72, y: 64, s: 0.6 }, { x: 64, y: 28, s: 0.5 },
  ]
  return (
    <div role="img" aria-label={`Illustration of ${label}`} className="relative h-full w-full overflow-hidden"
      style={{ background: `radial-gradient(120% 90% at 30% 10%, hsl(${hue} 85% 88%), hsl(${(hue + 25) % 360} 70% 72%))` }}>
      <div className="absolute left-1/2 top-1/2 aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle at 40% 35%, #ffffff, #f2efe9 62%, #e2ddd3 63%, #f7f5f1 70%, #e9e4da 100%)', boxShadow: '0 18px 40px -12px rgba(0,0,0,.35), inset 0 -6px 14px rgba(0,0,0,.06)' }} />
      {art.slice(0, 4).map((e, i) => (
        <span key={i} aria-hidden className="absolute -translate-x-1/2 -translate-y-1/2 select-none drop-shadow-md"
          style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%`, fontSize: `${(big ? 92 : 34) * pos[i].s}px`, transform: `translate(-50%,-50%) rotate(${(i * 37) % 30 - 15}deg)` }}>{e}</span>
      ))}
    </div>
  )
}

export function Tags({ a, compact }: { a: AdaptedRecipe; compact?: boolean }) {
  const tier = costTier(a.costPerServing)
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-[13px]">
      {a.tags.seafood && <span className="tag"><Fish size={14} aria-hidden /> Seafood</span>}
      {a.tags.vegan ? <span className="tag"><Leaf size={14} aria-hidden /> Vegan</span> : a.tags.vegetarian && <span className="tag"><Sprout size={14} aria-hidden /> Vegetarian</span>}
      {a.recipe.spice > 0 && (
        <span className="tag" aria-label={`Spice: ${['', 'mild', 'medium-hot', 'very spicy'][a.recipe.spice]}`}>
          {Array.from({ length: a.recipe.spice }).map((_, i) => <Flame key={i} size={14} className="text-bad" aria-hidden />)}
          {!compact && <span>{['', 'Mild', 'Medium/hot', 'Very spicy'][a.recipe.spice]}</span>}
        </span>
      )}
      <span className="tag" aria-label={`Cost: ${['', 'cheap', 'moderate', 'expensive'][tier]}`}>
        <span className="num font-bold">{'£'.repeat(tier)}<span className="opacity-30">{'£'.repeat(3 - tier)}</span></span>
      </span>
    </div>
  )
}

export function HeartButton({ recipeId, className = '' }: { recipeId: string; className?: string }) {
  const fav = useStore((s) => s.favourites.includes(recipeId))
  const toggle = useStore((s) => s.toggleFavourite)
  return (
    <motion.button whileTap={{ scale: 0.8 }} animate={fav ? { scale: [1, 1.35, 0.95, 1] } : { scale: 1 }} transition={{ duration: 0.45 }}
      aria-pressed={fav} aria-label={fav ? 'Remove from favourites' : 'Save to favourites'}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => { e.stopPropagation(); toggle(recipeId) }}
      className={`grid h-11 w-11 place-items-center rounded-full bg-white/90 shadow-md backdrop-blur ${className}`}>
      <Heart size={22} strokeWidth={2.2} style={{ color: fav ? 'var(--heart)' : '#2b2b2b', fill: fav ? 'var(--heart)' : 'transparent' }} />
    </motion.button>
  )
}

export function MacroStrip({ m, className = '' }: { m: { kcal: number; protein: number; carbs: number; fat: number }; className?: string }) {
  return (
    <dl className={`grid grid-cols-4 gap-2 text-center ${className}`}>
      {[['kcal', Math.round(m.kcal), ''], ['Protein', m.protein, 'g'], ['Carbs', m.carbs, 'g'], ['Fat', m.fat, 'g']].map(([k, v, u]) => (
        <div key={k as string} className="rounded-2xl bg-bg/70 px-1 py-2">
          <dd className="num display text-lg font-semibold">{typeof v === 'number' ? Math.round(v) : v}{u}</dd>
          <dt className="text-[12px] text-muted">{k}</dt>
        </div>
      ))}
    </dl>
  )
}

export function RecipeDetail({ a, onAdd, addLabel }: { a: AdaptedRecipe; onAdd?: () => void; addLabel?: string }) {
  const [servings, setServings] = useState(a.recipe.servings === 1 ? 1 : a.recipe.servings)
  const review = useStore((s) => s.reviews[a.recipe.id])
  const per = a.perServing
  const factor = servings / a.recipe.servings
  return (
    <div className="space-y-5">
      <div className="relative h-56 overflow-hidden rounded-[22px]">
        <RecipeArt art={a.recipe.art} hue={a.recipe.hue} label={a.recipe.name} />
        <HeartButton recipeId={a.recipe.id} className="absolute right-3 top-3" />
      </div>
      <div>
        <p className="text-muted">{a.recipe.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <span className="inline-flex items-center gap-1"><Clock size={15} aria-hidden /> {a.recipe.prep} min prep · {a.recipe.cook} min cook</span>
          <span className="inline-flex items-center gap-1"><ChefHat size={15} aria-hidden /> {a.recipe.difficulty}</span>
          <span>{a.recipe.cuisine}</span>
        </div>
        <div className="mt-3"><Tags a={a} /></div>
      </div>
      <div>
        <div className="mb-2 flex items-baseline justify-between"><h3>Per serving</h3><span className="text-[12px] text-muted">Calculated estimate · USDA data</span></div>
        <MacroStrip m={per} />
        <p className="mt-2 text-[13px] text-muted">Sugar {per.sugar}g · Fibre {per.fibre}g · Est. {money(a.costPerServing)} per serving</p>
      </div>

      {a.substitutions.length > 0 && (
        <div className="rounded-2xl border-2 border-dashed border-primary/50 p-4">
          <h3 className="mb-2">Adapted for you</h3>
          <ul className="space-y-1.5 text-sm">
            {a.substitutions.map((s) => (
              <li key={s.from}>
                <span className="strike text-muted">{ING.get(s.from)!.name}</span>{' '}
                {s.to ? <>→ <strong className="text-primary">{ING.get(s.to)!.name}</strong></> : <>→ <strong>left out</strong></>}
                <span className="text-muted"> ({s.reason}). The original has been removed from this recipe and your shopping list.</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[13px] text-muted">Replacements are checked against your allergies and diets using ingredient data. This is not a guarantee: always read the product label.</p>
        </div>
      )}

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3>Ingredients</h3>
          <Stepper label="servings" value={servings} min={1} max={12} onChange={setServings} />
        </div>
        <ul className="divide-y divide-line">
          {a.ingredients.map((x) => (
            <li key={x.id} className="flex justify-between gap-3 py-2.5">
              <span className={x.originalId ? 'font-semibold text-primary' : ''}>{ING.get(x.id)!.name}{x.originalId && <span className="ml-1 text-[12px] font-normal">(swap)</span>}</span>
              <span className="num shrink-0 text-muted">{displayQty(x.id, Math.round(x.grams * factor))}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2">Method</h3>
        <ol className="space-y-3">
          {a.recipe.steps.map((s, i) => {
            const { parts } = renderStep(s, a)
            return (
              <li key={i} className="flex gap-3">
                <span className="num mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-surface-2 text-[13px] font-bold">{i + 1}</span>
                <p>{parts.map((p, j) => (p.sub ? <strong key={j} className="text-primary">{p.text}</strong> : <span key={j}>{p.text}</span>))}</p>
              </li>
            )
          })}
        </ol>
      </div>

      <Notice tone="warn">
        <p className="flex gap-2"><AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden /><span>Ingredients vary by brand. Check every label for allergens and "may contain" warnings, and avoid cross-contamination when preparing food for someone with an allergy.</span></p>
        {a.labelWarnings.length > 0 && <ul className="mt-2 list-disc pl-6">{a.labelWarnings.map((w) => <li key={w}>{w}</li>)}</ul>}
      </Notice>

      {review?.variation && <Notice><strong>Your version:</strong> {review.variation}</Notice>}
      {onAdd && <Button className="w-full" size="lg" onClick={onAdd}>{addLabel ?? 'Add'}</Button>}
    </div>
  )
}
