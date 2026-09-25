import { useRef } from 'react'
import { Icon } from '../components/Icon'
import { projectStages } from '../data/projectData'

export function JourneySection() {
  const stagesRef = useRef(null)

  const scrollStages = (direction) => {
    stagesRef.current?.scrollBy({
      left: direction * Math.min(stagesRef.current.clientWidth * 0.75, 660),
      behavior: 'smooth',
    })
  }

  return (
    <section className="journey deck-slide" id="trilha" data-slide="2">
      <div className="journey-inner">
        <div className="section-heading light-heading">
          <span className="section-number">02 / REQUISITOS MÍNIMOS</span>
          <h2>Trilha técnica. <span>Nove entregas.</span></h2>
          <div className="journey-navigation">
            <p>Arraste ou use as setas para explorar.</p>
            <div>
              <button type="button" onClick={() => scrollStages(-1)} aria-label="Ver requisitos anteriores"><Icon name="arrow" size={17} /></button>
              <button type="button" onClick={() => scrollStages(1)} aria-label="Ver próximos requisitos"><Icon name="arrow" size={17} /></button>
            </div>
          </div>
        </div>

        <div className="stage-list" ref={stagesRef}>
          {projectStages.map((stage, index) => (
            <article className="stage-card" key={stage.number}>
              <div className="stage-top"><span>{stage.number}</span><Icon name={stage.icon} size={23} /></div>
              <div><h3>{stage.title}</h3><p>{stage.text}</p></div>
              {index < projectStages.length - 1 && <span className="stage-connector"><Icon name="arrow" size={14} /></span>}
            </article>
          ))}
        </div>

        <div className="command-bar">
          <span><Icon name="pipeline" size={18} /> FLUXO DE AUTOMAÇÃO</span>
          <code>Git Push → Build → Teste → Imagem → Deploy</code>
          <span className="command-result"><Icon name="check" size={14} /> produção</span>
        </div>
      </div>
    </section>
  )
}
