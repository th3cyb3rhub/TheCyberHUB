import React from "react";
import { ExploreContainer, ExploreHeading, LeftBlogSidebarContainer } from "./LeftBlogSidebarElements";
import {
    AiTwotoneFlag,
    BsChevronDoubleRight,
    BsFillBookmarksFill,
    CgFeed,
    MdNoteAlt,
    MdOutlineTravelExplore,
} from "react-icons/all";

const LeftBlogSidebar = () => {
    return (
        <LeftBlogSidebarContainer>
            <ExploreContainer>
                <ExploreHeading>
                    {" "}
                    <CgFeed /> My Feed{" "}
                </ExploreHeading>
                <ExploreHeading>
                    {" "}
                    <MdOutlineTravelExplore /> Explore{" "}
                </ExploreHeading>
                <ExploreHeading>
                    {" "}
                    <MdNoteAlt /> Drafts{" "}
                </ExploreHeading>
                <ExploreHeading>
                    {" "}
                    <BsFillBookmarksFill /> Bookmarks{" "}
                </ExploreHeading>
                <ExploreHeading>
                    {" "}
                    <AiTwotoneFlag /> Capture The Flag{" "}
                </ExploreHeading>
                <ExploreHeading>
                    {" "}
                    <BsChevronDoubleRight /> More{" "}
                </ExploreHeading>
            </ExploreContainer>
        </LeftBlogSidebarContainer>
    );
};

export default LeftBlogSidebar;