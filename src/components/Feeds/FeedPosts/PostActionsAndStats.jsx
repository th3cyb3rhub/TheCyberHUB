import React, { useEffect, useRef, useState } from "react";
import { PostActionsAndStatsContainer, PostStat, PostStatLabel, PostStatValue } from "./FeedPostsElements";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";
import { VscGraphLine } from "react-icons/vsc";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addLike, getLikes, removeLike } from "../../../features/likes/likeSlice";
import { getViews, updateView } from "../../../features/views/viewSlice";
import { addBookmark, getBookmarks, removeBookmark } from "../../../features/bookmarks/bookmarkSlice";
import AuthPopup from "../../../pages/AuthPopup/AuthPopup";

const PostActionsAndStats = ({ feed, feedComments, user, itemType }) => {
    const dispatch = useDispatch();
    const feedRef = useRef(null);

    const { likes } = useSelector((state) => state.likes);
    const { views } = useSelector((state) => state.views);
    const { bookmarks } = useSelector((state) => state.bookmarks);
    const userId = user?._id;

    const [showAuthPopup, setShowAuthPopup] = useState(false);

    useEffect(() => {
        dispatch(getLikes());
        dispatch(getBookmarks());
        dispatch(getViews());
    }, [dispatch]);

    useEffect(() => {
        const isViewed = () => {
            return views.some((view) => view?.users?.some((user) => user === userId) && view?.itemId === feed?._id);
        };

        if (!isViewed()) {
            dispatch(updateView({ itemId: feed?._id, itemType, userId }));
        }
    }, [dispatch, itemType, feed, userId, views]);

    const viewCount = views?.filter((view) => view.itemId === feed?._id && view.users)?.length || 0;

    const isLiked = () => {
        return likes.some((like) => like.user === userId && like.itemId === feed?._id);
    };

    const likeCount = likes.filter((like) => like.itemId === feed?._id).length;

    function handleLike(_id) {
        if (!user) {
            setShowAuthPopup(true); // Show the login popup if the user is not logged in
            return;
        }

        if (isLiked(_id)) {
            dispatch(removeLike({ itemType, itemId: _id }));
        } else {
            dispatch(addLike({ itemType, itemId: _id }));
        }
    }

    const isBookmarked = (itemId) => {
        return bookmarks.some((bookmark) => bookmark.itemId === itemId);
    };

    const handleBookmark = (_id) => {
        if (!user) {
            setShowAuthPopup(true); // Show the login popup if the user is not logged in
            return;
        }

        if (isBookmarked(_id)) {
            dispatch(removeBookmark({ itemType, itemId: _id }));
        } else {
            dispatch(addBookmark({ itemType, itemId: _id }));
        }
    };

    return (
        <PostActionsAndStatsContainer ref={feedRef}>
            {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)} />}
            <PostStat>
                <PostStatLabel>
                    <span onClick={() => handleLike(feed?._id)}>
                        {isLiked(userId) ? <FcLike /> : <AiOutlineHeart />}
                    </span>
                </PostStatLabel>
                <PostStatValue>{likeCount} </PostStatValue>
            </PostStat>
            <PostStat>
                <PostStatLabel>
                    <AiOutlineRetweet />
                </PostStatLabel>
                <PostStatValue>99</PostStatValue>
            </PostStat>
            <PostStat>
                <PostStatLabel>
                    {" "}
                    <BiCommentDetail />
                </PostStatLabel>
                <PostStatValue>{feedComments?.length}</PostStatValue>
            </PostStat>
            <PostStat>
                <PostStatLabel>
                    <VscGraphLine />
                </PostStatLabel>
                <PostStatValue>{viewCount}</PostStatValue>
            </PostStat>
            <PostStat>
                <PostStatLabel onClick={() => handleBookmark(feed?._id)}>
                    {isBookmarked(feed?._id) ? <BsBookmarksFill /> : <BsBookmarks />}
                </PostStatLabel>
            </PostStat>
        </PostActionsAndStatsContainer>
    );
};

export default PostActionsAndStats;
