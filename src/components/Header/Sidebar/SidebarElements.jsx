import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export const SidebarContainer = styled.nav`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: #0d0d0d;
    display: grid;
    align-items: center;
    right: 0;
    opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
    top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};

    transition: all 0.2s ease-in-out;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0));
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(3, 3, 3, 0.18);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
`;

export const CloseIcon = styled(FaTimes)`
    color: #fff;

    &:hover {
        scale: 1.2;
        color: #20c20e;
        transition: 0.2s ease-in-out;
    }
`;

export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`;

export const SidebarWrapper = styled.div`
    color: #fff;
`;

export const SidebarLink = styled(RouterLink)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    padding: 8px;
    text-decoration: none;
    list-style: none;
    color: #fff;
    cursor: pointer;
    width: 80%;
    background: rgba(76, 194, 62, 0.04);
    border: 1px solid rgba(76, 194, 62, 0.2);
    border-radius: 10px;

    transition: 0.2s ease-in-out;

    &:hover {
        color: #17f31eff;
        scale: 105%;
        transition: 0.2s ease-in-out;
    }
`;

export const SideBtnWrap = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;
export const SidebarMenu = styled.div`
    // display: grid;
    // grid-template-columns: 1fr;
    // grid-template-rows:repeat(6, 80px);
    text-align: center;

    @media screen and (min-width: 480px) {
        grid-template-rows: repeat(6, 60px);
    }
`;
export const SidebarRoute = styled(RouterLink)`
    border-radius: 50px;
    background: #20c20e;
    white-space: nowrap;
    padding: 16px 64px;
    color: #000000;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #000000;
    }
`;
