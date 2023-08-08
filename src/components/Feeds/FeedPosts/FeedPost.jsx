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
import { ImageContainer, ImageUploadContainer, UploadedImage } from "../PostForm/AddPostElements";
import { IconVerified } from "../../Explore/Users/UsersElements";
import { cdnContentImagesUrl } from "../../../features/apiUrl";

const FeedPost = ({ feed, user, comments, likes, bookmarks, views, setStopRefresh, displayAt }) => {
    const avatar = cdnContentImagesUrl("/user/" + (feed?.avatar || "1691297013370.png"));

    return (
        <FeedPostContainer displayAt={displayAt}>
            <LeftSection>
                <PostHeaderImg src={avatar} alt={feed?.username + ` avatar`} />
            </LeftSection>
            <RightSection>
                <RouteLink to={`/feeds/${feed?._id}`}>
                    <PostHeader>
                        <LeftSection>
                            <PostHeaderUsername>{feed?.username}</PostHeaderUsername>
                            {feed?.verified && <IconVerified />}
                        </LeftSection>
                        • <PostTimestamp>{dateFormatter({ date: new Date(feed?.createdAt) })}</PostTimestamp>
                    </PostHeader>
                    <PostContent>{feed?.content}</PostContent>
                </RouteLink>

                <RouteLink to={`/feeds/${feed?._id}`}>
                    {feed?.images?.length > 0 ? (
                        <ImageUploadContainer>
                            {feed?.images?.map((image, index) => (
                                <ImageContainer key={index}>
                                    <UploadedImage
                                        src={
                                            "https://storagethecyberhub.blob.core.windows.net/thecyberhub-assets/development/feed/" +
                                            image
                                        }
                                        alt={`Uploaded ${index + 1}`}
                                    />
                                </ImageContainer>
                            ))}
                        </ImageUploadContainer>
                    ) : null}
                </RouteLink>

                {feed?.tags?.length > 0 ? (
                    <PostTags>{feed?.tags?.map((tag, id) => tag !== "" && <PostTag key={id}>{tag}</PostTag>)}</PostTags>
                ) : null}

                <PostActionsAndStats
                    feed={feed}
                    user={user}
                    itemType={"feed"}
                    comments={comments}
                    likes={likes}
                    bookmarks={bookmarks}
                    views={views}
                    setStopRefresh={setStopRefresh}
                />
            </RightSection>
        </FeedPostContainer>
    );
};

export default FeedPost;
