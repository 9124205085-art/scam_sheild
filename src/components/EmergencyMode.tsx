import { useMemo, useState } from 'react'
import type { LanguageCode } from '../types'
import { COUNTRIES, countryByCode } from '../lib/helplines'
import { t } from '../lib/i18n'

const STEPS = [
  {
    id: 'stop',
    title: 'Stop the bleeding',
    body: 'Hang up. Uninstall AnyDesk, TeamViewer, UltraViewer. Do not send another OTP, screenshot, or rupee — including to someone who says they will “get your money back”.',
  },
  {
    id: 'bank',
    title: 'Freeze with your bank (first 10 minutes)',
    body: 'Call the number printed on the back of your debit card. Ask them to freeze UPI, cards, and net banking. Say it is a cyber fraud, give the time and amount.',
  },
  {
    id: 'pins',
    title: 'Change the keys',
    body: 'Reset UPI PIN, internet-banking password, email password, and WhatsApp 2-step PIN. Sign out of other devices.',
  },
  {
    id: 'report',
    title: 'Report officially',
    body: 'Use your country’s helpline and portal. Keep UTR / UPI reference numbers and a screenshot of the chat.',
  },
  {
    id: 'family',
    title: 'Tell one trusted person',
    body: 'Scam follow-ups often impersonate “recovery agents”. A family member should know so they are not tricked next.',
  },
  {
    id: 'watch',
    title: 'Watch the next 48 hours',
    body: 'New OTPs, collect requests, or “police” calls are part of the same ring. Do not engage. File a local police complaint if the amount is large.',
  },
]

export function EmergencyMode({ lang }: { lang: LanguageCode }) {
  const [code, setCode] = useState('IN')
  const [done, setDone] = useState<Record<string, boolean>>({})
  const help = useMemo(() => countryByCode(code), [code])
  const finished = STEPS.filter((s) => done[s.id]).length

  return (
    <section className="emergency">
      <p className="eyebrow alert">First hour</p>
      <h1>{t(lang, 'emergency')}</h1>
      <p className="lede">
        Detection is not enough. If you already tapped, installed an app, or paid, work this list from the top. Do not
        multitask with the scammer still on the line.
      </p>

      <label className="country-line">
        Country / helpline
        <select value={code} onChange={(e) => setCode(e.target.value)}>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <div className="help-card">
        <p>
          <strong>{help.helplineLabel}</strong>
          <span> {help.helpline}</span>
        </p>
        <p>
          Report portal:{' '}
          <a href={help.reportUrl} target="_blank" rel="noreferrer">
            {help.reportLabel}
          </a>
        </p>
        {help.extra ? <p>{help.extra}</p> : null}
        <div className="row-actions">
          <a className="btn" href={`tel:${help.helpline.replace(/\s+/g, '')}`}>
            Call helpline
          </a>
          <a className="btn ghost" href={help.reportUrl} target="_blank" rel="noreferrer">
            Open report site
          </a>
        </div>
      </div>

      <p className="progress">
        {finished} / {STEPS.length} steps ticked
      </p>
      <ol className="checklist">
        {STEPS.map((step, i) => (
          <li key={step.id} className={done[step.id] ? 'is-done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={Boolean(done[step.id])}
                onChange={() => setDone((prev) => ({ ...prev, [step.id]: !prev[step.id] }))}
              />
              <span>
                <b>
                  {i + 1}. {step.title}
                </b>
                {step.body}
              </span>
            </label>
          </li>
        ))}
      </ol>
    </section>
  )
}
