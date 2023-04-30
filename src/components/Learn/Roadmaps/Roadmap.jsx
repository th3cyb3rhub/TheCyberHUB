import React from "react";

import { useParams } from "react-router-dom";
import RoadmapsData from "./RoadmapsData";
import { encodeURL } from "../../Blogs/util";
import {
    HrLine,
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
import { DotSymbol } from "../../Homepage/Info/InfoElements";

const Roadmap = () => {
    const { title } = useParams();
    const SelectedRoadmap = RoadmapsData?.find(
        (roadmap) => encodeURL(roadmap?.title).toLowerCase() === title.toLowerCase(),
    );

    return (
        <RoadmapContainer>
            <RoadmapHeadingSection>
                <RoadmapHeading> {SelectedRoadmap?.title} </RoadmapHeading>
            </RoadmapHeadingSection>

            <RoadmapDetailsContainer>
                {SelectedRoadmap?.details.map((resources, id) => (
                    <RoadmapDetails key={id}>
                        <RoadmapSectionHeading> {resources?.section} </RoadmapSectionHeading>
                        {resources?.resources.map((resource, id) => (
                            <RoadmapDetailsCard key={id}>
                                <DotSymbol />
                                <RedirectLink href={resource?.url} target={"_blank"}>
                                    <RoadmapContentHeading>{resource?.title}</RoadmapContentHeading>
                                </RedirectLink>
                            </RoadmapDetailsCard>
                        ))}
                        {/* <HrLine/> */}
                    </RoadmapDetails>
                ))}
            </RoadmapDetailsContainer>

            <HrLine />

            {/* <RoadmapsContainer> */}
            {/*    <Container> */}
            {/*        <RelatedRoadmaps>Related Roadmaps</RelatedRoadmaps> */}
            {/*        <RouterLink to={"/learn/roadmaps"}> */}
            {/*            <AllRoadmaps>All Roadmaps</AllRoadmaps> */}
            {/*        </RouterLink> */}
            {/*    </Container> */}
            {/*    <Roadmaps /> */}
            {/*    /!*{RoadmapsData.map((roadmap, id) => (*!/ */}
            {/*    /!*    <RouterLink key={id} to={{ pathname: `../` + `${encodeURL(roadmap.title)}` }}>*!/ */}
            {/*    /!*        <RoadmapInlineCard key={id}>*!/ */}
            {/*    /!*            <RoadmapsHeading>{roadmap.title} </RoadmapsHeading>*!/ */}
            {/*    /!*            <RoadmapsDesc>{roadmap.desc} </RoadmapsDesc>*!/ */}
            {/*    /!*        </RoadmapInlineCard>*!/ */}
            {/*    /!*    </RouterLink>*!/ */}
            {/*    /!*))}*!/ */}
            {/* </RoadmapsContainer> */}
        </RoadmapContainer>
    );
};

export default Roadmap;
