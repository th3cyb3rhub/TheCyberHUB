import styled from "styled-components";

export const EventsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`

export const MainEventsContainer = styled.div`
  width: 70%;
  
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`
export const OnGoingEventsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: self-start;
  justify-content: start;
`;

export const UpComingEventsContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const EventsHeading = styled.h1``;

export const PastEventsContainer = styled.div`
  width: 30%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    width: auto;
  }
`


