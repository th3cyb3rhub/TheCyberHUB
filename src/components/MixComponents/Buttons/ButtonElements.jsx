import styled from "styled-components";
import { Link as ScrollLink } from "react-scroll";
import { Link as LinkRouter, Link as RouterLink } from "react-router-dom";

export const PrimaryFilledButton = styled.button`
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    background: #20c20e;
    border-color: #20c20e;
    margin-right: 20px; //border-radius: 50px;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    font-size: ${({ fontBig }) => (fontBig ? "20px" : "14px")};
    font-weight: 600;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    color: black;
    width: ${({ width }) => width || "auto"};

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #20c20e;
        color: black;
        font-size: 15px;
    }
`;

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
export const GlowingButton = styled(LinkRouter)`
    text-decoration: none;
    border-radius: 2px;
    border: #343434 1px solid;
    background: transparent;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 30px" : "12px 25px")};
    //color: ${({ dark }) => (dark ? "#ffffff" : "#0e0e0e")};
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
        background: white;
        color: #000;
        border: 1px solid #20c20e;
        //scale: 1.1;
    }
`;

export const Button = styled(ScrollLink)`
    margin: 10px;
    margin-right: 20px; //border-radius: 50px;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #343434;
    background: transparent;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    //color: ${({ dark }) => (dark ? "#ffffff" : "#0e0e0e")};
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

    @media screen and (max-width: 600px) {
        margin: 10px;
    }
`;
export const RedirectButton = styled.a`
    margin-left: 15px;
    margin-top: 10px;
    margin-right: 20px; //border-radius: 50px;
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #343434;
    background: transparent;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "12px 30px" : "12px 20px")};
    //color: ${({ dark }) => (dark ? "#ffffff" : "#0e0e0e")};
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
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #343434;
    background: transparent;
    //margin-right: 20px; //border-radius: 50px;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    //color: ${({ dark }) => (dark ? "#ffffff" : "#0e0e0e")};
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

export const FilledButton = styled(RouterButton)`
    &:hover {
        transition: all 0.2s ease-in-out;
        scale: 1.1;
    }
`;

export const ButtonLink = styled.a`
    border-width: 1px;
    border-style: solid;
    border-color: #343434;
    background: transparent;
    margin-right: 20px;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    color: ${({ dark }) => (dark ? "#ffffff" : "#0e0e0e")};
    font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: transparent;
        color: #20c20e;
        border-color: #343434;
        scale: 1.1;
        font-size: 16px;
    }
`;

export const ButtonRouterLink = styled(RouterButton)`
    border-width: 1px;
    border-style: solid;
    border-color: #343434;
    background: transparent;
    margin-right: 20px;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    color: ${({ dark }) => (dark ? "#ffffff" : "#0e0e0e")};
    font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: transparent;
        color: #20c20e;
        border-color: #343434;
        font-size: 18px;
    }
`;

export const OpenSourceButton = styled(RouterLink)`
    text-decoration: none;
    margin: 10px;
    margin-right: 20px; //border-radius: 50px;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #343434;
    background: transparent;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    //color: ${({ dark }) => (dark ? "#ffffff" : "#0e0e0e")};
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
        box-shadow: 0px 0px 50px -5px rgba(32, 194, 14, 1);
        -webkit-box-shadow: 0px 0px 50px -5px rgba(32, 194, 14, 1);
        -moz-box-shadow: 0px 0px 50px -5px rgba(32, 194, 14, 1);
        background: #20c20e;
        color: black;
        border-color: #343434;
        // font-size: 18px;
    }

    @media screen and (max-width: 600px) {
        margin: 10px;
    }
`;
