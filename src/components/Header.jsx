import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faVideo, faBook, faChevronDown, faRotateLeft, faNewspaper } from '@fortawesome/free-solid-svg-icons'

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #1A1A1A;
  z-index: 100;
`

const HeaderContent = styled.div`
  padding: 0.75rem 1rem;
  position: relative;

  @media (min-width: 768px) {
    padding: 0.75rem 2rem;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
`

const TopSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-bottom: 4px;
`

const TitleWrapper = styled.div`
  cursor: pointer;
  @media (min-width: 768px) {
    cursor: default;
  }
`

const Title = styled.div`
  color: white;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin: 0;
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`

const ResetButton = styled.button`
  width: 48px;
  height: 48px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  transition: all 0.2s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  right: ${props => props.$isHomePage ? '1rem' : 'auto'};
  left: ${props => props.$isHomePage ? 'auto' : '50%'};
  transform: ${props => props.$isHomePage ? 'none' : 'translateX(-50%)'};

  @media (min-width: 768px) {
    width: 52px;
    height: 52px;

    &:hover {
      transform: ${props => props.$isHomePage
    ? 'translateY(-2px)'
    : 'translateX(-50%) translateY(-2px)'};
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))
               brightness(1.1);
    }

    &:active {
      transform: ${props => props.$isHomePage
    ? 'translateY(0)'
    : 'translateX(-50%) translateY(0)'};
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))
               brightness(0.95);
    }
  }

  @media (max-width: 767px) {
    width: 42px;
    height: 42px;
    right: 1rem;
    left: auto;
    transform: none;

    &:hover {
      transform: translateY(-2px);
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))
               brightness(1.1);
    }

    &:active {
      transform: translateY(0);
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))
               brightness(0.95);
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/lamp.png') no-repeat center center;
    background-size: contain;
    transition: all 0.2s ease;
  }
`

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  max-height: ${props => props.$isOpen ? '300px' : '0'};
  opacity: ${props => props.$isOpen ? 1 : 0};
  transition: all 0.3s ease;
  padding: 0;
  margin: ${props => props.$isOpen ? '1rem 0 .5rem' : '0'};

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;
    max-height: none;
    opacity: 1;
    overflow: visible;
    padding: 0;
    margin: 0;
    margin-left: auto;
  }
`

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 32px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    height: 38px;
  }
`

const Circle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 0.9rem;
  background-color: ${props => props.color};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  flex-shrink: 0;

  svg {
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3));
  }

  @media (max-width: 767px) {
    width: 120px;
    padding: 0 1.5rem 0 1rem;
    justify-content: flex-start;
  }

  @media (min-width: 768px) {
    width: 38px;
    height: 38px;
    border-radius: 19px;
    font-size: 1.1rem;

    ${NavItem}:hover &, ${NavItem}.active & {
      width: 120px;
      padding: 0 1.5rem 0 1rem;
      justify-content: flex-start;
    }
  }
`

const NavText = styled.span`
  color: white;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  opacity: 0;
  position: absolute;
  left: 44px;
  pointer-events: none;
  transition: opacity 0.2s ease;

  @media (max-width: 767px) {
    opacity: 1;
  }

  @media (min-width: 768px) {
    left: 50px;
    opacity: 0;
    font-size: 1.2rem;
    
    ${NavItem}:hover &, ${NavItem}.active & {
      opacity: 1;
    }
  }
`

const MenuIndicator = styled.div`
  display: none;
  color: rgba(255, 255, 255, 0.6);
  margin-left: 8px;
  transform: rotate(${props => props.$isOpen ? '180deg' : '0deg'});
  transition: transform 0.3s ease;

  @media (max-width: 767px) {
    display: inline-flex;
    align-items: center;
  }
`

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
`

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleTitleClick = (e) => {
    e.preventDefault()
    if (isMobile && !isHomePage) {
      if (isOpen) {
        setIsOpen(false)
        navigate('/')
      } else {
        setIsOpen(true)
      }
    } else if (!isHomePage) {
      navigate('/')
    }
  }

  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  const handleReset = () => {
    navigate('/')
    window.location.reload()
  }

  const renderNavItems = () => (
    <>
      <NavItem to="/photo" onClick={handleNavClick}>
        <Circle color="#0039A6">
          <FontAwesomeIcon icon={faCamera} />
        </Circle>
        <NavText>photo</NavText>
      </NavItem>
      <NavItem to="/video" onClick={handleNavClick}>
        <Circle color="#00933C">
          <FontAwesomeIcon icon={faVideo} />
        </Circle>
        <NavText>video</NavText>
      </NavItem>
      <NavItem to="/blog" onClick={handleNavClick}>
        <Circle color="#FF6319">
          <FontAwesomeIcon icon={faNewspaper} />
        </Circle>
        <NavText>blog</NavText>
      </NavItem>
      <NavItem to="/about" onClick={handleNavClick}>
        <Circle color="#996633">
          <FontAwesomeIcon icon={faBook} />
        </Circle>
        <NavText>about</NavText>
      </NavItem>
    </>
  )

  return (
    <HeaderContainer>
      <HeaderContent>
        <TopSection>
          <TitleWrapper onClick={handleTitleClick}>
            <TitleGroup>
              <Title>metrotapes</Title>
              {!isHomePage && isMobile && (
                <MenuIndicator $isOpen={isOpen}>
                  <FontAwesomeIcon icon={faChevronDown} size="sm" />
                </MenuIndicator>
              )}
            </TitleGroup>
          </TitleWrapper>
          <ResetButton onClick={handleReset} $isHomePage={isHomePage}>
            <FontAwesomeIcon icon={faRotateLeft} />
          </ResetButton>
          {!isHomePage && !isMobile && (
            <NavList $isOpen={isOpen}>
              {renderNavItems()}
            </NavList>
          )}
        </TopSection>
        {!isHomePage && isMobile && (
          <NavList $isOpen={isOpen}>
            {renderNavItems()}
          </NavList>
        )}
      </HeaderContent>
    </HeaderContainer>
  )
} 