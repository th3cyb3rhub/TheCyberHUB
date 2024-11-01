import styled from "styled-components";

export const SocialWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: linear-gradient(to bottom, rgb(0 0 0 / 90%), rgb(0 0 0 / 95%));
    padding: 4rem 0;
`;

export const SocialsContainer = styled.div`
    width: 100%;
    max-width: 1400px;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SectionTitle = styled.h1`
    font-size: clamp(2rem, 5vw, 3.5rem);
    color: #f5f5f5;
    margin-bottom: 3rem;
    text-align: center;
    position: relative;
    font-weight: 700;
    letter-spacing: -1px;

    &::after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 4px;
        background: linear-gradient(to right, transparent, #ff6b08, transparent);
    }
`;

export const SocialsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    width: 100%;
    max-width: 1200px;
`;

export const SocialCard = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    border-radius: 12px;
    text-decoration: none;
    color: #f5f5f5;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    border: 1px solid rgb(255 255 255 / 10%);
    backdrop-filter: blur(10px);
    background: rgb(255 255 255 / 5%);

    svg {
        font-size: 3rem;
        transition: transform 0.3s ease;
        z-index: 2;
    }

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(45deg, rgb(0 0 0 / 10%), rgb(0 0 0 / 30%));
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1;
    }

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgb(0 0 0 / 20%);

        svg {
            transform: scale(1.1);
        }

        &::before {
            opacity: 1;
        }
    }
`;

export const SocialCardDiscord = styled(SocialCard)`
    &:hover {
        background: #5865f2;
        color: white;
    }
`;

export const SocialCardGithub = styled(SocialCard)`
    &:hover {
        background: #333;
        color: white;
    }
`;

export const SocialCardTwitter = styled(SocialCard)`
    &:hover {
        background: #1da1f2;
        color: white;
    }
`;

export const SocialCardYoutube = styled(SocialCard)`
    &:hover {
        background: #f00;
        color: white;
    }
`;

export const SocialCardTelegram = styled(SocialCard)`
    &:hover {
        background: #08c;
        color: white;
    }
`;

export const SocialCardInstagram = styled(SocialCard)`
    &:hover {
        background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        color: white;
    }
`;

export const SocialCardLinkedin = styled(SocialCard)`
    &:hover {
        background: #0a66c2;
        color: white;
    }
`;

export const SocialLabel = styled.span`
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    z-index: 2;
`;
