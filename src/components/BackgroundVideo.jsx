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
  background: #000;
  
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
  top: calc(50% - 3rem);
  left: 50%;
  transform: translate(-50%, -50%) scale(1.5);
  border: none;

  @media (max-width: 768px) {
    width: 150vw;
    height: 150vh;
    transform: translate(-50%, -50%) scale(2.5);
  }
`

export default function BackgroundVideo() {
  return (
    <VideoWrapper>
      <Video
        src="https://www.youtube.com/embed/HVR-J4_80jU?autoplay=1&mute=1&controls=0&loop=1&playlist=HVR-J4_80jU&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=0&origin=metrotapes.com&widget_referrer=metrotapes.com&color=white&disablekb=1&fs=0&version=3&autohide=1"
        title="Background Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
      />
    </VideoWrapper>
  )
}
