import React, { useEffect } from "react";
import { FeedPostsContainer } from "./FeedPostsElements";
import { useDispatch, useSelector } from "react-redux";
import FeedPost from "./FeedPost";
// import InfiniteScroll from "react-infinite-scroll-component";
import { getFeedLikes } from "src/features/feeds/feedLikes/feedLikesSlice";
import { getBookmarks } from "src/features/bookmarks/bookmarkSlice";
import { getViews } from "src/features/feeds/views/viewSlice";
import { getFeedComments } from "src/features/feeds/feedComments/feedCommentsSlice";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";
// import { getAllFeeds } from "src/features/feeds/feedsSlice";
// import { HiRefresh } from "react-icons/hi";

const FeedPosts = ({ feeds, searchTerm, showOnlyFollowingPosts, isFeedLoading, displayAt }) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { feedLikes } = useSelector((state) => state.feedLikes);
    const { bookmarks } = useSelector((state) => state.bookmarks);
    const { views } = useSelector((state) => state.views);
    const { feedComments } = useSelector((state) => state.feedComments);
    const { followData } = useSelector((state) => state.followData);

    // const [numPostsToShow, setNumPostsToShow] = useState(50);

    useEffect(() => {
        dispatch(getFeedLikes());
        dispatch(getBookmarks());
        dispatch(getViews());
        dispatch(getFeedComments());
    }, [dispatch]);

    if (isFeedLoading) return <LoadingSpinner />;

    // const refreshData = () => {
    //     dispatch(getAllFeeds()); // Re-fetch the feeds from the backend
    //     setNumPostsToShow(50); // Reset the number of posts to show to its initial value
    // };

    // const fetchData = () => {
    // setNumPostsToShow(numPostsToShow + 5);
    // };

    const removeInvisibleChars = (str) => {
        return str?.replace(/\u200b/g, "");
    };

    const filteredData = feeds?.filter((feed) => {
        const postedByFollowingUser = !showOnlyFollowingPosts || followData?.following?.includes(feed.user);
        const cleanSearchTerm = removeInvisibleChars(searchTerm);
        const contentIncludesSearchTerm =
            !cleanSearchTerm || feed?.content?.toLowerCase().includes(cleanSearchTerm?.toLowerCase()) || false;
        const tagsIncludeSearchTerm =
            !cleanSearchTerm || feed?.tags?.join(" ").toLowerCase().includes(cleanSearchTerm?.toLowerCase()) || false;
        const usernameIncludeSearchTerm =
            !cleanSearchTerm || feed?.username.toLowerCase().includes(cleanSearchTerm?.toLowerCase()) || false;
        return (
            postedByFollowingUser &&
            (!cleanSearchTerm || contentIncludesSearchTerm || tagsIncludeSearchTerm || usernameIncludeSearchTerm)
        );
    });

    const feedLikesData = ({ feedId }) => {
        return feedLikes?.filter((like) => like.itemId === feedId);
    };

    const feedUserBookmarksData = ({ feedId }) => {
        return (
            bookmarks?.filter((bookmark) => bookmark.itemId === feedId) &&
            user &&
            bookmarks?.filter((bookmark) => bookmark.user === user?._id)
        );
    };

    const feedViewsData = ({ feedId }) => {
        return views?.filter((view) => view?.itemId === feedId);
    };

    const feedCommentsData = ({ feedId }) => {
        return feedComments?.filter((reply) => reply.feedId === feedId);
    };

    // const [stopRefresh, setStopRefresh] = useState(false);

    return (
        //! stopRefresh ? (
        // <InfiniteScroll
        //     dataLength={numPostsToShow}
        //     next={fetchData}
        //     hasMore={numPostsToShow < filteredData.length}
        //     loader={<LoadingSpinner />}
        //     endMessage={
        //         <div style={{ textAlign: "center", margin: "15px auto" }}>
        //             <p>Yay! You have seen it all</p>
        //         </div>
        //     }
        //     scrollableTarget="scrollableDiv"
        //     refreshFunction={refreshData}
        //     pullDownToRefresh
        //     pullDownToRefreshThreshold={50}
        //     pullDownToRefreshContent={
        //         <h3 style={{ textAlign: "center" }}>
        //             <HiRefresh />
        //         </h3>
        //     }
        //     releaseToRefreshContent={
        //         <h3 style={{ textAlign: "center" }}>
        //             <HiRefresh />
        //         </h3>
        //     }
        // >
        //         <FeedPostsContainer displayAt={displayAt}>
        //             {filteredData
        //                 ?.slice()
        //                 .reverse()
        //                 .map(
        //                     (feed, index) =>
        //                         index < numPostsToShow && (
        //                             <FeedPost
        //                                 key={index}
        //                                 user={user}
        //                                 feed={feed}
        //                                 comments={feedCommentsData({ feedId: feed._id })}
        //                                 likes={feedLikesData({ feedId: feed._id })}
        //                                 bookmarks={feedUserBookmarksData({ feedId: feed._id })}
        //                                 views={feedViewsData({ feedId: feed._id })}
        //                                 displayAt={displayAt}
        //                                 // setStopRefresh={setStopRefresh}
        //                             />
        //                         ),
        //                 )}
        //         </FeedPostsContainer>
        //     </InfiniteScroll>
        // ) : (
        <FeedPostsContainer displayAt={displayAt}>
            {filteredData
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
                        // setStopRefresh={setStopRefresh}
                    />
                ))}
        </FeedPostsContainer>
    );
};

export default FeedPosts;
