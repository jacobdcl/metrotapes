import { createGlobalStyle } from 'styled-components'
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import PhotoPage from './pages/PhotoPage'
import VideoPage from './pages/VideoPage'
import AboutPage from './pages/AboutPage'
import Header from './components/Header'
import { useState, useEffect } from 'react'
import { useTransition, animated } from '@react-spring/web'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #1A1A1A;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

const Layout = styled.div`
  padding-top: 64px; // Height of header
`

const HeaderArea = styled.header`
  height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #1A1A1A;
`

const ContentArea = styled.main`
  width: 100%;
`

const AnimatedContainer = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 200;
`

function AppContent() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const transitions = useTransition(!isUnlocked && isHomePage ? true : null, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 800,
      easing: t => t * (2 - t)
    },
    onRest: () => {
      if (isUnlocked || !isHomePage) {
        setIsReady(true)
      }
    }
  })

  useEffect(() => {
    if (!isHomePage) {
      setIsUnlocked(true)
      setIsReady(true)
    }
  }, [isHomePage])

  return (
    <Layout>
      {isReady && (
        <HeaderArea>
          <Header />
        </HeaderArea>
      )}
      <ContentArea>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photo" element={<PhotoPage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ContentArea>
      {transitions((style, item) =>
        item && (
          <AnimatedContainer style={style}>
            <LandingPage onUnlock={() => setIsUnlocked(true)} />
          </AnimatedContainer>
        )
      )}
    </Layout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppContent />
    </BrowserRouter>
  )
}

export default App