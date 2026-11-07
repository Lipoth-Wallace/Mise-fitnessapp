/**
 * Receipt text → structured purchases → shopping-list reconciliation.
 * OCR happens in ocr.ts (Tesseract.js, on-device). This module is pure and unit-tested.
 */
import type { ReceiptLine, ShopItem, MatchStatus } from '../types'
import { ING } from './catalog'
import { toBase } from './shopping'
import { hashString, uid } from './util'

const RETAILERS: [RegExp, string][] = [
  [/tesco/i, 'Tesco'], [/sainsbury/i, "Sainsbury's"], [/\basda\b/i, 'Asda'], [/morrisons/i, 'Morrisons'], [/\baldi\b/i, 'Aldi'],
  [/\blidl\b/i, 'Lidl'], [/co-?op/i, 'Co-op'], [/waitrose/i, 'Waitrose'], [/marks\s*&?\s*spencer|\bm\s?&\s?s\b/i, 'M&S'],
  [/iceland/i, 'Iceland'], [/ocado/i, 'Ocado'], [/spar\b/i, 'Spar'],
]
const SKIP = /\b(sub\s?total|total|balance|change|cash|card|visa|mastercard|amex|contactless|debit|credit|vat|tax|auth|merchant|terminal|tel|www|thank|receipt|points|clubcard\s+points|nectar\s+points|store|till|cashier|aid|pan seq|transaction|refund|items?\s+sold)\b/i
const DISCOUNT = /\b(clubcard\s+price|nectar\s+price|saving|discount|offer|promo|reduced|multi\s?buy|coupon|price\s+cut|\bx-?off\b)\b|^\s*-/i

const money = String.raw`-?£?\s?(\d{1,4}[.,]\d{2})\s*-?`

export interface ParsedReceipt {
  retailer: string; date: string | null; total: number | null
  lines: Omit<ReceiptLine, 'matchItemId' | 'confidence' | 'confirmed' | 'addToPantry'>[]
}

export function parseReceiptText(text: string): ParsedReceipt {
  const rawLines = text.split(/\r?\n/).map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean)
  // Overlapping photos of one long receipt repeat lines at the seam: drop immediate repeats.
  const lines = rawLines.filter((l, i) => l !== rawLines[i - 1])
  const retailer = RETAILERS.find(([re]) => re.test(text))?.[1] ?? 'Unknown shop'
  const dm = text.match(/\b(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})\b/)
  let date: string | null = null
  if (dm) {
    const d = Number(dm[1]), m = Number(dm[2]); let y = Number(dm[3]); if (y < 100) y += 2000
    if (d >= 1 && d <= 31 && m >= 1 && m <= 12) date = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  }
  let total: number | null = null
  const items: ParsedReceipt['lines'] = []
  let pendingQty: number | null = null
  const priceAtEnd = new RegExp(`^(.*?)\\s+${money}\\s*[A-Z*]?$`)

  for (const line of lines) {
    const tm = line.match(new RegExp(`\\b(total|balance due|amount due|to pay)\\b.*?${money}`, 'i'))
    if (tm && !/sub\s?total/i.test(line)) { total = parseFloat(tm[2].replace(',', '.')); continue }
    const qm = line.match(/^(\d+)\s*(?:x|@)\s*£?\d+[.,]\d{2}/i)
    if (qm) { pendingQty = Number(qm[1]); continue }
    const pm = line.match(priceAtEnd)
    if (!pm) continue
    const desc = pm[1].trim()
    const amount = parseFloat(pm[2].replace(',', '.'))
    if (DISCOUNT.test(line) || /-\s*£?\s?\d+[.,]\d{2}|\d+[.,]\d{2}\s*-$/.test(line)) {
      const prev = items[items.length - 1]
      if (prev) prev.discount += amount
      continue
    }
    if (SKIP.test(desc) || desc.length < 2 || !/[a-z]{2}/i.test(desc)) continue
    const q = extractQuantity(desc)
    items.push({ id: uid(), raw: line, name: tidyName(desc), price: amount, discount: 0, qty: pendingQty && q.unit === 'each' ? pendingQty * (q.qty ?? 1) : q.qty ? q.qty * (pendingQty ?? 1) : pendingQty, unit: q.unit ?? (pendingQty ? 'each' : null) })
    pendingQty = null
  }
  return { retailer, date, total, lines: items }
}

