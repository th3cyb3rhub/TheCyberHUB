import React, { useRef, useState, useEffect } from "react";
import { PostActionsAndStatsContainer, PostStat, PostStatLabel, PostStatValue } from "./FeedPostsElements";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";
import { VscGraphLine } from "react-icons/vsc";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { updateView } from "src/features/feeds/views/viewSlice";
import { addFeedLike, removeFeedLike } from "src/features/feeds/feedLikes/feedLikesSlice";
import { addBookmark, removeBookmark } from "src/features/bookmarks/bookmarkSlice";
import AuthPopup from "src/pages/AuthPopup/AuthPopup";
import { RouteLink } from "src/components/Common/GeneralDashboardSidebar/GeneralDashboardSidebarElements";

const PostActionsAndStats = ({ feed, comments, user, itemType, views, bookmarks, likes, updateFeedView }) => {
    const dispatch = useDispatch();
    const feedRef = useRef(null);

    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const userId = user?._id;

    useEffect(() => {
        if (user && updateFeedView === true) {
            const isViewed = () => {
                return views?.some((view) => view.user === userId && view.itemId === feed?._id);
            };

            if (!isViewed()) {
                dispatch(updateView({ itemId: feed?._id }));
            }
        }
    }, []);

    const filteredViews = views.filter(
        (view, index, self) => index === self.findIndex((v) => v.itemId === view.itemId && v.user === view.user),
    );

    const viewsCount = filteredViews.length || 0;

    const isLiked = () => {
        return likes?.some((like) => like.user === userId && like.itemId === feed?._id);
    };

    // const likeCount = likes.filter((like) => like.itemId === feed?._id).length || 0;

    const filteredLikes = likes.filter(
        (like, index, self) => index === self.findIndex((l) => l.itemId === like.itemId && l.user === like.user),
    );

    const likeCount = filteredLikes.length || 0;

    function handleLike(_id) {
        if (!user) {
            setShowAuthPopup(true);
            // setStopRefresh && setStopRefresh(true);
            return;
        }

        if (isLiked(_id)) {
            dispatch(removeFeedLike({ itemId: _id }));
        } else {
            dispatch(addFeedLike({ itemId: _id }));
        }
    }

    const isBookmarked = () => {
        return bookmarks?.some((bookmark) => bookmark.user === userId && bookmark.itemId === feed?._id);
    };

    const handleBookmark = (_id) => {
        if (!user) {
            setShowAuthPopup(true);
            // setStopRefresh && setStopRefresh(true);
            return;
        }
        if (isBookmarked(_id)) {
            dispatch(removeBookmark({ itemType, itemId: _id }));
        } else {
            dispatch(addBookmark({ itemType, itemId: _id }));
        }
    };

    const handleCloseAuthPopup = () => {
        setShowAuthPopup(false);
    };

    return (
        <PostActionsAndStatsContainer ref={feedRef}>
            {showAuthPopup && <AuthPopup onClose={() => handleCloseAuthPopup()} />}
            <PostStat>
                <PostStatLabel>
                    <span onClick={() => handleLike(feed?._id)}>
                        {isLiked(userId) ? <FcLike /> : <AiOutlineHeart />}
                    </span>
                </PostStatLabel>
                <PostStatValue>{likeCount} </PostStatValue>
            </PostStat>
            {/* <PostStat> */}
            {/*    <PostStatLabel> */}
            {/*        <AiOutlineRetweet/> */}
            {/*    </PostStatLabel> */}
            {/*    <PostStatValue>99</PostStatValue> */}
            {/* </PostStat> */}
            <PostStat>
                <PostStatLabel>
                    <RouteLink to={`/feeds/${feed?._id}`}>
                        <BiCommentDetail />
                    </RouteLink>
                </PostStatLabel>
                <PostStatValue>{comments?.length}</PostStatValue>
            </PostStat>
            <PostStat>
                <PostStatLabel>
                    <VscGraphLine />
                </PostStatLabel>
                <PostStatValue>{viewsCount}</PostStatValue>
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
