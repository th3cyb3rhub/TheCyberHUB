import React, { useEffect, useState } from "react";
import { ConnectionButton, ConnectionContainer, ConnectionCount } from "./ConnectionElements";
import { useDispatch, useSelector } from "react-redux";
import {
    sendConnectionRequest,
    removeConnectionRequest,
    acceptConnectionRequest,
    getConnections,
    reset,
} from "src/features/userDetail/connections/connectionSlice";
import Connections from "./Connections";

const Connection = ({ userDetail, userDetails }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { connections: connectionData } = useSelector((state) => state.connectionData);

    const [isConnection, setIsConnection] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [connections, setConnections] = useState([]);
    const [myConnection, setMyConnection] = useState({});
    const connectionUserId = userDetail?.user;
    const userId = user?._id;

    useEffect(() => {
        if (connectionUserId) {
            dispatch(getConnections(connectionUserId));
        }

        return () => {
            dispatch(reset());
        };
    }, [dispatch, connectionUserId, userId]);

    useEffect(() => {
        if (connectionData) {
            setConnections(connectionData?.connections);
        }

        const myConnection = connections?.find((connection) => connection?.user === user?._id) || [];

        setMyConnection(myConnection);

        if (myConnection?.isAccepted === true) {
            setIsConnection(true);
        } else {
            setIsConnection(false);
        }

        if (myConnection.isAccepted === false) {
            setIsPending(true);
        }
    }, [connectionData, connections, user?._id]);

    const handleConnection = async () => {
        if (!isConnection && connectionUserId) {
            await dispatch(sendConnectionRequest(connectionUserId));
        }
        if (isConnection && connectionUserId) {
            await dispatch(removeConnectionRequest(connectionUserId));
        }
        await dispatch(getConnections(userId));
    };

    const handlePendingRequest = async () => {
        if (isPending && connectionUserId) {
            await dispatch(removeConnectionRequest(connectionUserId));
        }
        if (!isPending && connectionUserId) {
            await dispatch(acceptConnectionRequest(connectionUserId));
        }
        await dispatch(getConnections(userId));
    };

    const connectionsCount = connections?.length || 0;

    const connectionsByUsername = connectionData?.connections?.map((connection) =>
        userDetails?.find((userDetail) => userDetail?.user === connection?.user),
    );

    return (
        <ConnectionContainer>
            {userId !== userDetail?.user &&
                (myConnection ? (
                    myConnection?.isAccepted === false ? (
                        <ConnectionButton onClick={handleConnection}>Remove Request</ConnectionButton>
                    ) : (
                        <ConnectionButton onClick={handleConnection}>Remove Connection</ConnectionButton>
                    )
                ) : (
                    <ConnectionButton onClick={handleConnection}>Send Request</ConnectionButton>
                ))}

            <ConnectionCount>{connectionsCount} Connections</ConnectionCount>

            {connections && connections.length > 0 ? (
                <Connections
                    userId={userId}
                    connectionUserId={connectionUserId}
                    myConnection={myConnection}
                    isPending={isPending}
                    handlePendingRequest={handlePendingRequest}
                    userDetails={userDetails}
                    connections={connections}
                    connectionsByUsername={connectionsByUsername}
                />
            ) : null}
        </ConnectionContainer>
    );
};

export default Connection;
