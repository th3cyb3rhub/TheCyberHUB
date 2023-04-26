import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
    color: #fff;
    display: flex;
    flex-direction: row;
    gap: 25px;
    padding: 0px 50px 50px;

    @media screen and (max-width: 500px) {
        flex-direction: column;
    }
`;

export const NavigationLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    font-size: 1.5rem;

    @media screen and (max-width: 768px) {
        font-size: 1rem;
    }

    transition: all 0.2s ease-in-out;
    &:hover {
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        color: greenyellow;
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
`;

export const SecurityText = styled.p`
    font-size: 1.2rem;
    line-height: 1.5;
    max-width: 800px;
    text-align: start;
`;
