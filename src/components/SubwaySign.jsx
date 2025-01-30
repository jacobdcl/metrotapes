import styled from 'styled-components'

const SignContainer = styled.div`
  background: #000;
  padding: 1.5rem 1.8rem 2rem;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  width: 100%;
  max-width: 700px;
  height: 100%;
  border-radius: 15px 0 0 15px;
  margin-top: 2rem;

  @media (min-width: 768px) {
    max-width: 900px;
    padding: 2rem 2.5rem 2.5rem;
  }
`

const StationText = styled.h1`
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

  @media (min-width: 768px) {
    font-size: 4.5rem;
    padding-bottom: 24px;
    padding-right: 5rem;
    margin-bottom: 24px;
  }
`

const SubwayLines = styled.div`
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