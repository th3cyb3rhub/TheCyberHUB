import React from "react";

import { useParams } from "react-router-dom";
import RoadmapsData from "./RoadmapsData";
import { encodeURL } from "../Blogs/util";
import {
    RoadmapContainer,
    RedirectLink,
    RoadmapSectionHeading,
    RoadmapDetails,
    RoadmapDetailsCard,
    RoadmapContentHeading,
    RoadmapDetailsContainer,
    DotIcon,
    CircleIcon,
    HrLine,
} from "./RoadmapElements";

const Roadmap = () => {
    const { title } = useParams();
    const SelectedRoadmap = RoadmapsData.find(
        (roadmap) => encodeURL(roadmap.title).toLowerCase() === title.toLowerCase(),
    );

    return (
        <RoadmapContainer>
            <h1>{SelectedRoadmap.title}</h1>
            {/* <p>{SelectedRoadmap.desc}</p> */}
            {/* <p>{SelectedRoadmap.details.section}</p> */}

            <RoadmapDetailsContainer>
                {SelectedRoadmap?.details.map((resources, id) => (
                    <RoadmapDetails key={id}>
                        <RoadmapSectionHeading>
                            <DotIcon /> {resources.section}
                        </RoadmapSectionHeading>
                        {resources?.resources.map((resource, id) => (
                            <RedirectLink key={id} href={resource.url} target={"_blank"}>
                                <RoadmapDetailsCard>
                                    <RoadmapContentHeading>
                                        <CircleIcon /> {resource.title}
                                    </RoadmapContentHeading>
                                </RoadmapDetailsCard>
                            </RedirectLink>
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
