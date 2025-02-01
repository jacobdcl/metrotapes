import styled from 'styled-components'
import SwipeSection from '../components/SwipeSection'
import SubwaySign from '../components/SubwaySign'
import PropTypes from 'prop-types'
import SubwayBubbles from '../components/SubwayBubbles'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 1rem;
  
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
  return (
    <>
      <SubwayBubbles />
      <Container>
        <TitleContainer>
          <SubwaySign />
        </TitleContainer>
        <SwipeSection onSwipeComplete={onUnlock} />
      </Container>
    </>
  )
}

LandingPage.propTypes = {
  onUnlock: PropTypes.func.isRequired,
} 