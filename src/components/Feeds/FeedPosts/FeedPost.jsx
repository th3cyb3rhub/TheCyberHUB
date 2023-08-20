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
import { ImageContainer, ImagesContainer, FeedImage } from "../PostForm/AddPostElements";
import { IconVerified } from "../../Explore/Users/UsersElements";
import { cdnContentImagesUrl } from "../../../features/apiUrl";

const FeedPost = ({ feed, user, comments, likes, bookmarks, views, setStopRefresh, displayAt }) => {
    const avatar = cdnContentImagesUrl("/user/" + (feed?.avatar || "avatarDummy.png"));
    const feedImage = (image) => cdnContentImagesUrl(`/feed/${image}`);

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
                        </LeftSection>{" "}
                        •<PostTimestamp>{dateFormatter({ date: new Date(feed?.createdAt) })}</PostTimestamp>
                    </PostHeader>
                    <PostContent>
                        {feed?.content.slice(0, 225)}
                        {feed?.content.length > 225 && (
                            <>
                                ... <span style={{ color: "#ff6b08" }}> show more.</span>
                            </>
                        )}
                    </PostContent>
                </RouteLink>

                <RouteLink to={`/feeds/${feed?._id}`}>
                    {feed?.images?.length > 0 ? (
                        <ImagesContainer>
                            {feed?.images?.map((image, index) => (
                                <ImageContainer key={index}>
                                    <FeedImage src={feedImage(image)} alt={feed?.username + ` image ${index + 1}`} />
                                </ImageContainer>
                            ))}
                        </ImagesContainer>
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
