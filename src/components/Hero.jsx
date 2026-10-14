import { useContext, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from './ui'
import { Browser, Phone } from './mockups/Devices'
import { PROJECTS } from '../data/projects'
import { EASE, ReadyContext } from '../lib/motion'

const WORDS = ['sites web', 'applications', 'plateformes SaaS', 'boutiques en ligne']
const { ebena, samalocation } = PROJECTS

const lines = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const line = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1.15, ease: EASE } },
}

export default function Hero() {
  const ready = useContext(ReadyContext)
  const fade = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 1, delay, ease: EASE },
  })

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <h1 id="hero-title" className="hero-title">
          <span className="sr-only">
            Nous concevons des sites web, des applications, des plateformes SaaS et des boutiques en ligne qui font la différence.
          </span>
          <motion.span aria-hidden="true" className="hero-lines" initial="hidden" animate={ready ? 'show' : 'hidden'} variants={lines}>
            <span className="hero-line"><motion.span className="hero-line-inner" variants={line}>Nous concevons des</motion.span></span>
            <span className="hero-line"><motion.span className="hero-line-inner" variants={line}><Rotator words={WORDS} running={ready} /></motion.span></span>
            <span className="hero-line"><motion.span className="hero-line-inner" variants={line}>qui font la différence.</motion.span></span>
          </motion.span>
        </h1>

        <div className="hero-bottom">
          <motion.div className="hero-copy" {...fade(0.45)}>
            <p className="hero-lead">
              Yakirix est une agence numérique basée à Dakar. Nous concevons, développons et faisons
              évoluer des produits web et mobiles pour les entreprises qui veulent aller plus loin.
            </p>
            <ul className="hero-proof">
              <li><Check size={16} />Devis gratuit sous 48h</li>
              <li><Check size={16} />Un interlocuteur dédié</li>
              <li><Check size={16} />Code 100 % à vous</li>
            </ul>
          </motion.div>
          <motion.div className="hero-actions" {...fade(0.55)}>
            <Button href="#contact">Démarrer un projet</Button>
            <Button href="#realisations" variant="secondary">Voir nos réalisations</Button>
          </motion.div>
        </div>
      </div>

      <Showreel ready={ready} />
    </section>
  )
}

// Mot qui change en fondu (avec flou) — la largeur est réservée par le mot le plus long
function Rotator({ words, running }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2600)
    return () => clearInterval(id)
  }, [running, words.length])

  return (
    <span className="rotator">
      {words.map((w, i) => {
        const isActive = i === index
        const isPrevious = i === (index - 1 + words.length) % words.length
        return (
          <motion.span
            key={w}
            className="rotator-word"
            initial={false}
            animate={
              isActive
                ? { opacity: 1, y: '0%', filter: 'blur(0px)' }
                : { opacity: 0, y: isPrevious ? '-35%' : '35%', filter: 'blur(12px)' }
            }
            transition={{ duration: 0.9, ease: EASE }}
          >
            {w}
          </motion.span>
        )
      })}
    </span>
  )
}

// Grande vitrine animée : site + application, avec parallaxe au défilement
function Showreel({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.92, 1])
  const radius = useTransform(scrollYProgress, [0, 0.4], [56, 32])
  const yBrowser = useTransform(scrollYProgress, [0, 1], ['8%', '-6%'])
  const yPhone = useTransform(scrollYProgress, [0, 1], ['22%', '-12%'])

  return (
    <motion.div
      ref={ref}
      className="container showreel-wrap"
      initial={{ opacity: 0, y: 80 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 1.3, delay: 0.55, ease: EASE }}
    >
      <motion.div className="showreel" style={{ scale, borderRadius: radius }}>
        <div className="showreel-bg" aria-hidden="true" />
        <span className="showreel-caption">Réalisations · ÉBËNA 2027 et Samalocation</span>

        <motion.div className="sr-browser" style={{ y: yBrowser }}>
          <Browser url={ebena.domain} image={ebena.desktop} alt="Page d’accueil du site ÉBËNA 2027" eager />
        </motion.div>
        <motion.div className="sr-phone" style={{ y: yPhone }}>
          <Phone image={samalocation.mobile} status={samalocation.status} alt="Samalocation sur mobile" eager />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
