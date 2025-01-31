import styled from 'styled-components'
import SubwaySign from './SubwaySign'
import { NavLink as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
  background: linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 100%);
`

const TitleContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  transform: translate(0, 0);
  padding: 0;
  width: calc(100% - 5rem);
  margin-left: auto;
  z-index: 20;

  @media (min-width: 768px) {
    width: auto;
  }
`

const NavMenu = styled.nav`
  position: fixed;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 10;
`

const NavLink = styled(RouterLink)`
  color: #FCCC0A;
  text-decoration: none;
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 1.5rem;
  text-transform: lowercase;
  opacity: 0.7;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px rgba(252, 204, 10, 0.3);

  &:hover {
    opacity: 1;
    transform: translateX(5px);
    text-shadow: 0 0 15px rgba(252, 204, 10, 0.5);
  }

  &.active {
    opacity: 1;
    text-shadow: 0 0 20px rgba(252, 204, 10, 0.6);
  }
`

const Content = styled.main`
  flex: 1;
  position: relative;
  padding-top: 120px; // Space for the subway sign
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hideSign: PropTypes.bool,
}

export default function Layout({ children, hideSign }) {
  return (
    <Container>
      <TitleContainer>
        {hideSign ? null : <SubwaySign />}
      </TitleContainer>
      <NavMenu>
        <NavLink to="/photo">photo</NavLink>
        <NavLink to="/video">video</NavLink>
        <NavLink to="/about">about</NavLink>
      </NavMenu>
      <Content>
        {children}
      </Content>
    </Container>
  )
}