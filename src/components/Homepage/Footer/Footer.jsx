import React from "react";

import { Link } from "react-router-dom";
// import { Link as ScrollLink } from "react-scroll";
import styled, { keyframes } from "styled-components";
import { animateScroll as scroll } from "react-scroll";
import {
    FaDiscord,
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaTelegram,
    FaYoutube,
    FaHeart,
    FaShieldAlt,
    FaUsers,
    FaCode,
    FaBook,
    // FaComments
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Social media links
const SocialLinks = {
    github: "https://www.github.com/th3cyb3rhub",
    instagram: "https://www.instagram.com/th3cyb3rhub",
    twitter: "https://www.twitter.com/th3cyb3rhub",
    discord: "https://discord.com/invite/thecyberhub-799183504759324672",
    telegram: "https://t.me/th3cyb3rhub",
    linktree: "https://linktr.ee/th3cyb3rhub",
    youtube: "https://www.youtube.com/@th3cyb3rhub",
    linkedin: "https://linkedin.com/company/th3cyb3rhub",
};

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled components
const FooterSection = styled.footer`
    background: #050505;
    color: #f5f5f5;
    position: relative;
    overflow: hidden;
    animation: ${fadeIn} 0.8s ease-out;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgb(255 106 0 / 50%), transparent);
    }
`;

const FooterPattern = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 25% 25%, rgb(255 106 0 / 3%) 1px, transparent 1px),
        radial-gradient(circle at 75% 75%, rgb(255 106 0 / 3%) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.4;
    z-index: 0;
`;

const FooterContainer = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 80px 20px 40px;
    position: relative;
    z-index: 1;

    @media (width <= 768px) {
        padding: 60px 20px 30px;
    }
`;

const FooterContent = styled.div`
    display: grid;
    grid-template-columns: 35% 65%;
    gap: 4rem;
    margin-bottom: 3rem;

    @media (width <= 992px) {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
`;

const FooterBrand = styled.div`
    display: flex;
    flex-direction: column;
`;

const FooterLogo = styled(Link)`
    color: #fff;
    text-decoration: none;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span {
        background: linear-gradient(90deg, #fff, #ff6a00);
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

const FooterDescription = styled.p`
    color: rgb(255 255 255 / 70%);
    line-height: 1.7;
    margin-bottom: 2rem;
    max-width: 400px;
    font-size: 1rem;
`;

const SubscribeForm = styled.form`
    display: flex;
    margin-bottom: 2rem;

    @media (width <= 576px) {
        flex-direction: column;
        gap: 0.5rem;
    }
`;

const SubscribeInput = styled.input`
    flex: 1;
    padding: 12px 15px;
    border-radius: 50px 0 0 50px;
    border: 1px solid rgb(255 106 0 / 30%);
    background: rgb(30 30 30 / 30%);
    color: #fff;
    font-size: 0.9rem;

    &:focus {
        outline: none;
        border-color: #ff6a00;
    }

    @media (width <= 576px) {
        border-radius: 50px;
    }
`;

const SubscribeButton = styled.button`
    padding: 12px 20px;
    border-radius: 0 50px 50px 0;
    border: none;
    background: linear-gradient(90deg, #ff6a00, #ee0979);
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: translateX(2px);
    }

    @media (width <= 576px) {
        border-radius: 50px;
        margin-top: 8px;
    }
`;

const SocialSection = styled.div`
    margin-top: 2rem;
`;

const SocialTitle = styled.h4`
    color: #fff;
    font-size: 1.1rem;
    margin-bottom: 1rem;
    font-weight: 600;
`;

const SocialGrid = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
`;

const SocialIcon = styled.a`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.2rem;
    background: rgb(255 255 255 / 10%);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        background: ${(props) => props.bgColor || "#ff6a00"};
        color: #fff;
    }
`;

const FooterLinksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;

    @media (width <= 992px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (width <= 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (width <= 480px) {
        grid-template-columns: 1fr;
    }
`;

const FooterLinksColumn = styled.div`
    /* padding: 1rem; */
`;

const FooterLinksTitle = styled.h4`
    color: #fff;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    position: relative;
    padding-left: 1.5rem;

    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
        height: 6px;
        background: #ff6a00;
        border-radius: 50%;
    }

    svg {
        margin-right: 0.5rem;
        font-size: 1rem;
        color: #ff6a00;
    }
`;

const FooterLinksList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const FooterLinkItem = styled.li`
    margin-bottom: 0.7rem;
`;

const FooterLink = styled(Link)`
    color: rgb(255 255 255 / 70%);
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;

    &:hover {
        color: #ff6a00;
        transform: translateX(3px);
    }

    &::before {
        content: "›";
        margin-right: 5px;
        font-size: 1.2rem;
        font-weight: bold;
        line-height: 0;
        transition: all 0.2s ease;
    }

    &:hover&::before {
        color: #ff6a00;
        margin-right: 8px;
    }
`;

const ScrollToTopButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ff6a00;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 5px 15px rgb(0 0 0 / 10%);
    border: none;
    cursor: pointer;
    z-index: 99;
    transition: all 0.3s ease;
    opacity: ${(props) => (props.visible ? 1 : 0)};
    transform: ${(props) => (props.visible ? "scale(1)" : "scale(0.8)")};
    pointer-events: ${(props) => (props.visible ? "all" : "none")};

    &:hover {
        background: #e05e00;
        transform: translateY(-3px) scale(1.1);
    }
`;

const FooterBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
    border-top: 1px solid rgb(255 255 255 / 10%);
    flex-wrap: wrap;
    gap: 1rem;

    @media (width <= 768px) {
        flex-direction: column;
        text-align: center;
    }
`;

const FooterCopyright = styled.p`
    color: rgb(255 255 255 / 60%);
    font-size: 0.9rem;

    a {
        color: #ff6a00;
        text-decoration: none;
        transition: color 0.2s ease;

        &:hover {
            color: #e05e00;
            text-decoration: underline;
        }
    }
`;

const MadeWithLove = styled.div`
    color: rgb(255 255 255 / 60%);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;

    svg {
        color: #ff6a00;
        animation: ${pulse} 2s infinite;
    }
`;

const FooterNavLinks = styled.div`
    display: flex;
    gap: 1.5rem;

    @media (width <= 576px) {
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }
`;

const FooterNavLink = styled(Link)`
    color: rgb(255 255 255 / 60%);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s ease;

    &:hover {
        color: #ff6a00;
    }
`;

// Scroll functionality
const scrollToTop = () => {
    scroll.scrollToTop({
        duration: 800,
        smooth: "easeInOutQuart",
    });
};

// Enhanced Footer Component
const Footer = () => {
    const [showScrollButton, setShowScrollButton] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 300) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Add your subscribe functionality here
    };

    return (
        <FooterSection>
            <FooterPattern />
            <FooterContainer>
                <FooterContent>
                    <FooterBrand>
                        <FooterLogo to="/" onClick={scrollToTop}>
                            <FaShieldAlt size={24} color="#ff6a00" />
                            <span>TheCyberHUB</span>
                        </FooterLogo>
                        <FooterDescription>
                            We empower the next generation of cybersecurity experts through a thriving community,
                            educational resources, and open-source projects. Join us in our mission to make
                            cybersecurity knowledge accessible to all.
                        </FooterDescription>

                        <SocialSection>
                            <SocialTitle>Connect With Us</SocialTitle>
                            <SocialGrid>
                                <SocialIcon
                                    href={SocialLinks.discord}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Discord"
                                    bgColor="#5865F2"
                                >
                                    <FaDiscord />
                                </SocialIcon>
                                <SocialIcon
                                    href={SocialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    bgColor="#333"
                                >
                                    <FaGithub />
                                </SocialIcon>
                                <SocialIcon
                                    href={SocialLinks.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="YouTube"
                                    bgColor="#FF0000"
                                >
                                    <FaYoutube />
                                </SocialIcon>
                                <SocialIcon
                                    href={SocialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    bgColor="#0077B5"
                                >
                                    <FaLinkedin />
                                </SocialIcon>
                                <SocialIcon
                                    href={SocialLinks.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Telegram"
                                    bgColor="#0088cc"
                                >
                                    <FaTelegram />
                                </SocialIcon>
                                <SocialIcon
                                    href={SocialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Twitter"
                                    bgColor="#1DA1F2"
                                >
                                    <FaXTwitter />
                                </SocialIcon>
                                <SocialIcon
                                    href={SocialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    bgColor="#E1306C"
                                >
                                    <FaInstagram />
                                </SocialIcon>
                            </SocialGrid>
                        </SocialSection>

                        <SubscribeForm onSubmit={handleSubscribe}>
                            <SubscribeInput type="email" placeholder="Subscribe to newsletter" required />
                            <SubscribeButton type="submit">Subscribe</SubscribeButton>
                        </SubscribeForm>
                    </FooterBrand>

                    <FooterLinksGrid>
                        <FooterLinksColumn>
                            <FooterLinksTitle>
                                <FaShieldAlt /> About Us
                            </FooterLinksTitle>
                            <FooterLinksList>
                                <FooterLinkItem>
                                    <FooterLink to="/about">About TheCyberHUB</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/services">Services</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/community">Community</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/contribute">How to Contribute</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/terms-conditions">Terms & Conditions</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
                                </FooterLinkItem>
                            </FooterLinksList>
                        </FooterLinksColumn>

                        <FooterLinksColumn>
                            <FooterLinksTitle>
                                <FaUsers /> Community
                            </FooterLinksTitle>
                            <FooterLinksList>
                                <FooterLinkItem>
                                    <FooterLink to="/explore">Explore</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/feeds">Feeds</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/blogs">Blogs</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/ctf">CTF Challenges</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/community-events">Community Events</FooterLink>
                                </FooterLinkItem>
                            </FooterLinksList>
                        </FooterLinksColumn>

                        <FooterLinksColumn>
                            <FooterLinksTitle>
                                <FaCode /> Resources
                            </FooterLinksTitle>
                            <FooterLinksList>
                                <FooterLinkItem>
                                    <FooterLink to="/roadmaps">Learning Paths</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/resources/methodology">Methodology</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/resources/cheatsheets">Cheatsheets</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/tools">Tools</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/resources/wordlist">Wordlists</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/resources/payloads">Payloads</FooterLink>
                                </FooterLinkItem>
                            </FooterLinksList>
                        </FooterLinksColumn>

                        <FooterLinksColumn>
                            <FooterLinksTitle>
                                <FaBook /> Security & Support
                            </FooterLinksTitle>
                            <FooterLinksList>
                                <FooterLinkItem>
                                    <FooterLink to="/contact">Contact Us</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/feedback">Feedback</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/support">Support</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/security">Security Policy</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/security/rules-of-engagement">Rules of Engagement</FooterLink>
                                </FooterLinkItem>
                                <FooterLinkItem>
                                    <FooterLink to="/security/hall-of-fame">Hall of Fame</FooterLink>
                                </FooterLinkItem>
                            </FooterLinksList>
                        </FooterLinksColumn>
                    </FooterLinksGrid>
                </FooterContent>

                <FooterBottom>
                    <FooterCopyright>
                        &copy; {new Date().getFullYear()} TheCyberHUB. All rights reserved.
                    </FooterCopyright>

                    <MadeWithLove>
                        Made with <FaHeart /> by the TheCyberHUB Community
                    </MadeWithLove>

                    <FooterNavLinks>
                        <FooterNavLink to="/faq">FAQ</FooterNavLink>
                        <FooterNavLink to="/sitemap">Sitemap</FooterNavLink>
                        <FooterNavLink to="/terms-conditions">Terms</FooterNavLink>
                        <FooterNavLink to="/privacy-policy">Privacy</FooterNavLink>
                    </FooterNavLinks>
                </FooterBottom>
            </FooterContainer>

            <ScrollToTopButton onClick={scrollToTop} visible={showScrollButton} aria-label="Scroll to top">
                ↑
            </ScrollToTopButton>
        </FooterSection>
    );
};

export default Footer;
