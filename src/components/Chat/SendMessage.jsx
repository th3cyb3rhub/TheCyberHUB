import React from "react";
import { MessageInputContainer, Message, Input, InputGroup } from "./Chat/ChatElement";
import { BiSend } from "react-icons/bi";

const SendMessage = ({ ws, selectedUserId, setMessages, newMessageText, setNewMessageText, sendMessage }) => {
    return (
        <MessageInputContainer>
            <Message>
                <Input
                    value={newMessageText}
                    onChange={(ev) => setNewMessageText(ev.target.value)}
                    placeholder="Type your message here"
                />
                <InputGroup onClick={sendMessage}>
                    <BiSend />
                </InputGroup>
            </Message>
        </MessageInputContainer>
    );
};

export default SendMessage;
