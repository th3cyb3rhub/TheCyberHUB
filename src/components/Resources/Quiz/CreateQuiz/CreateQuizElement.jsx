import styled from "styled-components";

export const CreateQuizContainer = styled.div`
    min-height: 25em;
    margin: 40px auto;
    color: white;
    font-weight: 600;
    background: #090909;
    width: auto;
    max-width: calc(70rem - 75px);
    height: min-content;
    border-radius: 10px;
    padding: 30px 40px;
    box-shadow: 10px 10px 42px 0 rgb(0 0 0 / 75%);
    display: flex;
    flex-direction: column;

    @media screen and (width <= 800px) {
        margin: 50px 30px;
    }
`;
export const AddQuestionAndOptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 15px;
    align-items: center;
`;
export const Label = styled.label`
    margin: 10px;
`;

export const Input = styled.input`
    padding: 10px 15px;
    flex: 1;
    background: #1a1c1d;
    color: #fff;
    border: 1px solid #464646;
    border-radius: 5px;
    font-size: 18px;
    outline: none;

    &::placeholder {
        color: #464646;
    }

    &:focus {
        border: 1px solid #ff6b08;
    }

    &:hover {
        border: 1px solid #ff6b08;
    }

    &:active {
        border: 1px solid #ff6b08;
    }
`;
export const QuizContainer = styled.div`
    background-color: #111;
    color: white;
    width: 70%;
    margin: auto;
    padding: 30px;
`;
