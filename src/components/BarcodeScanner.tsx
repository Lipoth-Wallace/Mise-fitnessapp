import { useEffect, useRef, useState } from 'react'
import type { IScannerControls } from '@zxing/browser'

/** Camera barcode scanner (ZXing, runs on-device). iOS Safari has no native BarcodeDetector, so we decode in JS. */
export function BarcodeScanner({ onCode }: { onCode: (code: string) => void }) {
  const video = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    let controls: IScannerControls | undefined
    let stopped = false
    ;(async () => {
      try {
        const { BrowserMultiFormatReader } = await import('@zxing/browser')
        const reader = new BrowserMultiFormatReader()
        controls = await reader.decodeFromConstraints({ video: { facingMode: 'environment' } }, video.current!, (res) => {
          if (res && !stopped) { stopped = true; controls?.stop(); navigator.vibrate?.(40); onCode(res.getText()) }
        })
      } catch (e) {
        setError(e instanceof Error && /Permission|NotAllowed/i.test(e.name + e.message) ? 'Camera access was blocked. Allow camera access for this site in Settings → Safari, or type the barcode below.' : 'The camera could not start on this device. Type the barcode below instead.')
      }
    })()
    return () => { stopped = true; controls?.stop() }
  }, [onCode])
  return (
    <div>
      {error ? <p className="rounded-2xl bg-surface p-4 text-sm">{error}</p> : (
        <div className="relative overflow-hidden rounded-2xl bg-black">
          <video ref={video} className="aspect-[4/3] w-full object-cover" muted playsInline aria-label="Camera preview" />
          <div className="pointer-events-none absolute inset-x-10 top-1/2 h-24 -translate-y-1/2 rounded-xl border-2 border-white/80" />
        </div>
      )}
    </div>
  )
}
