import { Icon } from '../components/Icon'
import { REPOSITORY_URL } from '../data/projectData'

export function PhasesSection() {
  return (
    <section className="phases section-grid deck-slide" id="etapas" data-slide="3">
      <div className="section-heading phases-heading">
        <span className="section-number">03 / ETAPAS DE AVALIAÇÃO</span>
        <h2>Construção e<br /><span>defesa técnica.</span></h2>
      </div>

      <article className="phase-card phase-primary">
        <div className="phase-label"><strong>N1</strong><span>CONSTRUÇÃO DO PROJETO</span></div>
        <div className="phase-copy">
          <span className="phase-status"><i></i> ENTREGA TÉCNICA</span>
          <h3>Aplicação funcionando.</h3>
          <p>Entrega do repositório público, documentação do projeto e evidências do ambiente Cloud, Docker, pipeline e monitoramento.</p>
        </div>
        <ul>
          <li><Icon name="check" size={15} /> Link do repositório</li>
          <li><Icon name="check" size={15} /> Documentação</li>
          <li><Icon name="check" size={15} /> Evidências técnicas</li>
        </ul>
        <a className="phase-action phase-action-light" href={REPOSITORY_URL} target="_blank" rel="noreferrer">
          Acessar repositório <Icon name="arrow" size={17} />
        </a>
      </article>

      <article className="phase-card phase-secondary">
        <div className="phase-label"><strong>N2</strong><span>APRESENTAÇÃO DO PROJETO</span></div>
        <div className="phase-copy">
          <span className="phase-status neutral"><i></i> DEMONSTRAÇÃO E DEFESA</span>
          <h3>Explicar cada decisão.</h3>
          <p>Apresentação interativa, demonstração do ambiente funcionando e defesa das escolhas técnicas realizadas pelo grupo.</p>
        </div>
        <div className="n2-visual">
          <span>01</span><i></i><span>02</span><i></i><span>03</span>
          <small>APRESENTAR&nbsp;&nbsp;&nbsp; DEMONSTRAR&nbsp;&nbsp;&nbsp; DEFENDER</small>
        </div>
        <a className="phase-action phase-action-dark" href="/apresentacao.html" target="_blank" rel="noreferrer">
          Abrir apresentação <Icon name="arrow" size={17} />
        </a>
      </article>
    </section>
  )
}
