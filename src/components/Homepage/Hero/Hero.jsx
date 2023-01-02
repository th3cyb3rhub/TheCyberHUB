import React, { useState } from "react";

import {
    HeroContainer,
    HeroBg,
    VideoBg,
    HeroContent,
    HeroH1,
    HeroP,
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight,
} from "./HeroElements";
import { Button } from "../../Other/MixComponents/Buttons/ButtonElements";
import Video from "../../../assets/video/thecyberhubBackgroundVideo.mp4";

const Hero = () => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
    };
    // const [loading, setLoading] = useState(false);
    // useEffect(() => {setLoading(true);setTimeout(() => {setLoading(false);}, 2000);}, []);

    return (
        <HeroContainer id={"home"}>
            <HeroBg>
                {/* {loading  && */}
                {/*    <ImageBg src={Image}/> */}
                {/* } */}
                <VideoBg autoPlay loop muted src={Video} type={"video/mp4"} />
            </HeroBg>

            <HeroContent>
                <HeroH1> Cyber Security Made Easy. </HeroH1>
                <HeroP> Cyber Security is a field that is growing at an exponential rate. </HeroP>

                <HeroBtnWrapper>
                    <Button
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
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    );
};

export default Hero;
