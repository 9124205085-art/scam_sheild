import type { AnalysisResult } from '../types'
import { familyShareText, verdictLabel } from './i18n'

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(/\s+/)
  let line = ''
  let cursor = y
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursor)
      line = word
      cursor += lineHeight
    } else {
      line = test
    }
  }
  if (line) ctx.fillText(line, x, cursor)
  return cursor
}

export function drawFamilyCard(result: AnalysisResult): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = 1080
  canvas.height = 1350
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  const bg = ctx.createLinearGradient(0, 0, 0, 1350)
  bg.addColorStop(0, '#071019')
  bg.addColorStop(1, '#12263a')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, 1080, 1350)

  ctx.fillStyle = 'rgba(62, 224, 194, 0.12)'
  ctx.beginPath()
  ctx.arc(900, 80, 260, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#3ee0c2'
  ctx.font = '700 36px Outfit, sans-serif'
  ctx.fillText('SCAM SHIELD  ·  FAMILY CARD', 80, 110)

  const colors: Record<string, string> = {
    scam: '#ff6b4a',
    suspicious: '#f4c15d',
    safe: '#6fcf97',
  }
  ctx.fillStyle = colors[result.verdict]
  ctx.font = '700 92px Fraunces, Georgia, serif'
  ctx.fillText(verdictLabel(result.language, result.verdict).toUpperCase(), 80, 250)

  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.font = '500 32px Outfit, sans-serif'
  ctx.fillText(`${result.confidence}% confidence   ·   rules ${result.rulesScore}  ai ${result.aiScore ?? '—'}`, 80, 320)

  ctx.fillStyle = '#f4f1ea'
  ctx.font = '500 36px Outfit, sans-serif'
  const after = wrapText(ctx, result.explanation, 80, 430, 920, 52)

  let y = after + 80
  ctx.fillStyle = '#3ee0c2'
  ctx.font = '700 28px Outfit, sans-serif'
  ctx.fillText('RED FLAGS', 80, y)
  y += 50
  ctx.fillStyle = '#f4f1ea'
  ctx.font = '500 30px Outfit, sans-serif'
  const flags = result.ruleHits.slice(0, 4)
  if (flags.length === 0) {
    ctx.fillText('No strong flags — still pause before paying.', 80, y)
    y += 48
  }
  for (const hit of flags) {
    ctx.fillText(`▸  ${hit.label}`, 80, y)
    y += 48
  }

  y = Math.max(y + 40, 1080)
  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.font = '500 28px Outfit, sans-serif'
  wrapText(
    ctx,
    'Forward this to family. Do not tap unknown links, share OTP, or install AnyDesk.',
    80,
    y,
    920,
    42,
  )

  ctx.fillStyle = '#3ee0c2'
  ctx.font = '600 24px Outfit, sans-serif'
  ctx.fillText('scamshield.app  ·  check before you pay', 80, 1288)

  return canvas
}

export function cardToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Could not build image'))
    }, 'image/png')
  })
}

export function whatsappUrl(result: AnalysisResult): string {
  return `https://wa.me/?text=${encodeURIComponent(familyShareText(result.language, result.verdict, result.explanation))}`
}

export async function shareFamily(result: AnalysisResult, canvas: HTMLCanvasElement) {
  const text = familyShareText(result.language, result.verdict, result.explanation)
  const blob = await cardToBlob(canvas)
  const file = new File([blob], 'scam-shield-family.png', { type: 'image/png' })
  const nav = navigator as Navigator & {
    canShare?: (data: ShareData) => boolean
    share?: (data: ShareData) => Promise<void>
  }
  if (nav.share && nav.canShare?.({ files: [file], text })) {
    await nav.share({ files: [file], text, title: 'Scam Shield warning' })
    return 'shared'
  }
  window.open(whatsappUrl(result), '_blank', 'noopener,noreferrer')
  return 'whatsapp'
}
