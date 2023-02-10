import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const CyberGamesContainer = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 150px 20px;
    color: #cecac3;

    @media screen and (max-width: 760px) {
        text-align: center;
    }
`;

export const OSINTGame = styled(RouterLink)``;
export const CTFGame = styled(RouterLink)``;
export const CyberGamesImage = styled.img`
    border-radius: 10px;
    height: 200px;
    width: auto;
    display: flex;
    margin: 0 30px;
    border: 1px solid #545454;

    &:hover {
        transform: scale(1.1);
        border: 2px solid #72b74c;
        transition: all 0.2s ease-in-out;
    }
`;
