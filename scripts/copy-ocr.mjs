// Self-hosts the Tesseract.js OCR engine + English model so receipt scanning works on
// GitHub Pages without third-party CDNs.
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'

const require = createRequire(import.meta.url)
const tjs = dirname(require.resolve('tesseract.js/package.json'))
const core = dirname(require.resolve('tesseract.js-core/package.json'))
const lang = dirname(require.resolve('@tesseract.js-data/eng/package.json'))

mkdirSync('public/ocr/lang', { recursive: true })
copyFileSync(join(tjs, 'dist/worker.min.js'), 'public/ocr/worker.min.js')
for (const f of readdirSync(core)) if (/lstm\.wasm\.js$/.test(f)) copyFileSync(join(core, f), join('public/ocr', f))
copyFileSync(join(lang, '4.0.0_best_int/eng.traineddata.gz'), 'public/ocr/lang/eng.traineddata.gz')
console.log('OCR assets copied')
