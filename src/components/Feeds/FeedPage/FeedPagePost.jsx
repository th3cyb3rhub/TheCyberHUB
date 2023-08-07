import React from "react";
import {
    FeedPostContainer,
    RightSection,
    LeftSection,
    PostContent,
    PostHeader,
    PostHeaderImg,
    PostHeaderUsername,
    PostTag,
    PostTags,
    PostTimestamp,
} from "../FeedPosts/FeedPostsElements";
import { RouteLink } from "../../Dashboard/Sidebar/SidebarElements";
import PostActionsAndStats from "../FeedPosts/PostActionsAndStats";
import { dateFormatter } from "../../Common/dateFormatter";

const FeedPagePost = ({ feed, feedComments, user }) => {
    return (
        <FeedPostContainer>
            <LeftSection>
                <PostHeaderImg src={"https://avatars.githubusercontent.com/u/44284877?v=4"} alt="Profile picture" />
            </LeftSection>
            <RightSection>
                <PostHeader>
                    <RouteLink to={`/@${feed?.username}`}>
                        <LeftSection>
                            <PostHeaderUsername>{feed?.username}</PostHeaderUsername>
                        </LeftSection>
                    </RouteLink>
                    • <PostTimestamp>{dateFormatter({ date: new Date(feed?.createdAt) })}</PostTimestamp>
                </PostHeader>
                <PostContent>{feed?.content}</PostContent>

                {feed?.tags ? (
                    <PostTags>
                        {feed?.tags.map(
                            (tag, id) =>
                                tag !== "" && (
                                    <RouteLink to={`/explore/${tag}`} key={id}>
                                        <PostTag key={id}>#{tag}</PostTag>
                                    </RouteLink>
                                ),
                        )}
                    </PostTags>
                ) : null}

                <PostActionsAndStats feed={feed} feedComments={feedComments} user={user} itemType={"feed"} />
            </RightSection>
        </FeedPostContainer>
    );
};

export default FeedPagePost;
