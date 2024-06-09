import React from "react";
import styled from "styled-components";
import { StyledCheckbox } from "./StyledCheckbox";

const StyledQuestion = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #fff;
`;

export const PollQuestions = ({ questions }) => {
    return questions.map((question, index) => {
        return (
            <StyledQuestion key={index}>
                <StyledCheckbox />
                <p>{question}</p>
            </StyledQuestion>
        );
    });
};
