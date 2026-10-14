import { useCallback, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import SmoothScroll from './components/SmoothScroll'
import Intro from './components/Intro'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Services from './components/Services'
import Work from './components/Work'
import Process from './components/Process'
import Offers from './components/Offers'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { ReadyContext, shouldPlayIntro } from './lib/motion'

export default function App() {
  const [intro, setIntro] = useState(shouldPlayIntro)
  const [menuOpen, setMenuOpen] = useState(false)
  const finishIntro = useCallback(() => setIntro(false), [])

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll locked={intro || menuOpen}>
        <AnimatePresence>{intro && <Intro key="intro" onFinish={finishIntro} />}</AnimatePresence>

        <ReadyContext.Provider value={!intro}>
          <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <main id="top">
            <Hero />
            <Marquee />
            <About />
            <Services />
            <Work />
            <Process />
            <Offers />
            <Faq />
            <Contact />
          </main>
          <Footer />
        </ReadyContext.Provider>
      </SmoothScroll>
    </MotionConfig>
  )
}
