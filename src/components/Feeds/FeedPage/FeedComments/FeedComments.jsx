import React from "react";
import ReplyCard from "./ReplyCard";

const FeedComments = ({ user, replies, likes, bookmarks, views, updateFeedView }) => {
    const feedLikesData = ({ replyId }) => {
        return likes?.filter((like) => like?.itemId === replyId);
    };
    const feedViewsData = ({ feedId }) => {
        return views?.filter((view) => view.itemId === feedId);
    };
    const feedUserBookmarksData = ({ feedId }) => {
        return bookmarks?.length > 0
            ? bookmarks?.filter((bookmark) => bookmark?.itemId === feedId) &&
                  bookmarks?.filter((bookmark) => bookmark.user === user?._id)
            : [];
    };

    if (replies.length === 0) {
        return <p style={{ textAlign: "center", padding: "25px 0" }}>Be the first to comment on this post</p>;
    }

    return (
        <>
            {replies
                ?.slice()
                .reverse()
                .map((reply, id) => (
                    <ReplyCard
                        key={id}
                        reply={reply}
                        user={user}
                        // comments={comments}
                        likes={feedLikesData({ replyId: reply._id })}
                        views={feedViewsData({ feedId: reply._id })}
                        bookmarks={feedUserBookmarksData({ replyId: reply._id })}
                        updateFeedView={updateFeedView}
                    />
                ))}
        </>
    );
};

export default FeedComments;
