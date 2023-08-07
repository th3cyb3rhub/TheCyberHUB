import React from "react";
import { TimelineContainer } from "./InternshipTimelineElements";
import { getCdnAssets } from "../../../features/apiUrl";

const InternshipTimeline = () => {
    return (
        <TimelineContainer>
            <img src={getCdnAssets + "/images/Timeline.png"} alt="" />
        </TimelineContainer>
    );
};

export default InternshipTimeline;