const tidyName = (s: string) => s.replace(/\s{2,}/g, ' ').replace(/^\d+\s+/, '').trim()

/** Pull a usable quantity from a product description, e.g. "1.0KG", "500G", "2L", "x12", "4PK". */
export function extractQuantity(desc: string): { qty: number | null; unit: 'g' | 'ml' | 'each' | null } {
  const s = desc.toLowerCase()
  const multi = s.match(/(\d+)\s*x\s*(\d+(?:\.\d+)?)\s*(kg|g|ml|l|ltr|cl)\b/)
  if (multi) { const r = unitConv(Number(multi[2]), multi[3]); return { qty: r.qty * Number(multi[1]), unit: r.unit } }
  const m = s.match(/(\d+(?:\.\d+)?)\s*(kg|g|ml|l|ltr|litre|litres|cl)\b/)
  if (m) return unitConv(Number(m[1]), m[2])
  const c = s.match(/(?:x\s?(\d+)\b|\b(\d+)\s?(?:pk|pack|pcs|eggs)\b)/)
  if (c) return { qty: Number(c[1] ?? c[2]), unit: 'each' }
  return { qty: null, unit: null }
}
function unitConv(n: number, u: string): { qty: number; unit: 'g' | 'ml' } {
  if (u === 'kg') return { qty: n * 1000, unit: 'g' }
  if (u === 'g') return { qty: n, unit: 'g' }
  if (u === 'cl') return { qty: n * 10, unit: 'ml' }
  if (u === 'ml') return { qty: n, unit: 'ml' }
  return { qty: n * 1000, unit: 'ml' }
}

// ── Matching ───────────────────────────────────────────────────
const STOP = new Set(['the', 'and', 'with', 'of', 'in', 'large', 'medium', 'small', 'free', 'range', 'fresh', 'british', 'organic', 'finest', 'taste', 'difference', 'tesco', 'sainsburys', 'asda', 'by', 'essential', 'value', 'pack', 'pk', 'x', 'loose', 'everyday', 'extra', 'special', 'deluxe', 'best', 'own', 'brand', 'kg', 'g', 'ml', 'l', 'ltr'])
const ALIASES: Record<string, string> = { fillet: 'fillet', fillets: 'fillet', breasts: 'breast', thighs: 'thigh', toms: 'tomatoes', tomato: 'tomatoes', potatoe: 'potatoes', potato: 'potatoes', banana: 'bananas', egg: 'eggs', onion: 'onions', carrot: 'carrots', lemon: 'lemons', lime: 'limes', semi: 'semi', skimmed: 'skimmed', yoghurt: 'yogurt', 'chick': 'chick' }

export function normalise(s: string): string[] {
  return s.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w)).map((w) => ALIASES[w] ?? w)
}

/** Confidence 0–1 that a receipt description is the given ingredient. */
export function matchScore(desc: string, ingredientId: string): number {
  const i = ING.get(ingredientId)
  if (!i) return 0
  const d = ' ' + normalise(desc).join(' ') + ' '
  const dt = new Set(normalise(desc))
  let best = 0
  for (const phrase of [i.name, ...i.synonyms]) {
    const pt = normalise(phrase)
    if (!pt.length) continue
    if (d.includes(' ' + pt.join(' ') + ' ')) best = Math.max(best, 0.6 + 0.35 * Math.min(1, pt.length / Math.max(dt.size, 1)) + (pt.length > 1 ? 0.05 : 0))
    const overlap = pt.filter((w) => dt.has(w)).length
    if (overlap) best = Math.max(best, (overlap / pt.length) * 0.7 * Math.min(1, overlap / Math.max(1, dt.size) + 0.4))
  }
  return Math.min(1, best)
}

