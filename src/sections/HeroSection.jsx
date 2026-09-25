import { Icon } from '../components/Icon'
import { technologyStack } from '../data/projectData'

export function HeroSection() {
  return (
    <section className="hero section-grid deck-slide" id="inicio" data-slide="0">
      <div className="hero-copy">
        <div className="eyebrow reveal"><span></span> Projeto Integrador · 2026</div>
        <h1 className="reveal delay-1">Cloud Computing &<br /><span>DevOps.</span></h1>
        <p className="hero-lead reveal delay-2">
          Construção e implantação de uma aplicação, percorrendo todo o processo do código até a produção em nuvem.
        </p>
        <div className="hero-metrics reveal delay-3" aria-label="Resumo do projeto">
          <div><strong>N1</strong><span>construção</span></div>
          <div><strong>N2</strong><span>apresentação</span></div>
        </div>
      </div>

      <div className="cloud-console reveal delay-2" aria-label="Diagrama da arquitetura do projeto">
        <div className="console-glow"></div>
        <div className="console-topline">
          <div className="window-dots"><i></i><i></i><i></i></div>
          <span>diagrama 01 / arquitetura</span>
          <span className="live-status"><i></i> FLUXO BASE</span>
        </div>

        <div className="cloud-stage">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="cloud-core">
            <span className="core-pulse"></span>
            <Icon name="cloud" size={42} />
            <small>APLICAÇÃO</small>
          </div>
          <div className="service-node node-code"><Icon name="branch" /><span>Git</span></div>
          <div className="service-node node-container"><Icon name="box" /><span>Docker</span></div>
          <div className="service-node node-server"><Icon name="server" /><span>Cloud</span></div>
          <span className="data-dot dot-one"></span>
          <span className="data-dot dot-two"></span>
        </div>

        <div className="architecture-legend">
          {['Código', 'Imagem', 'Container', 'Aplicação'].map((item, index) => (
            <span key={item}><i>0{index + 1}</i>{item}{index < 3 && <Icon name="arrow" size={13} />}</span>
          ))}
        </div>
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((group) => (
            <div className="ticker-group" key={group}>
              {technologyStack.map((item) => <span key={`${group}-${item}`}>{item}<i>+</i></span>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
