import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { BarChart, Bar as RBar, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts'
import { useStore } from '../store'
import { useActiveList, useCurrentPlan } from '../hooks'
import { Bar, Button, Card, Field, Notice, PageHeader, Segmented } from '../components/ui'
import { addDays, fmtDate, isoDate, money, weekStart } from '../lib/util'
import { RECIPE } from '../lib/catalog'
import { adaptRecipe } from '../lib/safety'
import { safetyContext } from '../lib/recommend'

export default function Budget() {
  const allReceipts = useStore((s) => s.receipts)
  const receipts = allReceipts.filter((r) => r.finalised)
  const budget = useStore((s) => s.settings.budget)
  const update = useStore((s) => s.updateSettings)
  const profile = useStore((s) => s.profile)!
  const list = useActiveList()
  const plan = useCurrentPlan()
  const [period, setPeriod] = useState<'week' | 'month'>(budget?.period ?? 'week')
  const [amount, setAmount] = useState(budget?.amount?.toString() ?? '')
  const today = isoDate()
  const ws = weekStart(today)
  const ms = today.slice(0, 8) + '01'
  const from = (budget?.period ?? period) === 'week' ? ws : ms
  const spent = receipts.filter((r) => r.date >= from).reduce((s, r) => s + r.total, 0)
  const byShop = Object.entries(receipts.reduce<Record<string, number>>((a, r) => ({ ...a, [r.retailer]: (a[r.retailer] ?? 0) + r.total }), {})).sort((a, b) => b[1] - a[1])
  const weeks = Array.from({ length: 8 }, (_, i) => addDays(ws, (i - 7) * 7)).map((w) => ({ week: fmtDate(w, { day: 'numeric', month: 'short' }), spent: +receipts.filter((r) => r.date >= w && r.date < addDays(w, 7)).reduce((s, r) => s + r.total, 0).toFixed(2) }))
  const withData = weeks.filter((w) => w.spent > 0)
  const avgWeekly = withData.length ? withData.reduce((s, w) => s + w.spent, 0) / withData.length : 0
  const estUpcoming = list ? list.items.filter((i) => !i.checked && !i.haveAtHome).reduce((s, i) => s + (i.estCost * Math.max(0, i.qty - i.purchased)) / Math.max(i.qty, 1), 0) : 0
  const ctx = safetyContext(profile)
  const recipeCosts = plan ? [...new Set(plan.meals.map((m) => m.recipeId).filter(Boolean) as string[])].map((id) => { const r = adaptRecipe(RECIPE.get(id)!, ctx); return r.ok ? { name: r.adapted.recipe.name, cost: r.adapted.costPerServing } : null }).filter(Boolean) as { name: string; cost: number }[] : []
  const planEst = plan ? plan.meals.reduce((s, m) => { if (!m.recipeId || m.leftoverOf) return s; const r = adaptRecipe(RECIPE.get(m.recipeId)!, ctx); return r.ok ? s + r.adapted.costPerServing * m.servings : s }, 0) : 0
  // Estimated vs actual on matched receipt lines
  let est = 0, act = 0
  for (const r of receipts) {
    const l = useStore.getState().lists.find((x) => x.id === r.listId)
    for (const line of r.lines) { const it = l?.items.find((i) => i.id === line.matchItemId); if (it && it.estCost > 0) { est += it.estCost; act += line.price - line.discount } }
  }
  const near = budget && spent >= budget.amount * 0.8

  return (
    <div>
      <Link to="/shop" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"><ArrowLeft size={16} /> Shopping</Link>
      <PageHeader title="Grocery budget" />
      <Card className="mb-4">
        {budget ? (
          <>
            <div className="mb-2 flex items-baseline justify-between"><h2>This {budget.period}</h2><span className="text-sm text-muted">Budget {money(budget.amount)}</span></div>
            <p className="num display text-4xl font-semibold">{money(spent)}</p>
            <p className="mb-3 text-sm text-muted">{spent <= budget.amount ? `${money(budget.amount - spent)} left` : `${money(spent - budget.amount)} over`} · actual, from receipts</p>
            <Bar value={spent} max={budget.amount} color={spent > budget.amount ? 'var(--bad)' : 'var(--primary)'} label="Budget used" />
            {near && <div className="mt-3"><Notice tone="warn">You’re close to your budget. Turn on “Prioritise cheaper recipes” when planning; allergy and nutrition rules still apply.</Notice></div>}
          </>
        ) : <p className="text-muted">Set a budget to compare it with what you actually spend.</p>}
        <form className="mt-4 flex items-end gap-2" onSubmit={(e) => { e.preventDefault(); update({ budget: amount ? { period, amount: Number(amount) } : null }) }}>
          <div className="w-32"><Segmented label="Budget period" value={period} onChange={setPeriod} options={[{ id: 'week', label: 'Week' }, { id: 'month', label: 'Month' }]} /></div>
          <div className="flex-1"><Field label="Amount (£)"><input className="field num" type="number" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} /></Field></div>
          <Button type="submit" variant="soft">Save</Button>
        </form>
      </Card>

      <Card className="mb-4">
        <h2 className="mb-3">Spending by week</h2>
        {withData.length ? (
          <div className="h-44" role="img" aria-label="Weekly grocery spending for the last 8 weeks">
            <ResponsiveContainer>
              <BarChart data={weeks}><XAxis dataKey="week" tick={{ fontSize: 11, fill: 'var(--muted)' }} axisLine={false} tickLine={false} /><YAxis hide /><Tooltip formatter={(v) => money(Number(v))} contentStyle={{ borderRadius: 12, border: '1px solid var(--line)', background: 'var(--bg)' }} />
                {budget?.period === 'week' && <ReferenceLine y={budget.amount} stroke="var(--accent)" strokeDasharray="4 4" />}
                <RBar dataKey="spent" fill="var(--primary)" radius={[8, 8, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </div>
        ) : <p className="text-sm text-muted">Scan receipts to see your spending trend.</p>}
        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div><dt className="text-muted">Average week (actual)</dt><dd className="num display text-lg font-semibold">{avgWeekly ? money(avgWeekly) : '—'}</dd></div>
          <div><dt className="text-muted">Upcoming shop (estimated)</dt><dd className="num display text-lg font-semibold">{list ? `≈${money(estUpcoming)}` : '—'}</dd></div>
          <div><dt className="text-muted">This week’s plan (estimated)</dt><dd className="num display text-lg font-semibold">{plan ? `≈${money(planEst)}` : '—'}</dd></div>
          <div><dt className="text-muted">Receipts vs estimates</dt><dd className="num display text-lg font-semibold">{est > 0 ? `${act >= est ? '+' : '−'}${Math.abs(Math.round(((act - est) / est) * 100))}%` : '—'}</dd></div>
        </dl>
      </Card>

      {byShop.length > 0 && (
        <Card className="mb-4"><h2 className="mb-3">By supermarket</h2>
          <ul className="space-y-2">{byShop.map(([shop, v]) => <li key={shop} className="flex justify-between"><span>{shop}</span><span className="num font-semibold">{money(v)}</span></li>)}</ul>
        </Card>
      )}
      {recipeCosts.length > 0 && (
        <Card><h2 className="mb-1">Cost per serving</h2><p className="mb-3 text-[13px] text-muted">Estimated from typical UK prices, not your receipts.</p>
          <ul className="space-y-2">{recipeCosts.sort((a, b) => b.cost - a.cost).map((r) => <li key={r.name} className="flex justify-between gap-3"><span>{r.name}</span><span className="num shrink-0 text-muted">≈{money(r.cost)}</span></li>)}</ul>
        </Card>
      )}
    </div>
  )
}
