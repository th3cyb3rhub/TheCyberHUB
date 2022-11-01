import React from "react";
import {
    FooterContainer,
    FooterWrap,
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinkItems,
    FooterLinkTitle,
    FooterRouterLink,
    FooterScrollLink,
    FooterRedirectLink,
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    WebsiteRights,
    SocialIcons,
    SocialIconLinkTwitter,
    SocialIconLinkGithub,
    SocialIconLinkDiscord,
    SocialIconLinkInstagram,
    FooterSocialLinksTwitter,
    FooterSocialLinksGithub,
    FooterSocialLinksDiscord,
    FooterSocialLinksLinktree,
} from "./FooterElements";

import { FaTwitter, FaGithub, FaInstagram, FaDiscord } from "react-icons/fa";

import { animateScroll as scroll } from "react-scroll";

const toggleHome = () => {
    scroll.scrollToTop();
};

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>About Us</FooterLinkTitle>
                            {[
                                { to: "about", title: "About" },
                                { to: "services", title: "Services" },
                                { to: "community", title: "Community" },
                                { to: "contribute", title: "Contribute" },
                            ].map(({ to, title }) => (
                                <FooterScrollLink
                                    key={to}
                                    to={to}
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact="true"
                                    offset={-80}
                                >
                                    {title}
                                </FooterScrollLink>
                            ))}
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>Contact Us</FooterLinkTitle>
                            <FooterRouterLink to="#">Contact</FooterRouterLink>
                            <FooterRouterLink to="#">Feedback</FooterRouterLink>
                            <FooterRouterLink to="#">Support (Discord)</FooterRouterLink>
                            <FooterRouterLink to="#">Sponsorships</FooterRouterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle> Social Media </FooterLinkTitle>
                            <FooterSocialLinksTwitter href="https://www.twitter.com/thecyberw0rld" target={"_blank"}>
                                {" "}
                                Twitter{" "}
                            </FooterSocialLinksTwitter>
                            <FooterSocialLinksGithub href="https://www.github.com/thecyberworld" target={"_blank"}>
                                {" "}
                                GitHub{" "}
                            </FooterSocialLinksGithub>
                            <FooterSocialLinksDiscord href="https://discord.gg/QHBPq6xP5p" target={"_blank"}>
                                {" "}
                                Discord{" "}
                            </FooterSocialLinksDiscord>
                            <FooterSocialLinksLinktree href="https://www.linktree.com/thecyberw0rld" target={"_blank"}>
                                {" "}
                                All Community Links{" "}
                            </FooterSocialLinksLinktree>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle> Free Courses </FooterLinkTitle>
                            <FooterRedirectLink href="https://www.youtube.com/c/thecyberworld" target={"_blank"}>
                                {" "}
                                Intro to Linux{" "}
                            </FooterRedirectLink>
                            <FooterRedirectLink href="https://www.youtube.com/c/thecyberworld" target={"_blank"}>
                                {" "}
                                Cyber Tools{" "}
                            </FooterRedirectLink>
                            <FooterRedirectLink href="https://www.youtube.com/c/thecyberworld" target={"_blank"}>
                                {" "}
                                Agency{" "}
                            </FooterRedirectLink>
                            <FooterRedirectLink href="https://www.youtube.com/c/thecyberworld" target={"_blank"}>
                                {" "}
                                Influence{" "}
                            </FooterRedirectLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle> Videos </FooterLinkTitle>
                            <FooterRouterLink to="#"> About Community </FooterRouterLink>
                            <FooterRouterLink to="#"> How to Join Community </FooterRouterLink>
                            <FooterRouterLink to="#"> How to Contribute to the Community </FooterRouterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to="/" onClick={toggleHome}>
                            Thecyberworld
                        </SocialLogo>
                        <WebsiteRights> © {new Date().getFullYear()} All rights reserved.</WebsiteRights>
                        <SocialIcons>
                            <SocialIconLinkTwitter
                                href="https://www.twitter.com/thecyberw0rld"
                                target="_blank"
                                aria-label="Twitter"
                            >
                                <FaTwitter />
                            </SocialIconLinkTwitter>
                            <SocialIconLinkGithub
                                href="https://www.github.com/thecyberworld"
                                target="_blank"
                                aria-label="Github"
                            >
                                <FaGithub />
                            </SocialIconLinkGithub>
                            <SocialIconLinkDiscord
                                href="https://discord.gg/QHBPq6xP5p"
                                target="_blank"
                                aria-label="Discord"
                            >
                                <FaDiscord />
                            </SocialIconLinkDiscord>
                            <SocialIconLinkInstagram
                                href="https://www.instagram.com/thecyberw0rld"
                                target="_blank"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </SocialIconLinkInstagram>
                        </SocialIcons>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    );
};

export default Footer;
