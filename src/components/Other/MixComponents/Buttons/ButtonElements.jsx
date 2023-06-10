import styled from "styled-components";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

export const IconsSpacing = styled.span`
    margin: 5px 5px 0 0;
    display: inline;
    flex-direction: row;
`;
export const IconsSpacing2 = styled.span`
    margin: 7px 0 0 3px;
    display: inline;
    flex-direction: row;
`;

export const ScrollButton = styled(ScrollLink)`
    margin: auto 10px 10px 10px;
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #343434;
    background: transparent;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    color: #20c20e;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: transparent;
        border-color: #343434;
        scale: 1.1;
        font-size: 16px;
    }
`;

export const RouterButton = styled(RouterLink)`
    margin: auto 10px 10px 10px;
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #343434;
    background: transparent;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    color: #20c20e;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: transparent;
        border-color: #343434;
        scale: 1.1;
        font-size: 16px;
    }
`;

export const RedirectButton = styled.a`
    margin: auto 10px 10px 10px;
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #343434;
    background: transparent;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    color: #20c20e;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: transparent;
        border-color: #343434;
        scale: 1.1;
        font-size: 16px;
    }
`;

export const ButtonGreen = styled.button`
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #343434;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    font-size: ${({ fontBig }) => (fontBig ? "22px" : "18px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    color: #000000;
    background: #17f31e;

    &:hover {
        transition: all 0.2s ease-in-out;
        scale: 1.02;
        //box-shadow: 0 0 10px -5px rgb(23, 243, 30);
        //-webkit-box-shadow: 0 0 10px -5px rgb(23, 243, 30);
        //-moz-box-shadow: 0 0 10px -5px rgb(23, 243, 30);
        background: #17f31e;
        color: black;
        border-color: #343434;
        // font-size: 18px;
    }

    @media screen and (max-width: 600px) {
        padding: 10px 10px;
    }
`;

export const LoadingButton = styled.button`
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    width: 100%;
    border-color: #343434;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    color: #000000;
    background: #17f31e;
    box-shadow: 0 0 30px rgba(32, 194, 14, 0);
    animation: glowing 2s ease-in-out infinite;

    @keyframes glowing {
        0% {
            box-shadow: 0 0 30px rgba(32, 194, 14, 0);
        }
        50% {
            box-shadow: 0 0 60px 15px rgb(23, 243, 30);
        }
        100% {
            box-shadow: 0 0 30px rgba(32, 194, 14, 0);
        }
    }
    @media screen and (max-width: 600px) {
        padding: 10px 10px;
    }
`;

export const LoadingRedirectButton = styled(RouterLink)`
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    width: 100%;
    border-color: #343434;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    color: #000000;
    background: #17f31e;
    box-shadow: 0 0 30px rgba(32, 194, 14, 0);
    animation: glowing 2s ease-in-out infinite;

    @keyframes glowing {
        0% {
            box-shadow: 0 0 30px rgba(32, 194, 14, 0);
        }
        50% {
            box-shadow: 0 0 60px 15px rgb(23, 243, 30);
        }
        100% {
            box-shadow: 0 0 30px rgba(32, 194, 14, 0);
        }
    }
    @media screen and (max-width: 600px) {
        padding: 10px 10px;
    }
`;

export const RouterButtonGreen = styled(RouterLink)`
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #343434;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    color: #000000;
    background: #17f31e;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #17f31e;
        color: black;
        scale: 1.01;
        border-color: #343434;
        // font-size: 18px;
    }

    @media screen and (max-width: 600px) {
        padding: 10px 10px;
    }
`;
