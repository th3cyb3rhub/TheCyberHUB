import React from "react";
import { ChatBox, ChatHeader, ChatInput, ChatTitle, ToggleSection } from "src/components/AIChat/AIChatElements.jsx";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import ChatMessages from "src/components/AIChat/ChatMessages.jsx";
import Prompts from "src/components/AIChat/Prompts/Prompts.jsx";
import { CircleSpinner } from "react-spinners-kit";
import { BiSend } from "react-icons/bi";

const Chat = ({
    isTrailEnded,
    isLoading,
    userInput,
    setUserInput,
    handleSendDummyMessage,
    toggle,
    setToggle,
    trailMessage,
    chat,
    handleSendMessage,
}) => {
    return (
        <ChatBox>
            <ChatHeader>
                <ToggleSection onClick={() => setToggle(!toggle)}>
                    {toggle ? <FaAngleRight /> : <FaAngleLeft />}
                </ToggleSection>
                <ChatTitle>{chat?.title}</ChatTitle>
                <SlOptionsVertical />
            </ChatHeader>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                }}
            >
                <ChatMessages messages={chat?.messages} isTrailEnded={isTrailEnded} trailMessage={trailMessage} />

                {!isTrailEnded && (
                    <>
                        {chat?.title === "New Chat" && <Prompts handleSendDummyMessage={handleSendDummyMessage} />}

                        <ChatInput onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Type your message here..."
                            />
                            <button type="submit" disabled={isLoading}>
                                {isLoading ? <CircleSpinner size={20} color={"#131313"} /> : <BiSend size={25} />}
                            </button>
                        </ChatInput>
                    </>
                )}
            </div>
        </ChatBox>
    );
};

export default Chat;
