import styled from "styled-components";
import { Link, Link as LinkRouter } from "react-router-dom";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

export const UserIcon = styled(FaUser)`
    border: #2f80ed 1px solid;
    padding: 5px;
    background: #646464;
    font-size: 40px;
    border-radius: 100%;
`;
export const DropdownIcon = styled(AiFillCaretDown)`
    margin: 5px 0 0 5px;
`;

export const SideDropdownIcon = styled(AiFillCaretRight)`
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
    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`;

export const NavbarContainer = styled.div`
    //margin: 0 10px;
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

    //width: 100%;
    @media screen and (max-width: 450px) {
        //max-width: 125px;
    }
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
    //min-width: 200px;
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

    @media screen and (max-width: 900px) {
        display: flex;
        //display: block;
        //position: absolute;
        //top: 0;
        //right: 0;
        //transform: translate(-100%, 60%);
        font-size: 1.5rem;
        cursor: pointer;
        color: #fff;
        //margin-top: 3px;
        //margin-right: 35px;
    }
    @media screen and (max-width: 340px) {
        //display: inline-flex;
        //justify-content: center;
        //text-align: center;
        //margin-top: 60px;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;

    @media screen and (max-width: 900px) {
        display: none;
    }
`;

export const NavItem = styled.div`
    height: 80px;
`;

export const SidebarRedirectLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    padding: 8px;
    text-decoration: none;
    list-style: none;
    transition: 0.2s ease-in-out;
    color: #fff;
    cursor: pointer;

    &:hover {
        color: #20c20e;
        transition: 0.2s ease-in-out;
    }
`;

export const NavLinks = styled(LinkRouter)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.05);
        border-bottom: 3px solid #20c20e;
    }

    &.active {
        border-bottom: 3px solid #20c20e;
    }
`;
export const NavRedirectLink = styled.a`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
        border-bottom: 3px solid #20c20e;
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: flex-end;
    justify-content: end;
    @media screen and (max-width: 980px) {
        //
        display: none;
    }
`;

export const NavBtnLink = styled.a`
    border-width: 2px;
    border-style: solid;
    border-color: #343434;
    background: transparent;
    white-space: nowrap;
    padding: 10px 22px;
    color: #ffffff;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: transparent;
        color: #20c20e;
        border-color: #343434;
        font-size: 18px;
    }

    @media screen and (max-width: 890px) {
        padding: 2px;
    }
`;

export const NavButtonsSection = styled.div`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 785px) {
        display: none;
    }
`;

export const RouterNavLeaderboardButtonLink = styled(Link)`
    height: fit-content;
    background: #111111;
    border-radius: 5px;
    color: #0bff0b;
    padding: 5px 15px;
    margin: 5px 15px;
    @media screen and (max-width: 600px) {
        font-size: 12px;
    }

    @media screen and (max-width: 1150px) {
        display: none;
    }
    @media screen and (max-width: 900px) {
        display: initial;
    }

    &:hover {
        transition: 0.1s ease-in-out;
        scale: 1.1;
    }
`;

export const RouterNavCreateButtonLink = styled(RouterNavLeaderboardButtonLink)`
    @media screen and (max-width: 1250px) {
        display: none;
    }

    @media screen and (max-width: 900px) {
        display: initial;
    }
`;

// export const NavBtnLink = styled.a`
//   border-radius: 50px;
//   background: #20c20e;
//   white-space: nowrap;
//   padding: 10px 22px;
//   color: #000000;
//   font-size: 16px;
//   outline: none;
//   border: none;
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;
//   text-decoration: none;
//
//   &:hover {
//     transition: all 0.2s ease-in-out;
//     background: #fff;
//     color: #000000;
//
//
//   }
// `
