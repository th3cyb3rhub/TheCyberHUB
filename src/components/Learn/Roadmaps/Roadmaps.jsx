import React from "react";
import {
    RoadmapCard,
    RoadmapHeading,
    RoadmapDesc,
    Overlay,
    RoadmapContainer,
    OverlayDetails,
} from "./RoadmapsElements";

import RoadmapsData from "./RoadmapsData";
import { encodeURL } from "../Blogs/util";
import { RouterLink } from "./RoadmapElements";

const Roadmaps = () => {
    return (
        <>
            <RoadmapContainer>
                {RoadmapsData.map((roadmap, id) => {
                    return (
                        <RouterLink key={id} to={{ pathname: `${encodeURL(roadmap.title)}` }}>
                            {roadmap.details.map((resources) => {
                                return (
                                    <>
                                        {resources.section === "Coming Soon" && (
                                            <Overlay key={id}>
                                                <OverlayDetails>{resources.section}</OverlayDetails>
                                            </Overlay>
                                        )}
                                    </>
                                );
                            })}
                            <RoadmapCard key={id}>
                                <RoadmapHeading> {roadmap.title} </RoadmapHeading>
                                <RoadmapDesc> {roadmap.desc} </RoadmapDesc>
                            </RoadmapCard>
                        </RouterLink>
                    );
                })}
            </RoadmapContainer>
        </>
    );
};

export default Roadmaps;
