import type { ReactNode } from 'react'
import type { HighlightSpan } from '../types'

export function HighlightedText({ text, highlights }: { text: string; highlights: HighlightSpan[] }) {
  if (!text) return null
  const sorted = [...highlights].sort((a, b) => a.start - b.start)
  const nodes: ReactNode[] = []
  let cursor = 0
  sorted.forEach((span, i) => {
    const start = Math.max(0, Math.min(text.length, span.start))
    const end = Math.max(start, Math.min(text.length, span.end))
    if (start < cursor) return
    if (start > cursor) nodes.push(<span key={`t-${i}`}>{text.slice(cursor, start)}</span>)
    nodes.push(
      <mark key={`m-${i}`} className={`hl ${span.severity}`} title={span.label}>
        {text.slice(start, end)}
        <em>{span.label}</em>
      </mark>,
    )
    cursor = end
  })
  if (cursor < text.length) nodes.push(<span key="tail">{text.slice(cursor)}</span>)
  return <p className="flag-text">{nodes}</p>
}
