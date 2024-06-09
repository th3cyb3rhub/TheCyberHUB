import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export const SidebarContainer = styled.nav`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: transparent;
    display: ${({ $isOpen }) => ($isOpen ? "grid" : "none")};
    align-items: center;
    right: 0;
    opacity: ${({ $isOpen }) => ($isOpen ? "100%" : "0")};
    top: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
    overflow: auto;
    transition: all 0.2s ease-in-out;

    /* background: linear-gradient(135deg, rgb(0 0 0 / 10%), rgb(255 255 255 / 0%)); */
    backdrop-filter: blur(120px);

    /* border: 1px solid rgb(3 3 3 / 18%); */
    box-shadow: 0 8px 32px 0 rgb(0 0 0 / 37%);
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
    right: 1.5rem;
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

    /* align-items: center; */
    flex-direction: column;
    color: #f5f5f5;
`;

export const SidebarNavItem = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding: 0 1rem;
    gap: 10px;

    /* background: rgba(26, 26, 29, 0.53); */
    @media screen and (width <= 768px) {
        /* height: max-content; */
        position: relative;
    }
`;

export const SidebarLink = styled(RouterLink)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    padding: 8px;
    text-decoration: none;
    list-style: none;
    font-family: "Fira Code", monospace;
    color: #f5f5f5;
    cursor: pointer;

    /* width: 80%; */
    width: 100%;
    margin: 10px auto;
    background: rgb(194 108 62 / 4%);

    /* border: 1px solid rgb(194 113 62 / 20%); */
    border-radius: 10px;
    transition: all 0.3s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.01);
        border-bottom: 3px solid #ff6b08;
    }
`;

export const SideBtnWrap = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;
export const SidebarMenu = styled.div`
    /* display: grid;
    grid-template-columns: 1fr;
    grid-template-rows:repeat(6, 80px); */
    background: transparent;
    text-align: center;
    display: flex;
    flex-direction: column;

    @media screen and (width >= 480px) {
        grid-template-rows: repeat(6, 60px);
    }
`;
export const SidebarRoute = styled(RouterLink)`
    border-radius: 50px;
    background: #ff6b08;
    white-space: nowrap;
    padding: 16px 64px;
    color: #000;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #f5f5f5;
        color: #000;
    }
`;
