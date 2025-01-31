import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const SignContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: #000;
  background-image: url('/subwaysign.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  isolation: isolate;

  @media (max-width: 767px) {
    padding: 1rem;
  }

  @media (min-width: 768px) {
    width: 300px;
    height: 100vh;
    padding: 2rem 1.5rem;
    box-shadow: 
      4px 0 6px rgba(0, 0, 0, 0.3),
      8px 0 12px rgba(0, 0, 0, 0.2),
      inset 0 0 0 2px rgba(255, 255, 255, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, .55);
    z-index: -1;
  }
`

const Header = styled.div`
  @media (max-width: 767px) {
    cursor: pointer;
  }
`

const StationText = styled.h1`
  color: white;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 700;
  width: 100%;
  letter-spacing: 0.02em;
  border-bottom: 4px solid white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 767px) {
    font-size: 1.8rem;
    padding-bottom: 12px;
    margin-bottom: ${props => props.$isOpen ? '1.5rem' : '0'};
    transition: margin-bottom 0.3s ease;
  }

  @media (min-width: 768px) {
    font-size: 2.2rem;
    padding-bottom: 16px;
    margin-bottom: 3rem;
  }
`

const NavList = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    overflow: hidden;
    max-height: ${props => props.$isOpen ? '300px' : '0'};
    opacity: ${props => props.$isOpen ? 1 : 0};
    transition: all 0.3s ease;
    gap: 1rem;
  }

  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: transform 0.3s ease;
  width: fit-content;
  height: ${props => props.$isMobile ? '32px' : '38px'};

  @media (min-width: 768px) {
    &:hover {
      transform: translateX(5px);
    }
  }

  &.active {
    transform: translateX(5px);
  }
`

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: bold;
  background-color: ${props => props.color};
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  @media (max-width: 767px) {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    font-size: 1.1rem;

    ${NavItem}:hover &, ${NavItem}.active & {
      width: 120px;
      padding: 0 1rem;
      justify-content: flex-start;
    }
  }

  @media (min-width: 768px) {
    width: 38px;
    height: 38px;
    border-radius: 19px;
    font-size: 1.3rem;

    ${NavItem}:hover &, ${NavItem}.active & {
      width: 160px;
      padding: 0 1.5rem;
      justify-content: flex-start;
    }
  }
`

const NavText = styled.span`
  color: white;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  opacity: 0;
  position: absolute;
  pointer-events: none;
  transition: opacity 0.2s ease;

  @media (max-width: 767px) {
    font-size: 1.1rem;
    left: 44px;
  }

  @media (min-width: 768px) {
    font-size: 1.3rem;
    left: 52px;
  }

  ${NavItem}:hover &, ${NavItem}.active & {
    opacity: 1;
  }
`

export default function SidebarSign() {
    const [isOpen, setIsOpen] = useState(false)
    const isMobile = window.innerWidth < 768

    return (
        <SignContainer>
            <Header onClick={() => isMobile && setIsOpen(!isOpen)}>
                <StationText $isOpen={isOpen}>metrotapes</StationText>
            </Header>
            <NavList $isOpen={isOpen}>
                <NavItem to="/photo" onClick={() => isMobile && setIsOpen(false)} $isMobile={isMobile}>
                    <Circle color="#0039A6">A</Circle>
                    <NavText>photo</NavText>
                </NavItem>
                <NavItem to="/video" onClick={() => isMobile && setIsOpen(false)} $isMobile={isMobile}>
                    <Circle color="#FF6319">F</Circle>
                    <NavText>video</NavText>
                </NavItem>
                <NavItem to="/about" onClick={() => isMobile && setIsOpen(false)} $isMobile={isMobile}>
                    <Circle color="#FCCC0A">R</Circle>
                    <NavText>about</NavText>
                </NavItem>
            </NavList>
        </SignContainer>
    )
} 