import styled from 'styled-components'

const Container = styled.div`
  padding: 2rem;
  color: white;
  max-width: 800px;
  margin: 0 auto;
`

const Content = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  padding: 2rem;
`

const Title = styled.h1`
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #FCCC0A;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
`

export default function AboutPage() {
    return (
        <Container>
            <Content>
                <Title>About</Title>
                <Text>
                    Welcome to MetroTapes, where the rhythm of New York City's subway system meets the art of visual storytelling.
                    As a photographer and videographer, I capture the pulse of the city through my lens, drawing inspiration from
                    the iconic design and energy of the MTA.
                </Text>
                <Text>
                    My work explores the intersection of urban life, public transportation, and human connection. Each project
                    is a journey through the city's arteries, documenting moments that might otherwise pass unnoticed in the
                    daily rush.
                </Text>
            </Content>
        </Container>
    )
} 