import styled from "styled-components";
import { VscClose } from "react-icons/vsc";

export const SearchInput = styled.input`
    border: none;
    background: #212121;
    color: #d7d7d7;
    padding: 7px 12px;
    font-size: 16px;
    width: 100%;
    border-radius: 0 4px 4px 0;
    outline: none;

    @media screen and (width <= 380px) {
        width: 100%;
    }

    @media screen and (width <= 800px) {
        width: 100%;
    }
`;
export const SearchBox = styled.div`
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #252525;
    border-radius: 5px;
`;

export const SearchIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #131313;
    width: 50px;
    height: 40px;
    font-size: 20px;
    color: #d7d7d7;
    border-radius: 4px 0 0 4px;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
        background: #131313;
    }
`;

export const CancelIcon = styled(VscClose)`
    font-size: 1.7rem;
    color: rgb(238 238 238);
    cursor: pointer;
    transition: 0.2s ease-in-out;
`;

export const CancelIconWrapper = styled.div`
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
`;
