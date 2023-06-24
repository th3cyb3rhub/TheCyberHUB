import React from "react";
import { TimelineContainer } from "./InternshipTimelineElements";
import { getCDNUrl } from "../../../features/apiUrl";

const InternshipTimeline = () => {
    return (
        <TimelineContainer>
            <img src={getCDNUrl + "/assets/images/Timeline.png"} alt="" />
        </TimelineContainer>
    );
};

export default InternshipTimeline;
