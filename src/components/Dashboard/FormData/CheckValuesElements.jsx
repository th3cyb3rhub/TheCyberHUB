import styled from "styled-components";

export const Checkbox = styled.input`
    margin-left: 10px;
    padding: 10px;
`;

export const Button = styled.button`
    background: #131313;
    color: #f4f4f4;
    border: 1px solid #262626;
    border-radius: 6px;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 5px;
    padding: 10px 20px;

    @media screen and (width <= 500px) {
        padding: 5px;
        width: 100%;
    }
`;

export const ButtonGreen = styled.button`
    background: #ff8100;
    color: #1a1c1d;
    font-weight: 600;
    border: 1px solid #1a1c1d;
    border-radius: 5px;
    font-size: 16px;
    margin: 5px;
    width: 120px;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;

    @media screen and (width <= 500px) {
        padding: 5px;
        width: 100%;
    }
`;

export const ContactFormSelect = styled.select`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #151515;
    border: none;
    color: #c4c4c4;
    width: 100%;
    padding: 10px 25px;
    margin: 10px 0;
`;

export const ContactFormSelectOption = styled.option`
    font-size: 15px;
    color: #c4c4c4;
    padding: 25px;
    margin: 25px;
    max-width: 150px;
    text-wrap: normal;
    display: flex;
    flex-wrap: wrap;
`;

export const HiredSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 25px;
`;
export const HiredInput = styled.input`
    font-family: Poppins, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    background: #101010;
    border: transparent;
    color: #c2c2c2;
    width: 100%;
    text-underline-offset: 5px;
    font-size: 20px;
    padding: 10px 25px;
    transition: all 0.2s ease-in-out;

    @media (width <= 900px) {
        font-size: 17px;
    }

    @media (width <= 500px) {
        font-size: 15px;
    }

    &::placeholder {
        color: #fff;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        background: #111;
        transition: all 0.2s ease-in-out;
        border: transparent;
        color: #fff;
    }
`;
