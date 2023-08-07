import React, { useEffect } from "react";
import { FeedsContainer, MiddleSection } from "./FeedsElements";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import AddFeed from "./PostForm/AddFeed";
import FeedPosts from "./FeedPosts/FeedPosts";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeeds, reset } from "../../features/feeds/feedsSlice";
import { getAllUserDetails } from "../../features/userDetail/userDetailSlice";
// import AuthPopup from "../../pages/AuthPopup/AuthPopup";

const Feeds = () => {
    const dispatch = useDispatch();
    const { feeds } = useSelector((state) => state.feeds);
    // const {user} = useSelector(state => state.auth);
    const { userDetails } = useSelector((state) => state.userDetail);

    useEffect(() => {
        dispatch(getAllFeeds());
        dispatch(getAllUserDetails());

        return () => dispatch(reset());
    }, [dispatch]);

    const combinedData = feeds.map((feed) => {
        const userDetail = userDetails.find((user) => user.userId === feed.userId);

        // Extract only the desired fields from userDetail (username and avatar)
        const { username, avatar } = userDetail || {};

        return {
            ...feed,
            username,
            avatar,
        };
    });

    return (
        <Wrapper>
            <FeedsContainer>
                <MiddleSection>
                    <AddFeed />
                    <FeedPosts feeds={combinedData} />
                </MiddleSection>
            </FeedsContainer>
        </Wrapper>
    );
};

export default Feeds;
