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
  margin-bottom: 2rem;

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

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const MediaItem = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  
  a {
    display: block;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: inherit;
    background: rgba(255, 255, 255, 0.1);
    transition: background-color 0.2s;
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  }
`

function extractYouTubeId(url) {
  if (!url) return null
  try {
    const urlObj = new URL(url)

    // Handle youtu.be format
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1)
    }

    // Handle youtube.com format
    if (urlObj.hostname === 'youtube.com' || urlObj.hostname === 'www.youtube.com') {
      const searchParams = new URLSearchParams(urlObj.search)
      return searchParams.get('v')
    }

    return null
  } catch {
    return null
  }
}

function renderMediaItem(item) {
  let videoId;
  switch (item.type) {
    case 'image':
      return (
        <img
          src={item.image.asset.url}
          alt={item.alt || 'Media item'}
        />
      )
    case 'link':
      return (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.alt || 'Visit Link'}
        </a>
      )
    case 'youtube':
      videoId = extractYouTubeId(item.videoUrl)
      if (!videoId) return null
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={item.alt || 'YouTube video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )
    default:
      return null
  }
}

export default function Home() {
  const [content, setContent] = useState(null)

  useEffect(() => {
    const query = `*[_type == "home"][0]{
      title,
      description,
      media[]{
        type,
        alt,
        "image": image{
          "asset": {
            "url": asset->url
          }
        },
        url,
        videoUrl
      }
    }`

    client.fetch(query)
      .then(data => setContent(data))
      .catch(console.error)
  }, [])

  if (!content) return null

  return (
    <Container>
      <Content>
        <Title>{content.title}</Title>
        <Description>
          <PortableText value={content.description} />
        </Description>
        <MediaGrid>
          {content.media?.map((item, index) => (
            <MediaItem key={index}>
              {renderMediaItem(item)}
            </MediaItem>
          ))}
        </MediaGrid>
      </Content>
    </Container>
  )
}