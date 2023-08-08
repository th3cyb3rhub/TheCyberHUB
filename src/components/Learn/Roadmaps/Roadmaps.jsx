import React from "react";
import { RoadmapCard, RoadmapCardsContainer, RoadmapDesc, RoadmapHeading, RoadmapsContainer } from "./RoadmapsElements";

import RoadmapsData from "./RoadmapsData";
import { encodeURL } from "../../Blogs/util";
import { RouterLink } from "./RoadmapElements";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";

const Colors = [
    "darkorange",
    "#ff1f19",
    "#00b2ff",
    "#149eca",
    "#dfdfdf",
    "#4abfdf",
    "darkorange",
    "cornflowerblue",
    "#00b2ff",
    "darkgray",
    "mediumpurple",
];

const Roadmaps = () => {
    return (
        <Wrapper>
            <RoadmapsContainer>
                <RoadmapCardsContainer>
                    {RoadmapsData?.map((roadmap, id) => {
                        return (
                            <RouterLink key={id} to={{ pathname: `${encodeURL(roadmap?.title)}` }}>
                                <RoadmapCard>
                                    <RoadmapHeading style={{ color: `${Colors[id]}` }}>
                                        {roadmap?.title}{" "}
                                    </RoadmapHeading>
                                    <RoadmapDesc> {roadmap?.desc} </RoadmapDesc>
                                </RoadmapCard>
                            </RouterLink>
                        );
                    })}
                </RoadmapCardsContainer>
            </RoadmapsContainer>
        </Wrapper>
    );
};

export default Roadmaps;
