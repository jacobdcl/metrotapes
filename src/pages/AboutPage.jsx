import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { client } from '../lib/sanity'
import { PortableText } from '@portabletext/react'

const Container = styled.div`
  padding: 2rem;
  color: white;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
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
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`

const Description = styled.div`
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);

  p {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    color: white;
    font-weight: 600;
  }

  em {
    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export default function AboutPage() {
    const [aboutContent, setAboutContent] = useState(null)

    useEffect(() => {
        const fetchAboutContent = async () => {
            try {
                const data = await client.fetch(`*[_type == "about"][0] {
                    title,
                    description
                }`)
                setAboutContent(data)
            } catch (error) {
                console.error('Error fetching about content:', error)
            }
        }

        fetchAboutContent()
    }, [])

    if (!aboutContent) return null

    return (
        <Container>
            <Content>
                <Title>{aboutContent.title}</Title>
                <Description>
                    <PortableText value={aboutContent.description} />
                </Description>
            </Content>
        </Container>
    )
} 