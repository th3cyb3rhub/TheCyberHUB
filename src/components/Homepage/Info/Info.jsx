import React, { useEffect, useRef, useState } from "react";
import { RedirectButton, RouterButton, ScrollButton } from "src/components/Other/MixComponents/Buttons/ButtonElements";
import styled, { keyframes } from "styled-components";
import { FaAngleRight, FaExternalLinkAlt, FaPlay } from "react-icons/fa";

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

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const borderGlow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(255, 106, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 15px rgba(255, 106, 0, 0.5);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 106, 0, 0.3);
  }
`;

const moveGradient = keyframes`
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

// Enhanced Section Container
const SectionContainer = styled.section`
    background: ${({ theme }) => theme || "#0a0a0a"};
    color: #f5f5f5;
    padding: 7rem 0;
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

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgb(255 106 0 / 10%), transparent);
    }

    @media (width <= 768px) {
        padding: 5rem 0;
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

const ContentGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    grid-template-areas: ${({ reversed }) => (reversed ? `'visual content'` : `'content visual'`)};

    @media (width <= 992px) {
        grid-template-columns: 1fr;
        grid-template-areas: "content" "visual";
        gap: 3rem;
    }
`;

const ContentArea = styled.div`
    grid-area: content;
    animation: ${fadeIn} 0.6s ease-out;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media (width <= 768px) {
        text-align: center;
        align-items: center;
    }
`;

const VisualArea = styled.div`
    grid-area: visual;
    animation: ${scaleIn} 0.6s ease-out;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: -15px;
        left: -15px;
        width: 50px;
        height: 50px;
        border-top: 2px solid rgb(255 106 0 / 30%);
        border-left: 2px solid rgb(255 106 0 / 30%);
        z-index: -1;
    }

    &::after {
        content: "";
        position: absolute;
        bottom: -15px;
        right: -15px;
        width: 50px;
        height: 50px;
        border-bottom: 2px solid rgb(255 106 0 / 30%);
        border-right: 2px solid rgb(255 106 0 / 30%);
        z-index: -1;
    }
`;

const SectionTag = styled.span`
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 600;
    color: #ff6a00;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    position: relative;
    padding-left: 12px;

    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 5px;
        height: 5px;
        background: #ff6a00;
    }

    @media (width <= 768px) {
        justify-content: center;
    }
`;

const SectionHeading = styled.h2`
    font-size: clamp(2rem, 5vw, 3rem);
    line-height: 1.2;
    margin-bottom: 1rem;
    font-weight: 800;
    background: linear-gradient(90deg, #fff, #ff6a00);
    background-size: 200% auto;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${moveGradient} 8s ease infinite;

    @media (width <= 768px) {
        font-size: clamp(1.75rem, 5vw, 2.5rem);
    }
`;

const SectionDescription = styled.div`
    font-size: 1.125rem;
    line-height: 1.7;
    color: rgb(255 255 255 / 85%);
    margin-bottom: 1.5rem;

    ul {
        list-style: none;
        margin-top: 1rem;
        padding-left: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    li {
        display: flex;
        align-items: flex-start;
        text-align: left;

        @media (width <= 768px) {
            text-align: left;
        }
    }

    @media (width <= 768px) {
        font-size: 1rem;
    }
`;

// const ListIcon = styled.span`
//   color: #ff6a00;
//   margin-right: 10px;
//   min-width: 18px;
//   display: inline-flex;
//   justify-content: center;
//
//   &::before {
//     content: '●';
//     font-size: 0.5rem;
//     line-height: 1.7rem;
//   }
// `;

const ActionButtons = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;

    @media (width <= 768px) {
        justify-content: center;
    }

    @media (width <= 480px) {
        flex-direction: column;
        width: 100%;
    }
`;

const StatisticsRow = styled.div`
    display: flex;
    gap: 2.5rem;
    margin-top: 1.5rem;

    @media (width <= 768px) {
        justify-content: center;
        flex-wrap: wrap;
        gap: 2rem;
    }
`;

const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${({ center }) => (center ? "center" : "flex-start")};
`;

const StatValue = styled.span`
    font-size: 2rem;
    font-weight: 700;
    color: #ff6a00;
    line-height: 1;
`;

const StatLabel = styled.span`
    font-size: 0.85rem;
    color: rgb(255 255 255 / 70%);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 0.25rem;
`;

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 16px 32px rgb(0 0 0 / 25%);
    border: 1px solid rgb(255 255 255 / 5%);
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgb(0 0 0 / 30%);
    }
`;

const Image = styled.img`
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    transition: transform 0.5s ease;

    &:hover {
        transform: scale(1.03);
    }
`;

const FloatingImage = styled.img`
    width: 100%;
    max-width: 400px;
    filter: drop-shadow(0 20px 30px rgb(0 0 0 / 25%));
    animation: float 4s ease-in-out infinite;

    @keyframes float {
        0% {
            transform: translateY(0);
        }

        50% {
            transform: translateY(-15px);
        }

        100% {
            transform: translateY(0);
        }
    }
`;

const VideoContainer = styled.div`
    width: 100%;
    max-width: 560px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 16px 32px rgb(0 0 0 / 25%);
    border: 1px solid rgb(255 255 255 / 5%);
    background: #000;
    position: relative;
    animation: ${borderGlow} 4s infinite;

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

