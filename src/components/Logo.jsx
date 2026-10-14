import { LOCKUP, MARK_PATH, WORDMARK } from './logoPaths'

const TERRACOTTA = '#C8553D'

// Symbole seul (baobab + soleil)
export function LogoMark({ size = 32, color = 'currentColor', className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d={MARK_PATH} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" />
      <circle cx="72" cy="23" r="8" fill={TERRACOTTA} />
    </svg>
  )
}

// Wordmark seul (« YAKIRIX » vectorisé)
export function Wordmark({ className }) {
  return (
    <svg className={className} viewBox={`0 0 ${WORDMARK.width} ${WORDMARK.height}`} aria-hidden="true">
      <path d={WORDMARK.d} fill="currentColor" />
    </svg>
  )
}

// Logo complet : symbole + wordmark, couleur héritée (currentColor)
export default function Logo({ height, className, label = 'Yakirix' }) {
  return (
    <svg
      className={className}
      height={height}
      viewBox={`0 0 ${LOCKUP.width} ${LOCKUP.height}`}
      role="img"
      aria-label={label}
      style={height ? { width: 'auto' } : undefined}
    >
      <g transform={`translate(${LOCKUP.markX} ${LOCKUP.markY}) scale(${LOCKUP.markScale}) translate(-24 -15)`}>
        <path d={MARK_PATH} fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
        <circle cx="72" cy="23" r="8" fill={TERRACOTTA} />
      </g>
      <path transform={`translate(${LOCKUP.textX} ${LOCKUP.textY})`} fill="currentColor" d={WORDMARK.d} />
    </svg>
  )
}
