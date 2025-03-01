import React, { useState, useEffect } from "react";
import {
    FaDiscord,
    FaGithub,
    FaInstagram,
    FaLinkedinIn,
    FaTelegramPlane,
    FaYoutube,
    FaUsers,
    FaGlobe,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styled, { keyframes, css } from "styled-components";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 106, 0, 0.7);
  }
  
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(255, 106, 0, 0);
  }
  
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 106, 0, 0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Styled Components
const SectionContainer = styled.section`
    padding: 5rem 0;
    background: #0a0a0a;
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgb(255 106 0 / 30%), transparent);
    }
`;

const BackgroundPattern = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 25% 25%, rgb(255 106 0 / 3%) 1px, transparent 1px),
        radial-gradient(circle at 75% 75%, rgb(255 106 0 / 3%) 1px, transparent 1px);
    background-size: 50px 50px;
    z-index: 0;
    opacity: 0.5;
`;

const ContentWrapper = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 1;

    @media (width <= 768px) {
        padding: 0 1.5rem;
    }
`;

const SectionHeader = styled.div`
    margin-bottom: 3rem;
    text-align: center;
`;

const SectionTitle = styled.h2`
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 800;
    color: #fff;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
    letter-spacing: 1px;

    &::after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 3px;
        background: #ff6a00;
        border-radius: 3px;
    }
`;

const SectionSubtitle = styled.p`
    color: rgb(255 255 255 / 70%);
    font-size: 1.1rem;
    max-width: 700px;
    margin: 1.5rem auto 0;
    line-height: 1.6;
`;

const CommunityStats = styled.div`
    display: flex;
    justify-content: center;
    gap: 2.5rem;
    margin: 2rem 0 3rem;
    flex-wrap: wrap;

    @media (width <= 768px) {
        gap: 1.5rem;
    }
`;

const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${fadeIn} 0.6s ease-out forwards;
    animation-delay: ${(props) => props.delay || "0s"};
    opacity: 0;
`;

const StatValue = styled.span`
    font-size: 2rem;
    font-weight: 700;
    color: #ff6a00;
    margin-bottom: 0.5rem;
`;

const StatLabel = styled.span`
    font-size: 0.9rem;
    color: rgb(255 255 255 / 70%);
    text-transform: uppercase;
    letter-spacing: 1px;
`;

const TabsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2.5rem;

    @media (width <= 768px) {
        overflow-x: auto;
        padding-bottom: 1rem;
        justify-content: flex-start;

        /* Hide scrollbar */
        &::-webkit-scrollbar {
            display: none;
        }

        -ms-overflow-style: none;
        scrollbar-width: none;
    }
`;

const TabItem = styled.button`
    background: transparent;
    border: none;
    padding: 0.75rem 1.5rem;
    color: ${(props) => (props.active ? "#fff" : "rgba(255, 255, 255, 0.6)")};
    font-size: 1rem;
    font-weight: ${(props) => (props.active ? "600" : "400")};
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    white-space: nowrap;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: ${(props) => (props.active ? "30px" : "0")};
        height: 3px;
        background: #ff6a00;
        transition: all 0.2s ease;
        border-radius: 3px;
    }

    &:hover {
        color: #fff;

        &::after {
            width: 20px;
        }
    }
`;

const SocialsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
    width: 100%;

    @media (width <= 768px) {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 1rem;
    }

    @media (width <= 480px) {
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
`;

const SocialCardBase = css`
    padding: 1.5rem;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #fff;
    background: rgb(25 25 25 / 60%);
    backdrop-filter: blur(10px);
    border: 1px solid rgb(255 255 255 / 5%);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 15px rgb(0 0 0 / 10%);
    height: 160px;
    animation: ${fadeIn} 0.5s ease-out forwards;
    opacity: 0;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 200%;
        height: 100%;
        background: linear-gradient(
            90deg,
            rgb(255 255 255 / 0%) 0%,
            rgb(255 255 255 / 5%) 50%,
            rgb(255 255 255 / 0%) 100%
        );
        animation: ${shimmer} 2s infinite;
        animation-play-state: paused;
    }

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgb(0 0 0 / 15%);
        border-color: rgb(255 106 0 / 20%);

        &::before {
            animation-play-state: running;
        }

        svg {
            transform: scale(1.1);
        }
    }

    &:active {
        transform: translateY(-2px);
    }

    @media (width <= 768px) {
        padding: 1.25rem;
        height: 140px;
    }
