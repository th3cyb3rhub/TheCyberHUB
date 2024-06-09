import styled from "styled-components";

export const OnGoingEventsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    text-align: left;
    height: auto;
    width: 100%;
    border: 1px solid #f5f5f50d;
    border-radius: 10px;
    background-color: #0c0c0c;
    margin: 0 20px 20px 0;
    padding: 15px 20px;

    @media screen and (width <= 768px) {
        margin: 0 0 20px;
    }
`;

export const OnGoingEventsImage = styled.img`
    height: 100%;
    width: auto;
    margin-bottom: 10px;
    font-size: 12px;
    color: #999;
    word-break: break-all;
`;

export const OnGoingEventsContent = styled.div`
    margin-bottom: 20px;
`;

export const OnGoingEventsSubHeading = styled.h4`
    color: #9b9b9b;
    margin: 5px 0 10px;
`;

export const OnGoingEventsChangeViewBtn = styled.a`
    text-decoration: none;
    color: currentcolor;
    opacity: 0.5;
    cursor: pointer;
`;
