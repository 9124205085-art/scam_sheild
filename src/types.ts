export type Verdict = 'scam' | 'suspicious' | 'safe'

export type InputMode = 'message' | 'screenshot' | 'link' | 'phone'

export type LanguageCode =
  | 'en'
  | 'hi'
  | 'ta'
  | 'te'
  | 'bn'
  | 'mr'
  | 'kn'
  | 'ml'
  | 'gu'
  | 'pa'

export type Severity = 'high' | 'medium' | 'low'

export interface HighlightSpan {
  start: number
  end: number
  label: string
  ruleId: string
  severity: Severity
}

export interface RuleHit {
  id: string
  label: string
  detail: string
  weight: number
  category: string
}

export interface AnalysisResult {
  verdict: Verdict
  confidence: number
  rulesScore: number
  aiScore: number | null
  finalScore: number
  highlights: HighlightSpan[]
  ruleHits: RuleHit[]
  explanation: string
  nextSteps: string[]
  scamType: string
  maskedPreview: string
  redactions: number
  usedAi: boolean
  language: LanguageCode
  originalText: string
  inputMode: InputMode
  aiError?: string
}

export interface CountryHelp {
  code: string
  name: string
  helpline: string
  helplineLabel: string
  reportUrl: string
  reportLabel: string
  extra?: string
}
