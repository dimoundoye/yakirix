import { createContext } from 'react'

// Courbes d'animation partagées par tout le site
export const EASE = [0.22, 1, 0.36, 1]
export const EASE_IN_OUT = [0.76, 0, 0.24, 1]

// Passe à true quand l'intro est terminée (ou immédiatement s'il n'y a pas d'intro)
export const ReadyContext = createContext(true)

export function shouldPlayIntro() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return !window.sessionStorage.getItem('yk-intro')
  } catch {
    return false
  }
}

export function markIntroPlayed() {
  try {
    window.sessionStorage.setItem('yk-intro', '1')
  } catch {
    // stockage indisponible (navigation privée) : l'intro rejouera, sans gravité
  }
}
