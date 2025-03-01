import React, { useState, useEffect } from "react";
import {
    ArrowForward,
    ArrowRight,
    HeroBg,
    GridBg,
    GradientOverlay,
    ParticlesContainer,
    Particle,
    IconFloat,
    HeroBtnWrapper,
    HeroContainer,
    HeroContent,
    HeroH1,
    HeroP,
    HeroTagline,
    PrimaryButton,
    SecondaryButton,
    TypewriterContainer,
    TypewriterText,
    StatsContainer,
    StatBox,
    StatValue,
    StatLabel,
    ScrollDownIndicator,
    ScrollArrow,
} from "./HeroElements";

import { FaShieldAlt, FaLock, FaServer, FaUserShield } from "react-icons/fa";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { BiCodeAlt } from "react-icons/bi";

const Hero = () => {
    const [hover, setHover] = useState(false);
    const [currentText, setCurrentText] = useState(0);

    const typewriterTexts = [
        { text: "Learn. Practice. Secure.", steps: 24, duration: "3s" },
        { text: "Defend. Attack. Evolve.", steps: 24, duration: "3s" },
        { text: "Code. Exploit. Patch.", steps: 22, duration: "3s" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentText((prev) => (prev + 1) % typewriterTexts.length);
        }, 6000); // Change text every 6 seconds

        return () => clearInterval(interval);
    }, []);

    const onHover = () => {
        setHover(!hover);
    };

    const scrollToExplore = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    // Generate floating particles
    const particles = [];
    const icons = [
        <FaShieldAlt key="shield-alt" />,
        <FaLock key="lock" />,
        <BiCodeAlt key="code-alt" />,
        <FaServer key="server" />,
        <RiShieldKeyholeLine key="shield-keyhole" />,
        <FaUserShield key="user-shield" />,
    ];

    for (let i = 0; i < 15; i++) {
        particles.push(
            <Particle
                key={`particle-${i}`}
                size={Math.random() * 5 + 2}
                color={i % 3 === 0 ? "#ff6a00" : "#ffffff"}
                opacity={Math.random() * 0.3 + 0.1}
                duration={Math.random() * 3 + 3}
                delay={Math.random() * 2}
                top={Math.random() * 100}
                left={Math.random() * 100}
            />,
        );
    }

    for (let i = 0; i < 8; i++) {
        const IconComponent = icons[i % icons.length];
        particles.push(
            <IconFloat
                key={`icon-${i}`}
                size={Math.random() * 30 + 20}
                opacity={Math.random() * 0.15 + 0.05}
                duration={Math.random() * 3 + 3}
                delay={Math.random() * 2}
                top={Math.random() * 100}
                left={Math.random() * 100}
            >
                {IconComponent}
            </IconFloat>,
        );
    }

    return (
        <HeroContainer id="home">
            <HeroBg>
                <GridBg />
                <ParticlesContainer>{particles}</ParticlesContainer>
                <GradientOverlay />
            </HeroBg>

            <HeroContent>
                <HeroTagline>
                    <FaShieldAlt /> The Cybersecurity Community
                </HeroTagline>

                <HeroH1>Empowering Cybersecurity Enthusiasts</HeroH1>

                <TypewriterContainer>
                    <TypewriterText
                        key={currentText}
                        steps={typewriterTexts[currentText].steps}
                        duration={typewriterTexts[currentText].duration}
                    >
                        {typewriterTexts[currentText].text}
                    </TypewriterText>
                </TypewriterContainer>

                <HeroP>
                    Join a thriving community of ethical hackers, security researchers, and cybersecurity professionals.
                    Access resources, share knowledge, and build your skills in a collaborative environment.
                </HeroP>

                <HeroBtnWrapper>
                    <PrimaryButton to="/explore" onMouseEnter={onHover} onMouseLeave={onHover}>
                        Get Started {hover ? <ArrowRight /> : <ArrowForward />}
                    </PrimaryButton>
                    <SecondaryButton to="/community">Join Community</SecondaryButton>
                </HeroBtnWrapper>

                <StatsContainer>
                    <StatBox>
                        <StatValue>10K+</StatValue>
                        <StatLabel>Members</StatLabel>
                    </StatBox>
                    <StatBox>
                        <StatValue>500+</StatValue>
                        <StatLabel>Resources</StatLabel>
                    </StatBox>
                    <StatBox>
                        <StatValue>150+</StatValue>
                        <StatLabel>Tools</StatLabel>
                    </StatBox>
                </StatsContainer>
            </HeroContent>

            <ScrollDownIndicator onClick={scrollToExplore}>
                Scroll Down
                <ScrollArrow />
            </ScrollDownIndicator>
        </HeroContainer>
    );
};

export default Hero;
