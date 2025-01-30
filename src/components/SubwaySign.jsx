import styled from 'styled-components'

const SignContainer = styled.div`
  background-color: #000;
  background-image: url('/subwaysign.jpg');
  background-repeat: repeat;
  background-position: center;
  background-size: 100%;
  padding: 1.2rem 1.5rem 2rem 1.2rem;
  width: 100%;
  max-width: 700px;
  height: 100%;
  border-radius: 15px 0 0 15px;
  margin-top: 2rem;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.3),
    0 8px 12px rgba(0, 0, 0, 0.2),
    inset 0 0 0 2px rgba(255, 255, 255, 0.1);
  position: relative;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, .55);
    border-radius: 15px 0 0 15px;
    z-index: -1;
  }

  @media (min-width: 768px) {
    max-width: 900px;
    padding: 1.5rem 2.5rem 2.5rem;
  }
`

const StationText = styled.h1`
  position: relative;
  color: white;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  width: 100%;
  margin: 0;
  letter-spacing: 0.02em;
  padding-bottom: 16px;
  padding-right: 3.5rem;
  border-bottom: 4px solid white;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (min-width: 768px) {
    font-size: 4.5rem;
    padding-bottom: 24px;
    padding-right: 5rem;
    margin-bottom: 24px;
  }
`

const SubwayLines = styled.div`
  position: relative;
  display: flex;
  gap: 8px;

  @media (min-width: 768px) {
    gap: 12px;
  }
`

const SubwayLine = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 1.3rem;
  background-color: ${props => props.color};
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  @media (min-width: 768px) {
    width: 52px;
    height: 52px;
    font-size: 1.8rem;
  }
`

export default function SubwaySign() {
    return (
        <SignContainer>
            <StationText>metro tapes</StationText>
            <SubwayLines>
                <SubwayLine color="#0039A6">A</SubwayLine>
                <SubwayLine color="#0039A6">C</SubwayLine>
                <SubwayLine color="#FF6319">F</SubwayLine>
                <SubwayLine color="#FCCC0A">R</SubwayLine>
            </SubwayLines>
        </SignContainer>
    )
} 