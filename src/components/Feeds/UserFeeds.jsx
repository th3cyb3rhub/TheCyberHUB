import React, { useEffect } from "react";

import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements.jsx";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner.jsx";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance.jsx";
import apiStatus from "src/features/apiStatus.jsx";
import { feedReset, getFeeds } from "src/features/feeds/feedsSlice.js";
import FeedPosts from "src/components/Feeds/FeedPosts/FeedPosts.jsx";

const UserBlogs = () => {
    const { isApiLoading, isApiWorking } = apiStatus();

    const dispatch = useDispatch();
    const { feeds } = useSelector((state) => state.feeds);

    useEffect(() => {
        dispatch(getFeeds());
        return () => dispatch(feedReset());
    }, [dispatch]);

    if (isApiLoading) return <LoadingSpinner />;

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <Wrapper>
            <FeedPosts
                searchTerm={""}
                feeds={feeds}
                // isFeedLoading={isFeedLoading}
            />
        </Wrapper>
    );
};

export default UserBlogs;
