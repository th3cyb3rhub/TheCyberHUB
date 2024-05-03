import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    RightHeaderSection,
    RightSection,
} from "src/components/Feeds/FeedPosts/FeedPostsElements";
import { RouteLink } from "src/components/Common/GeneralDashboardSidebar/GeneralDashboardSidebarElements";
import PostActionsAndStats from "src/components/Feeds/FeedPosts/PostActionsAndStats";
import { dateFormatter } from "src/components/Common/dateFormatter";
import PopUpWindow from "src/components/Common/PopUpWindow";
import ImageSlider from "src/components/Common/ImageSlider/ImageSlider";
import { ImageContainer, ImagesContainer, FeedImage } from "src/components/Feeds/PostForm/AddPostElements";
import { IconVerified } from "src/components/Explore/Users/UsersElements";
import { cdnContentImagesUrl } from "src/features/apiUrl";
import Options from "src/components/Common/ModalWindowOptions";
import { deleteFeed } from "src/features/feeds/feedsSlice";

const FeedPagePost = ({ feed, user, comments, likes, bookmarks, views, updateFeedView }) => {
    const dispatch = useDispatch();
    const [showPopupWindow, setShowPopupWindow] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
        setShowPopupWindow(true);
    };
    const navigate = useNavigate();

    const avatar = cdnContentImagesUrl("/user/" + (feed?.avatar || "avatarDummy.png"));

    const feedImage = (image) => cdnContentImagesUrl(`/feed/${image}`);
    const handleDeleteFeed = async () => {
        dispatch(deleteFeed(feed._id)).then(() => navigate("/feeds", { replace: true }));
    };
    return (
        <FeedPostContainer>
            <LeftSection>
                <PostHeaderImg src={avatar} alt={feed?.username + ` avatar`} />
            </LeftSection>
            <RightSection>
                <PostHeader>
                    <RouteLink to={`/user/${feed?.username}`}>
                        <LeftSection
                            style={{
                                alignItems: "center",
                            }}
                        >
                            <PostHeaderUsername>{feed?.username}</PostHeaderUsername>
                            {feed?.verified && <IconVerified />} •
                        </LeftSection>
                    </RouteLink>

                    <RightHeaderSection>
                        <PostTimestamp>{dateFormatter({ date: new Date(feed?.createdAt) })}</PostTimestamp>
                        {user && user._id === feed.user && <Options onDelete={handleDeleteFeed} />}
                    </RightHeaderSection>
                </PostHeader>
                <PostContent>{feed?.content ? feed?.content : feed?.reply}</PostContent>

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
                                        <PostTag key={id}>{tag}</PostTag>
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