const PlayButton = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70px;
    height: 70px;
    background: rgb(255 106 0 / 90%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    cursor: pointer;
    box-shadow: 0 5px 15px rgb(255 106 0 / 30%);
    transition: all 0.3s ease;

    svg {
        font-size: 2rem;
        color: white;
        margin-left: 5px;
    }

    &:hover {
        transform: translate(-50%, -50%) scale(1.1);
        background: #ff6a00;
    }
`;

// Enhanced InfoSection Component
const InfoSection = ({
    id,
    buttonType1,
    buttonType2,
    link1,
    link2,
    theme = "#0a0a0a",
    lightText = true,
    topLine,
    headline,
    description,
    buttonLabel1,
    buttonLabel2,
    imgStart = false,
    img,
    alt,
    dark = true,
    dark2,
    primary = true,
    darkText = false,
    statistics = [],
    videoUrl,
}) => {
    const [videoPlaying, setVideoPlaying] = useState(false);
    const videoRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            },
            {
                root: null,
                threshold: 0.1,
            },
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const handlePlayVideo = () => {
        setVideoPlaying(true);
    };

    return (
        <SectionContainer id={id} theme={theme} ref={sectionRef}>
            <BackgroundPattern />
            <ContentWrapper>
                <ContentGrid reversed={imgStart}>
                    <ContentArea>
                        <SectionTag>{topLine}</SectionTag>
                        <SectionHeading>{headline}</SectionHeading>
                        <SectionDescription>{description}</SectionDescription>

                        {statistics.length > 0 && (
                            <StatisticsRow>
                                {statistics.map((stat, index) => (
                                    <StatItem key={index} center={false}>
                                        <StatValue>{stat.value}</StatValue>
                                        <StatLabel>{stat.label}</StatLabel>
                                    </StatItem>
                                ))}
                            </StatisticsRow>
                        )}

                        <ActionButtons>
                            {buttonType1 === "router" && (
                                <RouterButton
                                    to={link1}
                                    primary={primary ? "true" : ""}
                                    dark={dark ? 1 : 0}
                                    dark2={dark2 ? 1 : 0}
                                >
                                    {buttonLabel1} <FaAngleRight />
                                </RouterButton>
                            )}
                            {buttonType1 === "scroll" && (
                                <ScrollButton
                                    to={link1}
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact={"true"}
                                    offset={-80}
                                    primary={primary ? "true" : ""}
                                    dark={dark ? 1 : 0}
                                    dark2={dark2 ? 1 : 0}
                                >
                                    {buttonLabel1} <FaAngleRight />
                                </ScrollButton>
                            )}
                            {buttonType1 === "redirect" && (
                                <RedirectButton
                                    target={"_blank"}
                                    href={link1}
                                    primary={primary ? "true" : ""}
                                    dark={dark ? 1 : 0}
                                    dark2={dark2 ? 1 : 0}
                                >
                                    {buttonLabel1}{" "}
                                    <FaExternalLinkAlt style={{ fontSize: "0.8rem", marginLeft: "5px" }} />
                                </RedirectButton>
                            )}

                            {buttonType2 === "router" && (
                                <RouterButton
                                    to={link2}
                                    primary={primary ? "true" : ""}
                                    dark={dark ? 1 : 0}
                                    dark2={dark2 ? 1 : 0}
                                >
                                    {buttonLabel2} <FaAngleRight />
                                </RouterButton>
                            )}
                            {buttonType2 === "scroll" && (
                                <ScrollButton
                                    to={link2}
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact={"true"}
                                    offset={-80}
                                    primary={primary ? "true" : ""}
                                    dark={dark ? 1 : 0}
                                    dark2={dark2 ? 1 : 0}
                                >
                                    {buttonLabel2} <FaAngleRight />
                                </ScrollButton>
                            )}
                            {buttonType2 === "redirect" && (
                                <RedirectButton
                                    href={link2}
                                    target={"_blank"}
                                    primary={primary ? "true" : ""}
                                    dark={dark ? 1 : 0}
                                    dark2={dark2 ? 1 : 0}
                                >
                                    {buttonLabel2}{" "}
                                    <FaExternalLinkAlt style={{ fontSize: "0.8rem", marginLeft: "5px" }} />
                                </RedirectButton>
                            )}
                        </ActionButtons>
                    </ContentArea>

                    <VisualArea>
                        {img ? (
                            img.includes("TheCyberHUB_logo_outlined.png") ? (
                                <FloatingImage src={img} alt={alt} />
                            ) : (
                                <ImageContainer>
                                    <Image src={img} alt={alt} />
                                </ImageContainer>
                            )
                        ) : videoUrl ? (
                            <VideoContainer ref={videoRef}>
                                {!videoPlaying && (
                                    <PlayButton onClick={handlePlayVideo}>
                                        <FaPlay />
                                    </PlayButton>
                                )}
                                {videoPlaying ? (
                                    <iframe
                                        src={`${videoUrl}?autoplay=1`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <iframe
                                        src={videoUrl}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                )}
                            </VideoContainer>
                        ) : (
                            <VideoContainer>
                                <iframe
                                    src="https://www.youtube.com/embed/r5CDqVnWFFQ"
                                    title="Community Introduction | TheCyberHUB"
                                    frameBorder="0"
                                    allow="web-share"
                                    allowFullScreen
                                ></iframe>
                            </VideoContainer>
                        )}
                    </VisualArea>
                </ContentGrid>
            </ContentWrapper>
        </SectionContainer>
    );
};

export default InfoSection;
