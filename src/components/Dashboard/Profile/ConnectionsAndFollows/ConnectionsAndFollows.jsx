import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//     acceptConnectionRequest,
//     getConnections,
//     removeConnectionRequest,
//     removeConnection,
//     reset as resetConnection,
//     sendConnectionRequest,
// } from "src/features/connections/connectionSlice";

import { followUser, getFollowData, unfollowUser, reset } from "src/features/follow/followSlice";
import { DotIcon, FollowButton, FollowContainer, FollowCount } from "./Follow/FollowElements";
import { RouterLink } from "src/components/Tools/ToolsElements";
import { CircleSpinner } from "react-spinners-kit";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner.jsx";

// import { ConnectionButton } from "./Connections/ConnectionElements";

const ConnectionsAndFollows = ({ userDetail, isUserDetailsLoading, setShowAuthPopup }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const { followData, isLoading } = useSelector((state) => state.followData);

    const [isFollowed, setIsFollowed] = useState(false);

    const [followers, setFollowers] = useState();
    const [following, setFollowing] = useState();

    const followUserId = userDetail?.user;

    // const userId = user?._id;

    // const { connections: connectionData, isLoading: isConnectionLoading } = useSelector(
    //     (state) => state.connectionData,
    // );
    // const [connections, setConnections] = useState([]);
    // const [myConnection, setMyConnection] = useState([]);

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
        if (!user) {
            return setShowAuthPopup(true);
        }
        if (!followUserId) return;
        const functionToDispatch = isFollowed ? unfollowUser : followUser;
        dispatch(functionToDispatch(followUserId)).then(() => dispatch(getFollowData(followUserId)));
    };

    // useEffect(() => {
    //     if (user) dispatch(getConnections());
    //
    //     return () => dispatch(resetConnection());
    // }, [dispatch, user]);
    //
    // useEffect(() => {
    //     if (connectionData) {
    //         setConnections(connectionData?.connections);
    //     }
    // }, [connectionData]);
    //
    // useEffect(() => {
    //     const myConnection =
    //         connections?.find((connection) => connection?.user === followUserId) ||
    //         connections?.find((connection) => connection?.user === user?._id) ||
    //         [];
    //
    //     setMyConnection(myConnection);
    // }, [connections, user?._id, followUserId]);

    // const isConnection = (connectionUserId) => {
    //     return connections?.find((connection) => connection?.user === connectionUserId && connection?.isAccepted);
    // }

    // const isPendingConnection = (connectionUserId) => {
    // return connections?.find((connection) => connection?.user === connectionUserId && !connection?.isAccepted);
    // }
    //
    // const handleSendConnectionRequest = useCallback(
    //     async (connectionUserId) => {
    //         if (!user) {
    //             return setShowAuthPopup(true);
    //         }
    //         if (connectionUserId) {
    //             await dispatch(sendConnectionRequest(connectionUserId));
    //         }
    //         await dispatch(getConnections());
    //     },
    //     [dispatch],
    // );

    // const handleRemoveConnectionRequest = useCallback(
    //     async (connectionUserId) => {
    //         if (connectionUserId) {
    //             await dispatch(removeConnectionRequest(connectionUserId));
    //         }
    //         await dispatch(getConnections());
    //     },
    //     [dispatch],
    // );

    // const handleAcceptConnectionRequest = useCallback(
    //     async (connectionUserId) => {
    //         if (connectionUserId) {
    //             await dispatch(acceptConnectionRequest(connectionUserId));
    //         }
    //         await dispatch(getConnections());
    //     },
    //     [dispatch],
    // );
    //
    // const handleRemoveConnection = useCallback(
    //     async (connectionUserId) => {
    //         if (connectionUserId) {
    //             await dispatch(removeConnection(connectionUserId));
    //         }
    //         await dispatch(getConnections());
    //     },
    //     [dispatch],
    // );

    // const connectionsCount = connections?.find((connection) => connection?.isAccepted === true)?.length || 0;

    const followersCount = followers?.length || 0;
    const followingCount = following?.length || 0;

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

                {/* {userId !== followUserId && */}
                {/*    myConnection && */}
                {/*    (myConnection?.isAccepted === true ? ( */}
                {/*        <ConnectionButton onClick={() => handleRemoveConnection(followUserId)}> */}
                {/*            Remove Connection */}
                {/*        </ConnectionButton> */}
                {/*    ) : ( */}
                {/*        myConnection.isAccepted === false && ( */}
                {/*            <> */}
                {/*                {myConnection.sender === userId ? ( */}
                {/*                    isConnectionLoading ? ( */}
                {/*                        <ConnectionButton> */}
                {/*                            <CircleSpinner size={16} isLoading={isLoading} /> */}
                {/*                        </ConnectionButton> */}
                {/*                    ) : ( */}
                {/*                        <ConnectionButton onClick={() => handleRemoveConnectionRequest(followUserId)}> */}
                {/*                            Cancel Request */}
                {/*                        </ConnectionButton> */}
                {/*                    ) */}
                {/*                ) : ( */}
                {/*                    <div style={{ display: "flex" }}> */}
                {/*                        <ConnectionButton */}
                {/*                            style={{ width: "auto", margin: "15px 4px" }} */}
                {/*                            onClick={() => handleRemoveConnectionRequest(followUserId)} */}
                {/*                        > */}
                {/*                            Reject */}
                {/*                        </ConnectionButton> */}
                {/*                        <ConnectionButton */}
                {/*                            style={{ width: "auto", margin: "15px 4px" }} */}
                {/*                            onClick={() => handleAcceptConnectionRequest(followUserId)} */}
                {/*                        > */}
                {/*                            Accept */}
                {/*                        </ConnectionButton> */}
                {/*                    </div> */}
                {/*                )} */}
                {/*            </> */}
                {/*        ) */}
                {/*    ))} */}

                {/* {userId !== followUserId && myConnection.length === 0 ? ( */}
                {/*    isConnectionLoading ? ( */}
                {/*        <ConnectionButton> */}
                {/*            <CircleSpinner size={16} isLoading={isLoading} /> */}
                {/*        </ConnectionButton> */}
                {/*    ) : ( */}
                {/*        <ConnectionButton onClick={() => handleSendConnectionRequest(followUserId)}> */}
                {/*            Send Request */}
                {/*        </ConnectionButton> */}
                {/*    ) */}
                {/* ) : null} */}

                {/* {userId === followUserId && connections ? ( */}
                {/*    <div> */}
                {/*        <RouterLink to={"/connections"}> */}
                {/*            <ConnectionButton>View Connections</ConnectionButton> */}
                {/*        </RouterLink> */}
                {/*    </div> */}
                {/* ) : null} */}
            </div>
            <FollowCount>
                {followersCount} Followers
                <DotIcon />
                {followingCount} Following
            </FollowCount>
            {/* <FollowCount>{connectionsCount} Connections</FollowCount> */}
        </FollowContainer>
    );
};

export default ConnectionsAndFollows;
