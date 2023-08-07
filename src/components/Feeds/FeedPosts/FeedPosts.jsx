import React, { useState } from "react";
import { FeedPostsContainer } from "./FeedPostsElements";
import { useSelector } from "react-redux";
import FeedPost from "./FeedPost";
import InfiniteScroll from "react-infinite-scroll-component";

const FeedPosts = ({ feeds, searchTerm, feedBookmarksData, displayAt }) => {
    const { user } = useSelector((state) => state.auth);

    const [numPostsToShow, setNumPostsToShow] = useState(5);

    const fetchData = () => {
        setNumPostsToShow(numPostsToShow + 1);
    };

    const filteredData = feeds.filter((feed) => {
        const isBookmarked = feedBookmarksData
            ? feedBookmarksData.some((bookmark) => bookmark.itemId === feed._id)
            : false;

        const contentIncludesSearchTerm =
            !searchTerm || feed?.content?.toLowerCase().includes(searchTerm?.toLowerCase()) || false;
        const tagsIncludeSearchTerm =
            !searchTerm || feed?.tags?.join(" ").toLowerCase().includes(searchTerm?.toLowerCase()) || false;

        return !searchTerm || contentIncludesSearchTerm || tagsIncludeSearchTerm || isBookmarked;
    });

    return (
        <InfiniteScroll
            dataLength={numPostsToShow}
            next={fetchData}
            hasMore={numPostsToShow < filteredData.length}
            loader={" "}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <FeedPostsContainer displayAt={displayAt}>
                {filteredData
                    .slice()
                    .reverse()
                    .map(
                        (feed, index) => index < numPostsToShow && <FeedPost key={feed._id} feed={feed} user={user} />,
                    )}
            </FeedPostsContainer>
        </InfiniteScroll>
    );
};

export default FeedPosts;
