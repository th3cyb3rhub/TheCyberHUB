import React from "react";
import {
    FeedPostContainer,
    LeftSection,
    PostContent,
    PostHeader,
    PostHeaderImg,
    PostHeaderUsername,
    PostTimestamp,
    RightSection,
} from "../FeedPosts/FeedPostsElements";
import { RouteLink } from "../../Dashboard/Sidebar/SidebarElements";
import { dateFormatter } from "../../Common/dateFormatter";
import PostActionsAndStats from "../FeedPosts/PostActionsAndStats";

const ReplyCard = ({ reply, user, comments, likes, bookmarks, views, displayAt, updateFeedView }) => {
    return (
        <FeedPostContainer displayAt={displayAt}>
            <LeftSection>
                <PostHeaderImg src={"https://avatars.githubusercontent.com/u/44284877?v=4"} alt="Profile picture" />
            </LeftSection>
            <RightSection>
                <RouteLink to={`/feeds/${reply?._id}`}>
                    <PostHeader>
                        <LeftSection>
                            <PostHeaderUsername>{reply?.username}</PostHeaderUsername>
                        </LeftSection>
                        • <PostTimestamp>{dateFormatter({ date: new Date(reply?.createdAt) })}</PostTimestamp>
                    </PostHeader>
                    <PostContent>{reply?.reply}</PostContent>
                </RouteLink>

                <PostActionsAndStats
                    feed={reply}
                    user={user}
                    itemType={"feed"}
                    comments={comments}
                    likes={likes}
                    bookmarks={bookmarks}
                    views={views}
                    updateFeedView={updateFeedView}
                />
            </RightSection>
        </FeedPostContainer>
    );
};

export default ReplyCard;
