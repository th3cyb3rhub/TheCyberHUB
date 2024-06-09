import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
    position: sticky;
    top: 0;
    width: 100%;
    height: 80px;
    background-color: #090909;
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
    align-items: center;
    border: 1px solid #232222;
    border-radius: 10px;

    /* z-index: 99; */
`;

export const Ul = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 20px;
`;

export const Li = styled.li`
    margin-right: 20px;
`;

export const NavLink = styled(Link)`
    text-decoration: none;
    color: #b7b7b7;
    font-weight: bold;
    transition: all 0.3s ease-in-out;

    &:hover {
        color: #ff6b08;
    }
`;

export const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    cursor: pointer;
`;

export const DropdownTitle = styled.span`
    cursor: pointer;
`;

export const DropdownUl = styled.ul`
    list-style: none;
    margin: 0;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #2c2c2c; /* Lighter background color */
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
    display: none;
    width: 150px;

    ${DropdownContainer} {
        &:hover {
            display: block;
        }
    }
`;

export const DropdownLink = styled(Link)`
    display: block;
    color: #e0e0e0;
    text-decoration: none;
    padding: 10px;

    &:hover {
        background-color: #ff6b08;
        color: #252525;
    }
`;
