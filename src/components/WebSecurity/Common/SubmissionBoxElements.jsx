import styled from "styled-components";

export const SubmissionBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    /* padding: 20px; */
`;

export const InputSection = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
`;

export const Input = styled.input`
    padding: 5px 15px;
    width: 100%;
    height: 100%;
    flex: 1;
    background: #131313;
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

export const SubmitButton = styled.button`
    padding: 10px;
    background-color: #ff6b08;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;
