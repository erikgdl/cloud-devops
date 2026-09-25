import { Icon } from '../components/Icon'

export function OverviewSection() {
  return (
    <section className="overview section-grid deck-slide" id="projeto" data-slide="1">
      <div className="section-heading">
        <span className="section-number">01 / OBJETIVO DO TRABALHO</span>
        <h2>Do código<br /><span>até a produção.</span></h2>
      </div>
      <div className="overview-intro">
        <p>Colocar em prática os conceitos estudados na disciplina por meio de uma aplicação funcionando em ambiente de nuvem.</p>
        <span className="tech-caption"><i></i> projeto_integrador / n1</span>
      </div>

      <article className="mission-card">
        <div className="card-index">PROPOSTA / N1</div>
        <div className="mission-icon"><Icon name="cloud" size={29} /></div>
        <h3>Construir, publicar e demonstrar</h3>
        <p>O resultado não é apenas uma página web. O trabalho inclui versionamento, infraestrutura, automação, segurança e operação do ambiente.</p>
        <div className="terminal-line"><span>RESULTADO</span> aplicação pública + processo documentado <i>_</i></div>
      </article>

      <div className="principles-grid">
        <article className="principle-card">
          <span className="principle-icon"><Icon name="branch" /></span>
          <div><small>DESENVOLVIMENTO</small><h3>Aplicação e Git</h3><p>Código funcional, histórico e documentação.</p></div>
        </article>
        <article className="principle-card">
          <span className="principle-icon"><Icon name="box" /></span>
          <div><small>INFRAESTRUTURA</small><h3>Docker e Cloud</h3><p>Ambiente reproduzível e publicado.</p></div>
        </article>
        <article className="principle-card">
          <span className="principle-icon"><Icon name="pulse" /></span>
          <div><small>OPERAÇÃO</small><h3>Automação e segurança</h3><p>Deploy contínuo e ambiente monitorado.</p></div>
        </article>
      </div>
    </section>
  )
}
