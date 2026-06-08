import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = ['Accueil', 'Services', 'Portfolio', 'Contact']

export default function Header() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: '1.5rem 10%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'linear-gradient(to bottom, rgba(5,5,5,0.9), transparent)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px', zIndex: 200 }}
        >
          YAKIRIX
        </motion.div>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem' }}>
          {LINKS.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className={`hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
          style={{ zIndex: 200 }}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav${open ? ' open' : ''}`}>
        {LINKS.map((item, i) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="nav-link"
            initial={{ opacity: 0, y: 20 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: i * 0.08 }}
            onClick={close}
            style={{ fontSize: '2rem', fontWeight: 700 }}
          >
            {item}
          </motion.a>
        ))}
      </div>
    </>
  )
}
