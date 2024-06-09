import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConnections } from "src/features/connections/connectionSlice";
import { RouteLink, UserListContainer } from "src/components/Chat/Sidebar/SidebarElements";
import Contact from "src/components/Chat/Contact";

const UserList = ({ hideSidebar, onlinePeople, offlinePeople, selectedUserId, setSelectedUserId }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { connections } = useSelector((state) => state.connectionData);
    const allConnections = connections?.connections
        ?.filter((connection) => connection.isAccepted)
        ?.map((connection) => connection.user);
    const userId = user?._id;
    useEffect(() => {
        if (userId) {
            dispatch(getConnections(userId));
        }
    }, []);
    // const [showUsers, setShowUsers] = useState(true);

    // const [searchTerm, setSearchTerm] = useState("");
    const searchTerm = "";

    // const toggleUsers = () => {
    //     setShowUsers(!showUsers);
    // };

    // const handleSearchChange = (e) => {
    //     setSearchTerm(e.target.value);
    // };

    const filteredOnlinePeople = onlinePeople?.filter((person) =>
        person?.username.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const onlineConnections = filteredOnlinePeople?.filter((person) => allConnections?.includes(person.user));

    const filteredOfflinePeople = offlinePeople?.filter((person) =>
        person?.username.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const OfflineConnections = filteredOfflinePeople?.filter((person) => {
        return allConnections?.includes(person.user);
    });
    return (
        <UserListContainer>
            {onlineConnections &&
                onlineConnections.map((person) => (
                    <RouteLink to={`/dashboard/chat/${person.user}`} key={person.user}>
                        <Contact
                            key={person.user}
                            id={person.user}
                            online={true}
                            username={person.username.toLowerCase()}
                            onClick={() => {
                                if (selectedUserId === person.user) {
                                    setSelectedUserId(null);
                                } else {
                                    setSelectedUserId(person.user);
                                }
                            }}
                            selected={person.user === selectedUserId}
                        />
                    </RouteLink>
                ))}
            {OfflineConnections &&
                OfflineConnections.map((person) => (
                    // <RouteLink to={`/dashboard/chat/${person.user}`} key={person.user}>
                    <Contact
                        key={person.user}
                        id={person.user}
                        online={false}
                        username={person.username.toLowerCase()}
                        onClick={() => {
                            if (selectedUserId === person.user) {
                                setSelectedUserId(null);
                            } else {
                                setSelectedUserId(person.user);
                            }
                        }}
                        selected={person.user === selectedUserId}
                    />
                    // </RouteLink>
                ))}
        </UserListContainer>
    );
};

export default UserList;
