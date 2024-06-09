import styled from "styled-components";

export const SponsorsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 100px;
`;

export const SponsorsH1 = styled.a`
    font-size: 1.6rem;
    font-weight: 600;
    color: #f5f5f5;
    margin: 0;

    @media screen and (width <= 1024px) {
        font-size: 1.3rem;
    }

    @media screen and (width <= 768px) {
        font-size: 1rem;
    }
`;

export const SponsorsH2 = styled.h2`
    color: #f5f5f5;
    font-size: 0.8rem;
    font-weight: 400;
`;

export const SponsorsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #000;
    width: 100%;
    max-width: 1400px;
    ${"" /* margin: 150px auto; */}
`;

export const SponsorsLayout = styled.div`
    width: 100%;
    padding: 50px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 5rem;
    overflow: hidden;
`;

export const SponsorsTopHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #101010;
    padding: 0.8rem 0;
    ${"" /* border-radius: 1rem 1rem 0 0 ; */}
`;
export const SponsorsFooterBar = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #101010;
    padding: 0.8rem 0;
    margin-top: 0.6rem;
    border-radius: 0 0 1rem 1rem;
    ${"" /* border-radius: 1rem 1rem 0 0 ; */}

    @media screen and (width <= 768px) {
        margin-top: 0.3rem;
    }
`;

export const SponsorsGrid1 = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
    grid-gap: 10px;
    margin: 10px 0;

    @media screen and (width <= 768px) {
        margin: 6px 0;
        grid-gap: 6px;
    }
`;

export const SponsorsGrid2 = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
    grid-gap: 10px;
    margin: 10px 0;

    @media screen and (width <= 768px) {
        margin: 6px 0;
        grid-gap: 6px;
    }
`;

export const SponsorsGrid3 = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 2fr;
    grid-gap: 10px;
    margin-top: 10px;

    @media screen and (width <= 834px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media screen and (width <= 768px) {
        margin-top: 6px;
        grid-gap: 6px;
    }

    @media screen and (width <= 510px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const SponsorsImg = styled.img`
    max-height: 2rem;
    max-width: 60%;
    filter: grayscale(100) invert(1);
`;

export const SponsorsGridCol = styled.div`
    width: 100%;
    grid-column: span 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #101010;

    &:hover {
        background: #f5f5f5;
    }

    &:hover a {
        color: #101010;
    }

    &:hover img {
        filter: grayscale(0) invert(0);
    }
`;

export const SponsorsGridColHidden = styled(SponsorsGridCol)`
    padding: 3rem 0;

    @media only screen and (width <= 834px) {
        display: none;
    }

    @media screen and (width <= 768px) {
        padding: 2rem 0;
    }
`;

export const SponsorsGridColHiddenSm = styled(SponsorsGridCol)`
    padding: 3rem 0;

    @media screen and (width <= 768px) {
        padding: 2rem 0;
    }

    @media only screen and (width <= 425px) {
        display: none;
    }
`;

export const SponsorsGridColLast = styled(SponsorsGridCol)`
    padding: 3rem 0;

    @media screen and (width <= 768px) {
        padding: 2rem 0;
    }
`;

export const SponsorsGridColTop = styled(SponsorsGridCol)`
    padding: 5rem 0;

    @media screen and (width <= 768px) {
        padding: 3rem 0;
    }
`;

export const SponsorButton = styled.a`
    border-radius: 50px;
    background: transparent;
    border: 2px solid #5e5959;
    color: #f5f5f5;
    white-space: nowrap;
    padding: 10px 22px;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #545454;
        color: #f5f5f5;
    }

    @media screen and (width <= 768px) {
        padding: 8px 16px;
        font-size: 14px;
    }
`;
