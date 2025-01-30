import styled from 'styled-components'
import MetroCard from './MetroCard'
import SwipeLine from './SwipeLine'

const SwipeContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 18rem; // Enough height to contain both elements
  display: flex;
  align-items: flex-end; // Align everything to bottom
  pointer-events: none; // Let interactions pass through container

  @media (min-width: 768px) {
    height: 22rem;
  }
`

const CardWrapper = styled.div`
  position: absolute;
  left: -20px;
  bottom: 3rem;  /* Lower position for mobile */
  z-index: 2;
  pointer-events: auto;

  @media (min-width: 768px) {
    bottom: 5rem;  /* Original position for desktop */
  }
`

export default function SwipeSection({ onSwipeComplete }) {
    return (
        <SwipeContainer>
            <CardWrapper>
                <MetroCard onSwipeComplete={onSwipeComplete} />
            </CardWrapper>
            <SwipeLine />
        </SwipeContainer>
    )
} 