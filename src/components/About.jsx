import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Label, Reveal } from './ui'

const TEXT =
  'Yakirix est née à Dakar d’une conviction simple : chaque entreprise mérite un produit numérique à la hauteur de ses ambitions. Particuliers, PME, startups ou institutions, nous concevons des sites et des applications rapides, élégants et faits pour durer. Et nous aimons *les défis.*'

export default function About() {
  return (
    <section className="section about" aria-labelledby="about-title">
      <div className="container">
        <Reveal y={16}><Label>À propos</Label></Reveal>
        <h2 id="about-title" className="sr-only">À propos de Yakirix</h2>
        <ScrollText text={TEXT} />

      </div>
    </section>
  )
}

// Le texte s'illumine mot à mot au fil du défilement
function ScrollText({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = text
    .split('*')
    .flatMap((part, i) => part.split(' ').filter(Boolean).map((w) => ({ w, accent: i % 2 === 1 })))

  return (
    <p ref={ref} className="about-text">
      {words.map((item, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={item.accent}>
          {item.w}
        </Word>
      ))}
    </p>
  )
}

function Word({ progress, range, accent, children }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <>
      <motion.span className={accent ? 'is-accent' : undefined} style={{ opacity }}>
        {children}
      </motion.span>{' '}
    </>
  )
}
