import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #1a1a1a;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
`

const VideoGrid = styled.div`
  columns: 1;
  column-gap: 16px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  flex: 1;
  
  @media (min-width: 640px) {
    columns: 2;
  }
  
  @media (min-width: 1024px) {
    columns: 3;
  }
  
  @media (min-width: 1280px) {
    columns: 4;
    padding: 0 32px;
  }
`

const VideoItem = styled.div`
  break-inside: avoid;
  margin-bottom: 16px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`

const VideoTitle = styled.h2`
  margin: 0;
  padding: 16px;
  font-size: 1.1rem;
  color: white;
  font-family: "Helvetica Neue", Arial, sans-serif;
  opacity: 0.9;
`

const VideoEmbed = styled.div`
  position: relative;
  padding-top: 56.25%; // 16:9 aspect ratio
  background: #000;
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

export default function VideoPage() {
    const [videos, setVideos] = useState([])
    const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const playlistId = await client.fetch(`*[_type == "videos"][0].playlistId`)
                if (!playlistId) return

                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`
                )
                const data = await response.json()

                if (data.items) {
                    const formattedVideos = data.items.map(item => ({
                        id: item.id,
                        title: item.snippet.title,
                        videoId: item.snippet.resourceId.videoId
                    }))
                    setVideos(formattedVideos)
                }
            } catch (error) {
                console.error('Error fetching videos:', error)
            }
        }

        fetchVideos()
    }, [YOUTUBE_API_KEY])

    return (
        <Container>
            <VideoGrid>
                {videos.map(video => (
                    <VideoItem key={video.id}>
                        <VideoEmbed>
                            <VideoIframe
                                src={`https://www.youtube.com/embed/${video.videoId}`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </VideoEmbed>
                        <VideoTitle>{video.title}</VideoTitle>
                    </VideoItem>
                ))}
            </VideoGrid>
        </Container>
    )
}