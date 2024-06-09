import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoadmapsData from "./RoadmapsData";
import { encodeURL } from "src/components/Blogs/util";
import {
    RedirectLink,
    RoadmapContainer,
    RoadmapContentHeading,
    RoadmapDetails,
    RoadmapDetailsCard,
    RoadmapDetailsContainer,
    RoadmapHeading,
    RoadmapHeadingSection,
    RoadmapSectionHeading,
} from "./RoadmapElements";
import { DotSymbol } from "src/components/Homepage/Info/InfoElements";
import { Checkbox, CheckboxContainer } from "src/components/Courses/LearningPath/LearningPathElements.jsx";

const Roadmap = () => {
    const { title } = useParams();
    const SelectedRoadmap = RoadmapsData?.find(
        (roadmap) => encodeURL(roadmap?.title).toLowerCase() === title.toLowerCase(),
    );

    const [checkboxState, setCheckboxState] = useState(() => {
        return JSON.parse(localStorage.getItem(`roadmaps-localstorage`)) || {};
    });

    useEffect(() => {
        localStorage.setItem(`roadmaps-localstorage`, JSON.stringify(checkboxState));
    }, [checkboxState, title]);

    const handleCheckboxChange = (section, resource) => {
        const newState = {
            ...checkboxState,
            [section]: {
                ...checkboxState[section],
                [resource]: !checkboxState[section]?.[resource],
            },
        };
        setCheckboxState(newState);
    };

    return (
        <RoadmapContainer>
            <RoadmapHeadingSection>
                <RoadmapHeading> {SelectedRoadmap?.title} </RoadmapHeading>
            </RoadmapHeadingSection>

            <RoadmapDetailsContainer>
                {SelectedRoadmap?.details.map((resources, sectionId) => (
                    <RoadmapDetails key={sectionId}>
                        <RoadmapSectionHeading> {resources?.section} </RoadmapSectionHeading>
                        {resources?.resources.map((resource, resourceId) => (
                            <RoadmapDetailsCard key={resourceId}>
                                <DotSymbol />
                                <RedirectLink href={resource?.url} target={"_blank"}>
                                    <RoadmapContentHeading>{resource?.title}</RoadmapContentHeading>
                                </RedirectLink>
                                <CheckboxContainer>
                                    <Checkbox
                                        type="checkbox"
                                        checked={checkboxState[resources.section]?.[resource.title] || false}
                                        onChange={() => handleCheckboxChange(resources.section, resource.title)}
                                    />
                                </CheckboxContainer>
                            </RoadmapDetailsCard>
                        ))}
                    </RoadmapDetails>
                ))}
            </RoadmapDetailsContainer>
        </RoadmapContainer>
    );
};

export default Roadmap;
