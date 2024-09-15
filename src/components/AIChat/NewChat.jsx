import React from "react";
import { ChatBox, ChatHeader, ChatInput, ChatTitle, ToggleSection } from "src/components/AIChat/AIChatElements.jsx";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { RecentChatsHeader } from "src/components/AIChat/RecentChatsElements.jsx";
import { TbMessage2Plus } from "react-icons/tb";

const NewChat = ({ setToggle, toggle, handleNewChat, handleSendMessage, handleIsUserExit }) => {
    return (
        <ChatBox>
            <ChatHeader>
                <ToggleSection onClick={() => setToggle(!toggle)}>
                    {toggle ? <FaAngleRight /> : <FaAngleLeft />}
                </ToggleSection>
                <ChatTitle>{"New Chat"}</ChatTitle>
                <SlOptionsVertical className="hidden" />
            </ChatHeader>

            <ChatInput onClick={handleIsUserExit} className="cursor-pointer" onSubmit={handleSendMessage}>
                <p>Start a New Chat</p>
                <RecentChatsHeader>
                    <div className="new-chat-button" onClick={handleNewChat}>
                        <TbMessage2Plus size={30} />
                    </div>
                </RecentChatsHeader>
            </ChatInput>
        </ChatBox>
    );
};

export default NewChat;
