import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
    border: #1a1c1d 1px solid;
`;

export const PostFormTextarea = styled.textarea`
    font-family: "Poppins", sans-serif;
    border: none;
    padding: 25px;
    margin: 10px 0;
    font-size: 17px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: transparent;
    color: #fff;
    width: 100%;
    height: 250px;

    ::placeholder {
        color: #fff;
    }

    &:focus {
        outline: none;
    }
`;

export const ButtonSection = styled.div`
    display: flex;
    align-items: end;
    justify-content: end;
`;

export const PostFormButton = styled.button`
    padding: 10px 20px;
    cursor: pointer;
    background: #1a1c1d;
    color: #f4f4f4;
    border: 1px solid #1a1c1d;
    border-radius: 5px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
