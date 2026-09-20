import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { EmergencyMode } from './components/EmergencyMode'
import { Header } from './components/Header'
import { Pitch } from './components/Pitch'
import { ResultPanel } from './components/ResultPanel'
import { analyzeContent } from './lib/analyze'
import { hasGeminiKey } from './lib/llm'
import { readScreenshot } from './lib/ocr'
import { SAMPLES } from './lib/samples'
import { t } from './lib/i18n'
import type { AnalysisResult, InputMode, LanguageCode } from './types'

type View = 'check' | 'emergency' | 'pitch'

export default function App() {
  const [lang, setLang] = useState<LanguageCode>('en')
  const [view, setView] = useState<View>('check')
  const [mode, setMode] = useState<InputMode>('message')
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [ocrBusy, setOcrBusy] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const modes = useMemo(
    () =>
      [
        ['message', t(lang, 'paste')],
        ['screenshot', t(lang, 'screenshot')],
        ['link', t(lang, 'link')],
        ['phone', t(lang, 'phone')],
      ] as const,
    [lang],
  )

  const runScan = async (value: string, scanMode: InputMode) => {
    if (!value.trim()) {
      setError('Add a message, link, number, or screenshot first.')
      return
    }
    setBusy(true)
    setError('')
    try {
      const next = await analyzeContent(value, lang, scanMode)
      setResult(next)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scan failed')
    } finally {
      setBusy(false)
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void runScan(text, mode)
  }

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOcrBusy(true)
    setError('')
    try {
      const extracted = await readScreenshot(file)
      setText(extracted)
      setMode('screenshot')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not read image')
    } finally {
      setOcrBusy(false)
    }
  }

  return (
    <div className="shell">
      <div className="glow" aria-hidden="true" />
      <Header
        lang={lang}
        onLang={setLang}
        view={view}
        onEmergency={() => {
          setView('emergency')
          setResult(null)
        }}
        onHome={() => {
          setView('check')
        }}
      />

      {view === 'emergency' ? (
        <EmergencyMode lang={lang} />
      ) : view === 'pitch' ? (
        <Pitch />
      ) : result ? (
        <ResultPanel
          result={result}
          lang={lang}
          onReset={() => {
            setResult(null)
            setText('')
          }}
        />
      ) : (
        <main className="hero-layout">
          <section className="intro">
            <p className="eyebrow">Tech for a better tomorrow</p>
            <h1>{t(lang, 'tagline')}</h1>
            <p className="lede">{t(lang, 'checkBefore')}</p>
            <p className="impact">{t(lang, 'impact')}</p>
            <ul className="pillars">
              <li>
                <b>Hybrid engine</b>
                Rules first, AI second. Score breakdown on every scan.
              </li>
              <li>
                <b>Family Shield</b>
                Forward a warning card to parents in their language.
              </li>
              <li>
                <b>Emergency hour</b>
                Already paid? Freeze, rotate keys, report — 1930 in India.
              </li>
            </ul>
          </section>

          <form className="composer" onSubmit={onSubmit}>
            <div className="tabs" role="tablist">
              {modes.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={mode === id}
                  className={mode === id ? 'is-on' : ''}
                  onClick={() => setMode(id)}
                >
                  {label}
                </button>
              ))}
            </div>

            {mode === 'screenshot' ? (
              <label className="upload">
                <input type="file" accept="image/*" onChange={(e) => void onFile(e)} />
                <span>{ocrBusy ? t(lang, 'reading') : t(lang, 'ocrHint')}</span>
              </label>
            ) : null}

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={mode === 'message' || mode === 'screenshot' ? 8 : 3}
              placeholder={
                mode === 'link' ? t(lang, 'placeholderLink') : mode === 'phone' ? t(lang, 'placeholderPhone') : t(lang, 'placeholderMessage')
              }
            />

            <div className="samples">
              <span>{t(lang, 'samples')}</span>
              {SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => {
                    setMode(sample.mode)
                    setText(sample.text)
                    void runScan(sample.text, sample.mode)
                  }}
                >
                  {sample.label}
                </button>
              ))}
            </div>

            {error ? <p className="warn-line">{error}</p> : null}

            <button type="submit" className="btn primary" disabled={busy || ocrBusy}>
              {busy ? t(lang, 'analyzing') : t(lang, 'analyze')}
            </button>
            <p className="privacy-kicker">{t(lang, 'privacyNote')}</p>
            {!hasGeminiKey() ? <p className="privacy-kicker dim">{t(lang, 'noAi')}</p> : null}
          </form>
        </main>
      )}

      {view === 'check' && !result ? (
        <section className="engine-band">
          <div>
            <p className="eyebrow">{t(lang, 'engine')}</p>
            <h2>{t(lang, 'howTitle')}</h2>
            <p>{t(lang, 'engineBody')}</p>
          </div>
          <ol className="flow">
            <li>
              <b>01 Mask</b>
              Phones, OTP, cards, UPI IDs leave the device as placeholders.
            </li>
            <li>
              <b>02 Rules</b>
              Lookalikes, punycode, shorteners, KYC threats, AnyDesk, collect requests.
            </li>
            <li>
              <b>03 Reason</b>
              Optional Gemini pass writes the explanation in the user’s language.
            </li>
            <li>
              <b>04 Act</b>
              Next steps, audio, Family Shield, or the emergency checklist.
            </li>
          </ol>
        </section>
      ) : null}

      <footer className="foot">
        <span>HACKDAY 1.0 · Open innovation · No install</span>
        <span>
          <a className="text-link" href="./pitch.html" target="_blank" rel="noreferrer">
            PPT slides
          </a>
          {' · '}
          <button type="button" className="text-link" onClick={() => setView(view === 'pitch' ? 'check' : 'pitch')}>
            {view === 'pitch' ? 'Back to app' : 'Judge one-pager'}
          </button>
        </span>
      </footer>
    </div>
  )
}