export const CONFIDENT = 0.75

export function bestMatch(desc: string, items: ShopItem[]): { itemId: string | null; confidence: number } {
  let best: { itemId: string | null; confidence: number } = { itemId: null, confidence: 0 }
  for (const it of items) {
    const c = it.ingredientId ? matchScore(desc, it.ingredientId) : simpleScore(desc, it.name)
    if (c > best.confidence) best = { itemId: it.id, confidence: c }
  }
  return best.confidence >= 0.35 ? best : { itemId: null, confidence: best.confidence }
}
function simpleScore(desc: string, name: string) {
  const a = new Set(normalise(desc)), b = normalise(name)
  if (!b.length) return 0
  return (b.filter((w) => a.has(w)).length / b.length) * 0.8
}

/** Purchased amount of a receipt line in the list item's base unit, or null if it can't be determined. */
export function purchasedBase(line: Pick<ReceiptLine, 'qty' | 'unit'>, item: ShopItem): number | null {
  if (line.qty == null || line.unit == null) return null
  if (!item.ingredientId) return item.unit === line.unit || (item.unit === 'each' && line.unit === 'each') ? line.qty : null
  const i = ING.get(item.ingredientId)!
  if (line.unit === 'each') return i.gPerUnit ? line.qty * i.gPerUnit : null
  const itemUnit = i.unit === 'ml' ? 'ml' : 'g'
  if (line.unit === itemUnit) return line.qty
  // g ↔ ml for water-like products only: treat 1 ml ≈ 1 g
  return toBase(item.ingredientId, line.qty, line.unit)
}

/**
 * Status for the review screen. Never 'full' unless the match is confident, the quantity is known,
 * and the line has been confirmed or the confidence is high.
 */
export function lineStatus(line: ReceiptLine, item: ShopItem | undefined): { status: MatchStatus; purchased: number | null; remaining: number | null } {
  if (!item) return { status: 'unmatched', purchased: null, remaining: null }
  const purchased = purchasedBase(line, item)
  const need = Math.max(0, item.qty - item.purchased)
  if (purchased == null) return { status: 'confirm', purchased: null, remaining: need }
  if (line.confidence < CONFIDENT && !line.confirmed) return { status: 'confirm', purchased, remaining: need }
  const rem = Math.max(0, need - purchased)
  return { status: rem <= need * 0.02 ? 'full' : purchased > 0 ? 'partial' : 'none', purchased, remaining: rem }
}

/** Apply confirmed lines to the list. Returns updated items and any surplus per item (for the pantry). */
export function reconcile(items: ShopItem[], lines: ReceiptLine[]): { items: ShopItem[]; surplus: { itemId: string; base: number }[] } {
  const next = items.map((i) => ({ ...i }))
  const surplus: { itemId: string; base: number }[] = []
  for (const line of lines) {
    const it = next.find((x) => x.id === line.matchItemId)
    if (!it) continue
    const st = lineStatus(line, it)
    if (st.status === 'confirm' || st.purchased == null) continue // not enough certainty: leave the list alone
    const need = Math.max(0, it.qty - it.purchased)
    const applied = Math.min(need, st.purchased)
    it.purchased += applied
    if (st.purchased > need) surplus.push({ itemId: it.id, base: st.purchased - need })
    if (it.qty - it.purchased <= it.qty * 0.02) { it.purchased = it.qty; it.checked = true }
  }
  return { items: next, surplus }
}

export function receiptHash(retailer: string, date: string | null, total: number | null, lineCount: number) {
  return hashString(`${retailer}|${date ?? '?'}|${total?.toFixed(2) ?? '?'}|${lineCount}`)
}

/** Ingredient guess for unmatched lines (used to offer "add to pantry"). */
export function guessIngredient(desc: string): string | null {
  let best: [string | null, number] = [null, 0]
  for (const id of ING.keys()) {
    const s = matchScore(desc, id)
    if (s > best[1]) best = [id, s]
  }
  return best[1] >= CONFIDENT ? best[0] : null
}
