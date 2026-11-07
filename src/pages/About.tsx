import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Card, PageHeader } from '../components/ui'
import { RECIPES, INGREDIENTS } from '../lib/catalog'

export default function About() {
  return (
    <div>
      <Link to="/more" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"><ArrowLeft size={16} /> More</Link>
      <PageHeader title="How Mise works" />
      <div className="space-y-4 text-[15px] leading-relaxed">
        <Card><h2 className="mb-2">Your targets</h2><p>Resting energy uses the Mifflin-St Jeor equation, multiplied by a standard activity factor. Losing weight takes 15% off (capped at 500 kcal, or 10% for recomposition); gaining adds 10% (capped at 300 kcal). Targets never go below your resting energy or 1,200 kcal, and there is no deficit at all for under-18s or anyone who told us about circumstances needing professional advice. Protein is set per kg of body weight for your physique goal, fat at about 27% of energy, and carbohydrates fill the rest. These are estimates, not medical advice.</p></Card>
        <Card><h2 className="mb-2">Recipe nutrition</h2><p>Mise has {RECIPES.length} original recipes built from {INGREDIENTS.length} ingredients. Every value is calculated from ingredient weights using USDA FoodData Central SR Legacy figures per 100 g, so it is always labelled a calculated estimate. Carbohydrates exclude fibre, as on UK labels. Liquids treat 1 ml as 1 g. Counts like “2 eggs” use typical weights. Costs are rough UK supermarket estimates until your receipts give real prices.</p></Card>
        <Card><h2 className="mb-2">Allergies</h2><p>Allergies and named allergy ingredients are strict exclusions, including ingredients that often carry “may contain” warnings. A swap is only offered when the replacement passes every one of your restrictions; otherwise the recipe is hidden. Brands differ, so always check the label and take care with cross-contamination. Mise can’t guarantee any food is safe for you.</p></Card>
        <Card><h2 className="mb-2">Data sources & credits</h2><ul className="list-disc space-y-1.5 pl-5">
          <li>Food nutrition data from TempoLife (tempolife.app), CC-BY-4.0, built on USDA FoodData Central SR Legacy (public domain).</li>
          <li>Barcode product data from Open Food Facts, available under the Open Database Licence (ODbL).</li>
          <li>Receipt text recognition by Tesseract.js (Apache 2.0), running on your device.</li>
          <li>Barcode decoding by ZXing (Apache 2.0).</li>
          <li>Recipe illustrations are generated plates, not photos.</li>
        </ul></Card>
        <Card><h2 className="mb-2">Current limitations</h2><ul className="list-disc space-y-1.5 pl-5">
          <li>Your data lives on this device only. There’s no account or sync between devices yet.</li>
          <li>Reminders show when you open the app; there are no background push notifications.</li>
          <li>Steps and activity are entered by hand; websites can’t read Apple Health.</li>
          <li>Receipt reading works best on flat, well-lit receipts. Always check the review screen.</li>
        </ul></Card>
      </div>
    </div>
  )
}
