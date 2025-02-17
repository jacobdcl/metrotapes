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
  const [isReady, setIsReady] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const triggerSwipe = () => {
    if (metroCardRef.current) {
      setIsInitialLoad(false)
      setTimeout(() => {
        const swipeEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        })
        metroCardRef.current?.dispatchEvent(swipeEvent)
      }, 50)
    }
  }

  const startAutoTriggerTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (!hasInteracted && isReady) {
      timeoutRef.current = setTimeout(() => {
        triggerSwipe()
      }, 2000)
    }
  }

  const handleUserInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
      setIsInitialLoad(false)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }

  // Handle component mounting and auto-trigger setup
  useEffect(() => {
    setIsReady(true)
  }, [])

  // Handle auto-trigger timer
  useEffect(() => {
    if (isReady) {
      startAutoTriggerTimer()
    }
  }, [isReady])

  // Handle user interaction events
  useEffect(() => {
    const handleInteraction = () => handleUserInteraction()

    window.addEventListener('mousemove', handleInteraction)
    window.addEventListener('keydown', handleInteraction)
    window.addEventListener('touchstart', handleInteraction)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      window.removeEventListener('mousemove', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  const handleContainerClick = (e) => {
    handleUserInteraction()
    if (e.target.closest('.metro-card')) return
    triggerSwipe()
  }

  return (
    <>
      <SubwayBubbles />
      <Container onClick={handleContainerClick}>
        <TitleContainer>
          <SubwaySign />
        </TitleContainer>
        <SwipeSection
          onSwipeComplete={onUnlock}
          ref={metroCardRef}
          isInitialLoad={isInitialLoad}
        />
      </Container>
    </>
  )
}

LandingPage.propTypes = {
  onUnlock: PropTypes.func.isRequired,
} 