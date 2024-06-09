import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

export const FooterContainer = styled.footer`
    border-top: #2a2a2a solid 1px;
    background: #030303;
    margin-top: auto;
    width: 100%;
    padding: 100px;

    @media screen and (width <= 600px) {
        padding: 24px;
    }
`;

export const FooterWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    max-width: 1500px;
    margin: 0 auto;
`;

export const FooterLinksContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;

    @media screen and (width <= 820px) {
        padding-top: 32px;
    }
`;

export const FooterLinksWrapper = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: 1fr;
    grid-gap: 25px;
    width: 100%;
    border-radius: 5px;
    font-size: 0.8rem;
    transition: all 0.3s ease-in-out;
`;

export const FooterLinkItems = styled.li`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    box-sizing: border-box;
    color: #f5f5f5;
    transition: all 0.3s ease-in-out;

    @media screen and (width <= 420px) {
        transition: all 0.3s ease-in-out;
        margin: 0;
        padding: 10px;
        width: 100%;
    }
`;

export const FooterLinkTitle = styled.h1`
    font-size: 20px;
    margin-bottom: 10px;
`;

export const FooterRouterLink = styled(RouterLink)`
    color: #f5f5f5;
    text-decoration: none;
    font-size: 15px;

    &:hover {
        color: #ff6b08;
        transition: 0.3s ease-out;
    }
`;

export const FooterScrollLink = styled(ScrollLink)`
    color: #f5f5f5;
    text-decoration: none;
    font-size: 15px;
    cursor: pointer;

    &:hover {
        color: #ff6b08;

        /* scale: 1.1; */
        transition: 0.3s ease-out;
    }
`;

export const FooterRedirectLink = styled.a`
    color: #f5f5f5;
    text-decoration: none;
    font-size: 15px;

    &:hover {
        color: #ff6b08;
        transition: 0.3s ease-out;
    }
`;

export const FooterSocialLinks = styled.a`
    color: #f5f5f5;
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 14px;

    &:hover {
        color: #ff6b08;
        transition: 0.3s ease-out;
    }
`;

export const SocialMedia = styled.div`
    max-width: 1500px;
    width: 100%;
    color: #f5f5f5;
    margin: 50px 0 0;
`;

export const SocialMediaWrap = styled.div`
    padding: 25px 50px;
    border: #181818 solid 1px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    gap: 25px;
    align-items: center;

    @media screen and (width <= 1000px) {
        flex-direction: column;
    }
`;

export const WebsiteRights = styled.small`
    color: #f5f5f5;
`;

export const SocialIcons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 240px;
`;

export const SocialIconLink = styled.a`
    color: #f5f5f5;
    font-size: 24px;

    &:hover {
        color: #ff6b08;
        transition: 0.3s ease-out;
    }
`;

export const FooterSocialLinksTwitter = styled.a`
    color: #f5f5f5;
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 15px;

    &:hover {
        color: #1d9bf0;
        scale: 1.2;
        transition: 0.3s ease-out;
    }
`;
export const FooterSocialLinksGithub = styled.a`
    color: #f5f5f5;
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 14px;

    &:hover {
        color: #afafaf;
        scale: 1.2;
        transition: 0.3s ease-out;
    }
`;
export const FooterSocialLinksDiscord = styled.a`
    color: #f5f5f5;
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 14px;

    &:hover {
        color: #5865f2;
        scale: 1.2;
        transition: 0.3s ease-out;
    }
`;
export const FooterSocialLinksLinktree = styled.a`
    color: #f5f5f5;
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 14px;

    &:hover {
        color: #ff6b08;
        scale: 1.2;
        transition: 0.3s ease-out;
    }
`;

export const SocialIconLinkTwitter = styled.a`
    color: #f5f5f5;
    font-size: 24px;

    &:hover {
        color: #1d9bf0;
        transition: 0.3s ease-out;
        scale: 1.2;
    }
`;

export const SocialIconLinkGithub = styled.a`
    color: #f5f5f5;
    font-size: 24px;

    &:hover {
        color: #f0f6fc;
        transition: 0.3s ease-out;
        scale: 1.2;
    }
`;

export const SocialIconLinkYoutube = styled.a`
    color: #f5f5f5;
    font-size: 24px;

    &:hover {
        color: #f00;
        transition: 0.3s ease-out;
        scale: 1.2;
    }
`;

export const SocialIconLinkDiscord = styled.a`
    color: #f5f5f5;
    font-size: 24px;

    &:hover {
        color: #5865f2;
        transition: 0.3s ease-out;
        scale: 1.2;
    }
`;
export const SocialIconLinkInstagram = styled.a`
    color: #f5f5f5;
    font-size: 24px;

    &:hover {
        color: #b83993;
        transition: 0.3s ease-out;
        scale: 1.2;
    }
`;

export const SocialLogo = styled(RouterLink)`
    color: #f5f5f5;
    justify-self: start;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    font-weight: bold;

    &:hover {
        color: #ff6b08;
        scale: 1.2;
        transition: 0.3s ease-out;
    }
`;
