import React from "react";

import {
    DisplayTimelineItemContainer,
    DisplayTimelineItemContextContainer,
    DisplayTimelineItemDescription,
    DisplayTimelineItemOtherInfoContainer,
    DisplayTimelineItemProgramContainer,
    DisplayTimelineItemTitle,
    DisplayTimelineItemTopic,
} from "./DisplayTimelineElements";
import UserInfo from "src/components/Dashboard/Profile/UserLinks/UserInfo";
import DurationDisplay from "src/components/Common/DurationDisplay/DurationDisplay";

const DisplayTimelineItem = ({ children }) => {
    const programInfo = {
        name: children.program,
    };
    return (
        <DisplayTimelineItemContainer>
            <DisplayTimelineItemProgramContainer>
                {/* User - activity/speaker */}
                <UserInfo
                    heightSize="120px"
                    widthSize="120px"
                    fontSizeName="1rem"
                    fontSizeUsername="0.8rem"
                    avatarPath=""
                >
                    {programInfo}
                </UserInfo>
            </DisplayTimelineItemProgramContainer>
            <DisplayTimelineItemOtherInfoContainer>
                <DisplayTimelineItemContextContainer>
                    <DisplayTimelineItemTitle>{children.title}</DisplayTimelineItemTitle>
                    <DisplayTimelineItemTopic>{children.topic}</DisplayTimelineItemTopic>
                    <DisplayTimelineItemDescription>{children.description}</DisplayTimelineItemDescription>
                </DisplayTimelineItemContextContainer>
                <DurationDisplay showDate>{children}</DurationDisplay>
            </DisplayTimelineItemOtherInfoContainer>
        </DisplayTimelineItemContainer>
    );
};
export default DisplayTimelineItem;
