import { useState } from 'react'
import { Icon } from './Icon'

export function Header({ dark = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={dark ? 'topbar topbar-dark' : 'topbar'}>
      <a className="brand" href="#inicio" aria-label="Projeto Integrador - início" onClick={closeMenu}>
        <span className="brand-mark"><Icon name="layers" size={21} /></span>
        <span>PROJETO<span className="brand-accent"> / </span>INTEGRADOR</span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span></span><span></span>
      </button>

      <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Navegação principal">
        <a href="#projeto" onClick={closeMenu}>Projeto</a>
        <a href="#trilha" onClick={closeMenu}>Trilha</a>
        <a href="#etapas" onClick={closeMenu}>Etapas</a>
      </nav>
    </header>
  )
}
