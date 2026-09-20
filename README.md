# Scam Shield

**An AI scam checker that explains itself, in your language.**

HACKDAY 1.0 · Tech for a Better Tomorrow

Paste a message, upload a screenshot, or drop a link / phone number. In seconds you get a verdict, a confidence score, red flags highlighted in the original text, an explanation (with audio) in your language, and a next-steps plan.

The prototype runs in the browser. No install. Built for first-time internet users, parents, and students.

## Why this exists

Spam filters fail silently. Fake KYC SMS, “digital arrest” calls, parcel-fee links, job offers, and UPI collect requests still empty accounts belonging to people who cannot tell a lookalike domain from a real bank. Almost none of the tools they are offered explain *why* something is dangerous, *in their language*, or *what to do after they already paid*.

## Three twists

1. **Hybrid detection** — Deterministic rules run first (lookalike domains, URL shorteners, punycode, urgency, OTP/PIN, remote-access apps). The LLM only reasons on top of that. Every result shows `rules` vs `AI` scores.
2. **Family Shield** — One tap builds a warning card / WhatsApp text in the recipient’s language so you can protect parents, not just yourself.
3. **Emergency mode** — “I already clicked or paid” is a first-hour checklist. Helplines are per country (India: **1930** and [cybercrime.gov.in](https://cybercrime.gov.in)).

Privacy: phone numbers, OTPs, cards, Aadhaar, emails, and UPI IDs are masked **in the browser** before anything is sent to an LLM.

## Quick start

```bash
npm install
npm run dev
```

Open the printed local URL on your laptop or phone.

Optional AI layer:

1. Copy `.env.example` to `.env`
2. Add a [Gemini API key](https://aistudio.google.com/apikey) as `VITE_GEMINI_API_KEY`
3. Restart `npm run dev`

Without a key, the rules engine, highlights, explanations, audio, Family Shield, and emergency checklist still work. That is the demo path if the venue Wi-Fi blocks model APIs.

## Demo script (2 minutes)

1. Click **Digital arrest** — should read **Scam**, with AnyDesk / OTP / secrecy highlighted and a high rules score.
2. Switch language to **हिन्दी** or **தமிழ்** and scan **Fake KYC**. Play **Listen**.
3. Open **Family Shield** → Share / copy for WhatsApp.
4. Click **I already clicked or paid** → India 1930 + checklist.
5. Open **Judge one-pager** in the footer.

Safe sample (`Hi Priya, I will be 10 minutes late…`) should come back **Likely safe**.

## Deploy

```bash
npm run build
```

- **Vercel**: import the GitHub repo. Set `GEMINI_API_KEY` (server) and optionally `VITE_GEMINI_API_KEY`. The `/api/gemini` function keeps the key off the client.
- **GitHub Pages / Netlify**: upload `dist/`. Rules-only unless you also set `VITE_GEMINI_API_KEY` at build time.

## PPT (7 slides)

Present `public/pitch.html` full screen, or copy these slides into Google Slides / PowerPoint.

1. **Title** — Scam Shield: an AI scam checker that explains itself, in your language.
2. **Problem** — Fake KYC, digital arrest, UPI collect, parcel & job scams vs silent spam filters and no regional-language “what next”.
3. **Solution** — Message / screenshot / link / number → verdict, flags, audio, next steps.
4. **Hybrid engine** — Rules 55% + AI 45%, masked text only. Show a scan screenshot with `rules: 78  ai: 90`.
5. **Family Shield** — Forwardable card for parents.
6. **Emergency + privacy** — 1930 / cybercrime.gov.in, in-browser masking.
7. **Impact** — Any phone, no install, a habit of checking before paying. Next: WhatsApp bot, telecom feed, more languages.

## Stack

React + TypeScript + Vite. On-device OCR via Tesseract.js. Optional Gemini. Web Speech API for audio. Canvas for the Family Shield card.
