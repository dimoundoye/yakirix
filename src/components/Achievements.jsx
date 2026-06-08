import React from 'react'
import { motion } from 'framer-motion'

const stats = [
  { value: '150+', label: 'Projets Terminés' },
  { value: '50+', label: 'Clients Heureux' },
  { value: '12', label: 'Pays Atteints' },
  { value: '24/7', label: 'Support Technique' }
]

export default function Achievements() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '4rem' }}>
        Nos <span className="gradient-text">Réalisations</span>
      </h2>
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
              fontWeight: 'bold', 
              marginBottom: '0.5rem',
              color: 'var(--accent-color)',
              lineHeight: 1
            }}>
              {stat.value}
            </div>
            <div style={{ 
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', 
              opacity: 0.7, 
              textTransform: 'uppercase', 
              letterSpacing: '1px' 
            }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
