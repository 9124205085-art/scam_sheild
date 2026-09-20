import type { LanguageCode, RuleHit } from '../types'
import { LANGUAGES } from './i18n'

export interface LlmVerdict {
  verdict: 'scam' | 'suspicious' | 'safe'
  aiScore: number
  explanation: string
  nextSteps: string[]
  scamType: string
}

function languageName(code: LanguageCode): string {
  return LANGUAGES.find((l) => l.code === code)?.label ?? 'English'
}

export function hasGeminiKey(): boolean {
  return Boolean(import.meta.env.VITE_GEMINI_API_KEY)
}

async function callProxy(prompt: string): Promise<string | null> {
  if (import.meta.env.DEV) return null
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })
    const contentType = res.headers.get('content-type') ?? ''
    if (!res.ok || !contentType.includes('application/json')) return null
    const data = (await res.json()) as { text?: string }
    return data.text || null
  } catch {
    return null
  }
}

function extractJson(raw: string): unknown {
  const fenced = raw.match(/\{[\s\S]*\}/)
  if (!fenced) throw new Error('AI returned no JSON')
  return JSON.parse(fenced[0])
}

async function callGemini(model: string, key: string, prompt: string): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 700,
          responseMimeType: 'application/json',
        },
      }),
    },
  )
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Gemini ${res.status}: ${body.slice(0, 180)}`)
  }
  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[]
  }
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('\n') ?? ''
  if (!text) throw new Error('Empty AI response')
  return text
}

export async function reasonWithLlm(
  maskedText: string,
  hits: RuleHit[],
  rulesScore: number,
  language: LanguageCode,
): Promise<LlmVerdict> {
  const prompt = `You are Scam Shield, a careful fraud analyst for first-time internet users, elders, and students in India and similar markets.

The user text has already been privacy-masked. Placeholders like [PHONE], [OTP], [UPI], [CARD], [AADHAAR], [EMAIL] replaced real secrets. Never ask for the real values.

Deterministic rules already ran. Treat them as high-precision signals, not rumours.
Rules score (0-100): ${rulesScore}
Rule hits: ${JSON.stringify(hits.map((h) => ({ id: h.id, label: h.label, detail: h.detail })))}

Masked message:
"""
${maskedText.slice(0, 4000)}
"""

Return JSON only:
{
  "verdict": "scam" | "suspicious" | "safe",
  "aiScore": 0-100 integer,
  "explanation": "plain language in ${languageName(language)}, 2-4 short sentences, no jargon",
  "nextSteps": ["3 to 5 concrete actions in ${languageName(language)}"],
  "scamType": "digital_arrest" | "kyc" | "parcel" | "job" | "upi" | "otp" | "remote_access" | "phishing_link" | "prize" | "generic" | "safe"
}

Scoring:
- If rules mention digital arrest, AnyDesk/remote access, or OTP request, aiScore should be >= 85 and verdict scam.
- If lookalike domain or URL shortener plus urgency, usually scam.
- Casual personal messages without payment/OTP/links can be safe.
- Do not invent facts that are not in the text.`

  const proxied = await callProxy(prompt)
  if (proxied) {
    const parsed = extractJson(proxied) as LlmVerdict
    const aiScore = Math.max(0, Math.min(100, Number(parsed.aiScore) || 0))
    const verdict = parsed.verdict === 'scam' || parsed.verdict === 'safe' ? parsed.verdict : 'suspicious'
    return {
      verdict,
      aiScore,
      explanation: String(parsed.explanation),
      nextSteps: parsed.nextSteps.map(String).slice(0, 6),
      scamType: String(parsed.scamType || 'generic'),
    }
  }

  const key = import.meta.env.VITE_GEMINI_API_KEY
  if (!key) throw new Error('NO_KEY')

  const models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-latest']
  let lastError: Error | null = null
  for (const model of models) {
    try {
      const raw = await callGemini(model, key, prompt)
      const parsed = extractJson(raw) as LlmVerdict
      if (!parsed.explanation || !Array.isArray(parsed.nextSteps)) {
        throw new Error('Incomplete AI JSON')
      }
      const aiScore = Math.max(0, Math.min(100, Number(parsed.aiScore) || 0))
      const verdict = parsed.verdict === 'scam' || parsed.verdict === 'safe' ? parsed.verdict : 'suspicious'
      return {
        verdict,
        aiScore,
        explanation: String(parsed.explanation),
        nextSteps: parsed.nextSteps.map(String).slice(0, 6),
        scamType: String(parsed.scamType || 'generic'),
      }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error('AI failed')
    }
  }
  throw lastError ?? new Error('AI failed')
}
