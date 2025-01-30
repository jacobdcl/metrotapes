import styled from 'styled-components'

const LineContainer = styled.div`
  width: 100%;
  height: 12rem;
  pointer-events: none;

  @media (min-width: 768px) {
    height: 16.5rem;
  }
`

const Line = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(0, 0, 0, 0.15) 100%
    ),
    url('/metal.jpg') repeat,
    linear-gradient(
      to right,
      #888 0%,
      #CCC 20%,
      #CCC 80%,
      #888 100%
    );
  background-blend-mode: overlay, multiply, normal;
  box-shadow: 
    /* Inner shadows for depth */
    inset 0 2px 5px rgba(255, 255, 255, 0.3),
    inset 0 -2px 5px rgba(0, 0, 0, 0.5),
    /* Outer shadows for depth */
    0 -1px 2px rgba(0, 0, 0, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  clip-path: polygon(
    0 100%,
    0 50%,
    60% 50%,
    75% 20%,
    100% 20%,
    100% 100%
  );

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(
        45deg,
        rgba(255, 255, 255, 0) 30%,
        rgba(255, 255, 255, 0.1) 45%,
        rgba(255, 255, 255, 0.1) 55%,
        rgba(255, 255, 255, 0) 70%
      );
    pointer-events: none;
  }
`

export default function SwipeLine() {
    return (
        <LineContainer>
            <Line />
        </LineContainer>
    )
} 