import React, { useEffect, useState } from "react";
import { ConnectionsContainer, ConnectionWrapper } from "./ConnectionsElements";
import { ConnectionButton, ConnectionUsername } from "./ConnectionElements";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { useDispatch, useSelector } from "react-redux";
import {
    acceptConnectionRequest,
    getConnections,
    removeConnectionRequest,
    reset,
    removeConnection,
} from "src/features/connections/connectionSlice";
import { getAllUserDetails, userDetailReset } from "src/features/userDetail/userDetailSlice";
import { RouterLink } from "src/components/Tools/ToolsElements";
import { cdnContentImagesUrl } from "src/features/apiUrl";

const Connections = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { userDetails, isError, message } = useSelector((state) => state.userDetail);

    // connections
    const { connections: connectionData } = useSelector((state) => state.connectionData);
    // const [isPending, setIsPending] = useState(false);
    const [connections, setConnections] = useState([]);
    const connectionUserId = user?._id;
    const userId = user?._id;

    // const isConnection = (connectionId) => {
    //     return connections?.find((connection) => connection?.user === connectionId && connection?.isAccepted)
    // }
    //
    // const isPendingConnection = (connectionId) => {
    //     return connections?.find((connection) => connection?.user === connectionId && !connection?.isAccepted)
    // }

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        dispatch(getAllUserDetails());
        dispatch(getConnections());

        return () => dispatch(userDetailReset());
    }, [isError, message, dispatch]);

    useEffect(() => {
        if (connectionUserId) {
            dispatch(getConnections());
        }

        return () => {
            dispatch(reset());
        };
    }, [dispatch, connectionUserId, userId]);

    useEffect(() => {
        if (connectionData) {
            setConnections(connectionData?.connections);
        }
    }, [connectionData]);

    // const userDetail = userDetails?.find((userDetail) => userDetail?.user === user?._id);

    const handleRemoveConnectionRequest = async (connectionUserId) => {
        if (connectionUserId) {
            await dispatch(removeConnectionRequest(connectionUserId));
        }
        await dispatch(getConnections());
    };

    const handleAcceptConnectionRequest = async (connectionUserId) => {
        if (connectionUserId) {
            await dispatch(acceptConnectionRequest(connectionUserId));
        }
        await dispatch(getConnections());
    };
    const handleRemoveConnection = async (connectionUserId) => {
        if (connectionUserId) {
            await dispatch(removeConnection(connectionUserId));
        }
        await dispatch(getConnections());
    };

    const connectionsCount = connections?.length || 0;

    // Sort connections based on isAccepted status (false on top)
    const sortedConnections =
        (connections &&
            [...connections].sort((a, b) => {
                if (a.isAccepted === b.isAccepted) return 0;
                return a.isAccepted ? 1 : -1;
            })) ||
        [];

    const avatar = (userDetail) => cdnContentImagesUrl("/user/" + (userDetail?.avatar || "avatar.png"));

    return (
        <Wrapper>
            {user ? (
                <ConnectionsContainer>
                    <p
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "15px",
                            gap: "10px",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: "#e1e1e1",
                        }}
                    >
                        {sortedConnections.length > 0 ? "My Connections" : "No Connections"} ({connectionsCount})
                    </p>

                    {sortedConnections.map((connection) => {
                        const username = userDetails?.find(
                            (userDetail) => userDetail?.user === connection?.user,
                        )?.username;
                        return (
                            <ConnectionWrapper key={connection.user}>
                                <RouterLink to={`/user/${username}`}>
                                    <ConnectionUsername>
                                        <img
                                            src={avatar(
                                                userDetails?.find(
                                                    (userDetail) => userDetail?.user === connection?.user,
                                                ),
                                            )}
                                            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                                            alt="Profile"
                                        />
                                        {username}
                                    </ConnectionUsername>
                                </RouterLink>

                                {connection.isAccepted === true ? (
                                    <ConnectionButton onClick={() => handleRemoveConnection(connection?.user)}>
                                        Remove Connection
                                    </ConnectionButton>
                                ) : (
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-end",
                                            justifyContent: "flex-end",
                                            width: "100%",
                                            gap: "10px",
                                        }}
                                    >
                                        <ConnectionButton
                                            onClick={() => handleRemoveConnectionRequest(connection?.user)}
                                        >
                                            Cancel Request
                                        </ConnectionButton>
                                        <ConnectionButton
                                            onClick={() => handleAcceptConnectionRequest(connection?.user)}
                                        >
                                            Accept Request
                                        </ConnectionButton>
                                    </div>
                                )}
                            </ConnectionWrapper>
                        );
                    })}
                </ConnectionsContainer>
            ) : null}
        </Wrapper>
    );
};

export default Connections;
