import styled from "styled-components";

export const CustomInputGroup = styled.div`
    height: 45px;
    min-width: 120px;
    display: flex;
    align-items: center;
    border: 1px solid rgb(128 128 128 / 24%);
    border-radius: 8px;
    padding: 4px 8px;

    &:focus-within {
        border-color: green !important;
    }

    & input {
        flex: 2;
        height: 100%;
        background: transparent;
        border: none;
        outline: none;
        color: white;
        font-size: 15px;
    }

    & .codeInput {
        display: flex;
        flex: 2;
        height: 100%;
        width: 100%;
        font-family: Roboto, sans-serif;
        text-align: center;
        justify-content: center;
        align-items: center;
        background: transparent;
        border: none;
        outline: none;
        color: white;
        font-size: 20px;
    }

    & span {
        padding: 5px;
        color: #b9b4b4;
        padding-right: 15px;
        display: flex;
        align-items: center;
    }
`;

export const VerificationCodeSection = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    gap: 10px;

    & span {
        font-family: Roboto, sans-serif;
        font-size: 20px;
        padding: 5px;
        //margin: 5px 25px 5px 5px;
        color: #b9b4b4;
        padding-right: 15px;
        display: flex;
        align-items: center;
    }
`;
