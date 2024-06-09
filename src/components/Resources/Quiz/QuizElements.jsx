import styled from "styled-components";

export const QuizContainer = styled.div`
    color: white;
    font-weight: 600;
    flex-direction: column;
    width: 100%;
    max-width: 1500px;
    height: min-content;
    border-radius: 10px;
    box-shadow: 10px 10px 42px 0 rgb(0 0 0 / 75%);
    display: flex;

    @media screen and (width <= 800px) {
        margin: 50px 30px;
    }
`;
