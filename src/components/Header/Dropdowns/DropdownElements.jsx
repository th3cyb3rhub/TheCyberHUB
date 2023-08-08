import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";
import { CloseIcon } from "../Sidebar/SidebarElements";

export const SideCloseIcon = styled(CloseIcon)`
    margin-left: 50%;
    top: 0;
    height: 100%;
    width: 20px;
    cursor: pointer;

    @media screen and (min-width: 900px) {
        display: none;
    }
`;

export const DropdownContainer = styled.div`
    border-radius: 0;
    width: 100%;
    height: auto;
    padding: 1rem;
    position: absolute;
    top: 80px;
    left: 0;

    background: #030303;

    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    @media screen and (max-width: 768px) {
        top: 0;
    }
`;

export const DropdownItemsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: center;
    max-width: 60rem;
    height: auto;
    margin: 0 auto;
    margin-bottom: 1rem;

    @media screen and (max-width: 768px) {
        height: max-content;
        background: #000000;
        backdrop-filter: blur(1000px);
        -webkit-backdrop-filter: blur(1000px);
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    }
`;

export const DropdownItemContainer = styled.div`
    color: black;
    position: relative;
    margin: 1rem;
    width: 270px;

    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        max-width: 40%;
    }
`;

export const DropdownItem = styled.h2`
    text-align: start;

    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.05);
        border-bottom: 3px solid #ff6b08;
    }
    @media screen and (max-width: 768px) {
        font-size: 1.1rem;
    }
`;

export const DropdownDesc = styled.p`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: start;
    align-items: start;
    color: #ababab;
    //white-space: pre-wrap;
    word-wrap: break-word;
    @media screen and (max-width: 768px) {
        font-size: 0.8rem;
    }
`;

export const DropdownRouterLink = styled(LinkRouter)`
    text-decoration: none;
    color: #f5f5f5;
    margin-left: 50px;
`;
