import styled from "styled-components";

export const ContainerBreachCheck = styled.div`
    margin: 150px auto 0 auto;
    margin: 150px auto 0 auto;
`;
export const EmailInput = styled.input`
    /* Add your styles here */
    font-size: 16px;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 5px;
    width: 500px;
`;

export const PasswordInput = styled.input`
    /* Add your styles here */
    font-size: 16px;
    padding: 10px;
    border: 1px solid #ccc;
`;

export const SubmitButton = styled.button`
    /* Add your styles here */
    font-size: 16px;
    padding: 10px 20px;
    border: none;
    border-radius: 2px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #3f9e44;
    }
`;

export const Message = styled.div`
    margin: 50px 0 0 0;
`;
export const GreenMessage = styled.h2`
    color: greenyellow;
`;

export const RedMessage = styled.h2`
    color: orangered;
`;
