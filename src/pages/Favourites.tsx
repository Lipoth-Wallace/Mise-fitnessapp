import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useStore } from '../store'
import { useSafety } from '../hooks'
import { Button, Empty, Notice, PageHeader, Sheet } from '../components/ui'
import { ReviewForm } from '../components/ReviewForm'
import { RecipeArt, RecipeDetail, HeartButton } from '../components/recipe'
import { RECIPE } from '../lib/catalog'
import { adaptRecipe } from '../lib/safety'

export default function Favourites() {
  const favs = useStore((s) => s.favourites)
  const ctx = useSafety()!
  const [open, setOpen] = useState<string | null>(null)
  const items = favs.map((id) => ({ id, r: RECIPE.get(id), res: RECIPE.get(id) ? adaptRecipe(RECIPE.get(id)!, ctx) : null })).filter((x) => x.r)
  const sel = items.find((x) => x.id === open)
  return (
    <div>
      <Link to="/more" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"><ArrowLeft size={16} /> More</Link>
      <PageHeader title="Favourites" sub="Cook later" />
      {items.length === 0 ? <Empty title="Nothing saved yet" body="Tap the heart on any recipe card. Favourites show up more often in your decks." action={<Link to="/plan"><Button size="sm">Browse recipes</Button></Link>} /> : (
        <ul className="grid grid-cols-2 gap-3">
          {items.map(({ id, r, res }) => (
            <li key={id} className="card relative overflow-hidden p-0">
              <button className="block w-full text-left" onClick={() => setOpen(id)}>
                <div className="h-32"><RecipeArt size="sm" art={r!.art} hue={r!.hue} label={r!.name} /></div>
                <div className="p-3"><p className="font-semibold leading-tight">{r!.name}</p><p className="text-[12px] text-muted">{res?.ok ? `${Math.round(res.adapted.perServing.kcal)} kcal` : 'Not suitable for you now'}</p></div>
              </button>
              <HeartButton recipeId={id} className="absolute right-2 top-2 !h-9 !w-9" />
            </li>
          ))}
        </ul>
      )}
      <Sheet open={!!sel} onClose={() => setOpen(null)} title={sel?.r?.name ?? ''}>
        {sel?.res?.ok ? <><RecipeDetail a={sel.res.adapted} /><div className="mt-6"><ReviewForm a={sel.res.adapted} /></div></> : sel && <Notice tone="bad">This recipe no longer fits your allergies or diet{sel.res && !sel.res.ok ? `: ${sel.res.reason}` : ''}.</Notice>}
      </Sheet>
    </div>
  )
}
