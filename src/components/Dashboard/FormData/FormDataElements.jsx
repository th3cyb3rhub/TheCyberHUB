import styled from "styled-components";

export const FormDataContainer = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 5px;
    z-index: 1;
    color: #666666;
    width: 100%;
    max-width: 1500px;
`;

export const FormDataCard = styled.div`
    width: 100%;
    padding: 25px;
    background: #1a1c1d;
`;

export const FromDataSection = styled.div`
    width: 100%;
`;

export const FormTypesContainer = styled.div``;

export const FormType = styled.button`
    background: #080a10;
    color: #b9b9b9;
    border: 1px solid #111111;
    padding: 10px 20px;
    margin: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-size: 18px;
`;
