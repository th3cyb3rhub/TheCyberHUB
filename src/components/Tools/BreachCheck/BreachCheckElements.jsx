import styled from "styled-components";

export const ContainerBreachCheck = styled.div`
    margin: 50px 0;
    width: 100%;
    max-width: 1000px;
    justify-content: center;
    align-items: center;
    position: relative;
    background: #090909;
    border: 1px solid #1a1c1d;
    box-shadow: 0 0 100px 0 rgb(40 110 157 / 20%);
    backdrop-filter: blur(4px);
    border-radius: 10px;
    padding: 25px 50px 50px;

    @media (width <= 768px) {
        padding: 20px;
    }
`;
export const EmailInput = styled.input`
    padding: 0.5rem;
    padding-left: 1.5rem;
    font-size: 1.3rem;
    min-width: 300px;
    flex: 1;
    color: #f5f5f5;
    background: #131313;
    border: 1px solid #212121;
    border-radius: 5px;
    width: 100%;

    &:focus {
        outline: none;
    }

    &:hover {
        background: #1a1c1d;
    }

    @media (width <= 768px) {
        padding-left: 0.5rem;
        min-width: auto;
        width: 100%;
    }
`;

export const PasswordInput = styled.input`
    /* Add your styles here */
    font-size: 16px;
    padding: 10px;
    border: 1px solid #ccc;
`;

export const SubmitButton = styled.button`
    padding: 0.5rem 1rem;
    font-size: 1.3rem;
    font-weight: 525;
    background-color: orange;
    color: #131313;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-radius: 5px;
    text-align: center;
    border: 1px solid #212121;
    align-items: center;
    display: flex;
    justify-content: center;

    &:hover {
        background-color: #07b6f6;
        color: #131313;
        scale: 1.01;
        transition: all 0.2s ease-in-out;
    }

    @media (width <= 768px) {
        width: 100%;

        &:hover {
            background-color: #07b6f6;
            color: #363636;
            scale: 1.01;
            transition: all 0.2s ease-in-out;
        }
    }
`;

export const Message = styled.div`
    margin: 50px 0 0;
    align-items: center;
    text-align: center;
    padding: 25px;
`;
export const GreenMessage = styled.p`
    color: #07b6f6;
    font-size: 1.3rem;
    font-family: "Roboto Mono", monospace;
    font-weight: 600;
`;

export const RedMessage = styled.p`
    font-size: 1.3rem;
    color: orangered;
    font-family: "Roboto Mono", monospace;
    font-weight: 600;
`;
