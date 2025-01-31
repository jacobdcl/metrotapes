import styled, { keyframes } from 'styled-components'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useState } from 'react'

const floatX = keyframes`
  0% { transform: translateX(0px); }
  50% { transform: translateX(-14px); }
  100% { transform: translateX(0px); }
`

const floatY = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-14px); }
  100% { transform: translateY(0px); }
`

const tilt = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(-3deg); }
  100% { transform: rotate(0deg); }
`

const CardContainer = styled(animated.div)`
  cursor: pointer;
  touch-action: none;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
  transition: filter 0.3s ease;

  &:hover {
    filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.5));
  }
`

const Card = styled.img`
  height: 140px;
  width: auto;
  user-select: none;
  -webkit-user-drag: none;
  transform-origin: center center;
  will-change: transform;
  animation: 
    ${floatY} 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite,
    ${floatX} 3s cubic-bezier(0.4, 0, 0.2, 1) infinite,
    ${tilt} 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;

  @media (min-width: 768px) {
    height: 180px;
  }
`

export default function MetroCard({ onSwipeComplete }) {
    const [isDragging, setIsDragging] = useState(false)

    const [{ x }, api] = useSpring(() => ({
        x: 0,
        config: { tension: 300, friction: 30 }
    }))

    const handleClick = () => {
        // Trigger the transition immediately
        onSwipeComplete?.()

        // Then start the swipe animation
        api.start({
            x: window.innerWidth + 200,
            config: {
                duration: 600,
                easing: t => t * (2 - t)
            }
        })
    }

    const bind = useDrag(({ active, movement: [mx], cancel, direction: [dx] }) => {
        setIsDragging(active)

        if (active && mx > window.innerWidth / 4) {
            cancel()
            handleClick()
        } else {
            api.start({ x: active ? mx : 0, immediate: active })
        }
    })

    return (
        <CardContainer
            {...bind()}
            onClick={handleClick}
            style={{ x }}
        >
            <Card
                src="/metrocard.png"
                alt="Metro Card"
                draggable="false"
                style={{
                    transform: isDragging ? 'rotate(2deg)' : 'none',
                    transition: 'transform 0.2s'
                }}
            />
        </CardContainer>
    )
} 