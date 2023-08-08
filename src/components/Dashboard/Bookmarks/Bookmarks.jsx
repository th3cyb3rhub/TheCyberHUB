import React, { useEffect } from "react";
import { BookmarksContainer } from "./BookmarksElements";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarks } from "../../../features/bookmarks/bookmarkSlice";
import FeedPosts from "../../Feeds/FeedPosts/FeedPosts";
import { getAllFeeds } from "../../../features/feeds/feedsSlice";
import { getAllUserDetails } from "../../../features/userDetail/userDetailSlice";
import LoadingSpinner from "../../Other/MixComponents/Spinner/LoadingSpinner";
import UnderMaintenance from "../../Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "../../../features/apiStatus";

const Bookmarks = () => {
    const dispatch = useDispatch();
    const { isApiLoading, isApiWorking } = apiStatus();

    const { bookmarks } = useSelector((state) => state.bookmarks);
    const { feeds, isFeedLoading } = useSelector((state) => state.feeds);
    const { userDetails, isUserDetailLoading } = useSelector((state) => state.userDetail);

    useEffect(() => {
        dispatch(getBookmarks());
        dispatch(getAllFeeds());
        dispatch(getAllUserDetails());
    }, [dispatch]);

    const feedBookmarksData = bookmarks.map((bookmark) => {
        const feed = feeds.find((feed) => feed._id === bookmark.itemId && bookmark.itemType === "feed");
        const userDetail = userDetails?.find((user) => user?.user === feed?.user);
        const { username, avatar, verified } = userDetail || {};
        return { ...feed, username, avatar, verified };
    });

    if (isApiLoading || isUserDetailLoading || isFeedLoading) return <LoadingSpinner />;

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <BookmarksContainer>
            <FeedPosts feeds={feedBookmarksData} isFeedLoading={isFeedLoading} />
        </BookmarksContainer>
    );
};

export default Bookmarks;
