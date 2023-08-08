import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
    color: #fff;
    display: flex;
    flex-direction: row;
    gap: 25px;
    padding: 0px 50px 50px;

    @media screen and (max-width: 600px) {
        flex-direction: column;
        background: #090909;
        width: 100%;
        padding: 25px;
    }
`;

export const NavigationLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    font-size: 1.5rem;

    transition: all 0.2s ease-in-out;

    &:hover {
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        color: #00b2ff;
        scale: 1.05;
    }

    @media screen and (max-width: 768px) {
        font-size: 1rem;
    }

    @media screen and (max-width: 600px) {
        &:hover {
            transform: translateX(10px);
        }
    }
`;

export const SecurityContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1500px;
    gap: 25px;
`;

export const SecurityContentSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    gap: 25px;
`;

export const SecurityContentList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 50px;
    gap: 25px;
    background: #090909;

    @media screen and (max-width: 500px) {
        font-size: 1.5rem;
        padding: 25px;
    }
`;

export const SecurityHeading = styled.h1`
    font-size: 3rem;
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: 15px;
`;

export const SecuritySubheading = styled.h2`
    font-size: 2rem;
    align-items: center;
    text-align: start;
    white-space: pre-line;

    @media screen and (max-width: 780px) {
        font-size: 1.5rem;
    }
    @media screen and (max-width: 500px) {
        font-size: 1.3rem;
    }
`;

export const SecurityText = styled.p`
    font-size: 1.2rem;
    line-height: 1.5;
    max-width: 800px;
    text-align: start;

    @media screen and (max-width: 500px) {
        font-size: 1rem;
    }
`;
