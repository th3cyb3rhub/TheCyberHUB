import React from "react";
import { AboutSection } from "./ProfileElements";

const AboutMe = ({ aboutMe }) => {
    return (
        <AboutSection>
            <h2>About Me</h2>
            <p className="about-me">{aboutMe}</p>
        </AboutSection>
    );
};

export default AboutMe;
