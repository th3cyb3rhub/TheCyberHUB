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
    SocialIcons,
    SocialLogo,
    SocialMedia,
    SocialMediaWrap,
    WebsiteRights,
} from "./FooterElements";

import { FaDiscord, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";

const SocialLinks = {
    github: "https://www.github.com/thecyberworld",
    instagram: "https://www.instagram.com/thecyberw0rld",
    twitter: "https://www.twitter.com/thecyberw0rld",
    discord: "https://discord.gg/QHBPq6xP5p",
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
                            <FooterRouterLink to="/blogs">Blogs</FooterRouterLink>
                            <FooterRouterLink to="/forums">Forum</FooterRouterLink>
                            <FooterRouterLink to="/space">Space</FooterRouterLink>
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
                            <SocialIconLinkTwitter href={SocialLinks.twitter} target="_blank" aria-label="Twitter">
                                <FaTwitter />
                            </SocialIconLinkTwitter>
                            <SocialIconLinkGithub href={SocialLinks.github} target="_blank" aria-label="Github">
                                <FaGithub />
                            </SocialIconLinkGithub>
                            <SocialIconLinkDiscord href={SocialLinks.discord} target="_blank" aria-label="Discord">
                                <FaDiscord />
                            </SocialIconLinkDiscord>
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
