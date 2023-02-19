import styled from "styled-components";
import { Link as ScrollLink } from "react-scroll";
import { GoPrimitiveSquare } from "react-icons/all";

export const DotSymbol = styled(GoPrimitiveSquare)`
    color: #20c20e;
    margin-bottom: 4px;
    margin-right: 4px;
    font-size: 0.5rem;
    display: inline;
    justify-content: center;
    text-align: center;
`;

export const YouTubeVideoContainer = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
        margin-top: 100px;
    }
`;

export const YouTubeVideoIFrame = styled.iframe`
    width: 500px;
    height: 300px;

    @media screen and (max-width: 1000px) {
        width: 400px;
        height: 300px;
    }
    @media screen and (max-width: 900px) {
        width: 280px;
        height: 200px;
    }
    @media screen and (max-width: 760px) {
        width: 500px;
        height: 300px;
    }
    @media screen and (max-width: 600px) {
        width: 350px;
        height: 250px;
    }
    @media screen and (max-width: 400px) {
        width: 280px;
        height: 200px;
    }
`;

export const InfoContainer = styled.div`
    color: #fff;

    background: ${({ lightBg }) => (lightBg ? "#f9f9f9" : "#000000")};

    @media screen and (max-width: 768px) {
        padding: 100px 0;
    }
`;

export const InfoWrapper = styled.div`
    display: grid;
    z-index: 1;
    height: 800px;
    width: 100%;
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
    padding: 0 24px;
    justify-content: center;
    @media screen and (max-width: 768px) {
        height: 100%;
    }
`;

export const ScrollText = styled(ScrollLink)`
    margin: 10px 10px 10px 20px;
    cursor: pointer;
`;
export const InfoRow = styled.div`
    width: 100%;
    display: grid;
    grid-auto-columns: minmax(auto, 1 lf);
    align-items: center;
    grid-template-areas: ${({ imgStart }) => (imgStart ? `'col2 col1'` : `'col1 col2'`)};

    @media screen and (max-width: 768px) {
        grid-template-areas: ${({ imgStart }) => (imgStart ? `'col1' 'col2'` : `'col1 col1' 'col2 col2'`)};
    }
`;

export const Column1 = styled.div`
    grid-area: col1;
    display: flex;
    justify-content: space-between;
`;

export const Column2 = styled.div`
    padding: 0 15px;
    grid-area: col2;
`;

export const TextWrapper = styled.div`
    max-width: 600px;
    width: 100%;
`;

export const TopLine = styled.p`
    color: #20c20e;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    margin-bottom: 16px;
`;

export const Heading = styled.h1`
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    color: ${({ lightText }) => (lightText ? "#f7f8fa" : "#000000")};

    @media screen and (max-width: 480px) {
        font-size: 32px;
    }
`;

export const Subtitle = styled.div`
    //max-width: 440px;
    margin-bottom: 35px;
    font-size: 18px;
    line-height: 24px;
    color: ${({ darkText }) => (darkText ? "#000000" : "#fff")};
`;

export const BtnWrap = styled.div`
    display: flex;
    justify-content: flex-start;

    @media screen and (max-width: 600px) {
        display: grid;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
`;

export const ImgWrap = styled.div`
    @media screen and (max-width: 768px) {
        margin-top: 100px;
    }
`;

export const Img = styled.img`
    max-height: 400px;
`;
