import { Link } from 'react-router-dom'
import { Scale, Dumbbell, Heart, Settings, Info, ChevronRight, Receipt, PiggyBank } from 'lucide-react'
import { useStore } from '../store'
import { PageHeader } from '../components/ui'

export default function More() {
  const workouts = useStore((s) => s.settings.workoutsEnabled)
  const items = [
    { to: '/more/weight', icon: Scale, label: 'Weight & progress photos', sub: 'Log weigh-ins, see your trend' },
    ...(workouts ? [{ to: '/more/workouts', icon: Dumbbell, label: 'Workouts', sub: 'Sessions, routines and progress' }] : []),
    { to: '/more/favourites', icon: Heart, label: 'Favourites & cook later', sub: 'Recipes you’ve saved' },
    { to: '/shop/receipts', icon: Receipt, label: 'Receipts', sub: 'Scanned shops and history' },
    { to: '/shop/budget', icon: PiggyBank, label: 'Budget', sub: 'Spending against your budget' },
    { to: '/more/settings', icon: Settings, label: 'Settings', sub: 'Profile, targets, theme, data' },
    { to: '/more/about', icon: Info, label: 'About & data sources', sub: 'How numbers are worked out' },
  ]
  return (
    <div>
      <PageHeader title="More" />
      <ul className="card divide-y divide-line px-2">
        {items.map(({ to, icon: Icon, label, sub }) => (
          <li key={to}><Link to={to} className="flex items-center gap-4 px-3 py-4">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-surface-2"><Icon size={20} aria-hidden /></span>
            <span className="flex-1"><span className="block font-semibold">{label}</span><span className="text-[13px] text-muted">{sub}</span></span>
            <ChevronRight size={18} className="text-muted" aria-hidden />
          </Link></li>
        ))}
      </ul>
    </div>
  )
}
