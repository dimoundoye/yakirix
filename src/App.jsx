import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import ThreeScene from './components/ThreeScene'

function App() {
  return (
    <div className="app-container">
      <ThreeScene />
      
      <Header />
      
      <main>
        <section id="accueil">
          <Hero />
        </section>
        
        <section id="services">
          <Services />
        </section>
        
        <section id="portfolio">
          <Portfolio />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>

      <footer style={{ padding: '4rem 10%', borderTop: '1px solid var(--glass-border)', textAlign: 'center', opacity: 0.5, fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} YAKIRIX. Tous droits réservés.
      </footer>
    </div>
  )
}

export default App
