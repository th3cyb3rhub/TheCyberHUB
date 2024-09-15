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
import { getConnections } from "src/features/userDetail/connections/connectionSlice";

const Sidebar = ({ hideSidebar, onlinePeople, offlinePeople, selectedUserId, setSelectedUserId, userDetails }) => {
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
    }, [dispatch, userId]);

    const [showUsers, setShowUsers] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleUsers = () => {
        setShowUsers(!showUsers);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter online people based on search term and connections
    const filteredOnlinePeople = onlinePeople
        ?.filter((person) => person?.username?.toLowerCase().includes(searchTerm.toLowerCase()))
        ?.filter((person) => allConnections?.includes(person?.user));

    // Filter offline people based on search term and connections
    const filteredOfflinePeople = offlinePeople
        ?.filter((person) => person?.username?.toLowerCase().includes(searchTerm.toLowerCase()))
        ?.filter((person) => allConnections?.includes(person?.user));

    // Filter userDetails based on search term
    const filteredUserDetails = userDetails?.filter((person) =>
        person?.username?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    console.log(searchTerm);
    console.log(searchTerm.length);
    console.log(searchTerm.length >= 3);
    return (
        <SidebarContainer $hideSidebar={hideSidebar}>
            <SidebarHeader>
                <h2>Community Chat</h2>
            </SidebarHeader>
            <SearchInputBox
                placeholder="Search users"
                onChange={handleSearchChange}
                value={searchTerm}
                setValue={setSearchTerm}
            />
            <SidebarSection>
                <SidebarTitle onClick={toggleUsers}>Users {showUsers ? <FaAngleUp /> : <FaAngleDown />}</SidebarTitle>

                {showUsers && (
                    <UserListContainer>
                        {/* Display online connections matching search term */}
                        {filteredOnlinePeople?.length > 0
                            ? filteredOnlinePeople.map((person) => (
                                  <RouteLink to={`/dashboard/chat/${person?.user}`} key={person?.user}>
                                      <Contact
                                          id={person?.user}
                                          online={true}
                                          username={person?.username?.toLowerCase()}
                                          onClick={() => setSelectedUserId(person?.user)}
                                          selected={person?.user === selectedUserId}
                                      />
                                  </RouteLink>
                              ))
                            : null}

                        {/* Display offline connections matching search term */}
                        {filteredOfflinePeople?.length > 0
                            ? filteredOfflinePeople.map((person) => (
                                  <RouteLink to={`/dashboard/chat/${person?.user}`} key={person?.user}>
                                      <Contact
                                          id={person?.user}
                                          online={false}
                                          username={person?.username?.toLowerCase()}
                                          onClick={() => setSelectedUserId(person?.user)}
                                          selected={person?.user === selectedUserId}
                                      />
                                  </RouteLink>
                              ))
                            : null}

                        {/* Display userDetails matching search term */}
                        {filteredUserDetails?.length > 0
                            ? searchTerm.length >= 1 &&
                              filteredUserDetails.map((person) => (
                                  <RouteLink to={`/dashboard/chat/${person?.user}`} key={person?.user}>
                                      <Contact
                                          id={person?.user}
                                          online={false}
                                          username={person?.username?.toLowerCase()}
                                          onClick={() => setSelectedUserId(person?.user)}
                                          selected={person?.user === selectedUserId}
                                      />
                                  </RouteLink>
                              ))
                            : searchTerm
                              ? null
                              : null}
                    </UserListContainer>
                )}
            </SidebarSection>
        </SidebarContainer>
    );
};

export default Sidebar;
