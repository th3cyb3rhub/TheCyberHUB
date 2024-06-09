import React from "react";
import styled from "styled-components";
import { PollImage } from "./PollImage";

const StyledAnswer = styled.div`
    margin-bottom: 0.4rem;
`;

const PercentageLabel = styled.div`
    margin-right: 10px;
    width: 2.5rem;
    text-align: right;
    color: #ccc;
`;

const AnswerContainer = styled.div`
    display: flex;
    align-items: center;
`;

const AnswerBarContainer = styled.div`
    flex: 1;
    margin-left: 1rem;
`;

const AnswerBar = styled.div`
    background-color: ${({ isCorrectAnswer }) => (isCorrectAnswer ? "#4caf50" : "#d32f2f")};
    height: 10px;
    border-radius: 15px;
    width: ${({ percentage }) => `${percentage}%`};
`;

const Title = styled.p`
    font-weight: bold;
    margin: 0;
    color: #fff;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 5px;
`;

const StyledPollImage = styled(PollImage)`
    margin-left: 5px;
`;

export const PollAnswers = ({ answers }) => {
    return answers.map(({ percentage, title, isCorrectAnswer }, index) => (
        <StyledAnswer key={index}>
            <AnswerContainer>
                <PercentageLabel>{percentage}%</PercentageLabel>
                <AnswerBarContainer>
                    <TitleContainer>
                        <Title>{title}</Title>
                        {isCorrectAnswer && <StyledPollImage />}
                    </TitleContainer>
                    <AnswerBar isCorrectAnswer={isCorrectAnswer} percentage={percentage} />
                </AnswerBarContainer>
            </AnswerContainer>
        </StyledAnswer>
    ));
};
