import React, { useEffect, useState } from "react";
import {
    SidebarContainer,
    SidebarSection,
    RouteLink,
    SidebarTitle,
    UserListContainer,
    SidebarHeader,
} from "./SidebarElements";
import Contact from "src/components/Chat/Contact";
import SearchInputBox from "src/components/Common/SearchInputBox";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getConnections } from "src/features/connections/connectionSlice";

const Sidebar = ({ hideSidebar, onlinePeople = [], offlinePeople = [], selectedUserId, setSelectedUserId }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { connections } = useSelector((state) => state.connectionData);
    const allConnections =
        connections?.connections?.filter((connection) => connection.isAccepted)?.map((connection) => connection.user) ||
        [];
    const userId = user?._id;

    useEffect(() => {
        if (userId) {
            dispatch(getConnections(userId));
        }
    }, [userId, dispatch]);

    const [showUsers, setShowUsers] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleUsers = () => {
        setShowUsers(!showUsers);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredOnlinePeople = onlinePeople?.filter((person) =>
        person?.username?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const onlineConnections = filteredOnlinePeople?.filter((person) => allConnections.includes(person.user));

    const filteredOfflinePeople = offlinePeople?.filter((person) =>
        person?.username?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const offlineConnections = filteredOfflinePeople?.filter((person) => allConnections.includes(person.user));

    return (
        <SidebarContainer $hideSidebar={hideSidebar}>
            <SidebarHeader>
                <h2>Community Chat</h2>
            </SidebarHeader>
            <SearchInputBox
                placeholder={"Search users"}
                onChange={handleSearchChange}
                value={searchTerm}
                setValue={setSearchTerm}
            />
            <SidebarSection>
                <SidebarTitle onClick={toggleUsers}>Users {showUsers ? <FaAngleUp /> : <FaAngleDown />}</SidebarTitle>

                {!showUsers ? null : (
                    <UserListContainer>
                        {onlineConnections?.length > 0 ? (
                            onlineConnections.map((person) => (
                                <RouteLink to={`/dashboard/chat/${person.user}`} key={person.user}>
                                    <Contact
                                        key={person.user}
                                        id={person.user}
                                        online={true}
                                        username={person.username?.toLowerCase() || "Unknown"}
                                        onClick={() => {
                                            setSelectedUserId(person.user);
                                        }}
                                        selected={person.user === selectedUserId}
                                    />
                                </RouteLink>
                            ))
                        ) : (
                            <p>No online users found</p>
                        )}
                        {offlineConnections?.length > 0 ? (
                            offlineConnections.map((person) => (
                                <RouteLink to={`/dashboard/chat/${person.user}`} key={person.user}>
                                    <Contact
                                        key={person.user}
                                        id={person.user}
                                        online={false}
                                        username={person.username?.toLowerCase() || "Unknown"}
                                        onClick={() => {
                                            setSelectedUserId(person.user);
                                        }}
                                        selected={person.user === selectedUserId}
                                    />
                                </RouteLink>
                            ))
                        ) : (
                            <p>No offline users found</p>
                        )}
                    </UserListContainer>
                )}
            </SidebarSection>
        </SidebarContainer>
    );
};

export default Sidebar;
