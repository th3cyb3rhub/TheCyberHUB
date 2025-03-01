import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { FaArrowRight } from "react-icons/fa";

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
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const typewriter = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  from, to { border-color: transparent }
  50% { border-color: #ff6a00 }
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

// Container and Background elements
export const HeroContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    padding: 0 20px;
    background: #0a0a0a;
`;

export const HeroBg = styled.div`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
`;

export const GridBg = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgb(255 106 0 / 5%) 1px, transparent 1px),
        linear-gradient(90deg, rgb(255 106 0 / 5%) 1px, transparent 1px);
    background-size: 50px 50px;
    background-position: center center;
    transform: perspective(1000px) rotateX(60deg) scale(1.8) translateY(10%);
    transform-origin: center center;
    opacity: 0.5;
`;

export const GradientOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, transparent 0%, #0a0a0a 70%);
    z-index: 2;
`;

export const ParticlesContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
`;

export const Particle = styled.div`
    position: absolute;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    background: ${(props) => props.color};
    border-radius: 50%;
    opacity: ${(props) => props.opacity};
    animation: ${float} ${(props) => props.duration}s ease-in-out infinite;
    animation-delay: ${(props) => props.delay}s;
    z-index: 1;
    top: ${(props) => props.top}%;
    left: ${(props) => props.left}%;
`;

export const IconFloat = styled.div`
    position: absolute;
    color: rgb(255 106 0 / 20%);
    font-size: ${(props) => props.size}px;
    opacity: ${(props) => props.opacity};
    animation: ${float} ${(props) => props.duration}s ease-in-out infinite;
    animation-delay: ${(props) => props.delay}s;
    z-index: 1;
    top: ${(props) => props.top}%;
    left: ${(props) => props.left}%;
`;

// Content elements
export const HeroContent = styled.div`
    z-index: 3;
    max-width: 1200px;
    position: relative;
    padding: 8px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    animation: ${fadeIn} 1s ease-out;
`;

export const HeroTagline = styled.div`
    color: #ff6a00;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-transform: uppercase;
    letter-spacing: 2px;

    @media screen and (width <= 480px) {
        font-size: 1rem;
    }
`;

export const HeroH1 = styled.h1`
    color: #fff;
    font-size: 4rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    background: linear-gradient(90deg, #fff, #ff6a00, #ff3c00);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${gradientMove} 6s ease infinite;

    @media screen and (width <= 768px) {
        font-size: 3rem;
    }

    @media screen and (width <= 480px) {
        font-size: 2rem;
    }
`;

export const TypewriterContainer = styled.div`
    margin-bottom: 2rem;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TypewriterText = styled.div`
    color: #f5f5f5;
    font-size: 1.5rem;
    font-family: "Space Mono", monospace;
    white-space: nowrap;
    overflow: hidden;
    border-right: 3px solid #ff6a00;
    width: 0;
    animation:
        ${typewriter} ${(props) => props.duration || "4s"} steps(${(props) => props.steps || "40"}) 1s forwards,
        ${blink} 0.75s step-end infinite;

    @media screen and (width <= 480px) {
        font-size: 1.2rem;
    }
`;

export const HeroP = styled.p`
    margin-top: 1.5rem;
    color: rgb(255 255 255 / 80%);
    font-size: 1.2rem;
    text-align: center;
    max-width: 700px;
    line-height: 1.6;
    margin-bottom: 2.5rem;

    @media screen and (width <= 480px) {
        font-size: 1rem;
    }
`;

export const HeroBtnWrapper = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;

    @media screen and (width <= 480px) {
        flex-direction: column;
        gap: 15px;
    }
`;

export const PrimaryButton = styled(Link)`
    border-radius: 50px;
    background: linear-gradient(90deg, #ff6a00, #ff3c00);
    white-space: nowrap;
    padding: 15px 30px;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    box-shadow: 0 5px 15px rgb(255 106 0 / 20%);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgb(255 106 0 / 30%);
        background: linear-gradient(90deg, #ff3c00, #ff6a00);
    }

    svg {
        transition: transform 0.3s ease;
    }

    &:hover svg {
        transform: translateX(5px);
    }
`;

export const SecondaryButton = styled(Link)`
    border-radius: 50px;
    background: transparent;
    white-space: nowrap;
    padding: 14px 28px;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    outline: none;
    border: 2px solid #ff6a00;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        background: rgb(255 106 0 / 10%);
        color: #ff6a00;
    }
`;

export const ScrollButton = styled(ScrollLink)`
    border-radius: 50px;
    background: ${({ primary }) => (primary ? "linear-gradient(90deg, #ff6a00, #ff3c00)" : "transparent")};
    white-space: nowrap;
    padding: ${({ primary }) => (primary ? "15px 30px" : "14px 28px")};
    color: ${({ dark }) => (dark ? "#fff" : "#fff")};
    font-size: 1.1rem;
    font-weight: 600;
    outline: none;
    border: ${({ primary }) => (primary ? "none" : "2px solid #ff6a00")};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    box-shadow: ${({ primary }) => (primary ? "0 5px 15px rgba(255, 106, 0, 0.2)" : "none")};

    &:hover {
        transform: ${({ primary }) => (primary ? "translateY(-3px)" : "none")};
        box-shadow: ${({ primary }) => (primary ? "0 8px 20px rgba(255, 106, 0, 0.3)" : "none")};
        background: ${({ primary }) =>
            primary ? "linear-gradient(90deg, #ff3c00, #ff6a00)" : "rgba(255, 106, 0, 0.1)"};
        color: ${({ primary }) => (primary ? "#fff" : "#ff6a00")};
    }

    svg {
        transition: transform 0.3s ease;
    }

    &:hover svg {
        transform: translateX(5px);
    }
`;

export const StatsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 3rem;
    gap: 30px;
    flex-wrap: wrap;

    @media screen and (width <= 768px) {
        gap: 15px;
    }
`;

export const StatBox = styled.div`
    background: rgb(20 20 20 / 80%);
    border: 1px solid rgb(255 255 255 / 5%);
    border-radius: 10px;
    padding: 15px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    backdrop-filter: blur(5px);
    min-width: 150px;
    box-shadow: 0 4px 10px rgb(0 0 0 / 20%);
    animation: ${fadeIn} 0.5s ease-out forwards;

    &:nth-child(1) {
        animation-delay: 0.2s;
    }

    &:nth-child(2) {
        animation-delay: 0.4s;
    }

    &:nth-child(3) {
        animation-delay: 0.6s;
    }

    @media screen and (width <= 768px) {
        min-width: 120px;
        padding: 12px 20px;
    }
`;

export const StatValue = styled.span`
    color: #ff6a00;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 5px;

    @media screen and (width <= 768px) {
        font-size: 1.5rem;
    }
`;

export const StatLabel = styled.span`
    color: rgb(255 255 255 / 70%);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

export const ScrollDownIndicator = styled.div`
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    z-index: 10;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    cursor: pointer;

    &:hover {
        opacity: 1;
    }
`;

export const ScrollArrow = styled.div`
    width: 30px;
    height: 30px;
    margin-top: 8px;

    &::before {
        content: "";
        position: absolute;
        width: 15px;
        height: 15px;
        border-right: 2px solid #ff6a00;
        border-bottom: 2px solid #ff6a00;
        transform: rotate(45deg);
        animation: ${pulse} 2s infinite;
    }
`;

// Icons
export const ArrowForward = styled(FaArrowRight)`
    margin-left: 8px;
    font-size: 1.2rem;
`;

export const ArrowRight = styled(FaArrowRight)`
    margin-left: 8px;
    font-size: 1.2rem;
`;

// Video Background (legacy support)
export const VideoBg = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: #0a0a0a;
    position: absolute;
    top: 0;
    left: 0;
`;
