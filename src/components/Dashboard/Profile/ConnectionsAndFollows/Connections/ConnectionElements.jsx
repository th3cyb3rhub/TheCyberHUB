import styled from "styled-components";
import { BsDot } from "react-icons/bs";

export const ConnectionContainer = styled.div`
    gap: 10px;
`;

export const ConnectionCount = styled.p`
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    gap: 5px;
    color: #adadad;

    @media screen and (width <= 768px) {
        font-size: 0.8rem;
        justify-content: start;
    }
`;
export const DotIcon = styled(BsDot)`
    font-size: 20px;
    color: #d9d9d9;
`;
export const ConnectionButton = styled.button`
    padding: 5px 34px;
    margin: 15px 0;
    border-radius: 50px;
    background: #0e0e0e;
    align-items: center;
    width: 245px;
    color: #e0e0e0;
    border: 1px solid #3a3a3a;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-size: 14px;
    display: flex;
    justify-content: center;

    &:hover {
        background: #3a3a3a;
        transition: all 0.3s ease-in-out;
        scale: 1.1;
    }
`;

export const ConnectionUsername = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 10px;
    padding: 5px 60px 5px 5px;
    border-radius: 100px;
    border: 1px solid #2a2a2a;
    background: #1a1c1d;
    width: auto;
    max-width: 400px;
    font-size: 18px;
    color: #adadad;
    cursor: pointer;
`;
