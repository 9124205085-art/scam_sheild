import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { EmergencyMode } from './components/EmergencyMode'
import { Header } from './components/Header'
import { ResultPanel } from './components/ResultPanel'
import { analyzeContent } from './lib/analyze'
import { readScreenshot } from './lib/ocr'
import { SAMPLES } from './lib/samples'
import { t } from './lib/i18n'
import type { AnalysisResult, InputMode, LanguageCode } from './types'

export default function App() {
  const [lang, setLang] = useState<LanguageCode>('en')
  const [view, setView] = useState<'check' | 'emergency'>('check')
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
      setError('Add a message, screenshot, link, or phone number first.')
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
      <Header
        lang={lang}
        onLang={setLang}
        view={view}
        onEmergency={() => {
          setView('emergency')
          setResult(null)
        }}
        onHome={() => setView('check')}
      />

      {view === 'emergency' ? (
        <EmergencyMode lang={lang} />
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
        <main className="simple-main">
          <h1>{t(lang, 'tagline')}</h1>
          <ol className="how">
            <li>{t(lang, 'how1')}</li>
            <li>{t(lang, 'how2')}</li>
            <li>{t(lang, 'how3')}</li>
          </ol>

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
              rows={mode === 'message' || mode === 'screenshot' ? 7 : 3}
              placeholder={
                mode === 'link'
                  ? t(lang, 'placeholderLink')
                  : mode === 'phone'
                    ? t(lang, 'placeholderPhone')
                    : t(lang, 'placeholderMessage')
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
          </form>
        </main>
      )}
    </div>
  )
}
