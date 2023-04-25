import styled from "styled-components";

export const CheckValuesContainer = styled.div``;

export const Checkbox = styled.input`
    margin-left: 10px;
    padding: 10px;
`;

export const Label = styled.label``;

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
    @media screen and (max-width: 500px) {
        padding: 5px 5px;
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
    @media screen and (max-width: 500px) {
        padding: 5px 5px;
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
