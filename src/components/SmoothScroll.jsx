import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2)

// Défilement fluide (Lenis) + liens d'ancre animés.
// `locked` bloque le défilement (intro, menu mobile ouvert).
export default function SmoothScroll({ locked, children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.085, smoothWheel: true })
    lenisRef.current = lenis
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    if (lenis) {
      if (locked) lenis.stop()
      else lenis.start()
    } else {
      document.documentElement.style.overflow = locked ? 'hidden' : ''
    }
  }, [locked])

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const link = e.target.closest?.('a[href^="#"]')
      if (!link) return
      const hash = link.getAttribute('href')
      const target = hash === '#' || hash === '#top' ? 0 : document.querySelector(hash)
      if (target === null) return
      e.preventDefault()

      const lenis = lenisRef.current
      if (lenis) {
        if (lenis.isStopped) lenis.start()
        lenis.scrollTo(target, { duration: 1.5, easing: easeInOutCubic, force: true })
      } else if (target === 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return children
}
