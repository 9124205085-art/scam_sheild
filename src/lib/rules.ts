import type { HighlightSpan, RuleHit, Severity } from '../types'

export interface RuleScan {
  hits: RuleHit[]
  highlights: HighlightSpan[]
  score: number
  scamType: string
}

interface PatternRule {
  id: string
  label: string
  category: string
  weight: number
  severity: Severity
  highlight: string
  patterns: RegExp[]
}

const PATTERN_RULES: PatternRule[] = [
  {
    id: 'digital_arrest',
    label: 'Digital arrest / fake police',
    category: 'digital_arrest',
    weight: 28,
    severity: 'high',
    highlight: 'fake police / arrest',
    patterns: [
      /digital\s*arrest/i,
      /\b(?:cbi|ed|ncb|narcotics|enforcement directorate)\b/i,
      /\bunder\s+investigation\b/i,
      /\barrest\s+warrant\b/i,
      /\byou\s+are\s+(?:under\s+)?arrest/i,
      /\bcourt\s+summons\b/i,
      /\bmoney\s+laundering\s+case\b/i,
      /साइबर\s*अरेस्ट|डिजिटल\s*अरेस्ट|सीबीआई|गिरफ्तार/i,
      /டிஜிட்டல்\s*அரெஸ்ட்|கைது/i,
    ],
  },
  {
    id: 'remote_access',
    label: 'Remote-access app requested',
    category: 'remote_access',
    weight: 26,
    severity: 'high',
    highlight: 'remote access app',
    patterns: [
      /\banydesk\b/i,
      /\bteamviewer\b/i,
      /\bultraviewer\b/i,
      /\bquick\s*support\b/i,
      /\bremote\s+(?:access|desktop|control)\b/i,
      /\bscreen\s*share\b/i,
      /\binstall\s+(?:this\s+)?app\s+immediately\b/i,
      /\bquitm\b/i,
      /\batoom\b/i,
    ],
  },
  {
    id: 'otp_request',
    label: 'Asks for OTP, PIN, or CVV',
    category: 'otp',
    weight: 26,
    severity: 'high',
    highlight: 'OTP / PIN request',
    patterns: [
      /\b(?:share|send|tell|forward|give)\b.{0,24}\b(?:otp|pin|cvv|password|passcode)\b/i,
      /\b(?:otp|pin|cvv)\b.{0,18}\b(?:share|send|tell|forward)\b/i,
      /\botp\s*(?:is\s*)?(?:required|verify|confirm)/i,
      /\bone[-\s]?time\s+password\b/i,
      /\bverification\s+code\b.{0,20}\b(?:send|share|tell)\b/i,
      /\b(?:enter|share|send|tell)\b.{0,24}\b(?:upi\s+)?pin\b/i,
      /\bpin\s+to\s+(?:receive|get|verify|confirm|approve)\b/i,
      /ओटीपी|पिन\s*बताओ|ओटीपी\s*भेजो/i,
      /ஓடிபி|பின்\s*அனுப்பு/i,
    ],
  },
  {
    id: 'kyc_threat',
    label: 'Fake KYC / account freeze threat',
    category: 'kyc',
    weight: 18,
    severity: 'high',
    highlight: 'KYC / freeze threat',
    patterns: [
      /\bkyc\b/i,
      /\bvkyc\b/i,
      /\baadhaar\s+(?:link|update|kyc)\b/i,
      /\baccount\s+(?:will\s+be\s+)?(?:block|freeze|suspend|deactivat)/i,
      /\bupdate\s+(?:your\s+)?kyc\b/i,
      /\bkyc\s+(?:expir|pending|incomplete|fail)/i,
      /केवाईसी|खाता\s*ब्लॉक|आधार\s*लिंक/i,
      /கேஒய்சி|கணக்கு\s*முடக்கம்/i,
    ],
  },
  {
    id: 'urgency',
    label: 'Urgency pressure',
    category: 'urgency',
    weight: 10,
    severity: 'medium',
    highlight: 'urgency',
    patterns: [
      /\bwithin\s+\d+\s+(?:hour|hr|minute|min|day)s?\b/i,
      /\b(?:act|respond|pay|verify)\s+now\b/i,
      /\bimmediately\b/i,
      /\blast\s+(?:warning|chance|notice)\b/i,
      /\bfailing\s+to\s+(?:do|pay|verify|update)\b/i,
      /\bdo\s+not\s+tell\s+(?:anyone|family|friends)\b/i,
      /\bkeep\s+this\s+confidential\b/i,
      /तुरंत|24\s*घंटे|अभी\s*करो/i,
      /உடனே|24\s*மணி/i,
    ],
  },
  {
    id: 'parcel_fee',
    label: 'Parcel / customs fee scam',
    category: 'parcel',
    weight: 16,
    severity: 'high',
    highlight: 'parcel / customs fee',
    patterns: [
      /\b(?:customs|courier|parcel|shipment|package)\b.{0,40}\b(?:fee|duty|pending|held|detained)\b/i,
      /\b(?:fedex|dhl|ups|bluedart|delhivery)\b.{0,40}\b(?:pay|fee|clearance)\b/i,
      /\bdelivery\s+fee\b/i,
      /\bheld\s+at\s+customs\b/i,
    ],
  },
  {
    id: 'job_fee',
    label: 'Job offer that asks for money',
    category: 'job',
    weight: 16,
    severity: 'high',
    highlight: 'paid job offer',
    patterns: [
      /\b(?:registration|joining|training|form)\s+fee\b/i,
      /\bwork\s+from\s+home\b.{0,40}\b(?:pay|fee|rupee|rs\.?|₹)\b/i,
      /\bpart[-\s]?time\s+job\b.{0,50}\b(?:whatsapp|telegram|fee)\b/i,
      /\bpay\s+(?:to\s+)?(?:join|start|register)\b/i,
      /\beasy\s+money\b/i,
    ],
  },
  {
    id: 'upi_collect',
    label: 'UPI collect / pay-to-verify',
    category: 'upi',
    weight: 18,
    severity: 'high',
    highlight: 'UPI collect / pay to verify',
    patterns: [
      /\bcollect\s+request\b/i,
      /\b(?:send|pay)\s+(?:rs\.?|₹)?\s*1\b/i,
      /\bverify\s+(?:your\s+)?(?:account|upi)\s+by\s+pay/i,
      /\brefund\b.{0,40}\b(?:failed|pending|click|pay|upi)\b/i,
      /\bapprove\s+(?:the\s+)?(?:collect|payment)\b/i,
      /\benter\s+upi\s+pin\b/i,
    ],
  },
  {
    id: 'prize',
    label: 'Prize / lottery / KYC-for-reward',
    category: 'prize',
    weight: 14,
    severity: 'medium',
    highlight: 'prize / lottery',
    patterns: [
      /\byou\s+have\s+won\b/i,
      /\blottery\b/i,
      /\bjackpot\b/i,
      /\bclaim\s+(?:your\s+)?(?:prize|reward|gift)\b/i,
      /\bkyc\s+(?:to\s+)?claim\b/i,
    ],
  },
  {
    id: 'impersonation',
    label: 'Brand / bank / government impersonation',
    category: 'phishing_link',
    weight: 12,
    severity: 'medium',
    highlight: 'impersonation',
    patterns: [
      /\bdear\s+customer\b/i,
      /\bofficial\s+(?:whatsapp|telegram|support)\b/i,
      /\b(?:sbi|hdfc|icici|axis|pnb|kotak|rbi|uidai|income\s*tax|gst|electricity\s+board)\b.{0,30}\b(?:alert|notice|team|support)\b/i,
      /\bthis\s+is\s+(?:inspector|officer|constable|manager)\b/i,
    ],
  },
  {
    id: 'secrecy',
    label: 'Told not to tell family',
    category: 'digital_arrest',
    weight: 12,
    severity: 'high',
    highlight: 'secrecy demand',
    patterns: [
      /\bdo\s+not\s+(?:inform|tell|call)\s+(?:your\s+)?(?:family|parents|anyone|friends)\b/i,
      /\bkeep\s+(?:this\s+)?(?:secret|confidential)\b/i,
      /\bmute\s+your\s+phone\b/i,
    ],
  },
]

