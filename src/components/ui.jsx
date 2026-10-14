import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { EASE } from '../lib/motion'

export function Label({ children, className = '' }) {
  return <span className={`label ${className}`}>{children}</span>
}

// Apparition douce au défilement
export function Reveal({ children, delay = 0, y = 32, className, as = 'div', ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// « Tout votre numérique, *sous un même toit.* » → mots masqués qui montent un à un,
// le passage entre astérisques est en serif italique (accent).
function parse(text) {
  return text
    .split('*')
    .flatMap((part, i) => part.split(/\s+/).filter(Boolean).map((word) => ({ word, accent: i % 2 === 1 })))
}

const container = (delay) => ({ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: delay } } })
const word = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: { duration: 1, ease: EASE } },
}

export function SplitText({ text, as = 'h2', className, delay = 0, play, ...rest }) {
  const Tag = motion[as]
  const words = parse(text)
  const trigger =
    play === undefined
      ? { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
      : { animate: play ? 'show' : 'hidden' }

  return (
    <Tag className={className} initial="hidden" variants={container(delay)} {...trigger} {...rest}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className={`split-mask${w.accent ? ' is-accent' : ''}`}>
            <motion.span className="split-word" variants={word}>
              {w.word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </Tag>
  )
}

export function SectionHead({ label, title, text, dark = false, children }) {
  return (
    <div className={`section-head${dark ? ' is-dark' : ''}`}>
      <div>
        <Reveal y={16}>
          <Label>{label}</Label>
        </Reveal>
        <SplitText text={title} />
      </div>
      {(text || children) && (
        <Reveal className="section-head-aside" delay={0.15}>
          {text && <p>{text}</p>}
          {children}
        </Reveal>
      )}
    </div>
  )
}

// Bouton pilule : remplissage circulaire + flèche qui s'échange au survol
export function Button({ href, children, variant = 'primary', size, block, icon = true, className = '', ...rest }) {
  const Tag = href ? 'a' : 'button'
  const cls = ['btn', `btn-${variant}`, size === 'sm' && 'btn-sm', block && 'is-block', className].filter(Boolean).join(' ')
  return (
    <Tag href={href} className={cls} {...rest}>
      <span className="btn-label">{children}</span>
      {icon && (
        <span className="btn-icon" aria-hidden="true">
          <ArrowUpRight size={17} />
          <ArrowUpRight size={17} />
        </span>
      )}
    </Tag>
  )
}
