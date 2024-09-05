import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";
import { CloseIcon } from "src/components/Header/Sidebar/SidebarElements";

export const SideCloseIcon = styled(CloseIcon)`
    margin-left: 50%;
    top: 0;
    height: 100%;
    width: 20px;
    cursor: pointer;

    @media screen and (width >= 900px) {
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
    z-index: 999;
    display: block;
    background: #0e0e0e;
    backdrop-filter: blur(40px);

    @media screen and (width <= 821px) {
        display: flex;
        background: transparent;
        position: static;
        border-radius: 10px;
        top: 0;
    }
`;

export const DropdownItemsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    text-align: center;
    max-width: 60rem;
    height: auto;
    margin: 0 auto;
    z-index: 999;
    width: max-content;
    padding: 25px;
    gap: 25px;

    /* sidebar */
    @media screen and (width <= 821px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(6, auto);
        text-align: center;
        width: 100%;
        padding: 0;
        margin: 0;
        height: 100%;

        @media screen and (width <= 380px) {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(6, auto);
        }
    }
`;

export const DropdownItemContainer = styled.div`
    color: black;
    position: relative;
    width: 280px;
    z-index: 999;
    border: none;
    margin: 0;

    &:hover {
        cursor: pointer;
    }

    @media screen and (width <= 821px) {
        /* width: min-content; */
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        padding: 0 1rem;
        gap: 10px;
        width: 100%;
        background: rgb(26 26 29 / 53%);

        @media screen and (width <= 768px) {
            /* height: max-content; */
            position: relative;
        }
    }
`;

export const DropdownItem = styled.h2`
    text-align: start;
    font-size: 1.5rem;
    font-family: "Fira Code", monospace;
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.01);
        border-bottom: 3px solid #ff6b08;
    }

    @media screen and (width <= 768px) {
        font-size: 1.1rem;
        width: max-content;
        margin: 0;
    }
`;

export const DropdownDesc = styled.p`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: start;
    align-items: start;
    color: #ababab;
    word-wrap: break-word;

    @media screen and (width <= 821px) {
        font-size: 0.8rem;
        width: max-content;
        display: none;
    }
`;

export const DropdownRouterLink = styled(LinkRouter)`
    text-decoration: none;
    color: #f5f5f5;
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    @media screen and (width <= 821px) {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        padding: 8px;
        text-decoration: none;
        list-style: none;
        color: #f5f5f5;
        cursor: pointer;

        /* width: 80%; */
        width: 100%;
        margin: 10px auto;
        background: rgb(26 26 26);

        /* border: 1px solid rgb(194 113 62 / 20%); */
        border-radius: 10px;
        transition: all 0.3s ease-in-out;

        &:hover {
            /* color: #ff6b08; */
            scale: 101%;
            transition: 0.2s ease-in-out;
        }
    }
`;
