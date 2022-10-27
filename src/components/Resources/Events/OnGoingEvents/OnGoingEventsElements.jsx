import styled from "styled-components";

export const OnGoingEventsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    text-align: left;
    height: auto;
    width: 70em;
    border: 1px solid #ffffff0d;
    border-radius: 10px;
    background-color: #0d1117;
    margin: 0 20px 20px 0;
    padding: 15px 20px;

    @media screen and (max-width: 768px) {
        margin: 0 0 20px 0;
    }
`;

export const OnGoingEventsImage = styled.img`
    height: 100%;
    width: auto;
    margin-bottom: 10px;
`;

export const OnGoingEventsTitle = styled.div`
    margin: 10px 0;
    padding: 10px 0;
`;

export const OnGoingEventsContent = styled.div`
    margin-bottom: 20px;
`;
export const OnGoingEventsHeading = styled.h2``;
export const OnGoingEventsSubHeading = styled.h3`
    text-align: center;
`;
export const OnGoingEventsDiscordLink = styled.a`
    color: #2f80ed;
    text-align: center;
    text-decoration: none;
`;

export const OnGoingEventsChangeViewBtn = styled.a`
    text-decoration: none;
    color: currentColor;
    opacity: 0.5;
    cursor: pointer;
`;
