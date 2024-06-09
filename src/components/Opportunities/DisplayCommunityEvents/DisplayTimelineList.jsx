import React from "react";

import DisplayTimelineItem from "./DisplayTimelineItem";
import { DisplayTimelineContainer } from "./DisplayTimelineElements";

const DisplayTimelineList = ({ children }) => {
    const timelineListItems = children?.map((item) => <DisplayTimelineItem key={item._id}>{item}</DisplayTimelineItem>);
    return <DisplayTimelineContainer>{timelineListItems}</DisplayTimelineContainer>;
};
export default DisplayTimelineList;
