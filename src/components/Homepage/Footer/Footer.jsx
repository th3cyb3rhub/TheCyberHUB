import React from "react";
import {
    FooterContainer,
    FooterLinkItems,
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinkTitle,
    FooterRedirectLink,
    FooterRouterLink,
    FooterScrollLink,
    // FooterSocialLinksDiscord,
    // FooterSocialLinksGithub,
    // FooterSocialLinksLinktree,
    // FooterSocialLinksTwitter,
    FooterWrap,
    SocialIconLinkDiscord,
    SocialIconLinkGithub,
    SocialIconLinkInstagram,
    SocialIconLinkTwitter,
    SocialIconLinkYoutube,
    SocialIcons,
    SocialLogo,
    SocialMedia,
    SocialMediaWrap,
    WebsiteRights,
} from "./FooterElements";

import { FaDiscord, FaGithub, FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import { animateScroll as scroll } from "react-scroll";

const SocialLinks = {
    github: "https://www.github.com/thecyberworld",
    instagram: "https://www.instagram.com/thecyberw0rld",
    twitter: "https://www.twitter.com/thecyberw0rld",
    threads: "https://www.threads.net/thecyberw0rld",
    discord: "https://discord.gg/QHBPq6xP5p",
    telegram: "https://t.me/thecyberw0rld",
    linktree: "https://linktr.ee/thecyberworld",
    youtube: "https://www.youtube.com/c/thecyberworld",
};

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
                                    href={`/${to}`}
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
                            <FooterRouterLink to={"terms-conditions"}>Terms & Conditions</FooterRouterLink>
                            <FooterRouterLink to={"privacy-policy"}>Privacy Policy</FooterRouterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>Community</FooterLinkTitle>
                            <FooterRouterLink to="/explore">Explore</FooterRouterLink>
                            <FooterRouterLink to="/feeds">Feeds</FooterRouterLink>
                            <FooterRouterLink to="/blogs">Blogs</FooterRouterLink>
                            <FooterRouterLink to="/ctf">CTF</FooterRouterLink>
                        </FooterLinkItems>

                        <FooterLinkItems>
                            <FooterLinkTitle>Opportunities</FooterLinkTitle>
                            <FooterRouterLink to="/internship">Internships</FooterRouterLink>
                            <FooterRouterLink to="/volunteer">Volunteer</FooterRouterLink>
                            <FooterRouterLink to="/opensec-projects ">OpenSec Projects</FooterRouterLink>
                            <FooterRouterLink to="/thecyberxcel">TheCyberXcel</FooterRouterLink>
                            <FooterRouterLink to="/thecyberspeak">TheCyberSpeak</FooterRouterLink>
                        </FooterLinkItems>

                        <FooterLinkItems>
                            <FooterLinkTitle>Community</FooterLinkTitle>
                            <FooterRouterLink to="/contact">Contact</FooterRouterLink>
                            <FooterRouterLink to="/contact">Feedback</FooterRouterLink>
                            <FooterRouterLink to="/community">Community</FooterRouterLink>
                            <FooterRouterLink to="/support">Support</FooterRouterLink>
                        </FooterLinkItems>

                        <FooterLinkItems>
                            <FooterLinkTitle> Videos </FooterLinkTitle>
                            <FooterRedirectLink href={SocialLinks.youtube} target={"_blank"}>
                                About Community
                            </FooterRedirectLink>
                            <FooterRedirectLink href={SocialLinks.youtube} target={"_blank"}>
                                How to Join Community
                            </FooterRedirectLink>
                            <FooterRedirectLink href={SocialLinks.youtube} target={"_blank"}>
                                How to Contribute to the Community
                            </FooterRedirectLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>Security</FooterLinkTitle>
                            <FooterRouterLink to="/security"> Security </FooterRouterLink>
                            <FooterRouterLink to="/security/rules-of-engagement">Rules of Engagement</FooterRouterLink>
                            <FooterRouterLink to="/security/hall-of-fame"> Hall of Fame </FooterRouterLink>
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
                            <SocialIconLinkYoutube href={SocialLinks.youtube} target="_blank" aria-label="YouTube">
                                <FaYoutube />
                            </SocialIconLinkYoutube>
                            <SocialIconLinkDiscord href={SocialLinks.discord} target="_blank" aria-label="Discord">
                                <FaDiscord />
                            </SocialIconLinkDiscord>
                            <SocialIconLinkTwitter href={SocialLinks.telegram} target="_blank" aria-label="Telegram">
                                <FaTelegram />
                            </SocialIconLinkTwitter>
                            <SocialIconLinkGithub href={SocialLinks.github} target="_blank" aria-label="Github">
                                <FaGithub />
                            </SocialIconLinkGithub>
                            <SocialIconLinkTwitter href={SocialLinks.twitter} target="_blank" aria-label="Twitter">
                                <FaXTwitter />
                            </SocialIconLinkTwitter>
                            <SocialIconLinkInstagram href={SocialLinks.threads} target="_blank" aria-label="Twitter">
                                <FaThreads />
                            </SocialIconLinkInstagram>
                            <SocialIconLinkInstagram
                                href={SocialLinks.instagram}
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
