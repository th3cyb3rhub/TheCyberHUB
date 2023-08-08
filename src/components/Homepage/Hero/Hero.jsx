import React, { useState } from "react";

import {
    ArrowForward,
    ArrowRight,
    HeroBg,
    HeroBtnWrapper,
    HeroContainer,
    HeroContent,
    HeroH1,
    HeroP,
    VideoBg,
} from "./HeroElements";

import { ScrollButton } from "../../Other/MixComponents/Buttons/ButtonElements";
import { getCdnAssets } from "../../../features/apiUrl";

import greenBG from "../../../assets/greenBG.png";
const video = `${getCdnAssets}/video/bgvideo.mp4`;

const Hero = () => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
    };

    return (
        <HeroContainer id={"home"}>
            <HeroBg>
                <VideoBg autoPlay loop muted poster={greenBG} type="video/mp4">
                    <source src={video} type="video/mp4" />
                </VideoBg>
            </HeroBg>
            <HeroContent>
                <HeroH1> Unlock the Power of Cybersecurity </HeroH1>
                <HeroP> Join a thriving community and explore the limitless possibilities. </HeroP>

                <HeroBtnWrapper>
                    <ScrollButton
                        to={"about"}
                        onMouseEnter={onHover}
                        onMouseLeave={onHover}
                        primary={"true"}
                        dark={"true"}
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact="true"
                        offset={-80}
                    >
                        Get Started {hover ? <ArrowRight /> : <ArrowForward />}
                    </ScrollButton>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    );
};

export default Hero;
