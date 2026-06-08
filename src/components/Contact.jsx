import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const form = useRef()
  const [status, setStatus] = useState('idle') // idle, sending, success, error

  const sendEmail = (e) => {
    e.preventDefault()
    setStatus('sending')

    // Configuration EmailJS réelle
    // Remplace 'YOUR_SERVICE_ID' et 'YOUR_TEMPLATE_ID' par tes IDs
    emailjs.sendForm(
      'service_nmsbhim', 
      'template_cqqi86j', 
      form.current, 
      'c9Ynk0AsGjpL8Y31P' // Ta clé publique
    )
    .then((result) => {
        console.log('SUCCESS!', result.text)
        setStatus('success')
        form.current.reset()
        setTimeout(() => setStatus('idle'), 5000)
    }, (error) => {
        console.log('FAILED...', error.text)
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
    })
  }

  return (
    <div>
      <div className="contact-grid">
        <div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Parlons de votre <span className="gradient-text">Projet</span>
          </h2>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', opacity: 0.7, marginBottom: '3rem', lineHeight: 1.6 }}>
            Vous avez une idée ? Nous avons l'expertise pour la transformer en succès technologique. Contactez-nous dès aujourd'hui.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ 
                padding: '1rem', 
                background: 'var(--glass-bg)', 
                borderRadius: '15px', 
                color: 'var(--accent-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Mail size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>Email</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>contact@yakirix.com</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ 
                padding: '1rem', 
                background: 'var(--glass-bg)', 
                borderRadius: '15px', 
                color: 'var(--accent-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Phone size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>Téléphone</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>+221 77 000 00 00</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ 
                padding: '1rem', 
                background: 'var(--glass-bg)', 
                borderRadius: '15px', 
                color: 'var(--accent-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MapPin size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>Localisation</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>Dakar, Sénégal</div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ position: 'relative' }}>
          <motion.form 
            ref={form}
            onSubmit={sendEmail}
            className="glass-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', opacity: 0.7, fontWeight: 500 }}>Nom complet</label>
              <input 
                type="text" 
                name="user_name"
                required
                style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid var(--glass-border)', 
                  padding: '1rem', 
                  borderRadius: '12px',
                  color: '#fff',
                  outline: 'none'
                }} placeholder="Votre nom" 
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', opacity: 0.7, fontWeight: 500 }}>Email</label>
              <input 
                type="email" 
                name="user_email"
                required
                style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid var(--glass-border)', 
                  padding: '1rem', 
                  borderRadius: '12px',
                  color: '#fff',
                  outline: 'none'
                }} placeholder="votre@email.com" 
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', opacity: 0.7, fontWeight: 500 }}>Message</label>
              <textarea 
                name="message"
                required
                rows="5" 
                style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid var(--glass-border)', 
                  padding: '1rem', 
                  borderRadius: '12px',
                  color: '#fff',
                  outline: 'none',
                  resize: 'none'
                }} placeholder="Dites-nous tout..." 
              />
            </div>
            
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={status === 'sending'}
              style={{ 
                marginTop: '1rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.8rem',
                opacity: status === 'sending' ? 0.7 : 1
              }}
            >
              {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
              <Send size={18} />
            </button>
          </motion.form>

          {/* Feedback Overlay */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(5,5,5,0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '24px',
                  zIndex: 10,
                  textAlign: 'center',
                  padding: '2rem'
                }}
              >
                <CheckCircle size={60} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message Envoyé !</h3>
                <p style={{ opacity: 0.7 }}>Merci, nous vous répondrons très prochainement.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="btn-secondary" 
                  style={{ marginTop: '2rem', padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}
                >
                  Fermer
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
