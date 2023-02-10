import React from "react";
import { BlogStatus, DraftStatus, RightBlogSidebarContainer, SeeAll, TrendingBlogs } from "./RightBlogSidebarElements";
import { SubContainerHeading, SubContainerTop } from "../BlogsElements";

const RightBlogSidebar = () => {
    return (
        <RightBlogSidebarContainer>
            <BlogStatus>
                <SubContainerTop>
                    <SubContainerHeading> Blog Status </SubContainerHeading>
                    <SeeAll to={"/dashboard"}> Dashboard </SeeAll>
                </SubContainerTop>
                Pageviews Articles Appreciations <br />
                Pageviews <br />7 Days 30 Days
            </BlogStatus>

            <DraftStatus>
                <SubContainerTop>
                    <SubContainerHeading> Drafts (2) </SubContainerHeading>
                    <SeeAll to={"/dashboard/drafts"}> See all </SeeAll>
                </SubContainerTop>
            </DraftStatus>
            <TrendingBlogs>
                <SubContainerTop>
                    <SubContainerHeading> Trending </SubContainerHeading>
                    <SeeAll to={"trending"}> See all </SeeAll>
                </SubContainerTop>
            </TrendingBlogs>
        </RightBlogSidebarContainer>
    );
};

export default RightBlogSidebar;
