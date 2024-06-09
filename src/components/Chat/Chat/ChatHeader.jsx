import React from "react";
import { HiUserGroup } from "react-icons/hi";
import { SlOptionsVertical } from "react-icons/sl";
import { ChatHeaderContainer, ChatHeaderInfo } from "./ChatHeaderElements";

const ChatHeader = ({ hideSidebar, setHideSidebar }) => {
    return (
        <ChatHeaderContainer>
            <HiUserGroup
                style={{ cursor: "pointer" }}
                onClick={() => {
                    setHideSidebar(!hideSidebar);
                }}
            />
            <ChatHeaderInfo>Welcome to Chat </ChatHeaderInfo>
            <SlOptionsVertical style={{ cursor: "pointer" }} />
        </ChatHeaderContainer>
    );
};

export default ChatHeader;
