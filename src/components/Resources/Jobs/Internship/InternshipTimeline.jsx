import React from "react";
import { TimelineContainer } from "./InternshipTimelineElements";

import TimelineImage from "../../../../assets/timeline.png";

const InternshipTimeline = () => {
    return (
        <TimelineContainer>
            <img src={TimelineImage} alt="" />
        </TimelineContainer>
    );
};

export default InternshipTimeline;
