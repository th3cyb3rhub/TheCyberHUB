import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { BiSolidChevronLeft, BiSolidChevronRight, BiSolidCircle } from "react-icons/bi";

export const DashboardSidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #090909;
    height: 100vh;

    /* border-radius: 10px; */
    color: #f5f5f5;
    border-right: 1px solid #2d2d2d;
    gap: 40px;

    /* stick to the top */
    position: sticky;
    top: 0;
    min-width: ${(props) => (props?.$isOpen ? "250px" : "50px")};
    transition: width 0.3s ease-in-out;

    .heading {
        margin-top: 32px;
        margin-bottom: 0;
    }
`;

export const RouteLink = styled(Link)`
    text-decoration: none;
    color: #f5f5f5;
`;
export const SideBarLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 15px;
    gap: 15px;
`;

export const SideBarLink = styled(({ $isOpen, ...props }) => <NavLink {...props} />)`
    text-decoration: none;
    color: #f5f5f5;
    font-size: 12px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    padding: 7px 0;
    gap: 10px;
    padding-left: ${(props) => (props.$isOpen ? "10px" : "0")};
    transition:
        background 0.3s ease-in-out,
        padding 0.3s ease-in-out;
    width: 100%;
    justify-content: ${(props) => (props.$isOpen ? "unset" : "center")};

    &:hover,
    &.active {
        background: #ff6b08;
        color: #111;

        /* background: ${(props) => (props.$isOpen ? "#ff6b08" : "")};
           color: ${(props) => (props.$isOpen ? "#111" : "#ff6b08")}; */
    }
`;

export const SidebarTitle = styled.p`
    /* font-size: 1.2rem; */
    font-weight: 600;
    cursor: pointer;
    opacity: ${(props) => (props.$isOpen ? "1" : "0")};
    transition: opacity 0.6s ease-in-out 0.2s;
    margin-bottom: 0;
    display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

export const ToggleButton = styled.div`
    /* top: 100px; */
    cursor: pointer;
    border-radius: 12px;
    border: 1px solid #2a2a2a;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
`;

export const UserProfile = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px;
    background: #1c1c1c;

    /* margin-left: ${(props) => (props.$isOpen ? "0" : "8px")}; */

    .user-profile-image {
        position: relative;

        img {
            width: ${(props) => (props.$isOpen ? "50px" : "40px")};
            height: ${(props) => (props.$isOpen ? "50px" : "40px")};
            border-radius: 100%;
            object-fit: cover;
        }
    }

    h3 {
        font-weight: 800;
    }
`;

export const UserProfileDescription = styled.div`
    margin-left: ${(props) => (props.$isOpen ? "16px" : "0")};
    opacity: ${(props) => (props.$isOpen ? "1" : "0")};
    transform: ${(props) => (props.$isOpen ? "translateX(0)" : "translateX(-100%)")};
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;
    visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
    width: ${(props) => (props.$isOpen ? "unset" : "0")};

    h4 {
        font-size: 14px;
        font-weight: 600;
    }

    span {
        font-size: 12px;
        color: #f5f5f5;
    }
`;

const createStyledIcon = (IconComponent) => {
    return styled(IconComponent)`
        font-size: 20px;
    `;
};

export const BiSolidCircleIcon = styled(BiSolidCircle)`
    width: ${(props) => (props?.$isOpen ? "20px" : "10px")};
    height: ${(props) => (props.$isOpen ? "20px" : "10px")};
    color: #b9f62e;
    position: absolute;
    bottom: 4px;
    right: 6px;
`;

export const BiSolidChevronLeftIcon = createStyledIcon(BiSolidChevronLeft);
export const BiSolidChevronRighIcon = createStyledIcon(BiSolidChevronRight);
