import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const DropdownContainer = styled.div`
    width: 100%;
    height: auto;
    position: absolute;
    top: 80px;
    left: 0;

    color: white;
    background: #fff;
    margin: 10px 10px 10px 5px;
    overflow: hidden;
    padding: 10px;
    transition: all 0.2s ease-in-out;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
`;

export const DropdownItemsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 1rem;
    max-width: 50rem;
    height: auto;
`;

export const DropdownItemContainer = styled.div`
    color: black;
    position: relative;
    margin: 1rem;
    width: 200px;
    &:hover {
        cursor: pointer;
    }
`;

export const DropdownItem = styled.h2`
    text-align: start;
`;

export const DropdownDesc = styled.p`
    margin-top: 10px;
    text-align: start;
    color: #ababab;
`;

export const DropdownRouterLink = styled(LinkRouter)`
    text-decoration: none;
    color: white;
    margin-left: 50px;
`;
