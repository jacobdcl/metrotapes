import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  padding: 2rem;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
  height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Machine = styled.div`
  width: 90%;
  max-width: min(800px, 95vh);
  aspect-ratio: 4/3;
  background: linear-gradient(180deg, #8B8B8B 0%, #666 100%);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.3);
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 16px;
  position: relative;
  border: 2px solid #666;

  @media (max-width: 480px) {
    padding: 12px;
    gap: 12px;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 4px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.1) 100%
    );
    pointer-events: none;
  }
`

const TopBar = styled.div`
  width: 100%;
  height: 20px;
  background: #111;
  border-radius: 2px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  padding: 0 6px;
  box-shadow: 
    inset 0 1px 3px rgba(0, 0, 0, 0.8),
    0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid #000;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #0f0;
    border-radius: 50%;
    margin-right: 4px;
    box-shadow: 
      0 0 4px #0f0,
      0 0 8px #0f0;
    animation: blink 2s infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
`

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  padding: 12px;
  border-radius: 6px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    gap: 12px;
    padding: 8px;
  }
`

const Screen = styled.div`
  background: #000;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.8),
    0 1px 0 rgba(255, 255, 255, 0.1);
  border: 4px solid #FFD700;
  aspect-ratio: 16/9;
  flex: 1;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 20%,
      transparent 80%,
      rgba(0, 0, 0, 0.2) 100%
    );
    z-index: 1;
    pointer-events: none;
  }
`

const VideoContainer = styled.div`
  width: 110%;
  height: 100%;
  margin-left: -5%;
`

const Video = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  transform: scale(1.05);
`

const ButtonSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  box-shadow: 
    inset 0 1px 3px rgba(0, 0, 0, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    gap: 6px;
    padding: 8px;
  }
`

const NavButton = styled(Link)`
  height: 52px;
  background: ${props => props.color};
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  color: white;
  text-decoration: none;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  letter-spacing: -0.02em;
  text-transform: lowercase;
  position: relative;
  transition: all 0.2s ease;
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);

  @media (max-width: 480px) {
    height: 44px;
    font-size: 1.2rem;
  }

  &:hover {
    filter: brightness(1.1);
    color: white;
  }

  &:active {
    filter: brightness(0.9);
    transform: translateY(1px);
    color: white;
  }

  &:visited {
    color: white;
  }
`

export default function Home() {
  return (
    <Container>
      <Machine>
        <TopBar />
        <MainSection>
          <Screen>
            <VideoContainer>
              <Video
                src="https://www.youtube.com/embed/trA9owC00HI?autoplay=1&mute=1&controls=0&loop=1&playlist=trA9owC00HI&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
                title="Background Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoContainer>
          </Screen>
          <ButtonSection>
            <NavButton to="/photo" color="#0039A6">
              photo
            </NavButton>
            <NavButton to="/video" color="#00933C">
              video
            </NavButton>
            <NavButton to="/blog" color="#FF6319">
              blog
            </NavButton>
            <NavButton to="/about" color="#996633">
              about
            </NavButton>
          </ButtonSection>
        </MainSection>
      </Machine>
    </Container>
  )
}