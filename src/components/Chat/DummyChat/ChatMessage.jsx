import React from "react";
import { MessageContainer, MessageContent, SenderImage, Timestamp } from "./ChatMessageElement";
import { cdnContentImagesUrl } from "src/features/apiUrl";
import dateFormat from "src/components/Common/dateFormat";

const ChatMessage = ({ userDetails, message, sender, recipient, image, user, isOur, createdAt }) => {
    const userDetail = userDetails?.find((userDetail) => userDetail?.user === sender);

    if (!userDetail) {
        return null;
    }

    const avatar = cdnContentImagesUrl("/user/" + (userDetail?.avatar || "avatar.png"));

    return (
        <MessageContainer isOur={isOur}>
            <SenderImage src={avatar} alt={userDetail?.username} />
            <MessageContent isOur={isOur}>
                <h4>{userDetail?.username}</h4>
                <p>{message}</p>
                <Timestamp
                    style={{
                        color: "#dcdcdc",
                        fontSize: "10px",
                        fontWeight: "bold",
                        textAlign: "right",
                        marginRight: "10px",
                        marginTop: "5px",
                    }}
                >
                    {createdAt ? dateFormat(createdAt) : "Just now"}
                </Timestamp>
            </MessageContent>
        </MessageContainer>
    );
};

export default ChatMessage;
