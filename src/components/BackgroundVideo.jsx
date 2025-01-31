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
`

const AspectRatioBox = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100vh * 16 / 9); /* Maintain 16:9 aspect ratio based on viewport height */
  height: 100vh;
  min-width: 100vw; /* Ensure it's at least as wide as the viewport */
  overflow: hidden;
`

const YouTubeIframe = styled.iframe`
  position: absolute;
  top: -60px; /* Push the title area off-screen */
  left: 0;
  width: 100%;
  height: calc(100% + 60px); /* Compensate for the negative top margin */
  pointer-events: none;
  border: 0;
`

export default function BackgroundVideo() {
    const videoId = 'trA9owC00HI'

    return (
        <VideoContainer>
            <AspectRatioBox>
                <YouTubeIframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&disablekb=1&fs=0&color=white&modestbranding=1&controls=0&showinfo=0&title=0`}
                    title="Background Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                />
            </AspectRatioBox>
        </VideoContainer>
    )
}
