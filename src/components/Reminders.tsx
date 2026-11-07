/**
 * In-app reminders. GitHub Pages is static hosting with no push server, so reminders appear when the app
 * is opened (and as a system notification if permission was granted and the app is open at the time).
 */
import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { X, ShoppingBasket, CalendarHeart, Scale, Droplets, Dumbbell } from 'lucide-react'
import { useStore } from '../store'
import { useActiveList, useCurrentPlan } from '../hooks'
import { dayIndex, isoDate, weekStart, addDays } from '../lib/util'

interface Rem { id: string; icon: typeof X; text: string; to: string; cta: string }

export function useDueReminders(now = new Date()): Rem[] {
  const profile = useStore((s) => s.profile)
  const notify = useStore((s) => s.settings.notify)
  const workoutsEnabled = useStore((s) => s.settings.workoutsEnabled)
  const dismissed = useStore((s) => s.dismissed)
  const weights = useStore((s) => s.weights)
  const water = useStore((s) => s.water)
  const waterGoal = useStore((s) => s.settings.waterGoal)
  const schedule = useStore((s) => s.schedule)
  const workouts = useStore((s) => s.workouts)
  const list = useActiveList()
  const plan = useCurrentPlan()
  return useMemo(() => {
    if (!profile) return []
    const today = isoDate(now)
    const dow = dayIndex(today)
    const hhmm = now.toTimeString().slice(0, 5)
    const out: Rem[] = []
    const open = list?.items.filter((i) => !i.checked && !i.haveAtHome).length ?? 0
    if (notify.shopping && profile.shopping.days.includes(dow) && hhmm >= profile.shopping.reminderTime && open > 0)
      out.push({ id: 'shopping', icon: ShoppingBasket, text: `It's a shopping day. Your list has ${open} item${open === 1 ? '' : 's'} left.`, to: '/shop', cta: 'Open list' })
    const nextWeek = addDays(weekStart(today), 7)
    if (notify.planning && dow >= 4 && !(plan && plan.weekStart >= nextWeek))
      out.push({ id: 'planning', icon: CalendarHeart, text: 'Plan next week’s meals so your list is ready before you shop.', to: '/plan', cta: 'Plan meals' })
    const lastWeigh = [...weights].sort((a, b) => b.date.localeCompare(a.date))[0]
    if (notify.weighIn && (!lastWeigh || lastWeigh.date <= addDays(today, -7)))
      out.push({ id: 'weighIn', icon: Scale, text: 'Weekly weigh-in: log your weight if you’d like to track your trend.', to: '/more/weight', cta: 'Log weight' })
    const drank = water.filter((w) => w.date === today).reduce((s, w) => s + w.ml, 0)
    if (notify.water && hhmm >= '14:00' && drank < waterGoal * 0.4)
      out.push({ id: 'water', icon: Droplets, text: 'A reminder to drink some water.', to: '/', cta: 'Log water' })
    if (notify.workout && workoutsEnabled && schedule[dow] && !workouts.some((w) => w.date === today))
      out.push({ id: 'workout', icon: Dumbbell, text: 'You have a workout scheduled today.', to: '/more/workouts', cta: 'Open' })
    if (notify.meals && plan) {
      const todays = plan.meals.filter((m) => addDays(plan.weekStart, m.day) === today && !m.eatenEntryId)
      if (todays.length && hhmm >= '17:00') out.push({ id: 'meals', icon: CalendarHeart, text: `You have ${todays.length} planned meal${todays.length > 1 ? 's' : ''} not logged today.`, to: '/plan', cta: 'View plan' })
    }
    if (notify.mealPrep && plan && dow === 6 && hhmm >= '10:00') out.push({ id: 'mealPrep', icon: CalendarHeart, text: 'Sunday prep: batch-cook anything planned as leftovers.', to: '/plan', cta: 'View plan' })
    return out.filter((r) => dismissed[r.id] !== today)
  }, [profile, notify, dismissed, weights, water, waterGoal, schedule, workouts, workoutsEnabled, list, plan, now])
}

export function Reminders() {
  const due = useDueReminders()
  const dismiss = (id: string) => useStore.setState((s) => ({ dismissed: { ...s.dismissed, [id]: isoDate() } }))
  useEffect(() => {
    if (!due.length || typeof Notification === 'undefined' || Notification.permission !== 'granted') return
    const shownKey = `mise-notified-${isoDate()}`
    const shown = new Set(JSON.parse(sessionStorage.getItem(shownKey) ?? '[]'))
    for (const r of due) {
      if (shown.has(r.id)) continue
      navigator.serviceWorker?.ready.then((reg) => reg.showNotification('Mise', { body: r.text, tag: r.id, data: { url: `#${r.to}` } })).catch(() => {})
      shown.add(r.id)
    }
    sessionStorage.setItem(shownKey, JSON.stringify([...shown]))
  }, [due])
  if (!due.length) return null
  return (
    <div className="mb-4 space-y-2" aria-live="polite">
      {due.slice(0, 2).map((r) => (
        <div key={r.id} className="flex items-center gap-3 rounded-2xl bg-surface-2 px-4 py-3">
          <r.icon size={20} aria-hidden className="shrink-0" />
          <p className="flex-1 text-sm">{r.text} <Link to={r.to} className="font-semibold underline underline-offset-2">{r.cta}</Link></p>
          <button aria-label="Dismiss reminder" className="grid h-8 w-8 place-items-center" onClick={() => dismiss(r.id)}><X size={16} /></button>
        </div>
      ))}
    </div>
  )
}
