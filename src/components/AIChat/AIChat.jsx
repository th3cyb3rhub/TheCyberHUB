import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { AIChatContainer } from "./AIChatElements";
import RecentChats from "./RecentChats";
import { useSelector } from "react-redux";
import { getApiUrl } from "src/features/apiUrl";
import { toast } from "react-toastify";
import AuthPopup from "src/pages/AuthPopup/AuthPopup";
import { Route, Routes } from "react-router-dom";
import Chat from "src/components/AIChat/Chat.jsx";
import NewChat from "src/components/AIChat/NewChat.jsx";

const API_BASE_URL = getApiUrl("api/aiChat");

const AiChat = () => {
    const { user } = useSelector((state) => state.auth);
    const [chats, setChats] = useState([]);
    const [chat, setChat] = useState({});
    const [isTrailEnded, setIsTrailEnded] = useState(false);
    const trailMessage = [
        {
            type: "user",
            content: "Your trial period has ended",
            timestamp: "2024-01-29T07:15:09.752Z",
            _id: "65b7507df24f3468473bb982",
        },
        {
            type: "bot",
            content: `Navigate to the Dashboard > Settings > API Key, claim your free api key and paste it in the input box to continue using this feature.`,
            timestamp: "2024-01-29T07:15:10.752Z",
            _id: "65b7507df24f3468473bb983",
        },
    ];
    const [userInput, setUserInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setToggle(true);
            } else {
                setToggle(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSendDummyMessage = async (dummyMessage) => {
        setUserInput(dummyMessage);
        setIsLoading(true);

        if (!user) {
            setShowAuthPopup(true);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}/ask/${selectedChatId}`,
                { prompt: dummyMessage },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                },
            );

            const { chats } = response.data;
            setChats(chats);
            setUserInput("");
        } catch (error) {
            if (error.response.data.message === "Your trial period has ended") {
                setIsTrailEnded(true);
                toast("Your trial period has ended");
                return;
            }
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!user) {
            setShowAuthPopup(true);
            setIsLoading(false);
            return;
        }

        console.log(userInput);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/ask/${selectedChatId}`,
                { prompt: userInput },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                },
            );

            const { chats, updatedChat } = response.data;

            setChat(updatedChat);
            setChats(chats);
            setUserInput("");
        } catch (error) {
            if (error.response.data.message === "Your trial period has ended") {
                setIsTrailEnded(true);
                toast("Your trial period has ended");
                return;
            }
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleIsUserExit = () => {
        if (!user) {
            setIsLoading(true);
            setShowAuthPopup(true);
            setIsLoading(false);
        }
    };

    const getMessages = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/get`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setChats(response.data);
            setSelectedChatId(chats.length > 0 ? chats.reverse()[0]?._id : null);
        } catch (error) {
            console.error(error);
        }
    };

    const getChat = useCallback(async () => {
        try {
            setFetchError(null);
            const response = await axios.get(`${API_BASE_URL}/${selectedChatId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setChat(response.data);
        } catch (error) {
            console.error("Error fetching chat:", error);
            setFetchError("Failed to load chat. Please try again.");
        }
    }, [API_BASE_URL, selectedChatId, user.token]);

    useEffect(() => {
        if (!user) return;
        getMessages();
    }, []);

    useEffect(() => {
        if (!selectedChatId) return;

        getChat();
    }, [getChat, selectedChatId]);

    const handleNewChat = async () => {
        setIsLoading(true);

        if (!user) {
            setShowAuthPopup(true);
            setIsLoading(false);
            return;
        }

        if (chats[chats.length - 1]?.title === "New Chat") {
            setSelectedChatId(chats[chats.length - 1]?._id);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}/create`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                },
            );

            const newChat = response.data;
            setChats([...chats, newChat]);
            setSelectedChatId(newChat._id);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteChat = async (chatId) => {
        setIsLoading(true);

        try {
            await axios.delete(`${API_BASE_URL}/delete/${chatId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });

            const newChats = chats.filter((chat) => chat._id !== chatId);
            setChats(newChats);
            setSelectedChatId(chats.length > 0 ? chats.reverse()[0]?._id : null);
        } catch (error) {
            toast(error.response.data);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseAuthPopup = () => {
        setShowAuthPopup(false);
    };

    useEffect(() => {
        if (chats.length === 0) {
            setTimeout(() => {
                // handleNewChat();
            }, 1000);
        }
    }, []);

    console.log(fetchError);

    return (
        <Wrapper>
            {showAuthPopup && <AuthPopup onClose={() => handleCloseAuthPopup()} />}
            <AIChatContainer>
                {!toggle && (
                    <RecentChats
                        chats={chats}
                        setSelectedChatId={setSelectedChatId}
                        onNewChat={handleNewChat}
                        selectedChatId={selectedChatId}
                        onDeleteChat={handleDeleteChat}
                        toggle={toggle}
                        setToggle={setToggle}
                    />
                )}

                <Routes>
                    <Route
                        index
                        exac
                        path={""}
                        element={
                            <NewChat
                                trailMessage={trailMessage}
                                setToggle={setToggle}
                                toggle={toggle}
                                handleIsUserExit={handleIsUserExit}
                                handleNewChat={handleNewChat}
                                handleSendMessage={handleSendMessage}
                            />
                        }
                    />

                    <Route
                        path={"/:id"}
                        element={
                            <Chat
                                selectedChatId={selectedChatId}
                                isTrailEnded={isTrailEnded}
                                isLoading={isLoading}
                                userInput={userInput}
                                setUserInput={setUserInput}
                                handleSendDummyMessage={handleSendDummyMessage}
                                handleSendMessage={handleSendMessage}
                                handleIsUserExit={handleIsUserExit}
                                API_BASE_URL={API_BASE_URL}
                                setToggle={setToggle}
                                toggle={toggle}
                                user={user}
                                chats={chats}
                                chat={chat}
                                setChats={setChats}
                                handleDeleteChat={handleDeleteChat}
                                handleNewChat={handleNewChat}
                                trailMessage={trailMessage}
                                setSelectedChatId={setSelectedChatId}
                            />
                        }
                    />
                </Routes>
            </AIChatContainer>
        </Wrapper>
    );
};

export default AiChat;
