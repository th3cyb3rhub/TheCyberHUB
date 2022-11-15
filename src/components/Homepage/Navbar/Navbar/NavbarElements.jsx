import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";

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
    top: 0;
    z-index: 10;
    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`;

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;
    @media screen and (max-width: 940px) {
        padding: 0 5px;
    }
`;

export const NavLogoRouter = styled(LinkRouter)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin: 0 5px;
    font-weight: bold;
    text-decoration: none;
`;

export const NavLogo = styled.img`
    height: 60px;
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-left: 5px;
    font-weight: bold;
    text-decoration: none;
    @media screen and (max-width: 880px) {
        margin: 0;
        padding: 0;
    }
    @media screen and (max-width: 500px) {
        margin: 0 0 0 0;
    }
    @media screen and (max-width: 350px) {
        margin: 0 -20px 0 0;
    }
`;

// Text logo
// export const NavLogoRouter = styled(LinkRouter)`
//   color: #fff;
//   justify-self: flex-start;
//   cursor: pointer;
//   font-size: 1.5rem;
//   display: flex;
//   align-items: center;
//   margin-left: 24px;
//   font-weight: bold;
//   text-decoration: none;
// `

export const MobileIcon = styled.div`
    display: none;
    @media screen and (max-width: 900px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.5rem;
        cursor: pointer;
        color: #fff;
        margin-top: 10px;
    }
    @media screen and (max-width: 340px) {
        display: inline-flex;
        justify-content: center;
        text-align: center;
        margin-top: 60px;
        width: 30%;
    }
`;
export const Text = styled.div`
    margin-left: 5px;
    margin-bottom: 2px;
`;
export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin: 0 1rem;

    @media screen and (max-width: 900px) {
        display: none;
    }
`;

export const NavItem = styled.li`
    height: 80px;
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

    //&.active {
    //    border-bottom: 3px solid #20c20e;
    //}
`;
export const NavLinkRouter = styled.a`
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
    align-items: center;
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
// export const NavBtnLink = styled.a`
//   border-radius: 50px;
//   background: #20c20e;
//   white-space: nowrap;
//   padding: 10px 22px;
//   color: #010606;
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
//     color: #010606;
//
//
//   }
// `
