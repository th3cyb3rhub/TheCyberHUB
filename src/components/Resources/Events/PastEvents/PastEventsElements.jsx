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
    margin: 0 0 20px 0;
    padding: 15px 15px;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

export const PastEventsImage = styled.img`
    height: 100%;
    width: auto;
    margin-bottom: 10px;
`;

export const PastEventsTitle = styled.div``;

export const PastEventsContent = styled.div`
    margin-bottom: 10px;
`;
export const PastEventsHeading = styled.h2`
    text-align: center;
`;
export const PastEventsSubHeading = styled.h4`
    margin-top: 5px;
    color: #adadad;
`;
export const PastEventsDiscordLink = styled.a`
    text-decoration: none;
    text-underline: none;
    color: #2f80ed;
`;

export const PastEventsChangeViewBtn = styled.a`
    text-decoration: none;
    color: currentColor;
    opacity: 0.5;
    cursor: pointer;
`;
