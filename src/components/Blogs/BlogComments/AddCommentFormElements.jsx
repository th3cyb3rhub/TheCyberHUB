import styled from "styled-components";

export const AddCommentFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 100%;
    max-width: 1200px;
    padding: 30px;
    max-height: 300px;
    overflow-y: auto;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    color: #f5f5f5;
    background: transparent;
`;

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    border-radius: 10px;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    background: #151515;
    padding: 25px;
    gap: 25px;
`;

export const Input = styled.input`
    border-radius: 5px;
    background: #262525;
    border: transparent;
    color: #c6c6c6;
    width: 100%;
    height: 50px;
    font-size: 15px;
    text-underline-offset: 5px;
    padding: 10px 20px;

    &:focus {
        outline: none;
    }

    &:hover {
        background: #292828;
        border: transparent;
        color: #ddd;
        outline: none;
    }

    &::placeholder {
        color: #999;
    }
`;

export const Submit = styled.button`
    padding: 10px;
    background: #1e1e1e;
    border: transparent;
    color: #f5f5f5;
    border-radius: 5px;
    margin: 5px 0;
    width: 100%;
    cursor: pointer;
    font-size: 13px;
    font-family: Roboto, sans-serif;
`;
