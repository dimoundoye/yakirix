import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionHead } from './ui'
import { Browser, Phone } from './mockups/Devices'
import { PROJECT_LIST } from '../data/projects'
import { EASE } from '../lib/motion'

const CATEGORIES = ['Tous', ...new Set(PROJECT_LIST.map((p) => p.category))]

export default function Work() {
  const [active, setActive] = useState('Tous')
  const shown = active === 'Tous' ? PROJECT_LIST : PROJECT_LIST.filter((p) => p.category === active)

  return (
    <section id="realisations" className="section work">
      <div className="container">
        <SectionHead label="Réalisations" title="Des projets qui *parlent d’eux-mêmes.*">
          <div className="tabs" role="tablist" aria-label="Filtrer les réalisations">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active === c}
                className={`tab${active === c ? ' is-active' : ''}`}
                onClick={() => setActive(c)}
              >
                {active === c && (
                  <motion.span layoutId="tab-pill" className="tab-pill" transition={{ type: 'spring', bounce: 0.18, duration: 0.6 }} />
                )}
                {c}
              </button>
            ))}
          </div>
        </SectionHead>

        <div className="work-grid">
          {shown.map((p, i) => (
            <ProjectCard key={`${active}-${p.name}`} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const delay = (index % 2) * 0.12
  return (
    <motion.article
      className="work-card"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      <a
        className="work-link"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Voir le site ${project.name} (nouvel onglet)`}
      >
        <motion.div
          className="work-media"
          style={{ background: project.bg }}
          initial={{ clipPath: 'inset(10% 10% 10% 10% round 32px)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 32px)' }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.3, delay, ease: EASE }}
        >
          <div className="work-visual">
            <Browser url={project.domain} image={project.desktop} alt={`Site ${project.name}, version ordinateur`} />
            <Phone image={project.mobile} status={project.status} alt={`Site ${project.name}, version mobile`} />
          </div>
          <span className="work-cta" aria-hidden="true">Voir le site <ArrowUpRight size={16} /></span>
        </motion.div>
      </a>
      <div className="work-meta">
        <div>
          <span className="work-sector">{project.sector}</span>
          <h3>
            <a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}</a>
          </h3>
          <p>{project.description}</p>
        </div>
        <span className="work-tag">{project.category}</span>
      </div>
    </motion.article>
  )
}
