import styled from "styled-components";
import { Link as ScrollLink } from "react-scroll";
import { BsSquareFill } from "react-icons/bs";

// Dot symbol for icons
export const DotSymbol = styled(BsSquareFill)`
    color: #ff6b08;
    margin-bottom: 4px;
    margin-right: 8px;
    font-size: 0.5rem;
    display: inline-flex;
    align-items: center;
`;

// Container for YouTube video
export const YouTubeVideoContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background: rgb(255 107 8 / 3%);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgb(0 0 0 / 10%);
    margin: 2rem 0;

    @media (width <= 768px) {
        padding: 1rem;
    }
`;

// YouTube video iframe styling
export const YouTubeVideoIFrame = styled.iframe`
    width: 100%;
    max-width: 560px;
    aspect-ratio: 16/9;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgb(0 0 0 / 20%);
    border: 1px solid rgb(255 107 8 / 10%);

    @media (width <= 768px) {
        max-width: 100%;
    }
`;

// General info container
export const InfoContainer = styled.div`
    color: #f5f5f5;
    background: ${({ lightBg }) => (lightBg ? "rgba(249, 249, 249, 0.02)" : "#0a0a0a")};
    padding: 5rem 0;
    position: relative;
    overflow: hidden;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgb(255 107 8 / 20%), transparent);
    }
`;

// Wrapper for info content
export const InfoWrapper = styled.div`
    display: grid;
    z-index: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    gap: 2rem;

    @media (width <= 768px) {
        padding: 0 16px;
    }
`;

// Scroll link button style
export const ScrollText = styled(ScrollLink)`
    margin: 10px;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 6px;
    transition: all 0.2s ease-in-out;
    background: rgb(255 107 8 / 5%);
    color: #f5f5f5;
    font-weight: 500;

    &:hover {
        background: rgb(255 107 8 / 10%);
        transform: translateY(-2px);
    }
`;

// Info row for layout
export const InfoRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
    grid-template-areas: ${({ $imgStart }) => ($imgStart ? `'col2 col1'` : `'col1 col2'`)};

    @media (width <= 968px) {
        grid-template-columns: 1fr;
        grid-template-areas: "col1" "col2";
        gap: 2rem;
    }
`;

// Column 1 layout
export const Column1 = styled.div`
    grid-area: col1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

// Column 2 layout
export const Column2 = styled.div`
    grid-area: col2;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// Text wrapper for structured content
export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 600px;
`;

// Top line styling
export const TopLine = styled.p`
    color: #ff6b08;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    position: relative;
    display: inline-block;
    padding-bottom: 8px;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 2rem;
        height: 2px;
        background: #ff6b08;
    }
`;

// Heading styling
export const Heading = styled.h1`
    font-size: clamp(2rem, 5vw, 3.3rem);
    line-height: 1.2;
    font-weight: 700;
    color: ${({ $lightText }) => ($lightText ? "#f5f5f5" : "#000000")};
    letter-spacing: -0.5px;

    span {
        color: #ff6b08;
    }
`;

// Subtitle styling
export const Subtitle = styled.div`
    font-size: 1.125rem;
    line-height: 1.6;
    color: ${({ $darkText }) => ($darkText ? "#000000" : "rgba(245, 245, 245, 0.8)")};
    max-width: 540px;
`;

// Button wrapper
export const BtnWrap = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    @media (width <= 600px) {
        justify-content: center;
    }
`;

// Image wrapper styling
export const ImgWrap = styled.div`
    width: 100%;
    max-width: 500px;
    height: auto;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        inset: 10px -10px -10px 10px;
        border: 1px solid rgb(255 107 8 / 20%);
        border-radius: 12px;
        z-index: -1;
    }
`;

// Image styling
export const Img = styled.img`
    width: 100%;
    height: auto;
    max-height: 500px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgb(0 0 0 / 15%);
    border: 1px solid rgb(255 107 8 / 10%);
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.02);
    }
`;

export const FloatingImage = styled.img`
    width: 100%;
    height: auto;
    max-height: 500px;
    border-radius: 5px;
    position: relative;
    animation: logo-animation 1s ease-in-out infinite alternate;
    box-shadow: 0 8px 32px rgb(0 0 0 / 15%);
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.02);
    }

    @media screen and (width <= 400px) {
        width: 100%;
        height: 100%;
    }

    @keyframes logo-animation {
        0% {
            transform: translateY(0);
        }

        100% {
            transform: translateY(-10px);
        }
    }
`;
