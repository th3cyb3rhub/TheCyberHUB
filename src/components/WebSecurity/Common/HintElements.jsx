import styled from "styled-components";

export const HintContainer = styled.div`
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    padding: 10px 10px 10px 15px;
    background-color: #151515;
    border: 1px solid #343434;
    color: #eaeaea;
    border-radius: 5px;
    cursor: pointer;
`;

export const SolutionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-decoration: none;
    padding: 10px 10px 10px 15px;
    background-color: #151515;
    border: 1px solid #343434;
    color: #eaeaea;
    border-radius: 5px;
    cursor: pointer;
    gap: 20px;
`;

export const HintIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ed652f;
    padding: 5px;
    border: 1px solid #ed652f;
    border-radius: 5px;
    color: black;
`;
