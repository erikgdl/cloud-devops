import { useEffect, useRef, useState } from 'react'

export function useHorizontalDeck(slideCount) {
  const [activeSlide, setActiveSlide] = useState(0)
  const deckRef = useRef(null)
  const wheelLockedRef = useRef(false)

  const goToSlide = (index) => {
    const deck = deckRef.current
    if (!deck) return

    const nextIndex = Math.max(0, Math.min(slideCount - 1, index))
    deck.scrollTo({ left: nextIndex * deck.clientWidth, behavior: 'smooth' })
    setActiveSlide(nextIndex)
  }

  useEffect(() => {
    const deck = deckRef.current
    if (!deck) return undefined

    let unlockTimer
    const updateSlide = () => {
      setActiveSlide(Math.round(deck.scrollLeft / deck.clientWidth))
    }

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX) || wheelLockedRef.current) return

      event.preventDefault()
      const current = Math.round(deck.scrollLeft / deck.clientWidth)
      const next = Math.max(0, Math.min(slideCount - 1, current + Math.sign(event.deltaY)))
      if (next === current) return

      wheelLockedRef.current = true
      deck.scrollTo({ left: next * deck.clientWidth, behavior: 'smooth' })
      unlockTimer = window.setTimeout(() => { wheelLockedRef.current = false }, 700)
    }

    deck.addEventListener('scroll', updateSlide, { passive: true })
    deck.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.clearTimeout(unlockTimer)
      deck.removeEventListener('scroll', updateSlide)
      deck.removeEventListener('wheel', handleWheel)
    }
  }, [slideCount])

  return { activeSlide, deckRef, goToSlide }
}
