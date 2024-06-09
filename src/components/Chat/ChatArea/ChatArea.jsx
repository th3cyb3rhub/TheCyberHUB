import React from "react";
import { ChatContainer, LeftNav, RightNav } from "src/components/Chat/Chat/ChatElement";
import { FaPhoneAlt, FaVideo, FaUserCircle } from "react-icons/fa";

const ChatArea = ({ name }) => {
    return (
        <ChatContainer>
            <LeftNav> {name} </LeftNav>
            <RightNav>
                <FaVideo />
                <FaPhoneAlt />
                <FaUserCircle />
            </RightNav>
        </ChatContainer>
    );
};

export default ChatArea;
