import type { LanguageCode } from '../types'
import { t } from '../lib/i18n'

interface Props {
  lang: LanguageCode
  onLang: (code: LanguageCode) => void
  onEmergency: () => void
  onHome: () => void
  view: 'check' | 'emergency' | 'pitch'
}

export function Header({ lang, onLang, onEmergency, onHome, view }: Props) {
  return (
    <header className="topbar">
      <button type="button" className="brand" onClick={onHome}>
        <span className="mark" aria-hidden="true">
          <svg viewBox="0 0 32 36" width="28" height="32">
            <path
              d="M16 2 L30 8 V18 C30 27 24 33 16 35 C8 33 2 27 2 18 V8 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M10 18 L14 22 L22 12" fill="none" stroke="currentColor" strokeWidth="2.4" />
          </svg>
        </span>
        <span>
          <strong>{t(lang, 'brand')}</strong>
          <em>Check before you pay</em>
        </span>
      </button>
      <div className="top-actions">
        <label className="lang-wrap">
          <span className="sr">{t(lang, 'explainIn')}</span>
          <select value={lang} onChange={(e) => onLang(e.target.value as LanguageCode)} aria-label={t(lang, 'explainIn')}>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="ta">தமிழ்</option>
            <option value="te">తెలుగు</option>
            <option value="bn">বাংলা</option>
            <option value="mr">मराठी</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="ml">മലയാളം</option>
            <option value="gu">ગુજરાતી</option>
            <option value="pa">ਪੰਜਾਬੀ</option>
          </select>
        </label>
        {view !== 'emergency' ? (
          <button type="button" className="btn danger-ghost" onClick={onEmergency}>
            {t(lang, 'emergency')}
          </button>
        ) : (
          <button type="button" className="btn ghost" onClick={onHome}>
            {t(lang, 'back')}
          </button>
        )}
      </div>
    </header>
  )
}
