import styled from "styled-components";

export const AnalyticsInnerCard = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #fff;
    padding: 0.8rem;
    border: 0.5px solid grey;
    border-radius: 5px;
    transition: transform 0.2s; /* Animation */
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
`;

export const TopSectionInnerCardCaption = styled.span`
    display: flex;
    flex-direction: row;
    text-align: center;
`;

export const TopSectionInnerCardCaptionTitle = styled.span`
    display: flex;
    flex-direction: row;
    text-align: center;
`;
export const Title = styled.h1`
    color: #fff;
    text-align: center;
`;

export const LastThirtyDaysBtn = styled.div`
    flex: 5;
    display: flex;
    justify-content: flex-end;
    color: grey;
    font-size: 11px;
    font-weight: 600;
`;

export const TopSectionInnerCardMainSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 100%;
`;

export const TopSectionInnerCardMainSectionSummary = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 0 0 0.9rem;
`;

export const MainFigure = styled.p`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: white;
    font-size: 16px;
`;

export const FigureInPercent = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    background-color: #bcfe30;
    color: black;
    font-size: 10px;
    margin-left: 1rem;
    padding: 3px;
    border: 0.5px solid green;
    border-radius: 8px;
`;

export const TopSectionInnerCardMainSectionChart = styled.div`
    font-size: 12px;
    height: 100%;
`;
