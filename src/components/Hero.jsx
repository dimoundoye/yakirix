import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div style={{ maxWidth: '700px' }}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ fontSize: '0.9rem', letterSpacing: '3px', opacity: 0.5, textTransform: 'uppercase', marginBottom: '1.5rem' }}
      >
        Agence Numérique · Dakar
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}
      >
        L'Avenir Numérique <br />
        <span className="gradient-text">Commence Ici.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', opacity: 0.75, marginBottom: '2.5rem', maxWidth: '540px', lineHeight: 1.7 }}
      >
        Yakirix transforme vos idées en réalités numériques. Sites web, applications mobiles et solutions SaaS de pointe pour propulser votre entreprise.
      </motion.p>

      <motion.div
        className="hero-buttons"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <button className="btn-primary">Démarrer un projet</button>
        <button className="btn-secondary">Voir nos travaux</button>
      </motion.div>
    </div>
  )
}
