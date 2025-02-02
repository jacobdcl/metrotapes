import styled from 'styled-components'
import MetroCard from './MetroCard'
import SwipeLine from './SwipeLine'
import PropTypes from 'prop-types'

const SwipeContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 12rem;
  display: flex;
  align-items: flex-end;
  pointer-events: none;

  @media (min-width: 768px) {
    height: 22rem;
  }
`

const CardWrapper = styled.div`
  position: absolute;
  left: -10px;
  bottom: 5rem; // Higher position for mobile
  z-index: 2;
  pointer-events: auto;
  transform: scale(0.85); // Slightly smaller on mobile
  transform-origin: bottom left;
  transition: transform 0.3s ease;

  @media (min-width: 768px) {
    bottom: 5rem;
    transform: scale(1);
  }
`

SwipeSection.propTypes = {
  onSwipeComplete: PropTypes.func.isRequired,
}

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