import styled from "styled-components";

export const FormDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    position: relative;
    z-index: 1;
    color: #666666;
`;

export const FormDataCard = styled.div`
    width: 100%;
    padding: 25px;
    background: #1a1c1d;
`;

export const FromDataSection = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 25px;
    padding: 25px;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const FormTypesContainer = styled.div``;

export const FormType = styled.button`
    background: #1a1c1d;
    color: #666666;
    border: 1px solid #666666;
    padding: 10px 20px;
    margin: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-size: 18px;
`;
