import styled from 'styled-components'
import MetroCard from './MetroCard'
import SwipeLine from './SwipeLine'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'

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

const SwipeSection = forwardRef(({ onSwipeComplete }, ref) => {
  return (
    <SwipeContainer>
      <CardWrapper>
        <MetroCard onSwipeComplete={onSwipeComplete} ref={ref} className="metro-card" />
      </CardWrapper>
      <SwipeLine />
    </SwipeContainer>
  )
})

SwipeSection.propTypes = {
  onSwipeComplete: PropTypes.func.isRequired,
}

SwipeSection.displayName = 'SwipeSection'

export default SwipeSection 