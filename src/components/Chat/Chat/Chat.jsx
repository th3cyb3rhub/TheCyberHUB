import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChatItemsContainer, Input, InputGroup, Message, MessageInputContainer } from "./ChatElement";
import ChatArea from "src/components/Chat/ChatArea/ChatArea";
import ChatMessage from "src/components/Chat/DummyChat/ChatMessage";
import ChatMessageSelf from "src/components/Chat/DummyChat/ChatMessageSelf";
import chatData from "src/components/Chat/DummyChat/ChatData";
import SendMessage from "src/components/Chat/SendMessage";
import { BiSend } from "react-icons/bi";
import ChatHeader from "./ChatHeader";

const Chat = ({
    userDetails,
    setNewMessageText,
    messages,
    sendMessage,
    newMessageText,
    divUnderMessage,
    setHideSidebar,
    hideSidebar,
    isBox,
}) => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    const channelId = location.pathname.replace("/dashboard/chat/", "");
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        const foundChannel = chatData.channels.find((ch) => ch.id === channelId);
        setChannel(foundChannel);
    }, [channelId]);

    if (!channel && userDetails) {
        return (
            <ChatItemsContainer isBox={isBox && isBox}>
                <ChatHeader hideSidebar={hideSidebar} setHideSidebar={setHideSidebar} />
                <MessageInputContainer>
                    {messages &&
                        messages?.map((message, index) => (
                            <ChatMessage
                                userDetails={userDetails}
                                user={user?._id}
                                key={index}
                                sender={message.sender}
                                recipient={message.recipient}
                                message={message.text}
                                isOur={message.sender === user?._id}
                                createdAt={message.createdAt}
                            />
                        ))}
                    <div ref={divUnderMessage} />
                </MessageInputContainer>
                <Message>
                    <Input
                        value={newMessageText}
                        onChange={(ev) => setNewMessageText(ev.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage(e);
                            }
                        }}
                        placeholder="Type your message here"
                    />

                    <InputGroup onClick={sendMessage}>
                        <BiSend color={"#ff6b08"} />
                    </InputGroup>
                </Message>
            </ChatItemsContainer>
        );
    }

    return (
        <ChatItemsContainer>
            <ChatArea name={channel?.channelname} />
            <div
                style={{
                    height: "100%",
                    overflowY: "scroll",
                    display: "flex",
                    flexDirection: "column-reverse",
                    padding: "0 10px",
                }}
            >
                {channel?.messages.map((message, index) =>
                    message?.username === user?.username ? (
                        <ChatMessageSelf key={index} {...message} />
                    ) : (
                        <ChatMessage key={index} {...message} />
                    ),
                )}
            </div>
            <SendMessage />
        </ChatItemsContainer>
    );
};

export default Chat;
