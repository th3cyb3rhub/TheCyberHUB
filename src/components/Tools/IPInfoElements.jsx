// IpInfoStyles.js
import styled from "styled-components";

export const Container = styled.div`
    max-width: 600px;
    margin: 100px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #1e1e1e;
    color: #e0e0e0;
    border-radius: 5px;
`;

export const Title = styled.h2`
    color: #4da6ff;
    border-bottom: 2px solid #4da6ff;
    padding-bottom: 10px;
`;

export const InfoBox = styled.div`
    background-color: #2a2a2a;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 30%);
`;

export const InfoItem = styled.p`
    margin: 5px 0;
    color: #bbb;
`;

export const Form = styled.form`
    display: flex;
    margin-bottom: 20px;
`;

export const Input = styled.input`
    flex-grow: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #444;
    border-radius: 4px 0 0 4px;
    background-color: #333;
    color: #e0e0e0;

    &:focus {
        outline: none;
        border-color: #4da6ff;
    }
`;

export const Button = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4da6ff;
    color: #1e1e1e;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #3d8bff;
    }
`;

export const ErrorMessage = styled.p`
    color: #ff6b6b;
    font-weight: bold;
`;
