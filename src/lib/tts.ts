import { LANGUAGES } from './i18n'
import type { LanguageCode } from '../types'

export function speak(text: string, lang: LanguageCode): SpeechSynthesisUtterance | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  const meta = LANGUAGES.find((l) => l.code === lang)
  utter.lang = meta?.speech ?? 'en-IN'
  utter.rate = 0.95
  const voices = window.speechSynthesis.getVoices()
  const match =
    voices.find((v) => v.lang.toLowerCase() === utter.lang.toLowerCase()) ??
    voices.find((v) => v.lang.toLowerCase().startsWith(lang))
  if (match) utter.voice = match
  window.speechSynthesis.speak(utter)
  return utter
}

export function stopSpeaking() {
  if (typeof window === 'undefined') return
  window.speechSynthesis?.cancel()
}
