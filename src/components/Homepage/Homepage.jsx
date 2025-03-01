import React, { useEffect, useRef } from "react";
import { FaGithub, FaShieldAlt, FaUserShield, FaCodeBranch, FaGraduationCap, FaUsers, FaDiscord } from "react-icons/fa";
import { BsFillPlayFill, BsLightningChargeFill } from "react-icons/bs";
// import { PiWindowsLogoFill } from "react-icons/pi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import Hero from "src/components/Homepage/Hero/Hero";
import Socials from "src/components/Homepage/Socials/Socials";

// Global Styles for better page structure
const GlobalStyles = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  
  body {
    background: #0a0a0a;
    color: #f5f5f5;
    font-family: Inter, sans-serif;
  }
  
  /* Better typography and spacing */
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    line-height: 1.2;
  }
  
  p {
    margin-top: 0;
    line-height: 1.7;
  }
  
  /* Enhanced scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #111;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb&:hover {
    background: #ff6a00;
  }
`;

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const reveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const borderPulse = keyframes`
  0% {
    border-color: rgba(255, 106, 0, 0.3);
  }
  50% {
    border-color: rgba(255, 106, 0, 0.7);
  }
  100% {
    border-color: rgba(255, 106, 0, 0.3);
  }
`;

const gradientMove = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Page Section components
const Section = styled.section`
    padding: 8rem 0;
    position: relative;
    overflow: hidden;
    background: ${(props) => (props.dark ? "#070709" : "#0a0a0a")};

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgb(255 106 0 / 30%), transparent);
    }

    &.visible {
        .section-content {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (width <= 768px) {
        padding: 5rem 0;
    }
`;

const SectionContent = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 2;
    opacity: 0;
    transform: translateY(20px);
    transition:
        opacity 0.6s ease,
        transform 0.6s ease;

    @media (width <= 768px) {
        padding: 0 1.5rem;
    }
`;

const SectionHeader = styled.div`
    margin-bottom: 4rem;
    text-align: center;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
`;

const SectionTag = styled.span`
    padding: 0.4rem 1rem;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #ff6a00;
    border: 1px solid rgb(255 106 0 / 30%);
    border-radius: 20px;
    margin-bottom: 1.5rem;
    animation: ${borderPulse} 3s infinite;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    svg {
        font-size: 1rem;
    }
`;

const SectionTitle = styled.h2`
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    margin-bottom: 1.5rem;
    font-weight: 800;
    background: linear-gradient(90deg, #fff, #ff6a00);
    background-size: 200% auto;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${gradientMove} 8s ease infinite;
`;

const SectionDescription = styled.p`
    font-size: 1.2rem;
    line-height: 1.7;
    color: rgb(255 255 255 / 80%);
    margin-bottom: 2rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;

    @media (width <= 768px) {
        font-size: 1.1rem;
    }
`;

// Component for two column layout sections
const FeatureGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;

    @media (width <= 992px) {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
`;

const FeatureContent = styled.div`
    animation: ${fadeInUp} 0.6s ease-out;
    animation-fill-mode: both;
    animation-delay: ${(props) => props.delay || "0s"};

    @media (width <= 992px) {
        order: ${(props) => (props.reversed ? 2 : 1)};
        text-align: center;
    }
`;

const FeatureMedia = styled.div`
    position: relative;
    animation: ${fadeInUp} 0.6s ease-out;
    animation-fill-mode: both;
    animation-delay: ${(props) => props.delay || "0.3s"};

    @media (width <= 992px) {
        order: ${(props) => (props.reversed ? 1 : 2)};
    }
`;

const FeatureTitle = styled.h3`
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    margin-bottom: 1.5rem;
    font-weight: 700;
    color: #fff;
    position: relative;
    display: inline-block;

    &::after {
        content: "";
        position: absolute;
        width: 50px;
        height: 3px;
        background: #ff6a00;
        left: 0;
        bottom: -10px;
        border-radius: 3px;
    }

    @media (width <= 992px) {
        &::after {
            left: 50%;
            transform: translateX(-50%);
        }
    }
`;

const FeatureDescription = styled.div`
    font-size: 1.1rem;
    line-height: 1.7;
    color: rgb(255 255 255 / 80%);
    margin-bottom: 1.5rem;

    ul {
        list-style: none;
        padding-left: 0;
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    li {
        position: relative;
        padding-left: 2rem;

        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 12px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #ff6a00;
        }
    }
`;

const StatsRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    margin: 2rem 0;

    @media (width <= 992px) {
        justify-content: center;
    }

    @media (width <= 480px) {
        gap: 2rem;
    }
`;

const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    animation: ${reveal} 0.5s ease-out forwards;
    animation-delay: ${(props) => props.delay || "0s"};
    opacity: 0;
`;

const StatValue = styled.span`
    font-size: 2.5rem;
    font-weight: 700;
    color: #ff6a00;
    line-height: 1;
    margin-bottom: 0.5rem;
`;

const StatLabel = styled.span`
    font-size: 0.9rem;
    font-weight: 500;
    color: rgb(255 255 255 / 70%);
    text-transform: uppercase;
    letter-spacing: 1px;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2rem;

    @media (width <= 992px) {
        justify-content: center;
    }

    @media (width <= 480px) {
        flex-direction: column;
    }
`;

const PrimaryButton = styled.a`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.9rem 1.8rem;
    background: linear-gradient(45deg, #ff6a00, #ee0979);
    color: white;
    font-weight: 600;
    font-size: 1rem;
    border-radius: 50px;
    text-decoration: none;
    box-shadow: 0 4px 15px rgb(255 106 0 / 30%);
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgb(255 106 0 / 40%);
    }

    svg {
        font-size: 1.2rem;
    }

    @media (width <= 480px) {
        width: 100%;
    }
`;

const SecondaryButton = styled.a`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.9rem 1.8rem;
    background: transparent;
    color: #fff;
    font-weight: 600;
    font-size: 1rem;
    border-radius: 50px;
    text-decoration: none;
    border: 2px solid rgb(255 106 0 / 60%);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        background: rgb(255 106 0 / 10%);
        border-color: #ff6a00;
    }

    svg {
        font-size: 1.2rem;
    }

    @media (width <= 480px) {
        width: 100%;
    }
`;

// Media components with enhanced styling
const ImageContainer = styled.div`
    position: relative;
    max-width: 550px;
    margin: 0 auto;
    border-radius: 12px;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: -20px;
        right: -20px;
        width: 100px;
        height: 100px;
        border-top: 3px solid rgb(255 106 0 / 30%);
        border-right: 3px solid rgb(255 106 0 / 30%);
        border-radius: 0 20px 0 0;
        z-index: -1;
    }

    &::after {
        content: "";
        position: absolute;
        bottom: -20px;
        left: -20px;
        width: 100px;
        height: 100px;
        border-bottom: 3px solid rgb(255 106 0 / 30%);
        border-left: 3px solid rgb(255 106 0 / 30%);
        border-radius: 0 0 0 20px;
        z-index: -1;
    }
`;

const StyledImage = styled.img`
    width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
    box-shadow: 0 20px 40px rgb(0 0 0 / 30%);
    transition: transform 0.5s ease;
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const FloatingLogo = styled.img`
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
    display: block;
    filter: drop-shadow(0 20px 30px rgb(0 0 0 / 40%));
    animation: ${float} 4s ease-in-out infinite;
`;

const VideoContainer = styled.div`
    position: relative;
    max-width: 550px;
    margin: 0 auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgb(0 0 0 / 30%);

    &::before {
        content: "";
        display: block;
        padding-top: 56.25%; /* 16:9 Aspect Ratio */
    }

    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
    }
