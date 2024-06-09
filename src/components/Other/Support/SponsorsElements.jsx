import styled from "styled-components";
import { BsSquareFill } from "react-icons/bs";

export const SponsorsContainer = styled.div`
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    color: #fff;
`;

export const SponsorsH1 = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
    font-family: "Roboto Mono", monospace;
    margin: 25px;
    font-size: 25px;
    font-weight: bold;

    @media screen and (width <= 720px) {
        flex-direction: column;
        margin: 0 0 15px;
    }
`;

export const TextGreenBG = styled.p`
    color: #ff6b08;
    margin: 0 15px;

    @media screen and (width <= 450px) {
        margin: 0;
        font-size: 23px;
    }
`;

export const SponsorsDescriptionContainer = styled.div`
    padding: 25px;
    background: #0a0a0a;
    display: flex;
    flex-direction: column;
`;

export const SponsorsDescription = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const DotSymbol = styled(BsSquareFill)`
    color: #ff6b08;
    font-size: 5px;
    display: inline;
    justify-content: center;
    text-align: center;
    margin-top: 23px;
    margin-right: 10px;
`;
export const SponsorsP = styled.p`
    margin: 10px;
    width: 100%;
    font-family: Poppins, sans-serif;
    text-align: left;
    font-size: 17px;
`;

export const SponsorsLink = styled.a`
    width: 100%;
    margin: 25px 0;
    font-family: "Roboto Mono", monospace;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: #fff;
    text-decoration: none;
    text-align: center;
    cursor: auto;

    &:hover {
        color: #c7c7c7;
        text-decoration: none;
    }
`;

export const BuyMeACoffeeImage = styled.img`
    cursor: pointer;
    color: #ff6b08;
    background: #ff6b08;
    border-radius: 5px;
    font-size: 12px;
    word-break: break-all;

    @media screen and (width <= 768px) {
        margin: 0;
    }
`;
