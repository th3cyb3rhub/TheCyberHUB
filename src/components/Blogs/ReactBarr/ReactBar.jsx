import React from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import styled from "styled-components";
import { PostStat, PostStatLabel } from "src/components/Feeds/FeedPosts/FeedPostsElements.jsx";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import { Link as ScrollLink } from "react-scroll";

const SocialBarContainer = styled.div`
    color: #f4f4f4;
    position: fixed;
    bottom: 0;
    width: 20%;
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #1e1e1e;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 -2px 8px rgb(0 0 0 / 10%);
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    & span {
        margin-left: 5px;
    }

    & svg {
        width: 20px;
        height: 20px;
        color: #d5d5d5;
    }

    &:hover svg {
        color: #ff6b08;
    }
`;

const ReactBar = ({ handleBookmark, isBookmarked, blog }) => {
    return (
        <SocialBarContainer>
            <IconContainer>
                <FaHeart />
                <span>10</span>
            </IconContainer>
            <IconContainer>
                <ScrollLink to={"comments"} smooth={true} duration={500} spy={true} exact="true" offset={-80}>
                    <FaComment />
                </ScrollLink>
            </IconContainer>
            <PostStat>
                <PostStatLabel onClick={() => handleBookmark(blog?._id)}>
                    {isBookmarked(blog?._id) ? <BsBookmarksFill color={"#ff6b08"} /> : <BsBookmarks />}
                </PostStatLabel>
            </PostStat>
            <IconContainer>
                <FaShare />
            </IconContainer>
        </SocialBarContainer>
    );
};

export default ReactBar;
