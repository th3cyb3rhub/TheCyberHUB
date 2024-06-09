import React, { useState } from "react";
import {
    Caption,
    Title,
    CTABtn,
    BottomLeftInnerCard,
    LastThirtyDaysBtn,
    BottomSection,
    BottomLeftSection,
    BottomLeftSectionCaption,
    BottomSectionCaptionTitle,
    LastUpdated,
    TimeCaptionBtnHours,
    TimeCaptionBtnDays,
    BottomRightSection,
    BottomRightSectionInnerCard,
    PopularPostCard,
    PostDetails,
    PostTitleDate,
    PostIcons,
    PostTitle,
    PostDate,
    LikesIcon,
    CommentsIcon,
} from "./AnalyticsPageBottomSectionMainContentElements";
import { AnalyticsMainBarChart } from "./AnalyticsMainBarChart";
import { CiHeartIcon, IoChatboxOutlineIcon } from "./AnalyticsIconElements";
import myPosts from "./AnalyticsPostsData.json";
import { lastAmountOfDays, lastAmountOfMinAgo, timeBtns } from "./AnalyticsUtils";
import Visitors from "./AnalyticsVisitorsData.json";

export const AnalyticsPageBottomSectionMainContent = () => {
    const DAYS = "days";
    const HOURS = "hours";
    const [timePeriod, setTimePeriod] = useState(HOURS);

    const getFormattedDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toDateString();
    };

    return (
        <BottomSection>
            <BottomLeftSection>
                <BottomLeftSectionCaption>
                    <BottomSectionCaptionTitle>
                        <Title>{Visitors[0].title}</Title>
                        <LastUpdated>Last updated {lastAmountOfMinAgo} min ago</LastUpdated>
                    </BottomSectionCaptionTitle>
                    <CTABtn>
                        <TimeCaptionBtnHours onClick={() => setTimePeriod(HOURS)}>
                            {timeBtns[0].time}
                        </TimeCaptionBtnHours>
                        <TimeCaptionBtnDays onClick={() => setTimePeriod(DAYS)}>{timeBtns[1].time}</TimeCaptionBtnDays>
                    </CTABtn>
                </BottomLeftSectionCaption>
                <BottomLeftInnerCard>
                    <AnalyticsMainBarChart timePeriod={timePeriod} />
                </BottomLeftInnerCard>
            </BottomLeftSection>
            <BottomRightSection>
                <Caption>
                    <BottomSectionCaptionTitle>
                        <Title>Popular Post </Title>
                        <LastUpdated>Last updated {lastAmountOfMinAgo} min ago</LastUpdated>
                    </BottomSectionCaptionTitle>
                    <CTABtn>
                        <LastThirtyDaysBtn>Last {lastAmountOfDays} days</LastThirtyDaysBtn>
                    </CTABtn>
                </Caption>
                <BottomRightSectionInnerCard>
                    {myPosts.map((myPost) => (
                        <PopularPostCard key={myPost.id}>
                            <PostDetails>
                                <PostTitleDate>
                                    <PostTitle>{myPost.title}</PostTitle>
                                    <PostDate>{getFormattedDate(myPost.datetime)}</PostDate>
                                </PostTitleDate>
                            </PostDetails>
                            <PostIcons>
                                <LikesIcon>
                                    <CiHeartIcon />
                                    {myPost.likes}
                                </LikesIcon>
                                <CommentsIcon>
                                    <IoChatboxOutlineIcon />
                                    {myPost.views}
                                </CommentsIcon>
                            </PostIcons>
                        </PopularPostCard>
                    ))}
                </BottomRightSectionInnerCard>
            </BottomRightSection>
        </BottomSection>
    );
};
