import React, { useEffect, useRef } from "react";
import { Messages, MessagesContainer, UserMessage } from "./AIChatElements";
import MarkdownPreview from "./MarkdownPreview";

const ChatMessages = ({ messages, isTrailEnded, trailMessage }) => {
    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        setTimeout(() => {
            scrollToBottom();
        }, 0);
    }, [messages, isTrailEnded]);

    return (
        <MessagesContainer>
            <Messages ref={messagesContainerRef}>
                {messages?.map((message, index) =>
                    message.type === "bot" ? (
                        <MarkdownPreview key={index} source={message.content} />
                    ) : (
                        <UserMessage key={index}> {message.content} </UserMessage>
                    ),
                )}

                {isTrailEnded &&
                    trailMessage.map((message, index) =>
                        message.type === "bot" ? (
                            <MarkdownPreview key={index} source={message.content} />
                        ) : (
                            <UserMessage key={index}> {message.content} </UserMessage>
                        ),
                    )}
            </Messages>
        </MessagesContainer>
    );
};

export default ChatMessages;
