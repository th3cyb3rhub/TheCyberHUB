import React, { useState, useCallback } from "react";

import Chatbot from "react-chatbot-kit";

import config from "./config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

import { ThecyberhubBot, BotButtonCont } from "./ChatbotElements";

// import { FaRobot } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { getCdnAssets } from "src/features/apiUrl";

const logoThecyberworld = `${getCdnAssets}/images/ThecyberworldLogo/Thecyberworld_logo_outlined.png`;

export default function ChatBot() {
    const [callBot, setCallBot] = useState(false);

    const talkToBot = useCallback(() => {
        setCallBot((prevCallBot) => !prevCallBot);
    }, []);

    return (
        <>
            <ThecyberhubBot callBot={callBot}>
                <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
            </ThecyberhubBot>
            <BotButtonCont>
                <button onClick={talkToBot}>
                    {!callBot ? (
                        <img style={{ padding: "5px" }} src={logoThecyberworld} alt={""} />
                    ) : (
                        <CgClose size={35} style={{ color: "white" }} />
                    )}
                </button>
            </BotButtonCont>
        </>
    );
}
