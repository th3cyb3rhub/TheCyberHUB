import React, { useState } from "react";
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
} from "../FeedPosts/FeedPostsElements";
import { RouteLink } from "../../Dashboard/Sidebar/SidebarElements";
import PostActionsAndStats from "../FeedPosts/PostActionsAndStats";
import { dateFormatter } from "../../Common/dateFormatter";
import PopUpWindow from "../../Common/PopUpWindow";
import ImageSlider from "../../Common/ImageSlider/ImageSlider";
import { ImageContainer, ImagesContainer, FeedImage } from "../PostForm/AddPostElements";
import { IconVerified } from "../../Explore/Users/UsersElements";
import { cdnContentImagesUrl } from "../../../features/apiUrl";

const FeedPagePost = ({ feed, user, comments, likes, bookmarks, views, updateFeedView }) => {
    const [showPopupWindow, setShowPopupWindow] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
        setShowPopupWindow(true);
    };
    const avatar = cdnContentImagesUrl("/user/" + (feed?.avatar || "avatarDummy.png"));

    const feedImage = (image) => cdnContentImagesUrl(`/feed/${image}`);

    return (
        <FeedPostContainer>
            <LeftSection>
                <PostHeaderImg src={avatar} alt={feed?.username + ` avatar`} />
            </LeftSection>
            <RightSection>
                <PostHeader>
                    <RouteLink to={`/@${feed?.username}`}>
                        <LeftSection>
                            <PostHeaderUsername>{feed?.username}</PostHeaderUsername>
                            {feed?.verified && <IconVerified />}
                        </LeftSection>
                    </RouteLink>
                    • <PostTimestamp>{dateFormatter({ date: new Date(feed?.createdAt) })}</PostTimestamp>
                </PostHeader>
                <PostContent>{feed?.content}</PostContent>

                <ImagesContainer>
                    {feed?.images?.map((image, index) => (
                        <ImageContainer key={index}>
                            <FeedImage
                                onClick={() => handleImageClick(index)}
                                src={feedImage(image)}
                                alt={feed.username + `image${index}`}
                            />
                        </ImageContainer>
                    ))}
                    {showPopupWindow && selectedImageIndex !== null ? (
                        <PopUpWindow onClose={() => setShowPopupWindow(false)}>
                            <ImageSlider
                                images={feed?.images}
                                username={feed?.username}
                                selectedIndex={selectedImageIndex}
                                onClose={() => setShowPopupWindow(false)}
                            />
                        </PopUpWindow>
                    ) : null}
                </ImagesContainer>

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

                <PostActionsAndStats
                    user={user}
                    feed={feed}
                    comments={comments}
                    likes={likes}
                    bookmarks={bookmarks}
                    views={views}
                    itemType={"feed"}
                    updateFeedView={updateFeedView}
                />
            </RightSection>
        </FeedPostContainer>
    );
};

export default FeedPagePost;
