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
import { ScrollButton } from "src/components/Other/MixComponents/Buttons/ButtonElements";
import { getCdnAssets } from "src/features/apiUrl";

import greenBG from "src/assets/greenBG.png";
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
                <HeroH1>Empowering Cybersecurity Enthusiasts</HeroH1>
                <HeroP>Join a thriving community and unlock the limitless potential of cybersecurity.</HeroP>

                <HeroBtnWrapper>
                    <ScrollButton
                        href="/about"
                        to="about"
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