const SHORTENERS = new Set([
  'bit.ly',
  'tinyurl.com',
  't.co',
  'goo.gl',
  'ow.ly',
  'is.gd',
  'buff.ly',
  'cutt.ly',
  'rb.gy',
  'shorturl.at',
  'tiny.cc',
  'rebrand.ly',
  's.id',
  'bl.ink',
])

const RISKY_TLDS = new Set([
  'xyz',
  'top',
  'click',
  'tk',
  'ml',
  'ga',
  'cf',
  'gq',
  'zip',
  'mov',
  'rest',
  'country',
  'cfd',
  'sbs',
  'cyou',
])

const OFFICIAL: Record<string, string[]> = {
  sbi: ['sbi.co.in', 'onlinesbi.sbi', 'sbi.bank.in'],
  hdfc: ['hdfcbank.com', 'hdfcbank.co.in'],
  icici: ['icicibank.com'],
  axis: ['axisbank.com'],
  paytm: ['paytm.com', 'paytm.in'],
  phonepe: ['phonepe.com'],
  gpay: ['pay.google.com', 'google.com'],
  google: ['google.com', 'google.co.in'],
  amazon: ['amazon.in', 'amazon.com'],
  flipkart: ['flipkart.com'],
  whatsapp: ['whatsapp.com', 'wa.me'],
  instagram: ['instagram.com'],
  facebook: ['facebook.com', 'fb.com'],
  uidai: ['uidai.gov.in'],
  incometax: ['incometax.gov.in'],
  rbi: ['rbi.org.in'],
  npci: ['npci.org.in'],
  irctc: ['irctc.co.in'],
  kotak: ['kotak.com', 'kotakbank.com'],
  pnb: ['pnbindia.in'],
  canara: ['canarabank.com'],
  unionbank: ['unionbankofindia.co.in'],
  fedex: ['fedex.com'],
  dhl: ['dhl.com'],
}

