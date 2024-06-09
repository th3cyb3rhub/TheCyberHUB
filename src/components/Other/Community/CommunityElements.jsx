import styled from "styled-components";
import { getCdnAssets } from "src/features/apiUrl";
import { FaDiscord } from "react-icons/fa";
const bgImage = `${getCdnAssets}/images/WebsiteLogo/thecyberworld-green01.png`;

export const CommunitySection = styled.section`
    color: white;
    margin: 150px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (width <= 768px) {
        margin: 100px 0;
    }
`;

export const CommunityContainer = styled.div`
    max-width: 1400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 25px;
`;

export const CommunityHeading = styled.h2`
    font-size: 2rem;
    margin: 0.5rem 0;
    text-align: center;

    @media screen and (width <= 768px) {
        font-size: 1.5rem;
        margin: 0.5rem 0 1rem;
    }
`;

export const CommunityParagraph = styled.p`
    font-size: 1.2rem;
    font-weight: 300;
    margin: 0.5rem 0 2rem;
    text-align: center;
    max-width: 1100px;
`;

export const DiscordLink = styled.a`
    text-decoration: none;

    &:hover {
        transform: scale(1.1);
        transition: all 0.3s ease-in-out;
    }
`;

export const DiscordButtonIcon = styled(FaDiscord)`
    color: #5865f2;
    font-size: 45px;
    margin: 0 10px;
`;

export const DiscordButton = styled.button`
    background-color: #151515;
    border: 1px solid #1f1f1f;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding: 0.5rem;

    & > span {
        margin: 0 10px;
        font-size: 18px;
        color: #dadada;
    }
`;

export const Header = styled.header`
    color: #cecac3;
    background: url(${bgImage}) no-repeat;
    background-size: 20%;
    background-position: 50% 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 25px;
`;

export const Overlay = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: #000;
    opacity: 0.9;
`;

export const Container = styled.div`
    margin: 200px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    max-width: 1400px;

    & > a {
        text-decoration: none;
    }
`;

export const Heading = styled.h1`
    color: white;
    font-size: 3rem;
    font-weight: 300;
    margin: 0.5rem 0;
    text-align: center;

    @media screen and (width <= 800px) {
        text-align: start;
        font-size: 2rem;
    }
`;

export const Paragraph = styled.p`
    font-size: 1.2rem;
    font-weight: 300;
    margin: 0.5rem 0 2rem;
    text-align: center;
    max-width: 1100px;

    @media screen and (width <= 800px) {
        font-size: 1rem;
        text-align: justify;
        text-justify: inter-word;
    }
`;

// export const DiscordLink = styled.a`
//     @media screen and (max-width: 500px) {
//         width: 100%;
//     }
//
//     &:hover {
//         transform: scale(1.1);
//         transition: all 0.3s ease-in-out;
//     }
// `;

// export const DiscordButton = styled(FaDiscord)`
//     color: #5865f2;
//     font-size: 45px;
//     margin: 0 10px;
// `;

export const Button = styled.button`
    background-color: #151515;
    border: 1px solid #1f1f1f;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    width: 100%;

    /* font-family: "Roboto Mono", monospace; */
    font-family: Poppins, sans-serif;

    & > span {
        margin: 0 10px;
        font-size: 18px;
        color: #dadada;

        @media screen and (width <= 480px) {
            font-size: 18px;
            margin: 0 10px 0 0;
        }
    }
`;
