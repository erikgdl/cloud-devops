import { Icon } from './Icon'

export function DeckControls({ activeSlide, slideCount, onNavigate }) {
  const lastSlide = slideCount - 1

  return (
    <div className="deck-controls" aria-label="Navegação dos slides">
      <span><strong>{String(activeSlide + 1).padStart(2, '0')}</strong> / {String(slideCount).padStart(2, '0')}</span>
      <div>
        <button type="button" onClick={() => onNavigate(activeSlide - 1)} disabled={activeSlide === 0} aria-label="Slide anterior"><Icon name="arrow" size={17} /></button>
        <button type="button" onClick={() => onNavigate(activeSlide + 1)} disabled={activeSlide === lastSlide} aria-label="Próximo slide"><Icon name="arrow" size={17} /></button>
      </div>
    </div>
  )
}
