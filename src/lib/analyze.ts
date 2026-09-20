import type { AnalysisResult, InputMode, LanguageCode } from '../types'
import { localNarrative } from './i18n'
import { hasGeminiKey, reasonWithLlm } from './llm'
import { maskSensitive } from './privacy'
import { runRules, verdictFromScore } from './rules'

function wrapInput(text: string, mode: InputMode): string {
  if (mode === 'link') return `The user received this link: ${text}`
  if (mode === 'phone') {
    return `The user was contacted on phone/SMS by this number and wants to know if it is a scam call or message source: ${text}`
  }
  return text
}

export async function analyzeContent(
  raw: string,
  language: LanguageCode,
  mode: InputMode,
): Promise<AnalysisResult> {
  const originalText = raw.trim()
  const prepared = wrapInput(originalText, mode)
  const { masked, redactions } = maskSensitive(prepared)
  const scan = runRules(originalText)
  const extra = mode === 'link' || mode === 'phone' ? runRules(prepared) : null
  if (extra) {
    for (const hit of extra.hits) {
      if (!scan.hits.some((h) => h.id === hit.id && h.detail === hit.detail)) scan.hits.push(hit)
    }
    scan.score = Math.min(100, Math.max(scan.score, extra.score))
    if (scan.scamType === 'safe' || scan.scamType === 'generic') scan.scamType = extra.scamType
  }

  if (mode === 'phone' && scan.hits.every((h) => h.id !== 'official_helpline') && scan.score < 40) {
    scan.hits.push({
      id: 'unknown_number',
      label: 'Unknown number cannot be proven safe',
      detail: 'Banks, courier firms, and police do not cold-call for OTP, KYC, or remote access.',
      weight: 40,
      category: 'generic',
    })
    scan.score = Math.max(scan.score, 40)
    if (scan.scamType === 'safe') scan.scamType = 'generic'
  }

  if (mode === 'link' && scan.score < 32) {
    scan.hits.push({
      id: 'unknown_link',
      label: 'Unverified link',
      detail: 'Type official sites yourself. Do not log in from a message link.',
      weight: 36,
      category: 'phishing_link',
    })
    scan.score = Math.max(scan.score, 36)
    if (scan.scamType === 'safe') scan.scamType = 'phishing_link'
  }

  const rulesScore = scan.score

  let aiScore: number | null = null
  let usedAi = false
  let explanation = ''
  let nextSteps: string[] = []
  let scamType = scan.scamType
  let aiError: string | undefined
  let aiVerdict: AnalysisResult['verdict'] | null = null

  const local = localNarrative(
    language,
    scan.scamType,
    verdictFromScore(rulesScore),
    scan.hits.map((h) => h.label),
  )
  explanation = local.explanation
  nextSteps = local.nextSteps

  if (hasGeminiKey() || import.meta.env.PROD) {
    try {
      const llm = await reasonWithLlm(masked, scan.hits, rulesScore, language)
      usedAi = true
      aiScore = llm.aiScore
      explanation = llm.explanation
      nextSteps = llm.nextSteps
      scamType = llm.scamType || scamType
      aiVerdict = llm.verdict
    } catch (err) {
      aiError = err instanceof Error ? err.message : 'AI unavailable'
      if (aiError === 'NO_KEY') aiError = undefined
    }
  }

  const finalScore =
    aiScore == null ? rulesScore : Math.round(rulesScore * 0.55 + aiScore * 0.45)

  let verdict = verdictFromScore(finalScore)
  if (scan.hits.some((h) => ['digital_arrest', 'remote_access', 'otp_request', 'upi_collect'].includes(h.id))) {
    verdict = 'scam'
  } else if (aiVerdict === 'scam' && finalScore >= 50) {
    verdict = 'scam'
  }

  const confidence = Math.min(99, Math.max(52, Math.round(58 + finalScore * 0.38)))

  return {
    verdict,
    confidence,
    rulesScore,
    aiScore,
    finalScore,
    highlights: scan.highlights,
    ruleHits: scan.hits,
    explanation,
    nextSteps,
    scamType,
    maskedPreview: masked,
    redactions,
    usedAi,
    language,
    originalText,
    inputMode: mode,
    aiError,
  }
}
