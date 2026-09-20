import { useState } from 'react'
import type { AnalysisResult, LanguageCode } from '../types'
import { cardToBlob, drawFamilyCard, shareFamily, whatsappUrl } from '../lib/familyCard'
import { familyShareText, t, verdictLabel } from '../lib/i18n'
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
  const [copied, setCopied] = useState(false)
  const canvas = drawFamilyCard(result)
  const preview = canvas.toDataURL('image/png')

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

  const onCopy = async () => {
    await navigator.clipboard.writeText(familyShareText(lang, result.verdict, result.explanation))
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const onSave = async () => {
    const blob = await cardToBlob(canvas)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'scam-shield-family.png'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="result-grid">
      <article className={`verdict-card ${result.verdict}`}>
        <div className="verdict-top">
          <p className="eyebrow">{t(lang, 'verdict')}</p>
          <h2>{verdictLabel(lang, result.verdict)}</h2>
          <p className="conf">
            {result.confidence}% {t(lang, 'confidence')}
          </p>
        </div>
        <div className="meters" aria-label="Score breakdown">
          <ScoreBar label={t(lang, 'rules')} value={result.rulesScore} />
          <ScoreBar label={t(lang, 'ai')} value={result.aiScore} />
        </div>
        <p className="engine-note">
          {result.usedAi
            ? `Final ${result.finalScore}  ·  rules 55% + AI 45%`
            : t(lang, 'noAi')}
        </p>
        {result.aiError ? <p className="warn-line">AI fallback: {result.aiError}</p> : null}
        <div className="audio-row">
          <button type="button" className="btn" onClick={onListen}>
            {speaking ? t(lang, 'stop') : t(lang, 'listen')}
          </button>
          <button type="button" className="btn ghost" onClick={onReset}>
            New scan
          </button>
        </div>
      </article>

      <article className="panel">
        <h3>{t(lang, 'why')}</h3>
        <p className="explain">{result.explanation}</p>
        {result.highlights.length > 0 ? (
          <>
            <h3>{t(lang, 'flags')}</h3>
            <HighlightedText text={result.originalText} highlights={result.highlights} />
          </>
        ) : (
          <ul className="hits">
            {result.ruleHits.length === 0 ? <li>No deterministic red flags.</li> : null}
            {result.ruleHits.map((hit) => (
              <li key={`${hit.id}-${hit.detail}`}>
                <strong>{hit.label}</strong>
                <span>{hit.detail}</span>
              </li>
            ))}
          </ul>
        )}
        {result.ruleHits.length > 0 && result.highlights.length > 0 ? (
          <ul className="hits compact">
            {result.ruleHits.map((hit) => (
              <li key={`${hit.id}-${hit.detail}`}>
                <strong>{hit.label}</strong>
                <span>+{hit.weight}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </article>

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
        <img className="family-preview" src={preview} alt="Family Shield warning card" />
        <div className="row-actions">
          <button type="button" className="btn" onClick={() => void shareFamily(result, canvas)}>
            {t(lang, 'shareWhatsapp')}
          </button>
          <a className="btn ghost" href={whatsappUrl(result)} target="_blank" rel="noreferrer">
            WhatsApp text
          </a>
          <button type="button" className="btn ghost" onClick={() => void onCopy()}>
            {copied ? 'Copied' : t(lang, 'copyText')}
          </button>
          <button type="button" className="btn ghost" onClick={() => void onSave()}>
            {t(lang, 'saveImage')}
          </button>
        </div>
      </article>

      <article className="panel masked">
        <h3>{t(lang, 'masked')}</h3>
        <p className="privacy-kicker">
          {t(lang, 'privacyNote')} {result.redactions} field{result.redactions === 1 ? '' : 's'} redacted.
        </p>
        <pre>{result.maskedPreview}</pre>
      </article>
    </section>
  )
}

function ScoreBar({ label, value }: { label: string; value: number | null }) {
  const shown = value ?? 0
  return (
    <div className="score-bar">
      <div className="score-meta">
        <span>{label}</span>
        <b>{value == null ? '—' : value}</b>
      </div>
      <div className="track">
        <i style={{ width: `${value == null ? 0 : shown}%` }} />
      </div>
    </div>
  )
}
