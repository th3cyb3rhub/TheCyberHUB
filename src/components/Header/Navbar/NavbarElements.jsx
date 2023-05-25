import styled from "styled-components";
import { Link, Link as LinkRouter } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import { TbCrown } from "react-icons/all";

export const DropdownIcon = styled(AiFillCaretDown)`
    margin: 5px 0 0 5px;
`;

export const Nav = styled.nav`
    background: ${({ scrollNav }) => (scrollNav ? "#000" : "transparent")};
    height: 80px;
    margin-top: -80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    z-index: 10;
    top: 0;
    padding: 0 5px;

    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`;

export const NavbarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    max-width: 1500px;
`;

export const NavUsersDetailsSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: transparent;
    gap: 5px;
`;
export const NavLogoRouter = styled(LinkRouter)`
    display: flex;
    justify-self: flex-start;
    align-items: center;
    color: #fff;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    padding: 0 20px;

    @media screen and (max-width: 500px) {
        padding: 0 5px;
    }
`;

export const NavLogo = styled.img`
    height: 50px;
    cursor: pointer;
    max-width: 250px;

    @media screen and (max-width: 880px) {
        margin: 0;
        padding: 0;
    }
    @media screen and (max-width: 500px) {
        margin: 0 0 0 0;
    }

    @media screen and (max-width: 450px) {
        margin: 0 0 0 0;
        height: 45px;
    }
`;

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 780px) {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        cursor: pointer;
        color: #fff;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    gap: 5px;

    @media screen and (max-width: 870px) {
        gap: 0;
    }
    @media screen and (max-width: 780px) {
        display: none;
    }
`;
export const NavMenu2 = styled.div`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    gap: 5px;

    @media screen and (max-width: 1110px) {
        display: none;
    }

    @media screen and (max-width: 780px) {
        display: initial;
    }
    @media screen and (max-width: 600px) {
        display: none;
    }
`;

export const NavItem = styled.div`
    height: 80px;
`;

export const NavLink = styled(LinkRouter)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 0.8rem;
    height: 100%;
    cursor: pointer;

    @media screen and (max-width: 870px) {
        padding: 0 0.5rem;
    }

    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.05);
        border-bottom: 3px solid #20c20e;
    }

    &.active {
        border-bottom: 3px solid #20c20e;
    }
`;
export const NavButtonsSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;

    @media screen and (max-width: 785px) {
        display: none;
    }
`;

export const RouterNavLeaderboardButtonLink = styled(Link)`
    color: #fff;
    display: flex;
    gap: 5px;
    transition: 0.2s ease-in-out;
    height: 100%;
    align-items: center;
    justify-content: center;

    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.05);
        border-bottom: 3px solid #20c20e;
    }

    &.active {
        border-bottom: 3px solid #20c20e;
    }
`;

export const CrownIcon = styled(TbCrown)`
    color: #17f31e;
    font-size: 30px;
`;

export const RouterNavCreateButtonLink = styled(Link)`
    margin: 0 auto;
    margin-bottom: 2rem;
    display: initial;
    height: fit-content;
    background: #111111;
    border-radius: 5px;
    color: #0bff0b;
    padding: 5px 15px;
    transition: 0.2s ease-in-out;

    @media screen and (max-width: 600px) {
        font-size: 12px;
    }

    //@media screen and (max-width: 1150px) {
    //  display: none;
    //}
    //@media screen and (max-width: 900px) {
    //  display: initial;
    //}

    &:hover {
        transition: 0.2s ease-in-out;
        scale: 1.1;
    }
`;
