import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createFeed, feedReset, getFeedLineage } from "src/features/feeds/feedsSlice";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import ModifyFeed from "src/components/Feeds/PostForm/ModifyFeed";

import { FeedContentSection, FeedPageContainer } from "./FeedPageElements";
import { getAllUserDetails, userDetailReset } from "src/features/userDetail/userDetailSlice";
import { FeedLikeReset, getFeedLikes } from "src/features/feeds/feedLikes/feedLikesSlice";
import { getBookmarks } from "src/features/bookmarks/bookmarkSlice";
import { getViews } from "src/features/feeds/views/viewSlice";

import FeedPagePost from "./FeedPagePost";
import FeedReplies from "./FeedComments/FeedComments";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "src/features/apiStatus";
import { ModifyFeedContainer } from "src/components/Feeds/FeedsElements";

const FeedPage = () => {
    const { isApiLoading, isApiWorking } = apiStatus();

    const dispatch = useDispatch();
    const { feedId } = useParams();
    const { feeds, isFeedLoading, isFeedError, feedMessage } = useSelector((state) => state.feeds);
    const { user, isUserError, userMessage } = useSelector((state) => state.auth);
    const { userDetails, isUserDetailLoading, isUserDetailError, userDetailMessage } = useSelector(
        (state) => state.userDetail,
    );
    const { feedLikes, isFeedLikeError, isFeedLikeLoading, feedLikeMessage } = useSelector((state) => state.feedLikes);
    const { bookmarks } = useSelector((state) => state.bookmarks);
    const { views } = useSelector((state) => state.views);

    useEffect(() => {
        if (isFeedError) console.log(feedMessage);
        if (isUserError) console.log(userMessage);
        if (isUserDetailError) console.log(userDetailMessage);
        if (isFeedLikeError) console.log(feedLikeMessage);

        dispatch(getAllUserDetails());
        dispatch(getFeedLikes());
        dispatch(getBookmarks());
        dispatch(getViews());
        dispatch(getFeedLineage(feedId));

        return () => {
            dispatch(feedReset());
            dispatch(userDetailReset());
            dispatch(FeedLikeReset());
        };
    }, [feedId, dispatch]);

    const feed = feeds?.find((feed) => feed?._id === feedId);

    const userDetail = userDetails?.find((userDetail) => userDetail?.user === feed?.user);

    const combinedData = {
        ...feed,
        username: userDetail?.username,
        avatar: userDetail?.avatar,
        verified: userDetail?.verified,
    };

    const feedLikesData = ({ feedId }) => {
        return feedLikes?.filter((like) => like?.itemId === feedId);
    };

    const feedUserBookmarksData = ({ feedId }) => {
        return bookmarks?.length > 0
            ? bookmarks?.filter((bookmark) => bookmark?.itemId === feedId) &&
                  bookmarks?.filter((bookmark) => bookmark.user === user?._id)
            : [];
    };

    const feedViewsData = ({ feedId }) => {
        return views?.filter((view) => view.itemId === feedId);
    };

    const feedData = feed?.descendants?.map((reply) => {
        const userDetail = userDetails?.find((userDetail) => userDetail?.user === reply?.user);

        const { username, avatar, verified } = userDetail || {};

        return { ...reply, username, avatar, verified };
    });

    if (isApiLoading || isUserDetailLoading || isFeedLoading) return <LoadingSpinner />;

    if (!isApiWorking) return <UnderMaintenance />;

    if (!feed) {
        return <p>Feed not found</p>;
    }

    const handleSaveCreatedFeed = (data) => {
        dispatch(createFeed({ feedData: data, parentId: feedId }));
    };

    return (
        <Wrapper style={{ margin: "80px auto" }}>
            <FeedPageContainer>
                <FeedContentSection>
                    <FeedPagePost
                        feed={combinedData}
                        user={user}
                        likes={feedLikesData({ feedId: feed._id })}
                        bookmarks={feedUserBookmarksData({ feedId: feed._id })}
                        views={feedViewsData({ feedId: feed._id })}
                        comments={feedData || []}
                        isFeedLikeLoading={isFeedLikeLoading}
                        updateFeedView={true}
                    />
                    {/* <AddFeedComment feedId={feedId} userDetails={userDetails} /> */}
                    <ModifyFeedContainer>
                        <ModifyFeed
                            showPostTags={true}
                            userDetails={userDetails}
                            onModifyFeed={handleSaveCreatedFeed}
                        />
                    </ModifyFeedContainer>

                    <FeedReplies
                        user={user}
                        replies={feedData || []}
                        bookmarks={bookmarks}
                        likes={feedLikes}
                        views={views}
                        updateFeedView={true}
                    />
                </FeedContentSection>
            </FeedPageContainer>
        </Wrapper>
    );
};

export default FeedPage;
