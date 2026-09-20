export interface MaskResult {
  masked: string
  redactions: number
}

/** Strip phones, OTPs, cards, Aadhaar, emails, and UPI IDs before any LLM call. */
export function maskSensitive(input: string): MaskResult {
  let masked = input
  let redactions = 0

  const replaceAll = (pattern: RegExp, token: string) => {
    masked = masked.replace(pattern, () => {
      redactions += 1
      return token
    })
  }

  replaceAll(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[EMAIL]')
  replaceAll(/\b[\w.-]{2,32}@[a-z][a-z0-9]{1,20}\b/gi, '[UPI]')
  replaceAll(/(?:(?:\+|00)91[\s-]?)?[6-9]\d{9}(?!\d)/g, '[PHONE]')
  replaceAll(/\b(?:\+\d{1,3}[\s-]?)?(?:\d[\s-]?){9,14}\d\b/g, '[PHONE]')
  replaceAll(/\b[2-9]\d{3}[\s-]?\d{4}[\s-]?\d{4}\b/g, '[AADHAAR]')

  masked = masked.replace(/\b(?:\d[ -]*?){13,19}\b/g, (match) => {
    const digits = match.replace(/\D/g, '')
    if (digits.length >= 13 && digits.length <= 19) {
      redactions += 1
      return '[CARD]'
    }
    return match
  })

  masked = masked.replace(
    /\b(otp|one[-\s]?time\s?password|pin|cvv|passcode|verification code)[:\s#-]*[A-Za-z0-9]{3,8}\b/gi,
    (match) => {
      redactions += 1
      return match.replace(/[A-Za-z0-9]{3,8}$/i, '[OTP]')
    },
  )

  masked = masked.replace(/\b\d{4,8}\b/g, (match, offset: number) => {
    const start = Math.max(0, offset - 48)
    const window = masked.slice(start, offset + match.length + 48).toLowerCase()
    if (/(otp|pin|cvv|password|passcode|verification|one[-\s]?time|secret code)/.test(window)) {
      redactions += 1
      return '[OTP]'
    }
    return match
  })

  return { masked, redactions }
}
