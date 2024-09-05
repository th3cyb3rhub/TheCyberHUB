import React from "react";
import { RecentChatsContainer, RecentChatsHeader, RecentChatsList, ToggleSection } from "./RecentChatsElements";
import { TbMessage2Plus } from "react-icons/tb";
import { ImCross } from "react-icons/im";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const RecentChats = ({ chats, selectedChatId, setSelectedChatId, onNewChat, onDeleteChat, toggle, setToggle }) => {
    return (
        <RecentChatsContainer>
            <RecentChatsHeader>
                {window.innerWidth <= 768 && (
                    <ToggleSection onClick={() => setToggle(!toggle)}>
                        {toggle ? <FaAngleRight /> : <FaAngleLeft />}
                    </ToggleSection>
                )}
                <p>
                    TheCyberChat {"{"}AI{"}"}
                </p>
                <div className="new-chat-button" onClick={onNewChat}>
                    <TbMessage2Plus size={30} />
                </div>
            </RecentChatsHeader>

            {chats && chats.length > 0 ? (
                <RecentChatsList>
                    {[...chats].reverse().map((chat) => (
                        <li key={chat._id} onClick={() => setSelectedChatId(chat._id)}>
                            {chat?.title}

                            {selectedChatId === chat._id && (
                                <span className="delete-chat-button" onClick={() => onDeleteChat(chat._id)}>
                                    <ImCross size={10} />
                                </span>
                            )}
                        </li>
                    ))}
                </RecentChatsList>
            ) : (
                <p>No recent chats. Start a new chat!</p>
            )}
        </RecentChatsContainer>
    );
};

export default RecentChats;
