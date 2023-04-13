import React from "react";

import {
    ExperienceCompany,
    ExperienceContainer,
    ExperienceDescription,
    ExperienceDuration,
    ExperienceHeading,
    ExperienceItem,
    ExperienceLink,
    ExperienceLinks,
    ExperienceList,
    ExperiencePosition,
} from "./ExperienceElements";

const Experience = () => {
    const experience = [
        {
            company: "Company 1",
            industry: "Industry 1",
            duration: "Duration 1",
            position: "Position 1",
            currentlyWorking: true,
            description: "Description 1",
            links: {
                website: "https://www.google.com",
                github: "https://www.github.com",
                linkedin: "https://www.linkedin.com",
            },
        },
        {
            company: "Company 2",
            industry: "Industry 2",
            duration: "Duration 2",
            position: "Position 2",
            currentlyWorking: false,
            description: "Description 2",
            links: {
                website: "https://www.google.com",
                github: "https://www.github.com",
                linkedin: "https://www.linkedin.com",
            },
        },
    ];
    return (
        <ExperienceContainer>
            <ExperienceHeading>Experience</ExperienceHeading>
            <ExperienceList>
                {experience.map((item, index) => (
                    <ExperienceItem key={index}>
                        <ExperienceCompany>{item.company}</ExperienceCompany>
                        <ExperiencePosition>{item.position}</ExperiencePosition>
                        <ExperienceDuration>{item.duration}</ExperienceDuration>
                        <ExperienceDescription> {item.description} </ExperienceDescription>
                        <ExperienceLinks>
                            {Object.keys(item.links).map((links, index) => (
                                <ExperienceLink key={index} href={item.links[links]} target="_blank" />
                            ))}
                        </ExperienceLinks>
                    </ExperienceItem>
                ))}
            </ExperienceList>
        </ExperienceContainer>
    );
};

export default Experience;
