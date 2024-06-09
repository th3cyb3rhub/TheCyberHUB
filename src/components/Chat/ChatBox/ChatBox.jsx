import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails } from "src/features/userDetail/userDetailSlice";
// import Sidebar from "src/components/Chat/Sidebar/Sidebar";
import { cdnContentImagesUrl, getApiUrl, getApiUrlWs } from "src/features/apiUrl";
import { decryptData, encryptData } from "src/components/Chat/encryptData";
import axios from "axios";
// import {getConnections} from "src/features/connections/connectionSlice";
import UserList from "src/components/Chat/ChatBox/UserList";
import Chat from "src/components/Chat/Chat/Chat";
import {
    ChatBoxContainer,
    ChatBoxShowButton,
    ChatBoxUserList,
    UserChatContainer,
} from "src/components/Chat/ChatBox/ChatBoxElements";
// import {BiSolidCircleIcon} from "src/components/Common/GeneralDashboardSidebar/GeneralDashboardSidebarElements";
// import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import { HintIcon } from "src/components/WebSecurity/Common/HintElements";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import apiStatus from "src/features/apiStatus";
// import {SearchIcon} from "src/components/Common/SearchInputBox/SearchInputBoxElements";

const ChatBox = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { isApiLoading, isApiWorking } = apiStatus();

    const { userDetails } = useSelector((state) => state.userDetail);
    const [isOpen, setIsOpen] = useState(false);

    const userDetail = userDetails.find((userDetail) => userDetail.user === user?._id);

    const [ws, setWs] = useState(null);
    const [onlinePeople, setOnlinePeople] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [newMessageText, setNewMessageText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [messages, setMessages] = useState([]);
    const [hideSidebar, setHideSidebar] = useState(false);
    const divUnderMessage = useRef();

    useEffect(() => {
        if (user) dispatch(getAllUserDetails());
    }, [dispatch, user]);

    useEffect(() => {
        if (userDetails.length > 0) {
            connectToWs();
        }
    }, [userDetails]);

    const connectToWs = () => {
        const domain = process.env.NODE_ENV === "production" ? ".thecyberhub.org" : "localhost";
        document.cookie = `Bearer ${user?.token}; path=/; Secure; SameSite=None; domain=${domain}`;

        const newWs = new WebSocket(getApiUrlWs());
        setWs(newWs);

        newWs.addEventListener("open", () => {
            // console.log("WebSocket connection opened");
        });

        newWs.addEventListener("message", handleMessages);
        newWs.addEventListener("close", () => {
            setTimeout(() => {
                // console.log("WebSocket connection closed. Reconnecting...");
                connectToWs();
            }, 1000);
        });

        return () => {
            newWs.close();
        };
    };

    const showOnlinePeople = (peopleArray) => {
        const uniqueUserIds = new Set();
        const uniquePeopleArray = peopleArray.filter((person) => {
            if (!uniqueUserIds.has(person.userId)) {
                uniqueUserIds.add(person.userId);
                return true;
            }
            return false;
        });

        const onlinePeople = [];

        uniquePeopleArray.forEach((person) => {
            userDetails.forEach((userDetail) => {
                if (userDetail.user === person.userId) {
                    onlinePeople.push(userDetail);
                }
            });
        });
        setOnlinePeople(onlinePeople);
    };

    const handleMessages = (ev) => {
        const messageData = JSON.parse(ev.data);
        if ("online" in messageData) {
            showOnlinePeople(messageData.online);
        } else {
            setMessages((prev) => [
                ...prev,
                {
                    text: messageData.text,
                    sender: messageData.sender,
                    recipient: messageData.recipient,
                    isOur: true,
                },
            ]);
        }
    };

    const sendMessage = (ev) => {
        ev.preventDefault();
        const message = {
            recipient: selectedUserId,
            text: newMessageText,
        };
        const encryptedMessage = encryptData(message);
        ws.send(JSON.stringify(encryptedMessage));
        setNewMessageText("");
        setMessages((prev) => [
            ...prev,
            {
                text: newMessageText,
                recipient: selectedUserId,
                sender: user._id,
                isOur: true,
            },
        ]);
    };

    useEffect(() => {
        const div = divUnderMessage.current;
        if (div) {
            div.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages]);

    useEffect(() => {
        if (selectedUserId) {
            axios
                .get(getApiUrl(`api/chat/user/messages/${selectedUserId}`), {
                    headers: { Authorization: `Bearer ${user.token}` },
                })
                .then((res) => {
                    const encryptedMessages = res.data;
                    const decryptedMessages = encryptedMessages.map((encryptedMessage) => {
                        const decryptedMessage = decryptData(encryptedMessage);
                        return decryptedMessage;
                    });
                    setMessages(decryptedMessages || []);
                });
        }
    }, [selectedUserId]);

    const onlinePeopleExclOurUser = onlinePeople.filter((person) => person.user !== user?._id);

    const offlinePeopleData = userDetails.filter((person) => {
        const foundOnlinePerson = onlinePeople.find((onlinePerson) => onlinePerson.user === person.user);
        return !foundOnlinePerson;
    });

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const avatar = cdnContentImagesUrl("/user/" + (userDetail?.avatar || "avatarDummy.png"));

    if (isApiLoading) {
        return;
    }

    if (!user || !isApiWorking) {
        return;
    }

    const filterUsers = (users) => {
        return users.filter((user) => user.username.toLowerCase().includes(searchQuery.toLowerCase()));
    };

    const filteredOnlinePeople = filterUsers(onlinePeopleExclOurUser);
    const filteredOfflinePeople = filterUsers(offlinePeopleData);

    return (
        <ChatBoxContainer style={{ zIndex: "2", color: "white", position: "relative" }}>
            <ChatBoxShowButton onClick={toggleChat} $isOpen={isOpen}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <div className="user-profile-image">
                        <img
                            style={{ width: "35px", height: "35px", borderRadius: "20px" }}
                            src={avatar}
                            alt={userDetail?.username + " Profile Picture"}
                        />
                        {/* <BiSolidCircleIcon/> */}
                    </div>
                    <p style={{ color: "#e3e3e3" }}> Messaging </p>
                </div>
                <HintIcon>{isOpen ? <FaAngleDown /> : <FaAngleUp />}</HintIcon>
            </ChatBoxShowButton>

            {isOpen && (
                <ChatBoxUserList>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            padding: "0 20px",
                            backgroundColor: "#131313",
                            marginBottom: "10px",
                            borderBottom: "1px solid #2a2a2a",
                        }}
                    >
                        <FcSearch size={25} />
                        <input
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "none",
                                outline: "none",
                                color: "white",
                                background: "transparent",
                            }}
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <UserList
                        hideSidebar={hideSidebar}
                        onlinePeople={filteredOnlinePeople}
                        offlinePeople={filteredOfflinePeople}
                        selectedUserId={selectedUserId}
                        setSelectedUserId={setSelectedUserId}
                    />
                </ChatBoxUserList>
            )}

            {selectedUserId && isOpen && (
                <UserChatContainer>
                    <Chat
                        isBox={true}
                        userDetails={userDetails}
                        setHideSidebar={setHideSidebar}
                        hideSidebar={hideSidebar}
                        ws={ws}
                        selectedUserId={selectedUserId}
                        setNewMessageText={setNewMessageText}
                        messages={messages}
                        setMessages={setMessages}
                        newMessageText={newMessageText}
                        sendMessage={sendMessage}
                        divUnderMessage={divUnderMessage}
                    />
                </UserChatContainer>
            )}
        </ChatBoxContainer>
    );
};

export default ChatBox;
