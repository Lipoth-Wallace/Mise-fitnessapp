import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight, Download, Trash2, Bell } from 'lucide-react'
import { clear as idbClear } from 'idb-keyval'
import { useStore, type Settings as S } from '../store'
import { useTargets } from '../hooks'
import { Button, Card, Field, Notice, PageHeader, Sheet } from '../components/ui'
import { AboutFields, ActivityFields, GoalFields, HealthFields, DietFields, AllergyFields, FoodFields, ShoppingFields } from '../components/ProfileFields'
import { ThemePicker } from '../components/ThemePicker'
import type { Profile } from '../types'
import { ACTIVITY, PHYSIQUE, computeTargets } from '../lib/nutrition'

const SECTIONS: { id: string; title: string; C: (p: { p: Profile; set: (x: Partial<Profile>) => void }) => ReactNode; summary: (p: Profile) => string }[] = [
  { id: 'about', title: 'Personal details', C: AboutFields, summary: (p) => `${p.name} · ${Math.round(p.heightCm)} cm · ${p.weightKg.toFixed(1)} kg` },
  { id: 'activity', title: 'Activity level', C: ActivityFields, summary: (p) => ACTIVITY[p.activity].label },
  { id: 'goals', title: 'Goals', C: GoalFields, summary: (p) => `${p.direction === 'lose' ? 'Lose' : p.direction === 'gain' ? 'Gain' : 'Maintain'} weight · ${PHYSIQUE[p.physique].label}` },
  { id: 'health', title: 'Health circumstances', C: HealthFields, summary: (p) => (p.circumstances.length ? `${p.circumstances.length} selected` : 'None') },
  { id: 'diet', title: 'Diets', C: DietFields, summary: (p) => (p.diets.length ? p.diets.join(', ') : 'No restrictions') },
  { id: 'allergies', title: 'Allergies & intolerances', C: AllergyFields, summary: (p) => { const n = p.allergens.length + p.allergyIngredients.length; return n ? `${n} excluded` : 'None' } },
  { id: 'food', title: 'Cuisines & dislikes', C: FoodFields, summary: (p) => `${p.cuisines.length} cuisines · ${p.dislikes.length} dislikes` },
  { id: 'shopping', title: 'Shopping days', C: ShoppingFields, summary: (p) => `${p.shopping.days.length} day${p.shopping.days.length === 1 ? '' : 's'} · reminders at ${p.shopping.reminderTime}` },
]

const NOTIFY: { id: keyof S['notify']; label: string }[] = [
  { id: 'shopping', label: 'Shopping days' }, { id: 'planning', label: 'Weekly meal planning' }, { id: 'meals', label: 'Planned meals not logged' },
  { id: 'mealPrep', label: 'Sunday meal prep' }, { id: 'water', label: 'Water' }, { id: 'weighIn', label: 'Weekly weigh-in' }, { id: 'workout', label: 'Scheduled workouts' },
]

