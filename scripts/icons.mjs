import sharp from 'sharp'
const svg = 'public/icons/favicon.svg'
await sharp(svg).resize(192, 192).png().toFile('public/icons/icon-192.png')
await sharp(svg).resize(512, 512).png().toFile('public/icons/icon-512.png')
await sharp(svg).resize(180, 180).flatten({ background: '#9C51B6' }).png().toFile('public/icons/apple-touch-icon.png')
// maskable: full-bleed background with the mark inside the 80% safe zone
const inner = await sharp(svg).resize(400, 400).png().toBuffer()
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#9C51B6' } }).composite([{ input: inner, left: 56, top: 56 }]).png().toFile('public/icons/icon-maskable-512.png')
console.log('icons done')
