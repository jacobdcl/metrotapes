import styled from 'styled-components'
import SwipeSection from '../components/SwipeSection'
import SubwaySign from '../components/SubwaySign'
import BackgroundVideo from '../components/BackgroundVideo'
import PropTypes from 'prop-types'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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
            <BackgroundVideo />
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