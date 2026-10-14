// Bandeau défilant des technologies — liste à ajuster selon votre stack réelle
const TECH = ['React', 'Next.js', 'Node.js', 'TypeScript', 'React Native', 'Flutter', 'Laravel', 'PostgreSQL', 'Firebase', 'AWS', 'Docker', 'Figma']

export default function Marquee() {
  return (
    <section className="marquee-section" aria-label="Technologies utilisées">
      <p className="marquee-title">Les technologies que nous utilisons au quotidien</p>
      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="marquee-list" aria-hidden={copy === 1 || undefined}>
              {TECH.map((t) => <li key={t}>{t}</li>)}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
