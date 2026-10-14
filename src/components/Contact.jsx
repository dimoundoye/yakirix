import { useRef, useState } from 'react'
import { ArrowUpRight, CircleAlert, CircleCheck } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { Button, Label, Reveal, SplitText } from './ui'

const PROJECT_TYPES = ['Site web', 'Application mobile', 'Plateforme SaaS', 'Conseil / maintenance', 'Autre']

export default function Contact() {
  const form = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const sendEmail = (e) => {
    e.preventDefault()
    setStatus('sending')

    emailjs
      .sendForm('service_nmsbhim', 'template_cqqi86j', form.current, 'c9Ynk0AsGjpL8Y31P') // clé publique EmailJS
      .then(
        () => {
          setStatus('success')
          form.current?.reset()
        },
        (error) => {
          console.error('EmailJS :', error?.text ?? error)
          setStatus('error')
        },
      )
  }

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div>
          <Reveal y={16}><Label className="on-dark">Contact</Label></Reveal>
          <SplitText id="contact-title" text="Parlons de *votre projet.*" />
          <Reveal delay={0.15}>
            <p className="contact-lead">
              Racontez-nous votre idée : nous revenons vers vous sous 24h avec une première analyse et un devis gratuit.
            </p>
            <div className="contact-info">
              <a href="mailto:contact@yakirix.com">
                <span><small>Email</small>contact@yakirix.com</span>
                <ArrowUpRight size={20} />
              </a>
              <a href="tel:+221770000000">
                <span><small>Téléphone</small>+221 77 000 00 00</span>
                <ArrowUpRight size={20} />
              </a>
              <div>
                <span><small>Adresse</small>Dakar, Sénégal</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form ref={form} className="form" onSubmit={sendEmail}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="user_name">Nom complet</label>
                <input id="user_name" name="user_name" type="text" autoComplete="name" required placeholder="Aminata Diop" />
              </div>
              <div className="field">
                <label htmlFor="user_email">Email</label>
                <input id="user_email" name="user_email" type="email" autoComplete="email" required placeholder="vous@entreprise.com" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="user_phone">Téléphone <span className="optional">(facultatif)</span></label>
              <input id="user_phone" name="user_phone" type="tel" autoComplete="tel" placeholder="+221 77 123 45 67" />
            </div>
            <fieldset className="field">
              <legend>Type de projet</legend>
              <div className="choices">
                {PROJECT_TYPES.map((t, i) => (
                  <label key={t} className="choice">
                    <input type="radio" name="project_type" value={t} defaultChecked={i === 0} />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="field">
              <label htmlFor="message">Votre projet</label>
              <textarea id="message" name="message" rows="4" required placeholder="Décrivez votre idée, vos objectifs, vos délais…" />
            </div>

            <div className="form-footer">
              <Button type="submit" variant="light" disabled={status === 'sending'}>
                {status === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}
              </Button>
              <div aria-live="polite">
                {status === 'success' && (
                  <p className="form-status is-ok"><CircleCheck size={18} />Message envoyé, nous vous répondons très vite.</p>
                )}
                {status === 'error' && (
                  <p className="form-status is-error"><CircleAlert size={18} />L’envoi a échoué. Écrivez-nous à contact@yakirix.com.</p>
                )}
                {status === 'idle' && <p className="form-note">Réponse sous 24h ouvrées.</p>}
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
