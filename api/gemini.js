export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST only' })
    return
  }

  const key = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY
  if (!key) {
    res.status(501).json({ error: 'NO_KEY' })
    return
  }

  const prompt = req.body?.prompt
  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'Missing prompt' })
    return
  }

  const models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-latest']
  let last = 'AI failed'
  for (const model of models) {
    try {
      const upstream = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 700,
              responseMimeType: 'application/json',
            },
          }),
        },
      )
      if (!upstream.ok) {
        last = `Gemini ${upstream.status}`
        continue
      }
      const data = await upstream.json()
      const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('\n') ?? ''
      if (!text) continue
      res.status(200).json({ text })
      return
    } catch (err) {
      last = err instanceof Error ? err.message : 'AI failed'
    }
  }

  res.status(502).json({ error: last })
}
