import styled from 'styled-components'

const VideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
  background: #000;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AspectRatioBox = styled.div`
  position: relative;
  width: 300vw; /* Much wider to ensure coverage */
  height: 300vh; /* Much taller to ensure coverage */
`

const YouTubeIframe = styled.iframe`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  pointer-events: none;
`

export default function BackgroundVideo() {
    const videoId = 'trA9owC00HI'

    return (
        <VideoContainer>
            <AspectRatioBox>
                <YouTubeIframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1`}
                    title="Background Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                />
            </AspectRatioBox>
        </VideoContainer>
    )
}
