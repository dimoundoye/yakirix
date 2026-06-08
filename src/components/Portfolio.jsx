import React from 'react'
import { motion } from 'framer-motion'

const projects = [
  { title: 'Nexus CRM', category: 'Plateforme SaaS', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
  { title: 'Vibe App', category: 'UI/UX Mobile', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80' },
  { title: 'EcoTrack', category: 'Tableau de bord Web', image: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?w=800&q=80' }
]

export default function Portfolio() {
  return (
    <div>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '3rem' }}>
        Notre <span className="gradient-text">Portfolio</span>
      </h2>
      <div className="portfolio-grid">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            style={{ 
              borderRadius: '24px', 
              overflow: 'hidden', 
              position: 'relative',
              height: 'clamp(300px, 40vh, 400px)',
              cursor: 'pointer'
            }}
          >
            <img 
              src={project.image} 
              alt={project.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <div style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              width: '100%', 
              padding: '2rem',
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
              color: '#fff'
            }}>
              <span style={{ fontSize: '0.85rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {project.category}
              </span>
              <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
