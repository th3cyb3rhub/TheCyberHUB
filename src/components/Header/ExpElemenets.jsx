import styled from "styled-components";
import { MdOutlineLocalFireDepartment } from "react-icons/md";

export const ExpContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: transparent;
    width: 120px;
    gap: 15px;
    transition: 0.3s ease-in-out;

    @media screen and (width <= 1350px) {
        min-width: initial;
    }

    @media screen and (width <= 400px) {
        font-size: 12px;
    }

    @media screen and (width <= 1000px) {
        display: none;
    }

    @media screen and (width <= 820px) {
        display: flex;
    }

    @media screen and (width <= 450px) {
        width: auto;
    }

    @media screen and (width <= 360px) {
        display: none;
    }
`;

export const ExpIcon = styled(MdOutlineLocalFireDepartment)`
    color: #ff6b08;
    margin: 0 5px;
    font-size: 1.4rem;

    @media screen and (width <= 400px) {
        font-size: 12px;
    }
`;
export const ExpText = styled.div`
    color: #ff6b08;
    display: flex;
    align-items: center;
    justify-content: end;
    text-align: right;
    width: 100%;

    /* @media screen and (max-width: 1350px) {
       display: none;
    } */
    @media screen and (width <= 900px) {
        display: initial;
    }

    @media screen and (width <= 450px) {
        min-width: initial;
    }
`;
export const StreakText = styled.div`
    color: #ff6b08;
    display: flex;
    align-items: center;
`;

export const SideOptionsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: transparent;
`;
