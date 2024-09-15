import React, { useEffect, useState } from "react";
import { DotIcon, FollowButton, FollowContainer, FollowCount } from "./FollowElements";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getFollowData, reset, unfollowUser } from "src/features/userDetail/follow/followSlice";
import { RouterLink } from "src/components/Tools/ToolsElements";
import { CircleSpinner } from "react-spinners-kit";

const Follow = ({ userDetail, userDetails }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { followData, isLoading } = useSelector((state) => state.followData);

    const [isFollowed, setIsFollowed] = useState(false);

    const [followers, setFollowers] = useState();
    const [following, setFollowing] = useState();

    const followUserId = userDetail?.user;
    const unfollowId = followUserId;
    const userId = user?._id;

    useEffect(() => {
        if (followUserId) {
            dispatch(getFollowData(followUserId));
        }

        return () => {
            dispatch(reset());
        };
    }, [dispatch, followUserId]);

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
        }
        if (isFollowed && followUserId) {
            await dispatch(unfollowUser(unfollowId));
        }
        await dispatch(getFollowData(userId));
    };

    const followersCount = followers?.length || 0;
    const followingCount = following?.length || 0;

    return (
        <FollowContainer>
            <>
                {user && followUserId && user?._id === followUserId ? (
                    <FollowButton>
                        <RouterLink to={`/user/edit/kabir0x23`}> Edit Profile </RouterLink>
                    </FollowButton>
                ) : (
                    <div style={{ display: "flex", gap: "15px" }}>
                        {isLoading ? (
                            <FollowButton>
                                <CircleSpinner size={16} isLoading={isLoading} />
                            </FollowButton>
                        ) : (
                            <FollowButton onClick={handleFollow}>{isFollowed ? "Unfollow" : "Follow"}</FollowButton>
                        )}
                    </div>
                )}
            </>
            <FollowCount>
                {followersCount} Followers
                <DotIcon />
                {followingCount} Following
            </FollowCount>
            <FollowCount>{followersCount} Connections</FollowCount>
        </FollowContainer>
    );
};

export default Follow;
