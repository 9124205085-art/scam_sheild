export function Pitch() {
  return (
    <section className="pitch">
      <p className="eyebrow">HACKDAY 1.0  ·  DECODEP</p>
      <h1>Scam Shield</h1>
      <p className="lede">An AI scam checker that explains itself, in your language.</p>
      <div className="pitch-grid">
        <article>
          <h3>Problem</h3>
          <p>
            Fake KYC, digital-arrest calls, parcel fees, job offers, and UPI collect requests hit first-time internet
            users, elders, and students. Spam filters fail silently. Almost none explain the danger in a regional
            language — or what to do after money has moved.
          </p>
        </article>
        <article>
          <h3>Solution</h3>
          <p>
            Paste a message, upload a screenshot, or drop a link / number. In seconds: verdict, confidence, highlighted
            red flags, audio explanation, and a next-steps plan.
          </p>
        </article>
        <article>
          <h3>Twist 1 — Hybrid engine</h3>
          <p>
            Rules first: lookalike domains, shorteners, punycode, urgency, OTP, remote-access apps. LLM reasons on
            masked text only. Judges see <b>rules: 70, AI: 90</b> — not a wrapped chatbot.
          </p>
        </article>
        <article>
          <h3>Twist 2 — Family Shield</h3>
          <p>
            One tap builds a shareable warning card in the recipient’s language, ready for WhatsApp. Protection becomes
            a habit you can forward to parents.
          </p>
        </article>
        <article>
          <h3>Twist 3 — Emergency mode</h3>
          <p>
            “I already clicked or paid” is a first-hour checklist: freeze with the bank, rotate PINs, report. India
            defaults to <b>1930</b> and <b>cybercrime.gov.in</b>, configurable by country.
          </p>
        </article>
        <article>
          <h3>Privacy</h3>
          <p>
            Phone numbers and OTPs are masked in the browser before anything reaches the LLM. Screenshot OCR runs on
            device. No install required.
          </p>
        </article>
      </div>
    </section>
  )
}
