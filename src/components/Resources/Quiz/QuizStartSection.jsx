import Logo from "src/assets/images/Thecyberworld_logo_outlined.png";
import { ResetButton } from "./Categories/CategoriesElements";
import React from "react";
import styled from "styled-components";

const StartSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: auto;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 2rem;
    }

    img {
        width: 70%;
    }

    button {
        margin-top: 2rem;
        padding: 1rem 7rem;
        font-family: Poppins, sans-serif;
        border-radius: 10px;
    }

    button&:hover {
        background-color: #ff6b07;
        color: #000;
    }

    @media screen and (width <= 768px) {
        h1 {
            font-size: 1.5rem;
        }

        img {
            width: 100%;
        }

        button {
            padding: 1rem 3rem;
        }
    }
`;

const QuizStartSection = ({ setQuizStart }) => {
    return (
        <StartSection>
            <h1>Quiz Section</h1>
            <img src={Logo} alt="" />
            <ResetButton onClick={() => setQuizStart(true)}>Start now</ResetButton>
        </StartSection>
    );
};
export default QuizStartSection;
