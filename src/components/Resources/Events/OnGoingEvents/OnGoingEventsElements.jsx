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

export const OnGoingEventsContent = styled.div`
    margin-bottom: 20px;
`;

export const OnGoingEventsSubHeading = styled.h4`
    color: #9b9b9b;
    margin: 5px 0 10px 0;
`;

export const OnGoingEventsChangeViewBtn = styled.a`
    text-decoration: none;
    color: currentColor;
    opacity: 0.5;
    cursor: pointer;
`;
