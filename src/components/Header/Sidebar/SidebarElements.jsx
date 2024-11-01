import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export const SidebarContainer = styled.nav`
    position: fixed;
    z-index: 999;
    width: 260px; /* Set a specific width for the sidebar */
    height: 100%;
    background: #070707;
    display: ${({ $isOpen }) => ($isOpen ? "grid" : "none")};
    align-items: center;
    left: 0; /* Move sidebar to the left */
    opacity: ${({ $isOpen }) => ($isOpen ? "100%" : "0")};
    top: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
    overflow: auto;
    transition: all 0.2s ease-in-out;
`;

export const CloseIcon = styled(FaTimes)`
    color: #f5f5f5;
    z-index: 9999;

    &:hover {
        scale: 1.2;
        color: #ff6b08;
        transition: 0.2s ease-in-out;
    }
`;

export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    left: 1.5rem; /* Move close icon to the left */
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`;

export const SidebarWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #f5f5f5;
`;

export const SidebarNavItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start; /* Change to flex-start for left alignment */
    padding: 0 1rem;
    width: auto;
    text-align: left; /* Change text alignment to left */
`;

export const SidebarLink = styled(RouterLink)`
    display: flex;
    align-items: center;
    justify-content: flex-start; /* Change to flex-start for left alignment */
    font-size: 18px;
    padding: 0 15px;
    text-decoration: none;
    font-family: "Fira Code", monospace;
    color: #f5f5f5;
    cursor: pointer;
    margin: 0;
    border-radius: 3px;
    transition: all 0.3s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.01);
        border-bottom: 1px solid #ff6b08;
    }

    & > .dropdown-icon {
        margin-right: 5px; /* Change margin to right for icon spacing */
    }
`;

export const SidebarMenu = styled.div`
    background: transparent;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media screen and (width >= 480px) {
        grid-template-rows: repeat(6, 60px);
    }
`;
