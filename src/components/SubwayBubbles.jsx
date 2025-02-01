import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { animated } from '@react-spring/web'

const Container = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  opacity: 0.25;
`

const Circle = styled(animated.div)`
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: bold;
  color: ${props => props.$textColor || 'white'};
  font-size: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  will-change: transform;
`

// NYC Subway lines with their colors
const SUBWAY_LINES = [
    { line: '1', color: '#EE352E', textColor: 'white' },
    { line: '2', color: '#EE352E', textColor: 'white' },
    { line: '3', color: '#EE352E', textColor: 'white' },
    { line: '4', color: '#00933C', textColor: 'white' },
    { line: '5', color: '#00933C', textColor: 'white' },
    { line: '6', color: '#00933C', textColor: 'white' },
    { line: '7', color: '#B933AD', textColor: 'white' },
    { line: 'A', color: '#0039A6', textColor: 'white' },
    { line: 'C', color: '#0039A6', textColor: 'white' },
    { line: 'E', color: '#0039A6', textColor: 'white' },
    { line: 'B', color: '#FF6319', textColor: 'white' },
    { line: 'D', color: '#FF6319', textColor: 'white' },
    { line: 'F', color: '#FF6319', textColor: 'white' },
    { line: 'M', color: '#FF6319', textColor: 'white' },
    { line: 'G', color: '#6CBE45', textColor: 'white' },
    { line: 'J', color: '#996633', textColor: 'white' },
    { line: 'Z', color: '#996633', textColor: 'white' },
    { line: 'L', color: '#A7A9AC', textColor: 'white' },
    { line: 'S', color: '#808183', textColor: 'white' },
    { line: 'Q', color: '#FCCC0A', textColor: 'black' },
    { line: 'R', color: '#FCCC0A', textColor: 'black' },
]

const getRandomPosition = (size) => {
    const windowWidth = window.innerWidth - size
    const windowHeight = window.innerHeight - size
    return {
        x: Math.random() * windowWidth,
        y: Math.random() * windowHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
    }
}

export default function SubwayBubbles() {
    const [bubbles, setBubbles] = useState([])
    const size = 48 // Size of each circle

    useEffect(() => {
        // Initialize bubbles with random positions and velocities
        const initialBubbles = SUBWAY_LINES.map((line, index) => ({
            ...line,
            ...getRandomPosition(size),
            id: index,
        }))
        setBubbles(initialBubbles)

        const updatePositions = () => {
            setBubbles(prevBubbles =>
                prevBubbles.map(bubble => {
                    let { x, y, vx, vy } = bubble

                    // Update position
                    x += vx * 2
                    y += vy * 2

                    // Bounce off walls
                    if (x <= 0 || x >= window.innerWidth - size) {
                        vx = -vx * 0.9
                        x = x <= 0 ? 0 : window.innerWidth - size
                    }
                    if (y <= 0 || y >= window.innerHeight - size) {
                        vy = -vy * 0.9
                        y = y <= 0 ? 0 : window.innerHeight - size
                    }

                    return { ...bubble, x, y, vx, vy }
                })
            )
        }

        const animationFrame = setInterval(updatePositions, 1000 / 60)
        return () => clearInterval(animationFrame)
    }, [])

    return (
        <Container>
            {bubbles.map(bubble => (
                <Circle
                    key={bubble.id}
                    style={{
                        backgroundColor: bubble.color,
                        width: size,
                        height: size,
                        transform: `translate(${bubble.x}px, ${bubble.y}px)`,
                    }}
                    $textColor={bubble.textColor}
                >
                    {bubble.line}
                </Circle>
            ))}
        </Container>
    )
} 