`;

const IconWrapper = styled.div`
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: ${(props) => props.color || "#fff"};
    transition: transform 0.3s ease;

    svg {
        filter: drop-shadow(0 2px 8px rgb(0 0 0 / 20%));
    }

    @media (width <= 768px) {
        font-size: 2rem;
    }
`;

const SocialLabel = styled.span`
    font-size: 1rem;
    font-weight: 500;
    margin-top: 0.5rem;
`;

const MemberCount = styled.span`
    font-size: 0.8rem;
    color: rgb(255 255 255 / 70%);
    margin-top: 0.5rem;
`;

const FeaturedBadge = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    background: linear-gradient(45deg, #ff6a00, #ee0979);
    color: white;
    padding: 3px 8px;
    border-radius: 10px;
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    animation: ${pulse} 2s infinite;
`;

// Social Card Components
const SocialCardDiscord = styled.a`
    ${SocialCardBase}
    background: linear-gradient(45deg, rgb(88 101 242 / 15%), rgb(25 25 25 / 60%));
    animation-delay: 0.1s;

    ${IconWrapper} {
        color: #5865f2;
    }
`;

const SocialCardGithub = styled.a`
    ${SocialCardBase}
    background: linear-gradient(45deg, rgb(51 51 51 / 15%), rgb(25 25 25 / 60%));
    animation-delay: 0.2s;

    ${IconWrapper} {
        color: #f5f5f5;
    }
`;

const SocialCardYoutube = styled.a`
    ${SocialCardBase}
    background: linear-gradient(45deg, rgb(255 0 0 / 15%), rgb(25 25 25 / 60%));
    animation-delay: 0.3s;

    ${IconWrapper} {
        color: #f00;
    }
`;

const SocialCardLinkedin = styled.a`
    ${SocialCardBase}
    background: linear-gradient(45deg, rgb(0 119 181 / 15%), rgb(25 25 25 / 60%));
    animation-delay: 0.4s;

    ${IconWrapper} {
        color: #0077b5;
    }
`;

const SocialCardTelegram = styled.a`
    ${SocialCardBase}
    background: linear-gradient(45deg, rgb(0 136 204 / 15%), rgb(25 25 25 / 60%));
    animation-delay: 0.5s;

    ${IconWrapper} {
        color: #08c;
    }
`;

const SocialCardTwitter = styled.a`
    ${SocialCardBase}
    background: linear-gradient(45deg, rgb(29 161 242 / 15%), rgb(25 25 25 / 60%));
    animation-delay: 0.6s;

    ${IconWrapper} {
        color: #f5f5f5;
    }
`;

const SocialCardInstagram = styled.a`
    ${SocialCardBase}
    background: linear-gradient(45deg, rgb(225 48 108 / 15%), rgb(25 25 25 / 60%));
    animation-delay: 0.7s;

    ${IconWrapper} {
        color: #e1306c;
    }
`;

const AllLinksButton = styled.a`
    display: block;
    margin: 3rem auto 0;
    padding: 1rem 2rem;
    background: linear-gradient(45deg, #ff6a00, #ee0979);
    color: white;
    text-decoration: none;
    border-radius: 30px;
    font-weight: 600;
    text-align: center;
    max-width: 300px;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgb(255 106 0 / 30%);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgb(255 106 0 / 40%);
    }

    &:active {
        transform: translateY(-1px);
    }
`;

