import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeeds, reset } from "../../../features/feeds/feedsSlice";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import AddFeedComment from "../FeedComments/AddFeedComment";
import { FeedContentSection, FeedPageContainer } from "./FeedPageElements";
import FeedComments from "../FeedComments/FeedComments";
import FeedPagePost from "./FeedPagePost";

const FeedPage = () => {
    const { feedId } = useParams();
    const dispatch = useDispatch();
    const { feeds, isLoading } = useSelector((state) => state.feeds);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getAllFeeds());

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    const feed = feeds.find((feed) => feed._id === feedId);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <Wrapper>
            <FeedPageContainer>
                <FeedContentSection>
                    <FeedPagePost feed={feed} user={user} />

                    <AddFeedComment feedId={feedId} />
                    <FeedComments feedId={feedId} />
                </FeedContentSection>
            </FeedPageContainer>
        </Wrapper>
    );
};

export default FeedPage;
