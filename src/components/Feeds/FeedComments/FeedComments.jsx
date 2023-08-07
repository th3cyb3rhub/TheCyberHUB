import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedComments, reset } from "../../../features/feeds/feedComments/feedCommentsSlice";
import FeedPagePost from "../FeedPage/FeedPagePost";

const FeedComments = ({ feedId, user }) => {
    const dispatch = useDispatch();
    const { feedComments } = useSelector((state) => state.feedComments);

    useEffect(() => {
        dispatch(getFeedComments({ feedId }));

        return () => {
            dispatch(reset());
        };
    }, [dispatch, feedId]);

    const commentData = feedComments.map((comment) => {
        return {
            _id: comment._id,
            createdAt: comment.createdAt,
            content: comment.comment,
            user: comment.user,
        };
    });

    return (
        <>
            {commentData
                .slice()
                .reverse()
                .map((feed, id) => (
                    <FeedPagePost key={id} feed={feed} feedComments={feedComments} user={user} />
                ))}
        </>
    );
};

export default FeedComments;
