import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getFollowData, unfollowUser } from "src/features/userDetail/follow/followSlice";
import {
    // FollowCount, DotIcon,
    FollowButton,
    FollowContainer,
} from "./Follow/FollowElements";
import { RouterLink } from "src/components/Tools/ToolsElements";
import { CircleSpinner } from "react-spinners-kit";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner.jsx";

const ConnectionsAndFollows = ({ userDetail, isUserDetailsLoading, setShowAuthPopup }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { followData, isLoading: isFollowLoading } = useSelector((state) => state.follow);

    const [isFollowed, setIsFollowed] = useState(false);
    const followUserId = userDetail?.user;

    useEffect(() => {
        if (followUserId) {
            dispatch(getFollowData(followUserId));
        }
    }, [dispatch, followUserId, user]);

    useEffect(() => {
        if (followData) {
            setIsFollowed(followData.followers.some((follower) => follower.user === user?._id));
        }
    }, [followData, user?._id]);

    const handleFollow = async () => {
        if (!user) return setShowAuthPopup(true);
        if (!followUserId) return;

        const action = isFollowed ? unfollowUser : followUser;
        await dispatch(action(followUserId));
        dispatch(getFollowData(followUserId));
    };

    if (isUserDetailsLoading) {
        return <LoadingSpinner />;
    }

    return (
        <FollowContainer>
            <div>
                {user && userDetail && user?._id === userDetail?.user ? (
                    <RouterLink to={`/user/edit/${user?.username}`}>
                        <FollowButton>Edit Profile</FollowButton>
                    </RouterLink>
                ) : (
                    <div>
                        <RouterLink to={`/dashboard/chat/${userDetail?.user}`}>
                            <FollowButton>Send Message</FollowButton>
                        </RouterLink>
                        <div style={{ display: "flex", gap: "15px" }}>
                            {isFollowLoading ? (
                                <FollowButton>
                                    <CircleSpinner size={16} isLoading={isFollowLoading} />
                                </FollowButton>
                            ) : (
                                <FollowButton onClick={handleFollow}>{isFollowed ? "Unfollow" : "Follow"}</FollowButton>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </FollowContainer>
    );
};

export default ConnectionsAndFollows;
