import React from "react";
import styled from "styled-components";
import { PollImage } from "./PollImage";

const StyledPollContainer = styled.div`
    width: 40rem;
    background: #252525;
    text-align: left;
    min-height: 15rem;
    margin: 0 auto;
    box-shadow: 0 0 6px 4px #f5f5f569;
    border-radius: 0.2rem;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding: 1rem;

    .title {
        font-size: 1.2em;
        margin-bottom: 0.5rem;
        color: #fff;
    }

    .information {
        font-size: 1em;
        color: #aaa;
    }

    .information-container {
        display: flex;
        align-items: center;
        gap: 0.1rem;
        padding: 0.6rem;
    }

    .stacked-images {
        display: flex;
    }
`;

const InformationContainer = ({ votes, daysLeft }) => (
    <div className="information-container">
        <div className="stacked-images">
            <PollImage />
            <PollImage />
            <PollImage />
        </div>
        <p className="information">{votes}</p> <span>.</span> <p className="information">{daysLeft}</p>
    </div>
);

export const Poll = ({ title, votes, daysLeft, children }) => {
    return (
        <StyledPollContainer>
            <h3 className="title">{title}</h3>
            {children}
            <InformationContainer votes={votes} daysLeft={daysLeft} />
        </StyledPollContainer>
    );
};
