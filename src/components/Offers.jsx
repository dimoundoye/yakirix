import { Check } from 'lucide-react'
import { Button, Reveal, SectionHead } from './ui'

// Tarifs : remplacer « Sur devis » par un prix (« À partir de … FCFA ») si souhaité
const OFFERS = [
  {
    name: 'Essentiel',
    desc: 'Pour lancer votre présence en ligne avec un site clair et efficace.',
    features: ['Site vitrine jusqu’à 5 pages', 'Design responsive (mobile, tablette)', 'Formulaire de contact', 'Référencement de base (SEO)', 'Mise en ligne et nom de domaine'],
  },
  {
    name: 'Croissance',
    desc: 'Pour vendre en ligne, automatiser et gagner du temps.',
    featured: true,
    features: ['Site sur mesure ou boutique en ligne', 'Paiement mobile money et carte', 'Espace d’administration', 'SEO avancé et statistiques', '3 mois de maintenance inclus'],
  },
  {
    name: 'Sur mesure',
    desc: 'Pour les applications mobiles et les plateformes SaaS.',
    features: ['Application iOS et Android', 'Plateforme SaaS et API', 'Architecture cloud évolutive', 'Accompagnement produit dédié', 'Maintenance et support continus'],
  },
]

export default function Offers() {
  return (
    <section id="offres" className="section offers-section">
      <div className="container">
        <SectionHead
          label="Offres"
          title="Une formule pour *chaque ambition.*"
          text="Chaque projet est unique : nous partons de vos besoins pour construire un devis juste et transparent."
        />
        <div className="offers">
          {OFFERS.map((o, i) => (
            <Reveal key={o.name} className={`offer${o.featured ? ' is-featured' : ''}`} delay={i * 0.1}>
              <div className="offer-top">
                <h3>{o.name}</h3>
                {o.featured && <span className="offer-badge">Recommandé</span>}
              </div>
              <p className="offer-desc">{o.desc}</p>
              <div className="offer-price">
                <small>Tarif</small>
                <strong>Sur devis</strong>
              </div>
              <ul>
                {o.features.map((f) => <li key={f}><Check size={18} />{f}</li>)}
              </ul>
              <Button href="#contact" variant={o.featured ? 'light' : 'secondary'} block>
                Demander un devis
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
