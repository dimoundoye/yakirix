import { useRef } from 'react'
import { motion, useInView, useScroll } from 'framer-motion'
import { Clock } from 'lucide-react'
import { Button, Label, Reveal, SplitText } from './ui'

const STEPS = [
  { title: 'Découverte', text: 'Un premier échange pour comprendre votre activité, vos objectifs, vos utilisateurs et votre budget.', chip: 'Appel de 30 min' },
  { title: 'Proposition', text: 'Un devis détaillé, un planning précis et une première direction visuelle pour valider ensemble le cap.', chip: 'Sous 48h' },
  { title: 'Conception', text: 'Design et développement par étapes, avec des démonstrations régulières et vos retours intégrés au fil de l’eau.', chip: 'Points chaque semaine' },
  { title: 'Lancement et suivi', text: 'Mise en ligne, formation à vos outils, puis accompagnement pour faire évoluer votre produit.', chip: 'Suivi continu' },
]

export default function Process() {
  const stepsRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start 0.65', 'end 0.65'] })

  return (
    <section id="methode" className="section process">
      <div className="container process-grid">
        <div className="process-intro">
          <Reveal y={16}><Label>Méthode</Label></Reveal>
          <SplitText text="De l’idée au lancement, *sans friction.*" />
          <Reveal delay={0.15}>
            <p>Un processus clair, des échéances tenues et une communication transparente à chaque étape.</p>
            <Button href="#contact" variant="secondary">Planifier un appel</Button>
          </Reveal>
        </div>

        <div ref={stepsRef} className="steps">
          <div className="steps-line" aria-hidden="true">
            <motion.div className="steps-line-fill" style={{ scaleY: scrollYProgress }} />
          </div>
          {STEPS.map((s, i) => <Step key={s.title} step={s} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function Step({ step, index }) {
  const ref = useRef(null)
  const reached = useInView(ref, { once: true, margin: '0px 0px -40% 0px' })
  return (
    <div ref={ref} className={`step${reached ? ' is-active' : ''}`}>
      <span className="step-dot" aria-hidden="true" />
      <span className="step-num">Étape 0{index + 1}</span>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
      <span className="step-chip"><Clock size={15} />{step.chip}</span>
    </div>
  )
}
