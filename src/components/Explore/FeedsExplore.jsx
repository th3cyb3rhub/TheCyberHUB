import React, { useEffect } from "react";
import { FeedPostsContainer } from "../Feeds/FeedPosts/FeedPostsElements";
import { useDispatch, useSelector } from "react-redux";
import FeedPost from "../Feeds/FeedPosts/FeedPost";
import { getFeedLikes } from "../../features/feeds/feedLikes/feedLikesSlice";
import { getBookmarks } from "../../features/bookmarks/bookmarkSlice";
import { getViews } from "../../features/feeds/views/viewSlice";
import { getFeedComments } from "../../features/feeds/feedComments/feedCommentsSlice";
import LoadingSpinner from "../Other/MixComponents/Spinner/LoadingSpinner";

const FeedsExplore = ({ feeds, searchTerm, feedBookmarksData, isFeedLoading, displayAt }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { feedLikes } = useSelector((state) => state.feedLikes);
    const { bookmarks } = useSelector((state) => state.bookmarks);
    const { views } = useSelector((state) => state.views);
    const { feedComments } = useSelector((state) => state.feedComments);

    useEffect(() => {
        dispatch(getFeedLikes());
        dispatch(getBookmarks());
        dispatch(getViews());
        dispatch(getFeedComments());
    }, [dispatch]);

    if (isFeedLoading) return <LoadingSpinner />;

    const filteredData = feeds?.filter((feed) => {
        const contentIncludesSearchTerm =
            !searchTerm || feed?.content?.toLowerCase().includes(searchTerm?.toLowerCase()) || false;
        const tagsIncludeSearchTerm =
            !searchTerm || feed?.tags?.join(" ").toLowerCase().includes(searchTerm?.toLowerCase()) || false;

        return !searchTerm || contentIncludesSearchTerm || tagsIncludeSearchTerm;
    });

    const feedLikesData = ({ feedId }) => {
        return feedLikes?.filter((like) => like.itemId === feedId);
    };

    const feedUserBookmarksData = ({ feedId }) => {
        return (
            bookmarks?.filter((bookmark) => bookmark.itemId === feedId) &&
            bookmarks?.filter((bookmark) => bookmark.user === user._id)
        );
    };

    const feedViewsData = ({ feedId }) => {
        return views?.filter((view) => view?.itemId === feedId);
    };

    const feedCommentsData = ({ feedId }) => {
        return feedComments?.filter((reply) => reply.feedId === feedId);
    };

    return (
        <FeedPostsContainer displayAt={displayAt}>
            {filteredData?.length > 0 &&
                filteredData
                    ?.slice()
                    .reverse()
                    .map((feed, index) => (
                        <FeedPost
                            key={index}
                            user={user}
                            feed={feed}
                            comments={feedCommentsData({ feedId: feed._id })}
                            likes={feedLikesData({ feedId: feed._id })}
                            bookmarks={feedUserBookmarksData({ feedId: feed._id })}
                            views={feedViewsData({ feedId: feed._id })}
                            displayAt={displayAt}
                        />
                    ))}
        </FeedPostsContainer>
    );
};

export default FeedsExplore;
