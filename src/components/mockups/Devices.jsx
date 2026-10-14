import { BatteryFull, Lock, Signal, Wifi } from 'lucide-react'

// Fenêtre de navigateur affichant une capture (ou un contenu).
// Tailles en cqi : la maquette garde ses proportions quelle que soit sa largeur.
export function Browser({ url, image, alt = '', eager = false, children, className = '' }) {
  return (
    <div className={`mk-browser ${className}`}>
      <div className="mk-browser-frame">
        <div className="mk-bar">
          <span className="mk-dots"><i /><i /><i /></span>
          <span className="mk-url"><Lock />{url}</span>
          <span className="mk-bar-spacer" />
        </div>
        <div className="mk-viewport">
          {image ? (
            <img className="mk-shot" src={image} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  )
}

// Smartphone affichant une capture mobile. `status` : couleurs de la barre d'état.
export function Phone({ image, alt = '', status = { bg: '#fff', ink: '#111' }, eager = false, className = '' }) {
  return (
    <div className={`mk-phone ${className}`}>
      <div className="mk-phone-body">
        <div className="mk-screen" style={{ '--p-bg': status.bg, '--p-ink': status.ink }}>
          <span className="mk-island" />
          <div className="mk-status">
            <span>9:41</span>
            <span className="mk-status-icons"><Signal /><Wifi /><BatteryFull /></span>
          </div>
          <img className="mk-shot" src={image} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        </div>
      </div>
    </div>
  )
}
