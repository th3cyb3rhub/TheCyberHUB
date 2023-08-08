import styled from "styled-components";
import { Link, Link as LinkRouter } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import { TbCrown } from "react-icons/tb";

export const DropdownIcon = styled(AiFillCaretDown)`
    margin: 5px 0 0 5px;
`;

export const Nav = styled.nav`
    // background: ${({ scrollNav }) => (scrollNav ? "0000007F" : "transparent")};
    height: 80px;
    margin-top: -80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    z-index: 10;
    top: 0;
    padding: 0 25px;

    //if showBottomBorder then show bottom border
    border-bottom: ${({ showBottomBorder }) => (showBottomBorder ? "1px solid #2a2a2a" : "none")};

    background: rgba(0, 0, 0, 0.34);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);

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
    justify-self: center;
    align-items: center;
    color: #f5f5f5;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;

    //background: #0e0e0e;
    //border: 1px solid #262626;
    border-radius: 50%;
    padding: 7px;
`;

export const NavLogo = styled.img`
    height: 40px;
    width: 40px;
    cursor: pointer;
`;

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 820px) {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        cursor: pointer;
        color: #f5f5f5;
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
    @media screen and (max-width: 820px) {
        display: none;
    }
    &.active {
        font-size: 125%;
        transition: all 0.3s ease-in-out;
        transform: scale(1.05);
        border-bottom: 3px solid #ff6b08;
    }
`;
export const NavMenu2 = styled.div`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    gap: 5px;

    @media screen and (max-width: 1135px) {
        display: none;
    }

    @media screen and (max-width: 820px) {
        display: initial;
    }
    @media screen and (max-width: 600px) {
        display: none;
    }
`;

export const NavItem = styled.div`
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const NavLink = styled(LinkRouter)`
    color: #f5f5f5;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 0.8rem;
    height: 98%;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    @media screen and (max-width: 920px) {
        transition: all 0.3s ease-in-out;
        padding: 0 0.5rem;
    }

    &:hover {
        transition: all 0.3s ease-in-out;
        transform: scale(1.05);
    }

    &.active {
        font-size: 125%;
        transition: all 0.3s ease-in-out;
        transform: scale(1.05);
        border-bottom: 2px solid #ff6b08;
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
    color: #f5f5f5;
    display: flex;
    gap: 5px;
    transition: 0.2s ease-in-out;
    height: 100%;
    align-items: center;
    justify-content: center;

    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.05);
        border-bottom: 3px solid #ff6b08;
    }

    &.active {
        border-bottom: 3px solid #ff6b08;
    }
`;

export const CrownIcon = styled(TbCrown)`
    color: #ff6b08;
    font-size: 30px;
`;

export const RouterNavCreateButtonLink = styled(Link)`
    margin: 0 auto;
    margin-bottom: 2rem;
    display: initial;
    height: fit-content;
    background: #111111;
    border-radius: 5px;
    color: #ff6b08;
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
