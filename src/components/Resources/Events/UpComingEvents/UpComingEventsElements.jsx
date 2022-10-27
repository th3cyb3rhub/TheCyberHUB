import styled from "styled-components";

export const UpComingEventsContainer = styled.div`
    width: 348px;
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

export const UpComingEventsImage = styled.img`
    height: 100%;
    width: auto;
    margin-bottom: 10px;
`;

export const UpComingEventsTitle = styled.div`
    margin: 10px 0;
    padding: 10px 0;
`;

export const UpComingEventsContent = styled.div`
    margin-bottom: 10px;
`;
export const UpComingEventsHeading = styled.h2`
    margin: 15px 0 -10px 0;
`;
export const UpComingEventsSubHeading = styled.h4`
    margin-top: 10px;
    color: #777777;
`;
export const UpComingEventsDiscordLink = styled.a`
    color: #2f80ed;
    text-align: center;
    text-decoration: none;
`;

export const UpComingEventsChangeViewBtn = styled.a`
    text-decoration: none;
    color: currentColor;
    opacity: 0.5;
    cursor: pointer;
`;
