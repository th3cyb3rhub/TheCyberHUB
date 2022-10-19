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
import { Button } from "../../MixComponents/Buttons/ButtonElements";
import Spinner from "../../MixComponents/Spinner/Spinner";

const Hero = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };

  return (
    <HeroContainer id={"home"}>
      <HeroBg>
        <VideoBg
          autoPlay
          loop
          muted
          src={
            "https://firebasestorage.googleapis.com/v0/b/thecyberhub-dd340.appspot.com/o/videos%2FUntitled.mp4?alt=media&token=13a3bd46-48f4-400b-a756-6093688ab279"
          }
          type={"video/mp4"}
        />
      </HeroBg>

      <HeroContent>
        <HeroH1> Cyber Security Made Easy. </HeroH1>
        <HeroP>Cyber Security is a field that is growing at an exponential rate.</HeroP>

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
