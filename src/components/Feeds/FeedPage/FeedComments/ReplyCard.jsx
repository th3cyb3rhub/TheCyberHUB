import React, { useState } from "react";
import {
    FeedPostContainer,
    LeftSection,
    PostContent,
    PostHeader,
    PostHeaderImg,
    PostHeaderUsername,
    PostTimestamp,
    RightHeaderSection,
    RightSection,
} from "src/components/Feeds/FeedPosts/FeedPostsElements";
import { dateFormatter } from "src/components/Common/dateFormatter";
import PostActionsAndStats from "src/components/Feeds/FeedPosts/PostActionsAndStats";
import { cdnContentImagesUrl } from "src/features/apiUrl";
import { IconVerified } from "src/components/Explore/Users/UsersElements";
import Options from "src/components/Common/ModalOptions";
import { deleteFeed, updateFeed } from "src/features/feeds/feedsSlice";
import { useDispatch } from "react-redux";
import ModifyFeed from "src/components/Feeds/PostForm/ModifyFeed";

const ReplyCard = ({ reply, user, comments, likes, bookmarks, views, displayAt, updateFeedView }) => {
    const [editMode, setEditMode] = useState(false);
    const avatar = cdnContentImagesUrl("/user/" + (reply?.avatar || "avatarDummy.png"));
    const dispatch = useDispatch();
    const handleCommentDelete = () => {
        dispatch(deleteFeed(reply._id));
    };
    const handleEditFeed = () => {
        setEditMode(true);
    };
    const handleSaveEditedFeed = (data) => {
        dispatch(updateFeed({ id: reply?._id, feedData: data }));
    };
    return (
        <FeedPostContainer $displayAt={displayAt}>
            <LeftSection>
                <PostHeaderImg src={avatar} alt={reply?.username + `avatar`} />
            </LeftSection>
            {editMode ? (
                <ModifyFeed showPostTags={true} editFeed={reply} onModifyFeed={handleSaveEditedFeed} />
            ) : (
                <RightSection>
                    {/* <RouteLink to={`/feeds/${reply?._id}`}> */}
                    <PostHeader>
                        <LeftSection>
                            <PostHeaderUsername>{reply?.username}</PostHeaderUsername>
                            {reply?.verified && <IconVerified />}
                        </LeftSection>
                        <RightHeaderSection>
                            <PostTimestamp>{dateFormatter({ date: new Date(reply?.createdAt) })}</PostTimestamp>
                            {user?._id === reply.user && (
                                <Options
                                    onDelete={handleCommentDelete}
                                    onEdit={handleEditFeed}
                                    modalContainerId={`reply-card-options-container-${reply._id}`}
                                />
                            )}
                        </RightHeaderSection>
                    </PostHeader>
                    <PostContent>{reply?.content}</PostContent>
                    {/* </RouteLink> */}

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
            )}
        </FeedPostContainer>
    );
};

export default ReplyCard;
