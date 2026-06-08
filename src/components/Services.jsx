import React from 'react'
import { motion } from 'framer-motion'
import { Globe, Smartphone, Cloud, Code } from 'lucide-react'

const services = [
  {
    title: 'Développement Web',
    description: 'Sites vitrines, e-commerce et plateformes complexes sur mesure.',
    icon: <Globe size={32} />
  },
  {
    title: 'Applications Mobiles',
    description: 'Expériences natives et hybrides fluides sur iOS et Android.',
    icon: <Smartphone size={32} />
  },
  {
    title: 'Déploiement SaaS',
    description: 'Architecture cloud scalable et mise en production de vos solutions SaaS.',
    icon: <Cloud size={32} />
  },
  {
    title: 'Services Numériques',
    description: 'Conseil, transformation digitale et maintenance applicative.',
    icon: <Code size={32} />
  }
]

export default function Services() {
  return (
    <div>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '3rem' }}>
        Nos <span className="gradient-text">Services</span>
      </h2>
      <div className="services-grid">
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="glass-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div style={{ color: 'var(--accent-color)', marginBottom: '1.5rem' }}>
              {service.icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.title}</h3>
            <p style={{ opacity: 0.7, lineHeight: 1.6 }}>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
