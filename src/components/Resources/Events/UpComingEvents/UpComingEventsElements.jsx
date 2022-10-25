import styled from "styled-components";

export const UpComingEventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-align: left;
  height: auto;
  border: 1px solid #ffffff0d;
  border-radius: 10px;
  background-color: #0d1117;
  margin: 0 20px 20px 0;
  padding: 15px 20px;

  @media screen and (max-width: 768px) {
    margin: 0 0 20px 0;
    width: 100%;
  }
`;

export const UpComingEvents_Image = styled.img`
  height: 100%;
  width: auto;
  margin-bottom: 10px;
`;

export const UpComingEvents_Title = styled.div`
  margin: 10px 0;
  padding: 10px 0;
`;

export const UpComingEvents_Content = styled.div`
  margin-bottom: 10px;
`;
export const UpComingEvents_Heading = styled.h2`
  margin: 15px 0 -10px 0;
`;
export const UpComingEvents_SubHeading = styled.h4`
  margin-top: 10px;
  color: #777777;
`;
export const UpComingEvents_DiscordLink = styled.a`
  color: #2f80ed;
  text-align: center;
  text-decoration: none;
`;

export const UpComingEvents_ChangeViewBtn = styled.a`
  text-decoration: none;
  color: currentColor;
  opacity: 0.5;
  cursor: pointer;
`;
