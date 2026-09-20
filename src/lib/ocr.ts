export async function readScreenshot(file: File): Promise<string> {
  const Tesseract = await import('tesseract.js')
  const result = await Tesseract.recognize(file, 'eng', {
    logger: () => undefined,
  })
  const text = result.data.text.replace(/\s+\n/g, '\n').trim()
  if (!text) throw new Error('Could not read text from that image. Try a sharper screenshot or paste the message.')
  return text
}
