import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import Logo from './Logo'

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Réalisations', href: '#realisations' },
  { label: 'Méthode', href: '#methode' },
  { label: 'Offres', href: '#offres' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const giantRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: giantRef, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['45%', '0%'])

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-cta">
            <span className="label on-dark">Un projet en tête&nbsp;?</span>
            <a className="footer-mail" href="mailto:contact@yakirix.com">contact@yakirix.com</a>
          </div>
          <nav className="footer-col" aria-label="Plan du site">
            <h4>Navigation</h4>
            <ul>{NAV.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
          </nav>
          <div className="footer-col">
            <h4>Agence</h4>
            <ul>
              <li>Dakar, Sénégal</li>
              <li><a href="tel:+221770000000">+221 77 000 00 00</a></li>
            </ul>
          </div>
        </div>

        <div ref={giantRef} className="footer-giant" aria-hidden="true">
          <motion.div style={{ y }}>
            <Logo className="footer-logo" label="Yakirix" />
          </motion.div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Yakirix. Tous droits réservés.</span>
          <span>Conçu et développé à Dakar.</span>
          <a href="#top" className="footer-top-link">Retour en haut <ArrowUp size={16} /></a>
        </div>
      </div>
    </footer>
  )
}