const BRANDS = Object.keys(OFFICIAL)

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))
  for (let i = 0; i <= m; i += 1) dp[i][0] = i
  for (let j = 0; j <= n; j += 1) dp[0][j] = j
  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[m][n]
}

function isOfficialHost(host: string, brand: string): boolean {
  const list = OFFICIAL[brand] ?? []
  return list.some((d) => host === d || host.endsWith(`.${d}`))
}

export function extractUrls(text: string): { url: string; start: number; end: number }[] {
  const found: { url: string; start: number; end: number }[] = []
  const pattern =
    /\b(?:https?:\/\/|www\.)[^\s<>"']+|\b[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+\.[a-z]{2,}(?:\/[^\s<>"']*)?/gi
  let match: RegExpExecArray | null
  while ((match = pattern.exec(text))) {
    found.push({ url: match[0], start: match.index, end: match.index + match[0].length })
  }
  return found
}

function hostFromUrl(raw: string): string {
  const withProto = raw.startsWith('http') ? raw : `https://${raw}`
  try {
    return new URL(withProto).hostname.toLowerCase().replace(/^www\./, '')
  } catch {
    return raw
      .replace(/^https?:\/\//i, '')
      .split('/')[0]
      .toLowerCase()
      .replace(/^www\./, '')
  }
}

function pushUnique(hits: RuleHit[], hit: RuleHit) {
  if (!hits.some((h) => h.id === hit.id && h.detail === hit.detail)) hits.push(hit)
}

function addHighlight(
  highlights: HighlightSpan[],
  start: number,
  end: number,
  label: string,
  ruleId: string,
  severity: Severity,
) {
  if (start < 0 || end <= start) return
  const overlaps = highlights.some((h) => !(end <= h.start || start >= h.end))
  if (overlaps) return
  highlights.push({ start, end, label, ruleId, severity })
}

export function runRules(text: string): RuleScan {
  const hits: RuleHit[] = []
  const highlights: HighlightSpan[] = []
  const source = text || ''

  for (const rule of PATTERN_RULES) {
    let matched = false
    for (const pattern of rule.patterns) {
      const clone = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`)
      let match: RegExpExecArray | null
      while ((match = clone.exec(source))) {
        matched = true
        addHighlight(highlights, match.index, match.index + match[0].length, rule.highlight, rule.id, rule.severity)
        if (match[0].length === 0) clone.lastIndex += 1
      }
    }
    if (matched) {
      pushUnique(hits, {
        id: rule.id,
        label: rule.label,
        detail: rule.label,
        weight: rule.weight,
        category: rule.category,
      })
    }
  }

  const urls = extractUrls(source)
  for (const item of urls) {
    const host = hostFromUrl(item.url)
    if (!host) continue

    if (host.includes('xn--')) {
      pushUnique(hits, {
        id: 'punycode',
        label: 'Punycode / lookalike letters',
        detail: host,
        weight: 22,
        category: 'phishing_link',
      })
      addHighlight(highlights, item.start, item.end, 'punycode domain', 'punycode', 'high')
    }

    if (SHORTENERS.has(host)) {
      pushUnique(hits, {
        id: 'shortener',
        label: 'URL shortener hides the real site',
        detail: host,
        weight: 16,
        category: 'phishing_link',
      })
      addHighlight(highlights, item.start, item.end, 'hidden link', 'shortener', 'high')
    }

    const tld = host.split('.').pop() ?? ''
    if (RISKY_TLDS.has(tld) && /kyc|verify|secure|update|login|bank|refund|support/i.test(host + item.url)) {
      pushUnique(hits, {
        id: 'risky_tld',
        label: 'Suspicious domain ending',
        detail: host,
        weight: 12,
        category: 'phishing_link',
      })
      addHighlight(highlights, item.start, item.end, 'risky domain', 'risky_tld', 'medium')
    }

    for (const brand of BRANDS) {
      if (isOfficialHost(host, brand)) continue
      const sld = host.split('.')[0] ?? ''
      const containsBrand = host.includes(brand)
      const close = sld.length >= 4 && levenshtein(sld.replace(/[-0-9]/g, ''), brand) <= 1 && sld !== brand
      if (containsBrand || close) {
        pushUnique(hits, {
          id: 'lookalike',
          label: `Lookalike of ${brand}`,
          detail: host,
          weight: 24,
          category: 'phishing_link',
        })
        addHighlight(highlights, item.start, item.end, `fake ${brand} site`, 'lookalike', 'high')
        break
      }
    }
  }

  if (/\b(?:whatsapp|telegram|wa\.me)\b/i.test(source) && /\b(?:kyc|otp|verify|officer|bank|refund)\b/i.test(source)) {
    pushUnique(hits, {
      id: 'chat_support',
      label: 'Official work moved to WhatsApp/Telegram',
      detail: 'Banks and police do not verify KYC or cases on chat apps',
      weight: 10,
      category: 'phishing_link',
    })
  }

  const officialSafe = /^(?:1930|112|100|101|102|1098|1091)$/.test(source.replace(/\s+/g, ''))
  if (officialSafe) {
    return {
      hits: [
        {
          id: 'official_helpline',
          label: 'Known helpline',
          detail: 'This matches a public emergency / cybercrime number',
          weight: 0,
          category: 'safe',
        },
      ],
      highlights: [],
      score: 4,
      scamType: 'safe',
    }
  }

  const critical = hits.some((h) => ['digital_arrest', 'remote_access', 'otp_request', 'upi_collect'].includes(h.id))
  let score = Math.min(
    100,
    hits.reduce((sum, h) => sum + h.weight, 0),
  )
  if (critical) score = Math.max(score, 78)
  if (hits.some((h) => h.id === 'lookalike' || h.id === 'punycode' || h.id === 'kyc_threat')) score = Math.max(score, 64)

  const categoryWeights = new Map<string, number>()
  for (const hit of hits) {
    categoryWeights.set(hit.category, (categoryWeights.get(hit.category) ?? 0) + hit.weight)
  }
  let scamType = 'generic'
  let best = 0
  for (const [cat, weight] of categoryWeights) {
    if (weight > best) {
      best = weight
      scamType = cat
    }
  }
  if (hits.length === 0) scamType = 'safe'

  highlights.sort((a, b) => a.start - b.start)

  return { hits, highlights, score, scamType }
}

export function verdictFromScore(score: number): 'scam' | 'suspicious' | 'safe' {
  if (score >= 62) return 'scam'
  if (score >= 32) return 'suspicious'
  return 'safe'
}
