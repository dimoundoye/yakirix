import { useState } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { Label, Reveal, SplitText } from './ui'

const FAQS = [
  { q: 'Combien coûte un site ou une application ?', a: 'Cela dépend de la taille du projet et des fonctionnalités. Après un premier échange, nous vous envoyons un devis détaillé et gratuit sous 48h.' },
  { q: 'Combien de temps faut-il pour réaliser mon projet ?', a: 'Comptez en général 1 à 3 semaines pour un site vitrine, et quelques semaines à quelques mois pour une application ou une plateforme SaaS. Le planning est fixé ensemble dès le départ.' },
  { q: 'Est-ce que le site et le code m’appartiennent ?', a: 'Oui. À la livraison, vous êtes propriétaire de votre site, de votre code, de vos contenus et de vos accès.' },
  { q: 'Travaillez-vous avec des clients hors du Sénégal ?', a: 'Oui. Nous sommes basés à Dakar et travaillons à distance avec des clients partout dans le monde.' },
  { q: 'Proposez-vous la maintenance après la mise en ligne ?', a: 'Oui : mises à jour, sécurité, sauvegardes, hébergement et évolutions. Nous proposons des formules adaptées à chaque projet.' },
  { q: 'Je n’ai pas encore de logo ni de contenu, est-ce un problème ?', a: 'Pas du tout. Nous pouvons vous accompagner sur l’identité visuelle, les textes et les visuels en même temps que le site.' },
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="section faq-section">
      <div className="container faq-grid">
        <div className="faq-intro">
          <Reveal y={16}><Label>FAQ</Label></Reveal>
          <SplitText text="Questions *fréquentes.*" />
          <Reveal delay={0.15}>
            <p>Vous ne trouvez pas votre réponse&nbsp;?</p>
            <a className="link-arrow" href="mailto:contact@yakirix.com">
              Écrivez-nous <ArrowUpRight size={18} />
            </a>
          </Reveal>
        </div>

        <Reveal className="faq" delay={0.1}>
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className={`faq-item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {f.q}
                  <span className="faq-icon" aria-hidden="true"><Plus size={18} /></span>
                </button>
                <div id={`faq-${i}`} className="faq-panel" role="region" aria-hidden={!isOpen}>
                  <div><p>{f.a}</p></div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
