import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { client, urlFor } from '../lib/sanity'
import ImageModal from '../components/ImageModal'

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const Article = styled.article`
  margin-bottom: 4rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const Title = styled.h2`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const Description = styled.div`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const MediaSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%;
  overflow: hidden;
`

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; // 16:9 aspect ratio
  background: #000;
  border-radius: 4px;
  overflow: hidden;
`

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`

const Link = styled.a`
  color: #0039A6;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`

export default function Home() {
  const [articles, setArticles] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedArticleMedia, setSelectedArticleMedia] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const query = `*[_type == "article"] {
      _id,
      title,
      description,
      media[] {
        type,
        image,
        url,
        videoId,
        alt
      }
    }`

    client.fetch(query).then(data => {
      console.log('Fetched articles:', data)
      setArticles(data)
    })
  }, [])

  const getImageUrl = (image) => {
    if (!image) return ''
    try {
      const imageUrl = urlFor(image)
      return imageUrl ? imageUrl.width(800).url() : ''
    } catch (error) {
      console.error('Error generating image URL:', error)
      return ''
    }
  }

  const handleImageClick = (image, articleMedia) => {
    setSelectedImage(image)
    setSelectedArticleMedia(articleMedia)
    setIsModalOpen(true)
  }

  const handleModalClose = (newImage) => {
    if (newImage) {
      setSelectedImage(newImage)
    } else {
      setIsModalOpen(false)
    }
  }

  return (
    <Container>
      {articles.map(article => (
        <Article key={article._id}>
          <Title>{article.title}</Title>
          <Description>{article.description}</Description>
          {article.media && article.media.length > 0 && (
            <MediaSection>
              {article.media.map((item, index) => {
                if (item.type === 'image' && item.image) {
                  return (
                    <ImageWrapper key={index}>
                      <StyledImage
                        src={getImageUrl(item.image)}
                        alt={item.alt || ''}
                        onClick={() => handleImageClick(item.image, article.media)}
                      />
                    </ImageWrapper>
                  )
                }

                if (item.type === 'youtube' && item.videoId) {
                  console.log('Rendering YouTube video:', item.videoId)
                  return (
                    <VideoWrapper key={index}>
                      <VideoIframe
                        src={`https://www.youtube.com/embed/${item.videoId}`}
                        title={item.alt || 'YouTube video'}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </VideoWrapper>
                  )
                }

                if (item.type === 'link' && item.url) {
                  return (
                    <Link
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.alt || 'View Link'}
                    </Link>
                  )
                }

                return null
              })}
            </MediaSection>
          )}
        </Article>
      ))}
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        currentImage={selectedImage}
        mediaItems={selectedArticleMedia}
      />
    </Container>
  )
}