import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { MARK_PATH } from './logoPaths'
import { EASE_IN_OUT, markIntroPlayed } from '../lib/motion'

// Courte intro (1re visite de la session) : le baobab se dessine, puis le rideau se lève.
export default function Intro({ onFinish }) {
  useEffect(() => {
    markIntroPlayed()
    const t = setTimeout(onFinish, 1350)
    return () => clearTimeout(t)
  }, [onFinish])

  return (
    <motion.div
      className="intro"
      aria-hidden="true"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.95, ease: EASE_IN_OUT }}
    >
      <motion.svg
        className="intro-mark"
        viewBox="18 9 68 87"
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE_IN_OUT }}
      >
        <motion.path
          d={MARK_PATH}
          fill="none"
          stroke="#F3EBDD"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.circle
          cx="72"
          cy="23"
          r="8"
          fill="#C8553D"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.85, type: 'spring', stiffness: 420, damping: 15 }}
        />
      </motion.svg>
    </motion.div>
  )
}
