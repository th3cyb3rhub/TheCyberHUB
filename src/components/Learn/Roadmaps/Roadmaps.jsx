import React from "react";
import {
    RoadmapCard,
    RoadmapHeading,
    RoadmapDesc,
    Overlay,
    RoadmapsContainer,
    OverlayDetails,
} from "./RoadmapsElements";

import RoadmapsData from "./RoadmapsData";
import { encodeURL } from "../../Blogs/util";
import { RouterLink } from "./RoadmapElements";

const Colors = ["greenyellow", "cornflowerblue", "darkorange", "darkgray", "mediumpurple"];

const Roadmaps = () => {
    return (
        <>
            <RoadmapsContainer>
                {RoadmapsData?.map((roadmap, id) => {
                    return (
                        <RouterLink key={id} to={{ pathname: `${encodeURL(roadmap?.title)}` }}>
                            {roadmap.details.map((resources, id) => {
                                return (
                                    <Overlay key={id}>
                                        {resources?.section === "Coming Soon" && (
                                            <OverlayDetails>{resources?.section}</OverlayDetails>
                                        )}
                                    </Overlay>
                                );
                            })}
                            <RoadmapCard>
                                <RoadmapHeading style={{ color: `${Colors[id]}` }}> {roadmap?.title} </RoadmapHeading>
                                <RoadmapDesc> {roadmap?.desc} </RoadmapDesc>
                            </RoadmapCard>
                        </RouterLink>
                    );
                })}
            </RoadmapsContainer>
        </>
    );
};

export default Roadmaps;
