import React, { useState, useEffect } from "react";
import { FeedsContainer, MiddleSection, ModifyFeedContainer } from "./FeedsElements";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import ModifyFeed from "./PostForm/ModifyFeed";
import FeedPosts from "./FeedPosts/FeedPosts";
import { useDispatch, useSelector } from "react-redux";
import { createFeed, feedReset, getAllFeeds } from "src/features/feeds/feedsSlice";
import { getAllUserDetails, userDetailReset } from "src/features/userDetail/userDetailSlice";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "src/features/apiStatus";
import { LeftContainer } from "src/components/Explore/ExploreElements";
import { getFollowData, reset } from "src/features/userDetail/follow/followSlice";
import Sidebar from "src/components/Common/SocialSidebar/Sidebar";

const Feeds = () => {
    const dispatch = useDispatch();
    const { isApiLoading, isApiWorking } = apiStatus();
    const { feeds, isFeedLoading, isFeedError, feedMessage } = useSelector((state) => state.feeds);
    const { userDetails, isUserDetailLoading, isUserDetailError, userDetailMessage } = useSelector(
        (state) => state.userDetail,
    );
    const { user } = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isFeedError) console.log(feedMessage);
        if (isUserDetailError) console.log(userDetailMessage);

        dispatch(getAllFeeds());
        dispatch(getAllUserDetails());
        setIsLoading(false);
        user && dispatch(getFollowData(user?._id));
        return () => {
            dispatch(feedReset());
            dispatch(userDetailReset());
            dispatch(reset());
        };
    }, [dispatch, setIsLoading]);

    const [showOnlyFollowingPosts, setShowOnlyFollowingPosts] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const feedTags = feeds?.map((feed) => feed && feed?.tags?.map((tag) => tag.toLowerCase())).flat() || [];
    const uniqueFeedTags = feedTags.length ? [...new Set(feedTags)] : [];

    const combinedData = feeds?.map((feed) => {
        const userDetail = userDetails?.find((user) => user?.user === feed?.user);

        const { username, avatar, verified } = userDetail || {};

        return { ...feed, username, avatar, verified };
    });

    const handleSaveCreatedFeed = (data) => {
        dispatch(createFeed({ feedData: data }));
    };

    if (isApiLoading || isUserDetailLoading || isFeedLoading || isLoading) return <LoadingSpinner />;

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <Wrapper style={{ marginTop: "80px" }}>
            <FeedsContainer>
                <LeftContainer style={{ padding: "25px 0" }}></LeftContainer>

                <MiddleSection>
                    <ModifyFeedContainer>
                        <ModifyFeed
                            showPostTags={true}
                            userDetails={userDetails}
                            onModifyFeed={handleSaveCreatedFeed}
                            token={user?.token}
                        />
                    </ModifyFeedContainer>
                    <FeedPosts
                        searchTerm={searchTerm}
                        feeds={combinedData}
                        isFeedLoading={isFeedLoading}
                        showOnlyFollowingPosts={showOnlyFollowingPosts}
                        selectedTags={selectedTags}
                    />
                </MiddleSection>
                <LeftContainer style={{ padding: "25px 0" }}>
                    <Sidebar
                        user={user}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearchTermChange={handleSearchTermChange}
                        tags={uniqueFeedTags}
                        showOnlyFollowing={showOnlyFollowingPosts}
                        setShowOnlyFollowing={setShowOnlyFollowingPosts}
                        sidebarType={"feeds"}
                        data={feeds}
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                    />
                </LeftContainer>
            </FeedsContainer>
        </Wrapper>
    );
};

export default Feeds;
