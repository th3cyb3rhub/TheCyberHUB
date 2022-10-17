import styled from "styled-components";

export const PastEventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: auto;
  width: 20em;
  border: 1px solid #ffffff0d;
  border-radius: 10px;
  background-color: #0d1117;
  margin: 0 0 20px 0 ;
  padding: 15px 15px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

export const PastEvents_Image = styled.img`
  height: 100%;
  width: auto;
  margin-bottom: 10px;
`

export const PastEvents_Title = styled.div`
`

export const PastEvents_Content = styled.div`
  margin-bottom: 10px;
`
export const PastEvents_Heading = styled.h2`
  text-align: center;

`
export const PastEvents_SubHeading = styled.h4`
  margin-top: 5px;
  color: #adadad;
`
export const PastEvents_DiscordLink = styled.a`
  text-decoration: none;
  text-underline: none;
  color: #2F80ED;
`

export const PastEvents_ChangeViewBtn = styled.a`
  text-decoration: none;
  color: currentColor;
  opacity: 0.5;
  cursor: pointer;
`
