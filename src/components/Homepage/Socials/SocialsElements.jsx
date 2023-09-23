import styled from "styled-components";

export const SocialWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const SocialsCard = styled.a`
    color: white;
    background: #131313;
    padding: 50px;

    font-size: 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    transition: all 0.2s ease-in-out;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    gap: 10px;

    &:hover {
        transform: scale(1.05);
        transition: all 0.2s ease-in-out;
    }
`;

export const SocialCardDiscord = styled(SocialsCard)`
    &:hover {
        background: #5865f2;
    }
`;

export const SocialCardGithub = styled(SocialsCard)`
    &:hover {
        background: #969696;
        color: #1e1e1e;
    }
`;

export const SocialCardTwitter = styled(SocialsCard)`
    &:hover {
        background: #1d9bf0;
    }
`;

export const SocialCardYoutube = styled(SocialsCard)`
    &:hover {
        background: #ff0000;
    }
`;

export const SocialCardTelegram = styled(SocialsCard)`
    &:hover {
        background: #1d9bf0;
    }
`;

export const SocialCardInstagram = styled(SocialsCard)`
    &:hover {
        background: #b83993;
    }
`;

export const SocialCardLinkedin = styled(SocialsCard)`
    &:hover {
        background: #1d9bf0;
    }
`;

export const SocialCardFacebook = styled(SocialsCard)`
    &:hover {
        background: #1d9bf0;
    }
`;
export const SocialH1 = styled.h1`
    font-size: 2rem;
`;

export const SocialsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #000000;
    width: 100%;
    max-width: 1400px;
    margin: 150px auto;
`;

export const SocialsWrapper = styled.div`
    width: 100%;
    padding: 50px;

    font-size: 20px;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: 1fr;
    grid-gap: 25px;
    border-radius: 5px;

    @media screen and (max-width: 780px) {
        padding: 25px;

        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-auto-rows: 1fr;
        grid-gap: 25px;
        width: 100%;
        border-radius: 5px;
    }
`;

export const SocialsH1 = styled.h1`
    font-size: 50px;
    color: #fff;
    margin-bottom: 64px;

    &:hover {
        color: #ff6b08;
        transition: all 0.2s ease-in-out;
        font-size: 55px;
        margin-bottom: 57px;
    }

    @media screen and (max-width: 480px) {
        font-size: 2rem;
    }
`;
