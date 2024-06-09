import styled from "styled-components";
import { FiClipboard } from "react-icons/fi";

export const PassGenContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
    width: 100%;
    height: 100%;
    max-width: 1500px;
`;

export const PassGenCard = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 25px;
    width: 100%;

    @media screen and (width <= 800px) {
        flex-direction: column;
    }
`;

export const PassGenHeading = styled.h1`
    font-size: 24px;
    color: #fff;
`;

export const GenerateButton = styled.button`
    background-color: #ff6b08;
    color: #1f1f1f;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid #343834;
    border-radius: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    width: 100%;

    &:focus {
        outline: none;
        box-shadow: 0 0 5px #ff6b08;
    }
`;

export const PasswordDisplayContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: row;
`;

export const PasswordDisplay = styled.div`
    padding: 10px 20px;
    font-size: 16px;
    border: 1px solid #343834;
    border-radius: 10px;
    color: white;
    width: 100%;
    align-content: center;
    text-align: center;
    word-wrap: break-word;
`;
export const IsStrongText = styled.div`
    color: ${({ isStrong }) => (isStrong ? "#ff6b08" : "#4caf50")};
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 10px;
    width: 100%;
    align-content: center;
    text-align: center;
    font-weight: bold;
`;

export const CopyToClipboardButton = styled(FiClipboard)`
    color: #fff;
    cursor: pointer;
    min-width: 35px;
    font-size: 30px;
    padding: 5px;
    margin: 5px;
    background-color: #1a1c1d;
    border-radius: 10px;
    transition: color 0.2s ease-in-out;

    &:hover {
        color: #ff6b08;
    }
`;

export const PassGenOptionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    background: #090909;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 0 10px #000;
    min-height: 300px;
    height: 100%;
    max-height: 500px;
    min-width: 400px;
    width: 100%;
    max-width: 500px;
    gap: 20px;

    @media screen and (width <= 768px) {
        max-width: 100%;
    }

    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 20px;
    }

    span {
        color: #fff;
        font-size: 18px;
        background-color: #1a1c1d;
        padding: 10px;
        border-radius: 10px;
    }

    .range {
        width: 100%;
        background: #1a1c1d;
        appearance: none;
        border-radius: 10px;
        height: 10px;
        outline: none;

        /* opacity: 0.7; */
        transition: 0.2s;
        transition: opacity 0.2s;

        &::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            background: #ff6b08;
            border-radius: 50%;
            cursor: pointer;
        }

        &::-moz-range-thumb {
            border: #1a1c1d;
            width: 20px;
            height: 20px;
            background: #ff6b08;
            border-radius: 50%;
            cursor: pointer;
        }
    }

    label {
        background-color: #1a1c1d;
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 10px;
        padding: 10px 25px;
        border-radius: 10px;
        justify-content: space-between;
        width: 100%;
        font-size: 18px;
        color: #fff;
    }
`;

export const PassGenPasswordContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    background: #090909;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 0 10px #000;
    min-height: 300px;
    height: 100%;
    max-height: 500px;
    width: 100%;
    max-width: 400px;

    @media screen and (width <= 768px) {
        max-width: 100%;
    }
`;

export const PassGenForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
