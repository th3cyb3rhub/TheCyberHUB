import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    acceptConnectionRequest,
    getConnections,
    removeConnectionRequest,
    removeConnection,
    reset as resetConnection,
    sendConnectionRequest,
} from "../../../../features/connections/connectionSlice";
import { followUser, getFollowData, unfollowUser, reset } from "../../../../features/follow/followSlice";
import { DotIcon, FollowButton, FollowContainer, FollowCount } from "./Follow/FollowElements";
import { RouterLink } from "../../../Tools/ToolsElements";
import { CircleSpinner } from "react-spinners-kit";
import { ConnectionButton } from "./Connections/ConnectionElements";

const ConnectionsAndFollows = ({ userDetail }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const { followData, isLoading } = useSelector((state) => state.followData);

    const [isFollowed, setIsFollowed] = useState(false);

    const [followers, setFollowers] = useState();
    const [following, setFollowing] = useState();

    const followUserId = userDetail?.user;
    const unfollowId = followUserId;
    const userId = user?._id;

    const { connections: connectionData, isLoading: isConnectionLoading } = useSelector(
        (state) => state.connectionData,
    );
    const [connections, setConnections] = useState([]);
    const [myConnection, setMyConnection] = useState([]);

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

    useEffect(() => {
        if (user) dispatch(getConnections());

        return () => dispatch(resetConnection());
    }, [dispatch, user]);

    useEffect(() => {
        if (connectionData) {
            setConnections(connectionData?.connections);
        }
    }, [connectionData]);

    useEffect(() => {
        const myConnection =
            connections?.find((connection) => connection?.user === followUserId) ||
            connections?.find((connection) => connection?.user === user?._id) ||
            [];

        setMyConnection(myConnection);
    }, [connections, user?._id, followUserId]);

    // const isConnection = (connectionUserId) => {
    //     return connections?.find((connection) => connection?.user === connectionUserId && connection?.isAccepted);
    // }

    // const isPendingConnection = (connectionUserId) => {
    // return connections?.find((connection) => connection?.user === connectionUserId && !connection?.isAccepted);
    // }

    const handleSendConnectionRequest = useCallback(
        async (connectionUserId) => {
            if (connectionUserId) {
                await dispatch(sendConnectionRequest(connectionUserId));
            }
            await dispatch(getConnections());
        },
        [dispatch],
    );

    const handleRemoveConnectionRequest = useCallback(
        async (connectionUserId) => {
            if (connectionUserId) {
                await dispatch(removeConnectionRequest(connectionUserId));
            }
            await dispatch(getConnections());
        },
        [dispatch],
    );

    const handleAcceptConnectionRequest = useCallback(
        async (connectionUserId) => {
            if (connectionUserId) {
                await dispatch(acceptConnectionRequest(connectionUserId));
            }
            await dispatch(getConnections());
        },
        [dispatch],
    );

    const handleRemoveConnection = useCallback(
        async (connectionUserId) => {
            if (connectionUserId) {
                await dispatch(removeConnection(connectionUserId));
            }
            await dispatch(getConnections());
        },
        [dispatch],
    );

    const connectionsCount = connections?.find((connection) => connection?.isAccepted === true)?.length || 0;

    const followersCount = followers?.length || 0;
    const followingCount = following?.length || 0;

    return (
        <FollowContainer>
            <div
                style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    gap: "10px",
                }}
            >
                {/* follow */}
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
                            <FollowButton onClick={handleFollow}>{isFollowed ? "Unfollow" : "Follow"} </FollowButton>
                        )}
                    </div>
                )}

                {/* connection */}

                {userId !== followUserId &&
                    myConnection &&
                    (myConnection?.isAccepted === true ? (
                        <ConnectionButton onClick={() => handleRemoveConnection(followUserId)}>
                            Remove Connection
                        </ConnectionButton>
                    ) : (
                        myConnection.isAccepted === false && (
                            <>
                                {myConnection.sender === userId ? (
                                    <ConnectionButton onClick={() => handleRemoveConnectionRequest(followUserId)}>
                                        Cancel Request
                                    </ConnectionButton>
                                ) : (
                                    <>
                                        <ConnectionButton onClick={() => handleRemoveConnectionRequest(followUserId)}>
                                            Reject Request
                                        </ConnectionButton>
                                        <ConnectionButton onClick={() => handleAcceptConnectionRequest(followUserId)}>
                                            Accept Request
                                        </ConnectionButton>
                                    </>
                                )}
                            </>
                        )
                    ))}

                {userId !== followUserId && myConnection.length === 0 ? (
                    isConnectionLoading ? (
                        <ConnectionButton>
                            <CircleSpinner size={16} isLoading={isLoading} />
                        </ConnectionButton>
                    ) : (
                        <ConnectionButton onClick={() => handleSendConnectionRequest(followUserId)}>
                            Send Request
                        </ConnectionButton>
                    )
                ) : null}

                {userId === followUserId && connections ? (
                    <div>
                        <RouterLink to={"/connections"}>
                            <ConnectionButton>View Connections</ConnectionButton>
                        </RouterLink>
                    </div>
                ) : null}
            </div>
            <FollowCount>
                {followersCount} Followers
                <DotIcon />
                {followingCount} Following
            </FollowCount>
            <FollowCount>{connectionsCount} Connections</FollowCount>
        </FollowContainer>
    );
};

export default ConnectionsAndFollows;
