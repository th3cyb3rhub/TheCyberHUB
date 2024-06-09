import React from "react";
import { MessageContainerSelf, MessageContentSelf, SenderImage, Timestamp } from "./ChatMessageElement";

const ChatMessageSelf = ({ username, message, sender, recipient, image, user }) => {
    return (
        <MessageContainerSelf>
            <SenderImage
                src={
                    "https://thecyberhub-assets.s3.ap-south-1.amazonaws.com/thecyberhub-assets/development/user/1692524710620.jpeg"
                }
                alt=""
            />
            <MessageContentSelf>
                {message || ""}

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
                    {/* {time} */}
                </Timestamp>
            </MessageContentSelf>
        </MessageContainerSelf>
    );
};

export default ChatMessageSelf;
