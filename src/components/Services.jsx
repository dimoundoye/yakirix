import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { SectionHead } from './ui'
import { Browser, Phone } from './mockups/Devices'
import { MonitorScreen } from './mockups/Screens'
import { PROJECTS } from '../data/projects'

const { mahwa, leralscolaire, cargonotify } = PROJECTS

/* ───────────── Visuels de chaque service (projets réels) ───────────── */

function WebVisual() {
  return (
    <div className="sv sv-web">
      <Browser url={mahwa.domain} image={mahwa.extra} alt="Site de Mahwa Fondation, section des actions" />
      <Phone image={mahwa.mobile} status={mahwa.status} alt="Site de Mahwa Fondation sur mobile" />
    </div>
  )
}

function MobileVisual() {
  return (
    <div className="sv sv-mobile">
      <Phone className="sv-phone-back" image={leralscolaire.mobile} status={leralscolaire.status} alt="LéralScolaire sur mobile" />
      <Phone className="sv-phone-front" image={cargonotify.mobile} status={cargonotify.status} alt="Application CargoNotify sur mobile" />
    </div>
  )
}

function SaasVisual() {
  return (
    <div className="sv sv-saas">
      <Browser className="sv-main" url={leralscolaire.domain} image={leralscolaire.extra} alt="Plateforme LéralScolaire, les quatre pôles éducatifs" />
      <Browser className="sv-second" url={cargonotify.domain} image={cargonotify.desktop} alt="Espace de connexion de CargoNotify" />
    </div>
  )
}

function CareVisual() {
  return (
    <div className="sv sv-care">
      <MonitorScreen />
    </div>
  )
}

/* ───────────── Données ───────────── */

const SERVICES = [
  {
    title: 'Sites web',
    text: 'Sites vitrines, sites associatifs et boutiques en ligne : rapides, bien référencés et pensés pour transformer vos visiteurs en clients.',
    items: ['Design sur mesure et responsive', 'Référencement naturel (SEO)', 'Paiement en ligne et mobile money', 'Espace d’administration simple'],
    example: 'Exemple : Mahwa Fondation',
    theme: 'light',
    Visual: WebVisual,
  },
  {
    title: 'Applications mobiles',
    text: 'Des applications fluides et intuitives, installables sur iOS et Android, du prototype jusqu’à la mise en service.',
    items: ['Prototype interactif', 'Applications installables (PWA)', 'Notifications et paiements', 'Publication sur les stores'],
    example: 'Exemples : CargoNotify, LéralScolaire',
    theme: 'green',
    Visual: MobileVisual,
  },
  {
    title: 'Plateformes SaaS',
    text: 'Des outils en ligne évolutifs : plateformes métier, tableaux de bord et espaces clients, hébergés sur une infrastructure cloud solide.',
    items: ['Architecture cloud évolutive', 'Tableaux de bord et statistiques', 'Comptes, rôles et abonnements', 'API et intégrations'],
    example: 'Exemples : LéralScolaire, CargoNotify',
    theme: 'sand',
    Visual: SaasVisual,
  },
  {
    title: 'Conseil et maintenance',
    text: 'Audit, hébergement, sécurité et évolutions : nous veillons sur vos outils pour qu’ils restent rapides et fiables.',
    items: ['Audit technique et UX', 'Hébergement et sauvegardes', 'Mises à jour et sécurité', 'Support réactif'],
    theme: 'dark',
    Visual: CareVisual,
  },
]

export default function Services() {
  const stackRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] })

  return (
    <section id="services" className="section services">
      <div className="container">
        <SectionHead
          label="Services"
          title="Tout votre numérique, *sous un même toit.*"
          text="De la première maquette à la mise en production, nous couvrons chaque étape de votre projet avec la même exigence."
        />
        <div ref={stackRef} className="stack">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} total={SERVICES.length} progress={scrollYProgress} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Les cartes s'empilent : chacune reste collée en haut et rétrécit quand la suivante arrive
function ServiceCard({ service, index, total, progress, reduce }) {
  const target = 1 - (total - 1 - index) * 0.045
  const scale = useTransform(progress, [index / total, 1], [1, target])
  const { Visual } = service

  return (
    <div className="stack-slot">
      <motion.article
        className={`service-card is-${service.theme}`}
        style={{ scale: reduce ? 1 : scale, top: `calc(${index} * var(--stack-step))` }}
      >
        <div className="service-body">
          <span className="service-num">0{index + 1} <span>/ 0{total}</span></span>
          <h3>{service.title}</h3>
          <p>{service.text}</p>
          {service.example && <span className="service-example">{service.example}</span>}
          <ul className="service-list">
            {service.items.map((item) => (
              <li key={item}><Check size={17} />{item}</li>
            ))}
          </ul>
        </div>
        <div className="service-visual">
          <Visual />
        </div>
      </motion.article>
    </div>
  )
}
