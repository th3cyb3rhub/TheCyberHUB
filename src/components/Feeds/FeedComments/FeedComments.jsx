import React from "react";
import ReplyCard from "./ReplyCard";
import LoadingSpinner from "../../Other/MixComponents/Spinner/LoadingSpinner";

const FeedComments = ({ user, replies, likes, bookmarks, views, isFeedReplyLoading, updateFeedView }) => {
    const feedLikesData = ({ replyId }) => {
        return likes?.filter((like) => like?.itemId === replyId);
    };
    const feedViewsData = ({ feedId }) => {
        return views?.filter((view) => view.itemId === feedId);
    };
    const feedUserBookmarksData = ({ feedId }) => {
        return (
            bookmarks?.filter((bookmark) => bookmark?.itemId === feedId) &&
            bookmarks.filter((bookmark) => bookmark.user === user._id)
        );
    };

    if (replies.length === 0) {
        return <p style={{ textAlign: "center", padding: "25px 0" }}>Be the first to comment on this post</p>;
    }

    if (isFeedReplyLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            {replies
                .slice()
                .reverse()
                .map((reply, id) => (
                    <ReplyCard
                        key={id}
                        reply={reply}
                        user={user}
                        // comments={comments}
                        likes={feedLikesData({ replyId: reply._id })}
                        views={feedViewsData({ replyId: reply._id })}
                        bookmarks={feedUserBookmarksData({ replyId: reply._id })}
                        updateFeedView={updateFeedView}
                    />
                ))}
        </>
    );
};

export default FeedComments;
