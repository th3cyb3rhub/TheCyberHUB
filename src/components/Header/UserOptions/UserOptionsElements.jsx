import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const RouterLink = styled(LinkRouter)`
    color: whitesmoke;
`;

export const UserOptionsContainer = styled.div`
    max-width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;

    @media screen and (max-width: 340px) {
        display: inline-flex;
        justify-content: center;
        text-align: center;
        margin-top: 45px;
    }
`;
export const UserOptionsDropdownContainer = styled.div`
    position: absolute;
    top: 58px;
    width: 300px;
    transform: translateX(-45%);
    background-color: var(--bg);
    border: var(--border);
    border-radius: var(--border-radius);
    /*padding: 1rem;*/
    overflow: hidden;
    transition: height var(--speed) ease;
`;

export const NavbarNav = styled.ul`
    max-width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
`;

export const LogoutButton = styled.button``;
