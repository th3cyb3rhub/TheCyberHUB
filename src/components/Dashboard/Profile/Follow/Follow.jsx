import React, { useEffect, useState } from "react";
import { DotIcon, FollowButton, FollowContainer, FollowCount } from "./FollowElements";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getFollowData, reset, unfollowUser } from "../../../../features/follow/followSlice";
// import Followers from "../Followers/Followers";
import { RouterLink } from "../../../Beta/Tools/ToolsElements";
// import { CircleSpinner } from "react-spinners-kit";

const Follow = ({ userDetail, userDetails }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { followData, isLoading } = useSelector((state) => state.followData);

    const [isFollowed, setIsFollowed] = useState(false);
    // const [isConnection, setIsConnection] = useState(false);

    const [followers, setFollowers] = useState();
    const [following, setFollowing] = useState();

    const username = userDetail?.username;
    const followUserId = userDetail?.user;
    const userId = followUserId;
    const unfollowId = followUserId;

    useEffect(() => {
        if (followUserId) {
            dispatch(getFollowData(userId));
        }

        return () => {
            dispatch(reset());
        };
    }, [dispatch, followUserId, userId]);

    useEffect(() => {
        if (followData) {
            setFollowers(followData?.followers);
            setFollowing(followData?.following);
        }
        if (followers?.includes(user?._id)) {
            setIsFollowed(true);
        } else {
            setIsFollowed(false);
        }
    }, [followData, followers, user?._id]);

    const handleFollow = async () => {
        if (!isFollowed && followUserId) {
            await dispatch(followUser(followUserId));
            console.log("followed");
        }
        if (isFollowed && followUserId) {
            await dispatch(unfollowUser(unfollowId));
            console.log("unfollowed");
        }
        await dispatch(getFollowData(userId));
    };

    // const handleConnection = async () => {
    //     setIsConnection(!isConnection);
    // }

    const followersCount = followers?.length || 0;
    const followingCount = following?.length || 0;

    if (isLoading) {
        // return <CircleSpinner size={10} isLoading={isLoading}/>;
    }

    return (
        <FollowContainer>
            <>
                {user && followUserId && user?._id === followUserId ? (
                    <FollowButton>
                        <RouterLink to={`/edit/@${username}`}> Edit Profile </RouterLink>
                    </FollowButton>
                ) : (
                    <div style={{ display: "flex", gap: "15px" }}>
                        <FollowButton onClick={handleFollow}>{isFollowed ? "Unfollow" : "Follow"}</FollowButton>
                        {/* <FollowButton onClick={handleConnection}> */}
                        {/*    {isConnection ? "Remove Connection" : "Connection"} */}
                        {/* </FollowButton> */}
                    </div>
                )}
            </>
            <FollowCount>
                {followersCount} Followers <DotIcon /> {followingCount} Following
            </FollowCount>
            {/* <FollowCount> */}
            {/*    {500}+ Connections */}
            {/* </FollowCount> */}
            {/* <Followers followers={followData?.followers} userDetails={userDetails}/> */}
        </FollowContainer>
    );
};

export default Follow;
