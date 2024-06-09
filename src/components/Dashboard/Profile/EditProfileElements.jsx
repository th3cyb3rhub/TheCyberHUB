import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
`;

export const TextArea = styled.textarea`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    /* border-radius: 5px;
    padding: 10px; */
    background: transparent;
    border: transparent;
    color: #fff;
    width: 100%;
    height: 50px;

    &::placeholder {
        color: #fff;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        background: transparent;
        border: transparent;
        color: #fff;
    }
`;
export const Input = styled.input`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    background: transparent;
    border: transparent;
    color: #fff;
    width: 100%;
    height: 50px;
    font-size: 15px;
    text-underline-offset: 5px;

    &::placeholder {
        color: #fff;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        background: transparent;
        border: transparent;
        color: #fff;
    }
`;

export const Submit = styled.button`
    padding: 10px;
    background: #1e1e1e;
    border: transparent;
    color: whitesmoke;
    border-radius: 5px;
    margin: 5px 0;
    width: 100%;
    cursor: pointer;
    font-size: 13px;
    font-family: Roboto, sans-serif;
`;
