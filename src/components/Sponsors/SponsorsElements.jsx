import styled from "styled-components";

export const SponsorsContainer = styled.div`
    padding: 10px 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    margin: 150px auto;

    @media screen and (max-width: 768px) {
        margin: 100px auto;
    }
`;

export const SponsorsH1 = styled.h1`
    font-family: "Roboto Mono", monospace;
    text-align: center;
    margin: 0 auto 50px auto;

    @media screen and (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

export const SponsorsP = styled.p`
    font-family: "Roboto Mono", monospace;
    text-align: center;
    margin: 0 auto 50px auto;
`;

export const SponsorsLink = styled.a`
    border: #4cc23e 1px solid;
    font-family: "Roboto Mono", monospace;
    display: flex;
    justify-content: center;
    flex-direction: column;

    align-items: center;
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    cursor: none;

    &:hover {
        color: #c7c7c7;
        text-decoration: none;
    }
`;

export const BuyMeACoffeeImage = styled.img`
    margin: 50px auto;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
        transition: all 0.3s ease-in-out;
    }

    @media screen and (max-width: 768px) {
        margin: 0;
    }
`;