`;

// Featured grid for resources section
const FeaturedGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 3rem;

    @media (width <= 992px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (width <= 768px) {
        grid-template-columns: 1fr;
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

const FeatureCard = styled.div`
    background: rgb(30 30 40 / 30%);
    border-radius: 12px;
    padding: 2rem;
    border: 1px solid rgb(255 255 255 / 5%);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 30px rgb(0 0 0 / 20%);
    animation: ${fadeInUp} 0.5s ease-out forwards;
    animation-delay: ${(props) => props.delay || "0s"};
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
        transform: translateY(-10px);
        box-shadow: 0 15px 35px rgb(0 0 0 / 30%);
        border-color: rgb(255 106 0 / 20%);

        &::before {
            animation-play-state: running;
        }
    }
`;

const FeatureIcon = styled.div`
    width: 60px;
    height: 60px;
    background: rgb(255 106 0 / 10%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    color: #ff6a00;
    font-size: 1.5rem;

    svg {
        font-size: 1.8rem;
    }
`;

const FeatureCardTitle = styled.h4`
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: #fff;
`;

const FeatureCardDescription = styled.p`
    font-size: 1rem;
    line-height: 1.7;
    color: rgb(255 255 255 / 70%);
    margin-bottom: 1.5rem;
`;

// CTA Section
const CTASection = styled(Section)`
    background: linear-gradient(180deg, #0a0a0a 0%, #070709 100%);
    text-align: center;
    padding: 6rem 0;
`;

const CTAGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
    margin-top: 4rem;

    @media (width <= 992px) {
        grid-template-columns: 1fr;
    }
`;

const CTACard = styled.div`
    background: rgb(30 30 40 / 30%);
    border-radius: 12px;
    padding: 3rem 2rem;
    border: 1px solid rgb(255 255 255 / 5%);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        border-color: rgb(255 106 0 / 20%);
        box-shadow: 0 15px 35px rgb(0 0 0 / 20%);
    }
`;

const CTAIcon = styled.div`
    width: 80px;
    height: 80px;
    background: rgb(255 106 0 / 10%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    color: #ff6a00;

    svg {
        font-size: 2.5rem;
    }
`;

const CTATitle = styled.h3`
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #fff;
`;

const CTADescription = styled.p`
    font-size: 1.1rem;
    line-height: 1.7;
    color: rgb(255 255 255 / 70%);
    margin-bottom: 2rem;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
`;

// Background pattern elements
const BackgroundPattern = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 25% 25%, rgb(255 106 0 / 3%) 1px, transparent 1px),
        radial-gradient(circle at 75% 75%, rgb(255 106 0 / 3%) 1px, transparent 1px);
    background-size: 50px 50px;
    z-index: 1;
    opacity: 0.6;
`;

// Enhanced HomePage component
const HomePage = () => {
    // Ref for scroll animations
    const sectionRefs = useRef([]);

    // Effect for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            {
                threshold: 0.15,
            },
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) {
                    observer.unobserve(ref);
                }
            });
        };
    }, []);

    // Function to add refs to section array
    const addToRefs = (el) => {
        if (el && !sectionRefs.current.includes(el)) {
            sectionRefs.current.push(el);
        }
    };

    return (
        <>
            <GlobalStyles />
            <Hero />

            {/* About Section */}
            <Section ref={addToRefs} id="about">
                <BackgroundPattern />
                <SectionContent className="section-content">
                    <SectionHeader>
                        <SectionTag>
                            <FaShieldAlt /> Security Community
                        </SectionTag>
                        <SectionTitle>Empowering the Next Generation of Cybersecurity Experts</SectionTitle>
                        <SectionDescription>
                            Welcome to TheCyberHUB, the ultimate destination for cybersecurity enthusiasts to learn,
                            connect, and grow together.
                        </SectionDescription>
                    </SectionHeader>

                    <FeatureGrid>
                        <FeatureContent>
                            <FeatureTitle>Your Journey into Cybersecurity Starts Here</FeatureTitle>
                            <FeatureDescription>
                                Our community helps newcomers get started with open-source and cybersecurity while
                                encouraging existing members to engage further.
                                <ul>
                                    <li>Free Cybersecurity courses and structured learning paths</li>
                                    <li>Guidance for newcomers in open-source and cybersecurity</li>
                                    <li>A thriving community of over 150,000 members</li>
                                    <li>Contribute to open-source projects, including our website and apps</li>
                                    <li>Become part of a leading hub for cybersecurity education</li>
                                </ul>
                            </FeatureDescription>

                            <StatsRow>
                                <StatItem delay="0.3s">
                                    <StatValue>150K+</StatValue>
                                    <StatLabel>Community Members</StatLabel>
                                </StatItem>
                                <StatItem delay="0.4s">
                                    <StatValue>50+</StatValue>
                                    <StatLabel>Open Source Projects</StatLabel>
                                </StatItem>
                                <StatItem delay="0.5s">
                                    <StatValue>24/7</StatValue>
                                    <StatLabel>Expert Support</StatLabel>
                                </StatItem>
                            </StatsRow>

                            <ButtonGroup>
                                <PrimaryButton href="/community">
                                    Join our Community <FaUsers />
                                </PrimaryButton>
                                <SecondaryButton href="/opensec-projects">
                                    Contribute to Open Source <FaGithub />
                                </SecondaryButton>
                            </ButtonGroup>
                        </FeatureContent>

                        <FeatureMedia>
                            <FloatingLogo
                                src="/src/assets/images/TheCyberHUB_logo_outlined.png"
                                alt="TheCyberHUB Community Logo"
                            />
                        </FeatureMedia>
                    </FeatureGrid>
                </SectionContent>
            </Section>

            {/* Resources Section */}
            <Section ref={addToRefs} id="resources" dark>
                <BackgroundPattern />
                <SectionContent className="section-content">
                    <SectionHeader>
                        <SectionTag>
                            <FaGraduationCap /> Learn & Grow
                        </SectionTag>
                        <SectionTitle>Comprehensive Cybersecurity Resources</SectionTitle>
                        <SectionDescription>
                            Explore our vast collection of cybersecurity resources, carefully curated to help you master
                            essential skills and stay ahead of emerging threats.
                        </SectionDescription>
                    </SectionHeader>

                    <FeaturedGrid>
                        <FeatureCard delay="0.2s">
                            <FeatureIcon>
                                <FaGraduationCap />
                            </FeatureIcon>
                            <FeatureCardTitle>Learning Paths</FeatureCardTitle>
                            <FeatureCardDescription>
                                Structured roadmaps to guide your cybersecurity education from beginner to advanced
                                levels.
                            </FeatureCardDescription>
                            <SecondaryButton href="/roadmaps" style={{ padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}>
                                View Roadmaps <BsFillPlayFill />
                            </SecondaryButton>
                        </FeatureCard>

                        <FeatureCard delay="0.3s">
                            <FeatureIcon>
                                <FaShieldAlt />
                            </FeatureIcon>
                            <FeatureCardTitle>Practice Labs</FeatureCardTitle>
                            <FeatureCardDescription>
                                Hands-on environments to test your skills and apply cybersecurity concepts in real-world
                                scenarios.
                            </FeatureCardDescription>
                            <SecondaryButton href="/labs" style={{ padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}>
                                Start Practicing <BsFillPlayFill />
                            </SecondaryButton>
                        </FeatureCard>

                        <FeatureCard delay="0.4s">
                            <FeatureIcon>
                                <HiOutlineDocumentReport />
                            </FeatureIcon>
                            <FeatureCardTitle>Technical Guides</FeatureCardTitle>
                            <FeatureCardDescription>
                                In-depth articles, cheatsheets, and methodology documents for ethical hacking and
                                security testing.
                            </FeatureCardDescription>
                            <SecondaryButton
                                href="/resources/methodology"
                                style={{ padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}
                            >
                                View Guides <BsFillPlayFill />
                            </SecondaryButton>
                        </FeatureCard>

                        <FeatureCard delay="0.5s">
                            <FeatureIcon>
                                <BsLightningChargeFill />
                            </FeatureIcon>
                            <FeatureCardTitle>CTF Challenges</FeatureCardTitle>
                            <FeatureCardDescription>
                                Test your skills with Capture The Flag challenges designed for all skill levels.
                            </FeatureCardDescription>
                            <SecondaryButton href="/ctf" style={{ padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}>
                                Try Challenges <BsFillPlayFill />
                            </SecondaryButton>
                        </FeatureCard>

                        <FeatureCard delay="0.6s">
                            <FeatureIcon>
                                <FaUserShield />
                            </FeatureIcon>
                            <FeatureCardTitle>Career Resources</FeatureCardTitle>
                            <FeatureCardDescription>
                                Interview prep, resume reviews, and career guidance for cybersecurity professionals.
                            </FeatureCardDescription>
                            <SecondaryButton href="/career" style={{ padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}>
                                Explore Careers <BsFillPlayFill />
                            </SecondaryButton>
                        </FeatureCard>

                        <FeatureCard delay="0.7s">
                            <FeatureIcon>
                                <FaCodeBranch />
                            </FeatureIcon>
                            <FeatureCardTitle>Tool Collection</FeatureCardTitle>
                            <FeatureCardDescription>
                                Curated collection of essential tools for penetration testing and security analysis.
                            </FeatureCardDescription>
                            <SecondaryButton href="/tools" style={{ padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}>
                                View Tools <BsFillPlayFill />
                            </SecondaryButton>
                        </FeatureCard>
                    </FeaturedGrid>
                </SectionContent>
            </Section>

            {/* Contribute Section */}
            <Section ref={addToRefs} id="contribute">
                <BackgroundPattern />
                <SectionContent className="section-content">
                    <FeatureGrid>
                        <FeatureMedia>
                            <ImageContainer>
                                <StyledImage
                                    src="src/assets/images/open-source-contribution.svg"
                                    alt="Open Source Contribution"
                                />
                            </ImageContainer>
                        </FeatureMedia>

                        <FeatureContent>
                            <SectionTag>
                                <FaGithub /> Get Involved
                            </SectionTag>
                            <FeatureTitle>Contribute to Open Source</FeatureTitle>
                            <FeatureDescription>
                                We welcome contributions such as raising issues, discussions, documentation, and pull
                                requests. Join our growing network of contributors and help shape the future of
                                cybersecurity education.
                                <ul>
                                    <li>Enhance your skills while contributing to real projects</li>
                                    <li>Build your portfolio and gain experience</li>
                                    <li>Collaborate with experienced security professionals</li>
                                    <li>Make a positive impact on the cybersecurity community</li>
                                </ul>
                            </FeatureDescription>

                            <ButtonGroup>
                                <PrimaryButton
                                    href="https://github.com/th3cyb3rhub"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaGithub /> GitHub Projects
                                </PrimaryButton>
                                <SecondaryButton href="/community">Join Community Discussions</SecondaryButton>
                            </ButtonGroup>
                        </FeatureContent>
                    </FeatureGrid>
                </SectionContent>
            </Section>
            {/* Community Section */}
            <Section ref={addToRefs} id="community" dark>
                <BackgroundPattern />
                <SectionContent className="section-content">
                    <SectionHeader>
                        <SectionTag>
                            <FaUsers /> Join the Community
                        </SectionTag>
                        <SectionTitle>150,000+ Members Strong</SectionTitle>
                        <SectionDescription>
                            Our community helps newcomers get started with open-source and cybersecurity while
                            encouraging existing members to engage further. Connect with like-minded individuals,
                            participate in events, and grow your network in the cybersecurity field.
                        </SectionDescription>
                    </SectionHeader>

                    <FeatureGrid>
                        <FeatureContent>
                            <FeatureTitle>Find Your Place in Our Community</FeatureTitle>
                            <FeatureDescription>
                                Connect with fellow cybersecurity enthusiasts, share knowledge, and collaborate on
                                projects. Our inclusive community welcomes everyone from beginners to experts.
                                <ul>
                                    <li>Active Discord server with dedicated channels for different topics</li>
                                    <li>Regular community events, workshops, and webinars</li>
                                    <li>Mentorship opportunities from experienced professionals</li>
                                    <li>Collaborative learning and problem-solving</li>
                                </ul>
                            </FeatureDescription>

                            <StatsRow>
                                <StatItem delay="0.3s">
                                    <StatValue>150K+</StatValue>
                                    <StatLabel>Discord Members</StatLabel>
                                </StatItem>
                                <StatItem delay="0.4s">
                                    <StatValue>50K+</StatValue>
                                    <StatLabel>Social Followers</StatLabel>
                                </StatItem>
                                <StatItem delay="0.5s">
                                    <StatValue>10K+</StatValue>
                                    <StatLabel>Active Contributors</StatLabel>
                                </StatItem>
                            </StatsRow>

                            <ButtonGroup>
                                <PrimaryButton
                                    href="https://discord.com/invite/thecyberhub-799183504759324672"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaDiscord /> Join Discord
                                </PrimaryButton>
                                <SecondaryButton
                                    href="https://linktr.ee/th3cyb3rhub"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    All Community Links
                                </SecondaryButton>
                            </ButtonGroup>
                        </FeatureContent>

                        <FeatureMedia>
                            <VideoContainer>
                                <iframe
                                    src="https://www.youtube.com/embed/r5CDqVnWFFQ"
                                    title="Community Introduction | TheCyberHUB"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </VideoContainer>
                        </FeatureMedia>
                    </FeatureGrid>
                </SectionContent>
            </Section>

            {/* Open Source Section */}
            <Section ref={addToRefs} id="open-source">
                <BackgroundPattern />
                <SectionContent className="section-content">
                    <FeatureGrid>
                        <FeatureContent>
                            <SectionTag>
                                <FaCodeBranch /> Open Source
                            </SectionTag>
                            <FeatureTitle>What is Open Source?</FeatureTitle>
                            <FeatureDescription>
                                Open source software (OSS) is distributed with its source code, allowing for use,
                                modification, and redistribution under its original rights. By contributing to open
                                source projects, you not only enhance your skills but also give back to the community
                                and build your professional portfolio.
                                <ul>
                                    <li>Learn by examining and modifying real-world code</li>
                                    <li>Collaborate with developers from around the world</li>
                                    <li>Build a public portfolio that showcases your skills</li>
                                    <li>Make an impact by improving tools used by many</li>
                                </ul>
                            </FeatureDescription>

                            <ButtonGroup>
                                <PrimaryButton
                                    href="https://github.com/th3cyb3rhub"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaGithub /> Contribute Now
                                </PrimaryButton>
                                <SecondaryButton href="/opensec-projects">Open Source Projects</SecondaryButton>
                            </ButtonGroup>
                        </FeatureContent>

                        <FeatureMedia>
                            <ImageContainer>
                                <StyledImage
                                    src="src/assets/images/undraw_version_control_re_mg66.svg"
                                    alt="Version Control SVG"
                                />
                            </ImageContainer>
                        </FeatureMedia>
                    </FeatureGrid>
                </SectionContent>
            </Section>

            {/* Desktop App Section (if needed) */}
            {/* Uncomment this section if you want to include it
      <Section ref={addToRefs} id="desktop-download" dark>
        <BackgroundPattern />
        <SectionContent className="section-content">
          <FeatureGrid>
            <FeatureMedia>
              <ImageContainer>
                <StyledImage src="https://thecyberhub-assets.s3.ap-south-1.amazonaws.com/thecyberhub-assets/assets/images/TheCyberHUB-Desktop.png" alt="TheCyberHUB Desktop App" />
              </ImageContainer>
            </FeatureMedia>

            <FeatureContent>
              <SectionTag><PiWindowsLogoFill /> Desktop App</SectionTag>
              <FeatureTitle>Access Resources on Your Desktop</FeatureTitle>
              <FeatureDescription>
                TheCyberHUB Desktop App offers seamless access to essential resources and tools for cybersecurity enthusiasts. Join a community of users advancing their skills with our intuitive application, featuring regular updates to keep you informed and equipped.

                <ul>
                  <li>Quick access to learning resources and tools</li>
                  <li>Offline capabilities for selected content</li>
                  <li>Regular updates with new features</li>
                  <li>Optimized performance for better experience</li>
                </ul>
              </FeatureDescription>

              <ButtonGroup>
                <PrimaryButton href="https://github.com/th3cyb3rhub/TheCyberHUB-Desktop/releases" target="_blank" rel="noopener noreferrer">
                  Download for Windows <PiWindowsLogoFill />
                </PrimaryButton>
              </ButtonGroup>
            </FeatureContent>
          </FeatureGrid>
        </SectionContent>
      </Section>
      */}

            {/* CTA Section */}
            <CTASection ref={addToRefs} id="cta">
                <BackgroundPattern />
                <SectionContent className="section-content">
                    <SectionHeader>
                        <SectionTag>
                            <FaShieldAlt /> Take Action
                        </SectionTag>
                        <SectionTitle>Ready to Start Your Cybersecurity Journey?</SectionTitle>
                        <SectionDescription>
                            Join our vibrant community of cybersecurity enthusiasts and take the next step in your
                            professional growth.
                        </SectionDescription>
                    </SectionHeader>

                    <CTAGrid>
                        <CTACard>
                            <CTAIcon>
                                <FaUsers />
                            </CTAIcon>
                            <CTATitle>Join the Community</CTATitle>
                            <CTADescription>
                                Connect with 150,000+ members, participate in discussions, and learn from industry
                                experts.
                            </CTADescription>
                            <PrimaryButton
                                href="https://discord.com/invite/thecyberhub-799183504759324672"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Join Discord <FaDiscord />
                            </PrimaryButton>
                        </CTACard>

                        <CTACard>
                            <CTAIcon>
                                <FaGithub />
                            </CTAIcon>
                            <CTATitle>Contribute to Projects</CTATitle>
                            <CTADescription>
                                Build your portfolio by contributing to our open-source cybersecurity projects.
                            </CTADescription>
                            <PrimaryButton
                                href="https://github.com/th3cyb3rhub"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Start Contributing <FaGithub />
                            </PrimaryButton>
                        </CTACard>
                    </CTAGrid>
                </SectionContent>
            </CTASection>

            {/* Community Links Section */}
            <Socials />
        </>
    );
};

export default HomePage;
