import styled, { keyframes } from 'styled-components'
import { useSpring, animated } from '@react-spring/web'
import { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'

const float = keyframes`
  0% { 
    transform: translate(0, 0) scale(1);
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
  }
  50% {
    transform: translate(15px, -30px) scale(1.08);
    filter: drop-shadow(0 24px 32px rgba(0, 0, 0, 0.3));
  }
  100% { 
    transform: translate(0, 0) scale(1);
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
  }
`

const CardWrapper = styled.div`
  position: relative;
  z-index: 10;
  animation: ${float} 3s ease-in-out infinite;
  transform-origin: center;

  &:hover {
    filter: drop-shadow(0 32px 64px rgba(0, 0, 0, 0.25));
    transform: scale(1.12) translateY(-15px);
    animation-play-state: paused;
  }
`

const CardContainer = styled(animated.div)`
  cursor: pointer;
  touch-action: none;
  transform-origin: center;
  will-change: transform;
  -webkit-tap-highlight-color: transparent;
`

const Card = styled.img`
  height: 140px;
  width: auto;
  user-select: none;
  -webkit-user-drag: none;
  transform-origin: center;
  will-change: transform;

  @media (min-width: 768px) {
    height: 180px;
  }
`

const MetroCard = forwardRef(({ onSwipeComplete }, ref) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: {
      mass: 0.5,
      tension: 180,
      friction: 20
    }
  }))

  const triggerSwipe = () => {
    if (isAnimating) return
    setIsAnimating(true)
    onSwipeComplete?.()

    api.start({
      from: { x: 0 },
      to: { x: window.innerWidth * 1.2 },
      config: {
        duration: 600,
        easing: t => t * (2 - t) // Ease out quad
      },
      onRest: () => {
        api.start({ x: 0, immediate: true })
        setIsAnimating(false)
      }
    })
  }

  return (
    <CardWrapper>
      <CardContainer
        onClick={triggerSwipe}
        style={{
          x,
          rotateZ: -2 // Constant slight tilt
        }}
        ref={ref}
      >
        <Card
          src="/metrocard.png"
          alt="Metro Card"
          draggable="false"
        />
      </CardContainer>
    </CardWrapper>
  )
})

MetroCard.propTypes = {
  onSwipeComplete: PropTypes.func.isRequired
}

MetroCard.displayName = 'MetroCard'

export default MetroCard 