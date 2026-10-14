import { CircleCheck, Database, Gauge, RefreshCw, ShieldCheck } from 'lucide-react'

// Panneau de surveillance (illustration du service « Conseil et maintenance »)
export function MonitorScreen() {
  const checks = [
    { Icon: Database, title: 'Sauvegarde', text: 'Effectuée à 03:00' },
    { Icon: ShieldCheck, title: 'Certificat SSL', text: 'Valide · 284 jours' },
    { Icon: RefreshCw, title: 'Mises à jour', text: 'Tout est à jour' },
    { Icon: Gauge, title: 'Performance', text: 'Chargement en 0,8 s' },
  ]
  return (
    <div className="mk-panel">
      <div className="mk-panel-frame">
        <div className="mk-panel-head">
          <div><b>Surveillance du site</b><small>votre-site.sn · il y a 2 min</small></div>
          <span className="mk-ok"><i />Opérationnel</span>
        </div>
        <div className="mk-uptime">
          <div className="mk-uptime-head"><small>Disponibilité · 30 jours</small><b>99,98 %</b></div>
          <div className="mk-bars">
            {Array.from({ length: 30 }, (_, i) => <i key={i} className={i === 17 ? 'is-warn' : undefined} />)}
          </div>
        </div>
        <div className="mk-checks">
          {checks.map(({ Icon, title, text }) => (
            <div key={title} className="mk-check">
              <i><Icon /></i>
              <span><b>{title}</b><small>{text}</small></span>
              <CircleCheck className="mk-check-ok" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
