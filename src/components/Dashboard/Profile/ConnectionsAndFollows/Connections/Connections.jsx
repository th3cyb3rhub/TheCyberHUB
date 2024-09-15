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
} from "src/features/userDetail/connections/connectionSlice";
import { RouterLink } from "src/components/Tools/ToolsElements";
import { cdnContentImagesUrl } from "src/features/apiUrl";

const Connections = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { connections: connectionData } = useSelector((state) => state.connectionData);

    // const [isPending, setIsPending] = useState(false);
    const [connections, setConnections] = useState([]);
    const connectionUserId = user?._id;
    const userId = user?._id;

    const isConnection = (connectionId) => {
        return connections?.find((connection) => connection?.user === connectionId && connection?.isAccepted);
    };

    const isPendingConnection = (connectionId) => {
        return connections?.find((connection) => connection?.user === connectionId && !connection?.isAccepted);
    };

    useEffect(() => {
        dispatch(getConnections());
    }, []);

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

    const avatar = (connection) => cdnContentImagesUrl("/user/" + (connection?.avatar || "avatar.png"));

    console.log(isConnection(connectionUserId), isPendingConnection(connectionUserId));

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
                        return (
                            <ConnectionWrapper key={connection.user}>
                                <RouterLink to={`/user/${connection.username}`}>
                                    <ConnectionUsername>
                                        <img
                                            src={avatar(connection)}
                                            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                                            alt="Profile"
                                        />
                                        {connection.username}
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
