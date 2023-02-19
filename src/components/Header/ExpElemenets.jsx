import styled from "styled-components";
import { GiMineExplosion } from "react-icons/all";

export const ExpContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: transparent;
    @media screen and (max-width: 900px) {
        margin-right: 30px;
    }
    @media screen and (max-width: 768px) {
    }
    @media screen and (max-width: 350px) {
        display: none;
    }
`;

export const ExpIcon = styled(GiMineExplosion)`
    color: #09ff1b;
    margin: 0 10px;
    font-size: 1.5rem;
`;
export const ExpText = styled.p`
    color: #09ff1b;
`;
