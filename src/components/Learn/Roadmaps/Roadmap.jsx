import React from 'react';

import {useParams} from "react-router-dom";
import RoadmapsData from "./RoadmapsData";
import {encodeURL} from "../Blogs/util";
import {
    Roadmaps,
    RelatedRoadmaps,
    RoadmapContainer,
    RoadmapsHeading,
    RoadmapsDesc,
    RoadmapInlineCard,
    AllRoadmaps,
    Container,
    RouterLink,
    RoadmapsFooter,
    RedirectLink,
    RoadmapSectionHeading,
    RoadmapDetails,
    RoadmapDetailsCard, RoadmapContentHeading,RoadmapDetailsContainer
} from "./RoadmapElements";

const Roadmap = () => {
    const {title} = useParams();
    let SelectedRoadmap = RoadmapsData.find((roadmap) => encodeURL(roadmap.title).toLowerCase() === title.toLowerCase());


    return (
        <RoadmapContainer>
            <h1>{SelectedRoadmap.title}</h1>
            {/*<p>{SelectedRoadmap.desc}</p>*/}
            {/*<p>{SelectedRoadmap.details.section}</p>*/}

            <RoadmapDetailsContainer>
                {SelectedRoadmap.details.map((resources) => {
                    return (
                        <RoadmapDetails>
                            <RoadmapSectionHeading>{resources.section}</RoadmapSectionHeading>
                            {resources.resources.map((resource) => {
                                return (
                                    <RedirectLink href={resource.url} target={"_blank"}>
                                        <RoadmapDetailsCard>
                                            <RoadmapContentHeading>{resource.title}</RoadmapContentHeading>
                                        </RoadmapDetailsCard>
                                    </RedirectLink>
                                )
                            })}
                        </RoadmapDetails>
                    )
                })}
            </RoadmapDetailsContainer>

            <hr style={{width: "65em"}}/>

            <Roadmaps>
                <Container>
                    <RelatedRoadmaps>Related Roadmaps</RelatedRoadmaps>
                    <RouterLink to={"/learn/roadmaps"}>
                        <AllRoadmaps>All Roadmaps</AllRoadmaps>
                    </RouterLink>

                </Container>
                {RoadmapsData.map((roadmap) => {
                    return (
                        <RouterLink to={{pathname: `../` + `${encodeURL(roadmap.title)}`}}>
                            <RoadmapInlineCard>
                                <RoadmapsHeading>{roadmap.title} </RoadmapsHeading>
                                <RoadmapsDesc>{roadmap.desc} </RoadmapsDesc>
                            </RoadmapInlineCard>
                        </RouterLink>
                    )
                })}
            </Roadmaps>
        </RoadmapContainer>
    );
};

export default Roadmap;