import { createGlobalStyle } from 'styled-components'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import { useState } from 'react'
import { useTransition, animated } from '@react-spring/web'
import styled from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: white;  /* Dark blue background */
    color: #08014d;
    overflow: hidden;
  }

  /* Remove all focus outlines */
  :focus {
    outline: none;
  }
  
  /* Remove focus ring for buttons and add custom focus styles if needed */
  button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;

    &:focus {
      outline: none;
    }
    
    &:focus-visible {
      outline: none;
    }
  }
`

const AnimatedContainer = styled(animated.div)`
  position: absolute;
  inset: 0;
`

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false)

  const transitions = useTransition(isUnlocked, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 600,  // Match the MetroCard swipe duration
      easing: t => t  // Linear fade
    }
  })

  return (
    <>
      <GlobalStyle />
      {transitions((style, unlocked) => (
        <AnimatedContainer style={style}>
          {unlocked ? (
            <Layout>
              {/* Your main content will go here */}
            </Layout>
          ) : (
            <LandingPage onUnlock={() => setIsUnlocked(true)} />
          )}
        </AnimatedContainer>
      ))}
    </>
  )
}

export default App
