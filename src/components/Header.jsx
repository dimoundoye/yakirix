import { useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Logo from './Logo'
import { Button } from './ui'
import { EASE, EASE_IN_OUT, ReadyContext } from '../lib/motion'

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Réalisations', href: '#realisations' },
  { label: 'Méthode', href: '#methode' },
  { label: 'Offres', href: '#offres' },
  { label: 'FAQ', href: '#faq' },
]

export default function Header({ menuOpen, setMenuOpen }) {
  const ready = useContext(ReadyContext)
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Se cache quand on descend, réapparaît dès qu'on remonte
  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > previous && y > 520)
  })

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen, setMenuOpen])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => e.matches && setMenuOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [setMenuOpen])

  const close = () => setMenuOpen(false)
  const visible = ready && (!hidden || menuOpen)
  const cls = ['header', scrolled && 'is-scrolled', menuOpen && 'is-menu-open'].filter(Boolean).join(' ')

  return (
    <>
      <motion.header
        className={cls}
        initial={{ y: '-100%' }}
        animate={{ y: visible ? '0%' : '-100%' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="container header-inner">
          <a href="#top" className="header-logo" onClick={close} aria-label="Yakirix, retour en haut de page">
            <Logo height={26} label="Yakirix" />
          </a>

          <nav className="header-nav" aria-label="Navigation principale">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="roll">
                <span data-text={l.label}>{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <Button href="#contact" size="sm" className="header-cta">Démarrer un projet</Button>
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
            >
              <span>{menuOpen ? 'Fermer' : 'Menu'}</span>
              <span className="menu-toggle-icon" aria-hidden="true"><i /><i /></span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-mobile"
            className="menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.8, ease: EASE_IN_OUT }}
          >
            <nav aria-label="Navigation mobile">
              {[...LINKS, { label: 'Contact', href: '#contact' }].map((l, i) => (
                <div key={l.href} className="menu-mask">
                  <motion.a
                    href={l.href}
                    className="menu-link"
                    onClick={close}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease: EASE }}
                  >
                    <span>0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div
              className="menu-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a href="mailto:contact@yakirix.com">contact@yakirix.com</a>
              <span>Dakar, Sénégal</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
