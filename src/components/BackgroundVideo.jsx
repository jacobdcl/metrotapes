import styled from 'styled-components'

const VideoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
`

const Video = styled.iframe`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.1);
`

export default function BackgroundVideo() {
  return (
    <VideoWrapper>
      <Video
        src="https://www.youtube.com/embed/HVR-J4_80jU?autoplay=1&mute=1&controls=0&loop=1&playlist=HVR-J4_80jU&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
        title="Background Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </VideoWrapper>
  )
}
