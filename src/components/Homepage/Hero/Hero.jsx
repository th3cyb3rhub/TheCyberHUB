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
import Video from "../../../assets/video/thecyberhubBackgroundVideo.mp4";

const Hero = () => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
    };

    return (
        <HeroContainer id={"home"}>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type={"video/mp4"} />
            </HeroBg>

            <HeroContent>
                <HeroH1> Cyber Security Made Easy. </HeroH1>
                <HeroP> Cyber Security is a field that is growing at an exponential rate. </HeroP>

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
                        Get Started {hover ? <ArrowForward /> : <ArrowRight />}
                    </ScrollButton>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    );
};

export default Hero;
