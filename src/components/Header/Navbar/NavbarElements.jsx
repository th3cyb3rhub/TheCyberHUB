import styled from "styled-components";
import { Link, Link as LinkRouter } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import { BsTrophyFill } from "react-icons/bs";

export const DropdownIcon = styled(AiFillCaretDown)`
    margin: 2px 0 0 5px;
    transition: transform 0.3s ease;
`;

export const Nav = styled.nav`
    background: ${({ $scrollNav }) => ($scrollNav ? "#0a0a0a" : "rgba(10, 10, 10, 0.95)")};
    backdrop-filter: blur(10px);
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
    border-bottom: ${({ $showBottomBorder }) => ($showBottomBorder ? "1px solid #2a2a2a" : "none")};
    box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
    transition: all 0.3s ease-in-out;

    @media screen and (width <= 960px) {
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

export const CommunityBadge = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    border-radius: 20px;
    margin-right: 15px;
    font-weight: 600;
    font-size: 0.85rem;
    background: rgb(255 106 0 / 15%);
    color: #ff6a00;
    border: 1px solid rgb(255 106 0 / 30%);
    gap: 6px;

    @media screen and (width <= 1100px) {
        display: none;
    }
`;

export const SearchBarContainer = styled.div`
    position: relative;
    width: 250px;
    margin: 0 20px;

    @media screen and (width <= 1100px) {
        display: none;
    }
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 8px 15px 8px 35px;
    border-radius: 20px;
    border: 1px solid #333;
    background: rgb(25 25 25 / 70%);
    color: #f5f5f5;
    font-size: 0.9rem;

    &:focus {
        outline: none;
        border-color: #ff6a00;
        box-shadow: 0 0 0 1px rgb(255 106 0 / 30%);
    }

    &::placeholder {
        color: #999;
    }
`;

export const SearchIcon = styled.div`
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #777;
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
    border-radius: 50%;
    padding: 7px;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

export const NavLogo = styled.img`
    height: 40px;
    width: 40px;
    cursor: pointer;
    font-size: 12px;
    color: #999;
    word-break: break-all;
`;

export const MobileIcon = styled.div`
    display: none;

    @media screen and (width <= 820px) {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        cursor: pointer;
        color: #f5f5f5;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
    text-align: center;
    justify-content: space-evenly;
    margin: 0 10px;
    backdrop-filter: blur(16px) saturate(180%);
    background-color: rgb(25 25 25 / 40%);
    border-radius: 8px;
    border: 1px solid rgb(255 255 255 / 5%);

    @media screen and (width <= 1100px) {
        display: none;
    }
`;

export const NavMenu2 = styled.div`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    gap: 5px;

    @media screen and (width <= 1135px) {
        display: none;
    }

    @media screen and (width <= 820px) {
        display: initial;
    }

    @media screen and (width <= 600px) {
        display: none;
    }
`;

export const NavItem = styled.div`
    font-family: "Space Mono", monospace;
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    padding: 15px;
    flex-direction: column;
    position: relative;
    transition: all 0.2s ease-in-out;

    &:hover {
        background: rgb(255 106 0 / 10%);
        transition: all 0.2s ease-in-out;
    }

    &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 3px;
        bottom: 0;
        left: 50%;
        background-color: #ff6a00;
        transition: all 0.3s ease;
    }

    &:hover::after {
        width: 70%;
        left: 15%;
    }

    &.active {
        &::after {
            width: 70%;
            left: 15%;
        }
    }
`;

export const NavLink = styled(LinkRouter)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    height: 100%;
    cursor: pointer;
    width: 100%;
    transition: color 0.2s ease;
    gap: 6px;
    font-weight: 500;

    &:hover {
        color: #ff6a00;
    }

    &.active {
        color: #ff6a00;
        font-weight: 600;
    }
`;

export const NavButtonsSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;

    @media screen and (width <= 785px) {
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

export const RankTrophy = styled(BsTrophyFill)`
    color: white;
    font-size: 30px;
`;

export const RouterNavCreateButtonLink = styled(Link)`
    display: initial;
    height: fit-content;
    background: rgb(24 24 24 / 80%);
    border-radius: 5px;
    color: #ff6b08;
    padding: 10px 15px;
    transition: 0.2s ease-in-out;
    border: 1px solid rgb(255 107 8 / 30%);

    @media screen and (width <= 600px) {
        font-size: 12px;
    }

    @media screen and (width <= 1280px) {
        min-width: 10px;
        font-size: 14px;
    }

    &:hover {
        transition: 0.2s ease-in-out;
        scale: 1.05;
        background: rgb(255 107 8 / 10%);
    }
`;

export const RouterNavCreateButton = styled.button`
    margin: ${(props) => (props.noCenter ? 0 : "0 auto")};
    margin-bottom: 2rem;
    display: initial;
    height: fit-content;
    background: rgb(17 17 17 / 80%);
    border-radius: 5px;
    color: #ff6b08;
    border: 1px solid rgb(255 107 8 / 30%);
    padding: 8px 18px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    @media screen and (width <= 600px) {
        font-size: 12px;
    }

    &:hover {
        transition: 0.2s ease-in-out;
        scale: 1.05;
        background: rgb(255 107 8 / 10%);
    }
`;
