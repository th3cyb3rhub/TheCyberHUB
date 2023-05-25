import React from "react";
import { ExploreContainer, ExploreHeading, LeftBlogSidebarContainer, RouterLink } from "./LeftBlogSidebarElements";
import { AiTwotoneFlag, MdOutlineTravelExplore } from "react-icons/all";

const LeftBlogSidebar = () => {
    return (
        <LeftBlogSidebarContainer>
            <ExploreContainer>
                {/* <ExploreHeading> */}
                {/*    <CgFeed/> My Feed */}
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