export default function Settings() {
  const profile = useStore((s) => s.profile)!
  const settings = useStore((s) => s.settings)
  const update = useStore((s) => s.updateSettings)
  const [open, setOpen] = useState<string | null>(null)
  const [draft, setDraft] = useState<Profile>(profile)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [perm, setPerm] = useState(typeof Notification === 'undefined' ? 'unsupported' : Notification.permission)
  const t = useTargets()!
  const sec = SECTIONS.find((s) => s.id === open)
  const theme = settings.theme ?? (profile.gender === 'male' ? 'noir' : profile.gender === 'female' ? 'rose' : 'sage')

  const exportData = () => {
    const { set: _a, ...rest } = useStore.getState() as unknown as Record<string, unknown>
    const data = Object.fromEntries(Object.entries(rest).filter(([, v]) => typeof v !== 'function'))
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), app: 'Mise', note: 'Photos and receipt images are not included.', data }, null, 2)], { type: 'application/json' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `mise-export-${new Date().toISOString().slice(0, 10)}.json`; a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 1000)
  }
  const deleteAll = async () => { await idbClear(); useStore.getState().resetAll(); localStorage.removeItem('mise-v1'); location.hash = '#/'; location.reload() }

  return (
    <div>
      <Link to="/more" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"><ArrowLeft size={16} /> More</Link>
      <PageHeader title="Settings" />

      <h2 className="mb-2">Your profile</h2>
      <ul className="card mb-6 divide-y divide-line px-4">
        {SECTIONS.map((s) => (
          <li key={s.id}><button className="flex w-full items-center justify-between gap-3 py-3.5 text-left" onClick={() => { setDraft(profile); setOpen(s.id) }}>
            <span><span className="block font-semibold">{s.title}</span><span className="text-[13px] text-muted">{s.summary(profile)}</span></span><ChevronRight size={18} className="text-muted" aria-hidden />
          </button></li>
        ))}
      </ul>

      <h2 className="mb-2">Nutrition targets</h2>
      <Card className="mb-6 space-y-4">
        <p className="text-sm text-muted">Calculated: {computeTargets(profile).kcal} kcal, {computeTargets(profile).protein}g protein. Override if your dietitian or experience suggests otherwise. Carbs fill the remaining energy so the numbers always add up.</p>
        <div className="grid grid-cols-3 gap-3">
          {(['kcal', 'protein', 'fat'] as const).map((k) => (
            <Field key={k} label={k === 'kcal' ? 'kcal' : `${k[0].toUpperCase() + k.slice(1)} (g)`}>
              <input className="field num" type="number" inputMode="numeric" placeholder={String(t[k])} value={settings.overrides[k] ?? ''} onChange={(e) => update({ overrides: { ...settings.overrides, [k]: e.target.value ? Number(e.target.value) : undefined } })} />
            </Field>
          ))}
        </div>
        <p className="num text-sm">Now: <strong>{t.kcal} kcal</strong> · P {t.protein}g · C {t.carbs}g · F {t.fat}g</p>
        {t.guarded && <Notice tone="warn">Overrides can’t go below your maintenance estimate because of the health answers you gave.</Notice>}
        {Object.keys(settings.overrides).some((k) => settings.overrides[k as 'kcal'] != null) && <Button size="sm" variant="ghost" onClick={() => update({ overrides: {} })}>Reset to calculated</Button>}
        <Field label="Daily water goal (ml)"><input className="field num" type="number" step="100" value={settings.waterGoal} onChange={(e) => update({ waterGoal: Number(e.target.value) || 2000 })} /></Field>
        <Field label="Quick-add water sizes (ml)" hint="Comma separated, e.g. 250, 500"><input className="field" defaultValue={settings.waterServings.join(', ')} onBlur={(e) => { const v = e.target.value.split(',').map((x) => Number(x.trim())).filter((x) => x > 0); if (v.length) update({ waterServings: v }) }} /></Field>
      </Card>

      <h2 className="mb-2">Colour theme</h2>
      <Card className="mb-6"><ThemePicker value={theme} onChange={(th) => update({ theme: th })} /></Card>

      <h2 className="mb-2">Notifications</h2>
      <Card className="mb-6 space-y-3">
        <p className="text-sm text-muted">Reminders appear in the app when you open it. With notifications allowed they also show as alerts while Mise is open. Background push needs a server, which this version doesn’t have.</p>
        {perm === 'default' && <Button size="sm" variant="soft" onClick={async () => setPerm(await Notification.requestPermission())}><Bell size={14} /> Allow notifications</Button>}
        {perm === 'denied' && <Notice>Notifications are blocked for this app. You’ll still see reminders inside Mise.</Notice>}
        {perm === 'unsupported' && <Notice>On iPhone, notifications only work after adding Mise to your Home Screen.</Notice>}
        <ul className="divide-y divide-line">
          {NOTIFY.map((n) => (
            <li key={n.id}><label className="flex items-center justify-between py-2.5"><span>{n.label}</span><input type="checkbox" role="switch" className="h-5 w-5 accent-[var(--primary)]" checked={settings.notify[n.id]} onChange={(e) => update({ notify: { ...settings.notify, [n.id]: e.target.checked } })} /></label></li>
          ))}
        </ul>
      </Card>

      <h2 className="mb-2">Display</h2>
      <Card className="mb-6">
        <ul className="divide-y divide-line">
          {([['showProgress', 'Daily check-ins on Today'], ['hideNumbers', 'Hide calorie numbers'], ['workoutsEnabled', 'Workout tracking'], ['trackSurplus', 'Add extra bought from receipts to pantry']] as const).map(([k, label]) => (
            <li key={k}><label className="flex items-center justify-between py-2.5"><span>{label}</span><input type="checkbox" role="switch" className="h-5 w-5 accent-[var(--primary)]" checked={settings[k]} onChange={(e) => update({ [k]: e.target.checked } as Partial<S>)} /></label></li>
          ))}
        </ul>
      </Card>

      <h2 className="mb-2">Your data</h2>
      <Card className="mb-6 space-y-3">
        <p className="text-sm text-muted">Everything, including allergies, health answers and photos, is stored only in this browser on this device. Nothing is sent to a server. Clearing Safari website data or removing the app will delete it, so export regularly.</p>
        <Button variant="soft" className="w-full" onClick={exportData}><Download size={16} /> Export my data (JSON)</Button>
        <Button variant="ghost" className="w-full !text-bad" onClick={() => setConfirmDelete(true)}><Trash2 size={16} /> Delete all my data</Button>
      </Card>

      <Sheet open={!!sec} onClose={() => setOpen(null)} title={sec?.title ?? ''}>
        {sec && <div className="space-y-6"><sec.C p={draft} set={(x) => setDraft((d) => ({ ...d, ...x }))} />
          <Button className="w-full" size="lg" onClick={() => { useStore.getState().setProfile(draft); setOpen(null) }}>Save changes</Button>
          <p className="text-center text-[13px] text-muted">Changes apply straight away to targets, recipe suggestions and future shopping lists.</p></div>}
      </Sheet>
      <Sheet open={confirmDelete} onClose={() => setConfirmDelete(false)} title="Delete everything?">
        <p className="mb-4">This permanently deletes your profile, diary, plans, lists, receipts, photos and workouts from this device. It can’t be undone.</p>
        <div className="flex gap-3"><Button variant="ghost" className="flex-1" onClick={() => setConfirmDelete(false)}>Cancel</Button><Button variant="danger" className="flex-1" onClick={deleteAll}>Delete everything</Button></div>
      </Sheet>
    </div>
  )
}
