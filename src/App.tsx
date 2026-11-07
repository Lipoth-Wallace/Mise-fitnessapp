import { HashRouter, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Home, BookOpen, CalendarHeart, ShoppingBasket, Menu } from 'lucide-react'
import { useEffect, lazy, Suspense } from 'react'
import { useStore } from './store'
import Onboarding from './pages/Onboarding'
import Today from './pages/Today'
import Diary from './pages/Diary'
import Plan from './pages/Plan'
import Shop from './pages/Shop'
import More from './pages/More'
import { Reminders } from './components/Reminders'

const Weight = lazy(() => import('./pages/Weight'))
const Workouts = lazy(() => import('./pages/Workouts'))
const Settings = lazy(() => import('./pages/Settings'))
const Favourites = lazy(() => import('./pages/Favourites'))
const Receipts = lazy(() => import('./pages/Receipts'))
const Budget = lazy(() => import('./pages/Budget'))
const About = lazy(() => import('./pages/About'))

function useTheme() {
  const theme = useStore((s) => s.settings.theme)
  const gender = useStore((s) => s.profile?.gender)
  const resolved = theme ?? (gender === 'male' ? 'noir' : gender === 'female' ? 'rose' : 'sage')
  useEffect(() => {
    document.documentElement.dataset.theme = resolved
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg || '#ffffff')
  }, [resolved])
}

const NAV = [
  { to: '/', label: 'Today', icon: Home },
  { to: '/diary', label: 'Diary', icon: BookOpen },
  { to: '/plan', label: 'Plan', icon: CalendarHeart },
  { to: '/shop', label: 'Shop', icon: ShoppingBasket },
  { to: '/more', label: 'More', icon: Menu },
]

function Shell() {
  const loc = useLocation()
  const top = '/' + (loc.pathname.split('/')[1] ?? '')
  return (
    <div className="mx-auto flex min-h-full max-w-xl flex-col">
      <a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
      <main id="main" className="safe-top flex-1 px-5 pb-28">
        <Reminders />
        <AnimatePresence mode="wait">
          <motion.div key={top} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            <Suspense fallback={<p className="py-10 text-muted">Loading…</p>}>
              <Routes location={loc}>
                <Route path="/" element={<Today />} />
                <Route path="/diary" element={<Diary />} />
                <Route path="/plan" element={<Plan />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/receipts" element={<Receipts />} />
                <Route path="/shop/budget" element={<Budget />} />
                <Route path="/more" element={<More />} />
                <Route path="/more/weight" element={<Weight />} />
                <Route path="/more/workouts" element={<Workouts />} />
                <Route path="/more/favourites" element={<Favourites />} />
                <Route path="/more/settings" element={<Settings />} />
                <Route path="/more/about" element={<About />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <nav aria-label="Main" className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/92 backdrop-blur-md">
        <ul className="mx-auto grid max-w-xl grid-cols-5">
          {NAV.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={({ isActive }) => `flex flex-col items-center gap-0.5 pt-2.5 pb-1 text-[11px] font-semibold ${isActive ? 'text-primary' : 'text-muted'}`}>
                {({ isActive }) => (<><span className={`grid h-8 w-14 place-items-center rounded-full transition-colors ${isActive ? 'bg-surface-2' : ''}`}><Icon size={21} strokeWidth={isActive ? 2.4 : 2} aria-hidden /></span>{label}</>)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default function App() {
  useTheme()
  const hasProfile = useStore((s) => !!s.profile)
  return <HashRouter>{hasProfile ? <Shell /> : <Onboarding />}</HashRouter>
}
