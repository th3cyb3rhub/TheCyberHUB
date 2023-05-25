import styled from "styled-components";
import { MdOutlineLocalFireDepartment } from "react-icons/all";

export const ExpContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: transparent;
    width: 120px;
    gap: 15px;

    @media screen and (max-width: 1350px) {
        min-width: initial;
    }
    @media screen and (max-width: 400px) {
        font-size: 12px;
    }
    @media screen and (max-width: 970px) {
        display: none;
    }
    @media screen and (max-width: 780px) {
        display: flex;
    }
    @media screen and (max-width: 450px) {
        width: auto;
    }
    @media screen and (max-width: 360px) {
        display: none;
    }
`;

export const ExpIcon = styled(MdOutlineLocalFireDepartment)`
    color: #09ff1b;
    margin: 0 5px;
    font-size: 1.2rem;
    @media screen and (max-width: 400px) {
        font-size: 12px;
    }
`;
export const ExpText = styled.div`
    color: #09ff1b;
    display: flex;
    align-items: center;
    justify-content: end;
    text-align: right;
    width: 100%;
    //@media screen and (max-width: 1350px) {
    //    display: none;
    //}
    @media screen and (max-width: 900px) {
        display: initial;
    }
    @media screen and (max-width: 450px) {
        min-width: initial;
    }
`;
export const StreakText = styled.div`
    color: #09ff1b;
    display: flex;
    align-items: center;
`;

export const SideOptionsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: transparent;
`;
