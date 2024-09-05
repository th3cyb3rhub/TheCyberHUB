import React, { useEffect } from "react";
import { FeedPostsContainer } from "src/components/Feeds/FeedPosts/FeedPostsElements";
import { useDispatch, useSelector } from "react-redux";
import FeedPost from "src/components/Feeds/FeedPosts/FeedPost";
import { getFeedLikes } from "src/features/feeds/feedLikes/feedLikesSlice";
import { getBookmarks } from "src/features/bookmarks/bookmarkSlice";
import { getViews } from "src/features/feeds/views/viewSlice";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";
import NotFound from "src/NotFound";

const FeedsExplore = ({ feeds, searchTerm, feedBookmarksData, isFeedLoading, displayAt, selectedTags }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { feedLikes } = useSelector((state) => state.feedLikes);
    const { bookmarks, isBookmarkLoading, isBookmarkError, bookmarkMessage } = useSelector((state) => state.bookmarks);
    const { views } = useSelector((state) => state.views);

    useEffect(() => {
        if (isBookmarkError) console.log(bookmarkMessage);
        dispatch(getFeedLikes());
        if (user) {
            dispatch(getBookmarks());
        }
        dispatch(getViews());
    }, [dispatch, isBookmarkError, bookmarkMessage]);

    if (isFeedLoading || isBookmarkLoading) return <LoadingSpinner />;

    if (!feeds.length) return <NotFound title="Feeds Not Found" description="There are no feeds" />;

    const removeInvisibleChars = (str) => {
        return str.replace(/\u200b/g, "");
    };

    const filteredData = feeds?.filter((feed) => {
        const cleanSearchTerm = removeInvisibleChars(searchTerm);
        const contentIncludesSearchTerm =
            !cleanSearchTerm || feed?.content?.toLowerCase().includes(cleanSearchTerm?.toLowerCase()) || false;
        const allFilterTagsIncluded =
            !selectedTags || selectedTags.length === 0
                ? true
                : selectedTags.every((selectedTag) =>
                      feed?.tags?.some((postTag) => postTag.toLowerCase() === selectedTag.toLowerCase()),
                  );

        return allFilterTagsIncluded && (!cleanSearchTerm || contentIncludesSearchTerm);
    });

    const feedLikesData = ({ feedId }) => {
        return feedLikes?.filter((like) => like.itemId === feedId);
    };

    const feedUserBookmarksData = ({ feedId }) => {
        return user && bookmarks?.length > 0
            ? bookmarks?.filter((bookmark) => bookmark.itemId === feedId) &&
                  bookmarks?.filter((bookmark) => bookmark.user === user?._id)
            : [];
    };

    const feedViewsData = ({ feedId }) => {
        return views?.filter((view) => view?.itemId === feedId);
    };

    const feedCommentsData = ({ feedId }) => {
        return feeds?.find((feed) => feed._id === feedId).comments;
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
