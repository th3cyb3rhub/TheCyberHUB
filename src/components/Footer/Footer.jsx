import React from 'react';
import {
    FooterContainer,
    FooterWrap,
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink,
    FooterLink2,
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    WebsiteRights,
    SocialIcons,
    SocialIconLink,
} from './FooterElements';

import {
    FaTwitter,
    FaGithub,
    FaInstagram,
    FaDiscord,
} from 'react-icons/fa';

import {animateScroll as scroll} from "react-scroll";

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
                                {to: 'about', title: 'About',},
                                {to: 'services', title: 'Services',},
                                {to: 'community', title: 'Community',},
                                {to: 'contribute', title: 'Contribute',},
                            ].map(({to, title}) => (
                                <FooterLink2
                                    to={to}
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact="true"
                                    offset={-80}
                                >
                                    {title}
                                </FooterLink2>
                            ))}
                    </FooterLinkItems>
                    <FooterLinkItems>
                        <FooterLinkTitle> Free Courses </FooterLinkTitle>
                        <FooterLink to="/signIn"> Intro to Linux </FooterLink>
                        <FooterLink to="/signIn"> Cyber Tools </FooterLink>
                        <FooterLink to="/signIn"> Agency </FooterLink>
                        <FooterLink to="/signIn"> Influence </FooterLink>
                    </FooterLinkItems>
                    <FooterLinkItems>
                        <FooterLinkTitle> Videos </FooterLinkTitle>
                        <FooterLink to="/signIn"> About Community </FooterLink>
                        <FooterLink to="/signIn"> How to Join Community </FooterLink>
                        <FooterLink to="/signIn"> How to Contribute to the Community </FooterLink>
                    </FooterLinkItems>

                </FooterLinksWrapper>
                <FooterLinksWrapper>
                    <FooterLinkItems>
                        <FooterLinkTitle> Social Media </FooterLinkTitle>
                        <FooterLink to="/signIn"> Twitter </FooterLink>
                        <FooterLink to="/signIn"> GitHub </FooterLink>
                        <FooterLink to="/signIn"> Discord </FooterLink>
                        <FooterLink to="/signIn"> All Community Links </FooterLink>
                    </FooterLinkItems>
                    <FooterLinkItems>
                        <FooterLinkTitle>Contact Us</FooterLinkTitle>
                        <FooterLink to="/signIn">Contact</FooterLink>
                        <FooterLink to="/signIn">Support</FooterLink>
                        <FooterLink to="/signIn">Destination</FooterLink>
                        <FooterLink to="/signIn">Sponsorships</FooterLink>
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
                        <SocialIconLink href="/" target="_blank" aria-label="Twitter">
                            <FaTwitter/>
                        </SocialIconLink>
                        <SocialIconLink href="/" target="_blank" aria-label="Discord">
                            <FaDiscord/>
                        </SocialIconLink>
                        <SocialIconLink href="/" target="_blank" aria-label="Github">
                            <FaGithub/>
                        </SocialIconLink>
                        <SocialIconLink href="/" target="_blank" aria-label="Instagram">
                            <FaInstagram/>
                        </SocialIconLink>
                    </SocialIcons>
                </SocialMediaWrap>
            </SocialMedia>
        </FooterWrap>
</FooterContainer>
)
    ;
};

export default Footer;
