import styled from 'styled-components';
import CTFImg from "../../assets/images/Capture.png";

export const EventsContainer = styled.div`
  text-align: center;
  margin: 150px 20px;
  color: #cecac3;

  @media screen and (max-width: 760px) {
    text-align: center;
  }
`
export const EventHeading = styled.h1`
  text-align: center;
  color: #cecac3;
  margin-bottom: 50px;
  @media screen and (max-width: 760px) {
    text-align: center;
  }
`
export const EventSubHeadingSection = styled.div`
  text-align: center;
  color: #cecac3;
  margin-bottom: 50px;
  @media screen and (max-width: 760px) {
    text-align: center;
  }
`
export const EventSubHeading = styled.h3`
  text-align: center;
  color: #cecac3;
  margin-bottom: 5px;

  @media screen and (max-width: 760px) {
    text-align: center;
  }
`
export const ContentList = styled.li`
  text-align: center;
  color: #cecac3;

  @media screen and (max-width: 760px) {
    text-align: center;
  }
`
export const EventContent = styled.p`
  text-align: center;
  color: #cecac3;

  @media screen and (max-width: 760px) {
    text-align: center;
  }
`

export const BGImage = styled.img`
  width: 100%;
  height: auto;
  -o-object-fit: cover;
  object-fit: cover;
  background: #232a34;
`
export const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 50px 0;
  @media screen and (max-width: 760px) {
    text-align: center;
  }
`

export const CtfImage = styled.img`
    background-image: url(${CTFImg});
`

export const BGCTFImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

