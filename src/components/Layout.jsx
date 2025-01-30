import styled from 'styled-components'
import SubwaySign from './SubwaySign'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

const NavMenu = styled.nav`
  position: fixed;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 10;
`

const NavButton = styled.button`
  font-size: 1.2rem;
  color: #08014d;
  text-transform: lowercase;
  padding: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  text-align: left;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background: #08014d;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`

const Content = styled.main`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function Layout({ children }) {
  return (
    <Container>
      <TitleContainer>
        <SubwaySign />
      </TitleContainer>
      <NavMenu>
        <NavButton>photo</NavButton>
        <NavButton>video</NavButton>
        <NavButton>about</NavButton>
      </NavMenu>
      <Content>
        {children}
      </Content>
    </Container>
  )
}