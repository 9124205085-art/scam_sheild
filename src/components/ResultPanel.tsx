import { useState } from 'react'
import type { AnalysisResult, LanguageCode } from '../types'
import { cardToBlob, drawFamilyCard, shareFamily, whatsappUrl } from '../lib/familyCard'
import { t, verdictLabel } from '../lib/i18n'
import { stopSpeaking, speak } from '../lib/tts'
import { HighlightedText } from './HighlightedText'

export function ResultPanel({
  result,
  lang,
  onReset,
}: {
  result: AnalysisResult
  lang: LanguageCode
  onReset: () => void
}) {
  const [speaking, setSpeaking] = useState(false)
  const [saved, setSaved] = useState(false)
  const canvas = drawFamilyCard(result)
  const preview = canvas.toDataURL('image/png')
  const flag = result.verdict === 'safe' ? '🟢' : result.verdict === 'scam' ? '🔴' : '🟡'

  const onListen = () => {
    if (speaking) {
      stopSpeaking()
      setSpeaking(false)
      return
    }
    const utter = speak(`${verdictLabel(lang, result.verdict)}. ${result.explanation}`, lang)
    if (!utter) return
    setSpeaking(true)
    utter.onend = () => setSpeaking(false)
  }

  const onSave = async () => {
    const blob = await cardToBlob(canvas)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'scam-shield-check.png'
    a.click()
    URL.revokeObjectURL(url)
    setSaved(true)
  }

  return (
    <section className="result-simple">
      <article className={`verdict-card ${result.verdict}`}>
        <p className="flag-emoji" aria-hidden="true">
          {flag}
        </p>
        <h2>{verdictLabel(lang, result.verdict)}</h2>
        <p className="explain">{result.explanation}</p>
        <div className="audio-row">
          <button type="button" className="btn" onClick={onListen}>
            {speaking ? t(lang, 'stop') : t(lang, 'listen')}
          </button>
          <button type="button" className="btn ghost" onClick={onReset}>
            New scan
          </button>
        </div>
      </article>

      {result.highlights.length > 0 ? (
        <article className="panel">
          <h3>{t(lang, 'flags')}</h3>
          <HighlightedText text={result.originalText} highlights={result.highlights} />
        </article>
      ) : null}

      <article className="panel">
        <h3>{t(lang, 'next')}</h3>
        <ol className="steps">
          {result.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </article>

      <article className="panel family">
        <h3>{t(lang, 'family')}</h3>
        <p>{t(lang, 'familyHint')}</p>
        <img className="family-preview" src={preview} alt="Check card to share" />
        <div className="row-actions">
          <button type="button" className="btn ghost" onClick={() => void onSave()}>
            {saved ? 'Saved' : t(lang, 'saveImage')}
          </button>
          <button type="button" className="btn" onClick={() => void shareFamily(result, canvas)}>
            {t(lang, 'shareWhatsapp')}
          </button>
          <a className="btn ghost" href={whatsappUrl(result)} target="_blank" rel="noreferrer">
            Open WhatsApp
          </a>
        </div>
      </article>
    </section>
  )
}
