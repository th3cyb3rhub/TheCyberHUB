import React from "react";
import { AboutSection } from "./ProfileElements";
import { AchievementHeading } from "./Achievements/AchievementsElements";

const AboutMe = ({ aboutMe }) => {
    return (
        <AboutSection>
            <AchievementHeading>About Me</AchievementHeading>
            <p className="about-me">{aboutMe}</p>
        </AboutSection>
    );
};

export default AboutMe;
