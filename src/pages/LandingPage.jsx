import styled from 'styled-components'
import SwipeSection from '../components/SwipeSection'
import SubwaySign from '../components/SubwaySign'
import PropTypes from 'prop-types'
import SubwayBubbles from '../components/SubwayBubbles'
import { useEffect, useRef, useState } from 'react'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 1rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-top: 20vh;
  }
`

const TitleContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(0, 0);
  padding: 0;
  width: calc(100% - 5rem);
  margin-left: auto;

  @media (min-width: 768px) {
    width: auto;
  }
`

export default function LandingPage({ onUnlock }) {
  const metroCardRef = useRef(null)
  const timeoutRef = useRef(null)
  const [hasInteracted, setHasInteracted] = useState(false)

  const startAutoTriggerTimer = () => {
    clearTimeout(timeoutRef.current)
    if (!hasInteracted) {
      timeoutRef.current = setTimeout(() => {
        metroCardRef.current?.click()
      }, 3000)
    }
  }

  const handleUserInteraction = () => {
    setHasInteracted(true)
    clearTimeout(timeoutRef.current)
  }

  useEffect(() => {
    // Start the initial timer
    startAutoTriggerTimer()

    // Set up event listeners for user interaction
    const handleInteraction = () => handleUserInteraction()
    window.addEventListener('mousemove', handleInteraction)
    window.addEventListener('keydown', handleInteraction)
    window.addEventListener('touchstart', handleInteraction)

    return () => {
      clearTimeout(timeoutRef.current)
      window.removeEventListener('mousemove', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  const handleContainerClick = (e) => {
    handleUserInteraction()
    // Don't trigger if clicking on the MetroCard itself
    if (e.target.closest('.metro-card')) return
    metroCardRef.current?.click()
  }

  return (
    <>
      <SubwayBubbles />
      <Container onClick={handleContainerClick}>
        <TitleContainer>
          <SubwaySign />
        </TitleContainer>
        <SwipeSection onSwipeComplete={onUnlock} ref={metroCardRef} />
      </Container>
    </>
  )
}

LandingPage.propTypes = {
  onUnlock: PropTypes.func.isRequired,
} 