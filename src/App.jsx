import { DeckControls } from './components/DeckControls'
import { Header } from './components/Header'
import { SLIDE_COUNT } from './data/projectData'
import { useHorizontalDeck } from './hooks/useHorizontalDeck'
import { HeroSection } from './sections/HeroSection'
import { JourneySection } from './sections/JourneySection'
import { OverviewSection } from './sections/OverviewSection'
import { PhasesSection } from './sections/PhasesSection'
import './styles/app.css'

function App() {
  const { activeSlide, deckRef, goToSlide } = useHorizontalDeck(SLIDE_COUNT)

  return (
    <div className="site-shell">
      <Header dark />

      <main className="slide-deck" ref={deckRef}>
        <HeroSection />
        <OverviewSection />
        <JourneySection />
        <PhasesSection />
      </main>

      <DeckControls
        activeSlide={activeSlide}
        slideCount={SLIDE_COUNT}
        onNavigate={goToSlide}
      />
    </div>
  )
}

export default App
