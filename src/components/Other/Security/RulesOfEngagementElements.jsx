import styled from "styled-components";

export const RulesOfEngagementContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1500px;
    gap: 25px;
`;

export const RulesOfEngagementContentSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 25px;
`;

export const RulesOfEngagementContentList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 25px;
    gap: 25px;
    background: #090909;
`;

export const ROEHeading = styled.h1`
    color: #fff;
    text-align: center;
    max-width: 800px;
    font-size: 20px;
`;

export const ROEDescription = styled.p`
    white-space: pre-line;
    text-align: start;
    width: 100%;
    max-width: 800px;

    @media screen and (width <= 400px) {
        font-size: 14px;
    }
`;
