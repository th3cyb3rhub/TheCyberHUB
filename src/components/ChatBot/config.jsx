import React from "react";

import { createChatBotMessage } from "react-chatbot-kit";

import AssistOptions from "./Widgets/Assists/AssistOptions";
import AssistLinks from "./Widgets/Assists/AssistLinks";

import ChatBotAvatar from "./Widgets/BotComponents/ChatBotAvatar";

const botName = "ChatBot";

const config = {
    initialMessages: [
        createChatBotMessage(`Hi, Welcome to Thecyberhub! I'm ${botName}, and I'm here to help.`),
        createChatBotMessage("But, before we get down to business, what's your name?"),
    ],
    botName,
    state: {
        optionName: "",
    },
    customComponents: { botAvatar: (props) => <ChatBotAvatar {...props} /> },
    widgets: [
        {
            widgetName: "assistOptions",
            widgetFunc: (props) => <AssistOptions {...props} />,
        },
        {
            widgetName: "assistLinks",
            widgetFunc: (props) => <AssistLinks {...props} />,
            mapStateToProps: ["optionName"],
            props: {
                options: [
                    {
                        text: "Introduction to JS",
                        url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
                        id: 1,
                    },
                    {
                        text: "Mozilla JS Guide",
                        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
                        id: 2,
                    },
                    {
                        text: "Frontend Masters",
                        url: "https://frontendmasters.com",
                        id: 3,
                    },
                ],
            },
        },
    ],
};

export default config;
