import React from "react";
import { TimelineContainer } from "./InternshipTimelineElements";
import { getCdnAssets } from "src/features/apiUrl";

const InternshipTimeline = () => {
    return (
        <TimelineContainer>
            <img src={getCdnAssets + "/images/Timeline.png"} alt="" />
        </TimelineContainer>
    );
};

export default InternshipTimeline;
