import React from "react";
import {
    FeedPostContainer,
    LeftSection,
    PostContent,
    PostHeader,
    PostHeaderImg,
    PostHeaderUsername,
    PostTag,
    PostTags,
    PostTimestamp,
    RightSection,
} from "./FeedPostsElements";
import PostActionsAndStats from "./PostActionsAndStats";
import { RouteLink } from "../../Dashboard/Sidebar/SidebarElements";
import { dateFormatter } from "../../Common/dateFormatter";

const FeedPost = ({ feed, user, feedComments }) => {
    return (
        <FeedPostContainer>
            <LeftSection>
                <PostHeaderImg src={"https://avatars.githubusercontent.com/u/44284877?v=4"} alt="Profile picture" />
            </LeftSection>
            <RightSection>
                <RouteLink to={`/feeds/${feed?._id}`}>
                    <PostHeader>
                        <LeftSection>
                            <PostHeaderUsername>{feed?.username}</PostHeaderUsername>
                        </LeftSection>{" "}
                        • <PostTimestamp>{dateFormatter({ date: new Date(feed?.createdAt) })}</PostTimestamp>
                    </PostHeader>
                    <PostContent>{feed?.content}</PostContent>
                </RouteLink>

                {feed?.tags || feed?.tags[0] !== "" || feed?.tags.length !== 0 ? (
                    <PostTags>{feed?.tags.map((tag, id) => tag !== "" && <PostTag key={id}>#{tag}</PostTag>)}</PostTags>
                ) : null}

                <PostActionsAndStats feed={feed} user={user} itemType={"feed"} />
            </RightSection>
        </FeedPostContainer>
    );
};

export default FeedPost;
