/** On-device receipt OCR with Tesseract.js. Engine and English model are self-hosted under /ocr. */
import type { Worker } from 'tesseract.js'

let workerP: Promise<Worker> | null = null
async function getWorker(onProgress?: (p: number) => void) {
  workerP ??= (async () => {
    const { createWorker } = await import('tesseract.js')
    const base = new URL(import.meta.env.BASE_URL + 'ocr/', location.href).href
    return createWorker('eng', 1, {
      workerPath: base + 'worker.min.js', corePath: base, langPath: base + 'lang', gzip: true,
      logger: (m: { status: string; progress: number }) => { if (m.status === 'recognizing text') onProgress?.(m.progress) },
    })
  })()
  return workerP
}

/** Greyscale + contrast stretch + upscale small photos; helps with dim, low-contrast thermal paper. */
export async function preprocess(file: Blob): Promise<Blob> {
  const bmp = await createImageBitmap(file)
  const maxW = 1800
  const scale = Math.min(2, maxW / bmp.width)
  const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale)
  const c = new OffscreenCanvas(w, h)
  const ctx = c.getContext('2d')!
  ctx.drawImage(bmp, 0, 0, w, h)
  const img = ctx.getImageData(0, 0, w, h)
  const d = img.data
  let min = 255, max = 0
  for (let i = 0; i < d.length; i += 16) { const g = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]; if (g < min) min = g; if (g > max) max = g }
  const range = Math.max(1, max - min)
  for (let i = 0; i < d.length; i += 4) {
    const g = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]
    const v = Math.max(0, Math.min(255, ((g - min) / range) * 255))
    d[i] = d[i + 1] = d[i + 2] = v
  }
  ctx.putImageData(img, 0, 0)
  return c.convertToBlob({ type: 'image/png' })
}

export async function recogniseReceipt(files: Blob[], onProgress: (stage: string, p: number) => void): Promise<{ text: string; confidence: number }> {
  let text = ''
  let conf = 0
  for (let i = 0; i < files.length; i++) {
    onProgress(files.length > 1 ? `Reading photo ${i + 1} of ${files.length}` : 'Reading receipt', i / files.length)
    const img = await preprocess(files[i])
    const w = await getWorker((p) => onProgress(files.length > 1 ? `Reading photo ${i + 1} of ${files.length}` : 'Reading receipt', (i + p) / files.length))
    const { data } = await w.recognize(img)
    text += (text ? '\n' : '') + data.text
    conf += data.confidence
  }
  return { text, confidence: conf / files.length }
}
