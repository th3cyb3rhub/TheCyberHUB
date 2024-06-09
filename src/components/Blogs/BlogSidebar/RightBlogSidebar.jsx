import React from "react";
import {
    BlogStatus,
    DraftStatus,
    RightBlogSidebarContainer,
    SeeAll,
    TrendingBlogs,
} from "src/components/Blogs/BlogSidebar/RightBlogSidebarElements";
import { SubContainerTop } from "src/components/Blogs/BlogsElements";

const RightBlogSidebar = () => {
    return (
        <RightBlogSidebarContainer>
            <BlogStatus>
                <SubContainerTop>
                    <h4> Blog Status </h4>
                    <SeeAll to={"/dashboard"}> Dashboard </SeeAll>
                </SubContainerTop>
                Pageviews Articles Appreciations <br />
                Pageviews <br />7 Days 30 Days
            </BlogStatus>

            <DraftStatus>
                <SubContainerTop>
                    <h4> Drafts (2) </h4>
                    <SeeAll to={"/dashboard/drafts"}> See all </SeeAll>
                </SubContainerTop>
            </DraftStatus>
            <TrendingBlogs>
                <SubContainerTop>
                    <h4> Trending </h4>
                    <SeeAll to={"trending"}> See all </SeeAll>
                </SubContainerTop>
            </TrendingBlogs>
        </RightBlogSidebarContainer>
    );
};

export default RightBlogSidebar;
