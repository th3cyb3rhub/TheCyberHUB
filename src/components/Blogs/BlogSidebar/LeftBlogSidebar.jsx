import React from "react";
import { ExploreContainer, ExploreHeading, LeftBlogSidebarContainer, RouterLink } from "./LeftBlogSidebarElements";
import { AiTwotoneFlag } from "react-icons/ai";
import { MdOutlineTravelExplore } from "react-icons/md";

const LeftBlogSidebar = () => {
    return (
        <LeftBlogSidebarContainer>
            <ExploreContainer>
                {/* <ExploreHeading> */}
                {/*    <CgFeed/> My Feeds */}
                {/* </ExploreHeading> */}
                <RouterLink to={"/tags"}>
                    <ExploreHeading>
                        <MdOutlineTravelExplore /> Explore
                    </ExploreHeading>
                </RouterLink>
                {/* <ExploreHeading> */}
                {/*    <MdNoteAlt/> Drafts */}
                {/* </ExploreHeading> */}
                {/* <ExploreHeading> */}
                {/*    <BsFillBookmarksFill/> Bookmarks */}
                {/* </ExploreHeading> */}
                <RouterLink to={"/ctf"}>
                    <ExploreHeading>
                        <AiTwotoneFlag /> CTF
                    </ExploreHeading>
                </RouterLink>
                {/* <ExploreHeading> */}
                {/*    <BsChevronDoubleRight/> More */}
                {/* </ExploreHeading> */}
            </ExploreContainer>
        </LeftBlogSidebarContainer>
    );
};

export default LeftBlogSidebar;