// Enhanced Socials Component
const Socials = () => {
    const [activeTab, setActiveTab] = useState("social");
    const [isInView, setIsInView] = useState(false);

    // Social media links data
    const socialLinks = [
        {
            Component: SocialCardDiscord,
            Icon: FaDiscord,
            label: "Discord",
            href: "https://discord.com/invite/thecyberhub-799183504759324672",
            members: "150K+ members",
            featured: true,
        },
        {
            Component: SocialCardGithub,
            Icon: FaGithub,
            label: "Github",
            href: "https://www.github.com/th3cyb3rhub",
            members: "50+ projects",
        },
        {
            Component: SocialCardYoutube,
            Icon: FaYoutube,
            label: "YouTube",
            href: "https://www.youtube.com/@th3cyb3rhub",
            members: "5K+ subscribers",
        },
        {
            Component: SocialCardLinkedin,
            Icon: FaLinkedinIn,
            label: "LinkedIn",
            href: "https://linkedin.com/company/th3cyb3rhub",
            members: "10K+ followers",
        },
        {
            Component: SocialCardTelegram,
            Icon: FaTelegramPlane,
            label: "Telegram",
            href: "https://t.me/th3cyb3rhub",
            members: "5K+ members",
        },
        {
            Component: SocialCardTwitter,
            Icon: FaXTwitter,
            label: "Twitter",
            href: "https://www.twitter.com/th3cyb3rhub",
            members: "8K+ followers",
        },
        {
            Component: SocialCardInstagram,
            Icon: FaInstagram,
            label: "Instagram",
            href: "https://www.instagram.com/th3cyb3rhub",
            members: "7K+ followers",
        },
    ];

    // Community resources links
    const resourceLinks = [
        {
            Component: styled(SocialCardDiscord)`
                background: linear-gradient(45deg, rgb(255 106 0 / 15%), rgb(25 25 25 / 60%));

                ${IconWrapper} {
                    color: #ff6a00;
                }
            `,
            Icon: FaGlobe,
            label: "Website",
            href: "https://thecyberhub.org",
            members: "Cybersecurity hub",
        },
        {
            Component: styled(SocialCardDiscord)`
                background: linear-gradient(45deg, rgb(255 106 0 / 15%), rgb(25 25 25 / 60%));

                ${IconWrapper} {
                    color: #ff6a00;
                }
            `,
            Icon: FaUsers,
            label: "Forums",
            href: "https://thecyberhub.org/forum",
            members: "Join discussions",
        },
        // Add more resource links as needed
    ];

    // Intersection Observer to trigger animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            {
                root: null,
                threshold: 0.1,
            },
        );

        const section = document.getElementById("community-links");
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    // Filter links based on active tab
    const displayLinks = activeTab === "social" ? socialLinks : resourceLinks;

    return (
        <SectionContainer id="community-links">
            <BackgroundPattern />
            <ContentWrapper>
                <SectionHeader>
                    <SectionTitle>COMMUNITY LINKS</SectionTitle>
                    <SectionSubtitle>
                        Connect with our growing community across various platforms and stay updated with the latest in
                        cybersecurity.
                    </SectionSubtitle>
                </SectionHeader>

                {isInView && (
                    <CommunityStats>
                        <StatItem delay="0.2s">
                            <StatValue>150K+</StatValue>
                            <StatLabel>Community Members</StatLabel>
                        </StatItem>
                        <StatItem delay="0.3s">
                            <StatValue>7</StatValue>
                            <StatLabel>Platforms</StatLabel>
                        </StatItem>
                        <StatItem delay="0.4s">
                            <StatValue>24/7</StatValue>
                            <StatLabel>Active Support</StatLabel>
                        </StatItem>
                    </CommunityStats>
                )}

                <TabsContainer>
                    <TabItem active={activeTab === "social"} onClick={() => setActiveTab("social")}>
                        Social Media
                    </TabItem>
                    <TabItem active={activeTab === "resources"} onClick={() => setActiveTab("resources")}>
                        Resources
                    </TabItem>
                </TabsContainer>

                <SocialsGrid>
                    {displayLinks.map(({ Component, Icon, label, href, members, featured }, index) => (
                        <Component key={index} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                            {featured && <FeaturedBadge>Most Active</FeaturedBadge>}
                            <IconWrapper>
                                <Icon />
                            </IconWrapper>
                            <SocialLabel>{label}</SocialLabel>
                            {members && <MemberCount>{members}</MemberCount>}
                        </Component>
                    ))}
                </SocialsGrid>

                <AllLinksButton href="https://linktr.ee/th3cyb3rhub" target="_blank" rel="noopener noreferrer">
                    All Community Links
                </AllLinksButton>
            </ContentWrapper>
        </SectionContainer>
    );
};

export default Socials;
