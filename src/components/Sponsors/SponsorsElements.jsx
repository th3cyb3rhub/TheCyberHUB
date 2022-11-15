import styled from "styled-components";

export const SponsorsContainer = styled.div`
    padding: 10px 20px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    margin-top: 150px;
`;

export const BuyMeACoffeeImage = styled.img`
    margin: 50px auto;
`;

export const SponsorsH1 = styled.h1`
    font-family: "Roboto Mono", monospace;

    text-align: center;
    margin: 0 auto 50px auto;
`;

export const SponsorsP = styled.p`
    font-family: "Roboto Mono", monospace;
    text-align: center;
    margin: 0 auto 50px auto;
`;

export const SponsorsLink = styled.a`
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

    &:hover {
        color: #c7c7c7;
        text-decoration: none;
    }
`;
