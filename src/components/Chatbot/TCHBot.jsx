import { useState, useCallback } from "react";

import Chatbot from "react-chatbot-kit";

import config from "./config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

import { ThecyberhubBot, BotButtonCont } from "./ChatbotElements";

import { FaRobot } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

export default function TCHBot() {
  const [callBot, setCallBot] = useState(false);

  const talkToBot = useCallback(() => {
    setCallBot((prevCallBot) => !prevCallBot);
  }, []);

  return (
    <>
      <ThecyberhubBot callBot={callBot}>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </ThecyberhubBot>
      <BotButtonCont>
        <button onClick={talkToBot}>
          {!callBot ? (
            <FaRobot size={35} style={{ color: "white" }} />
          ) : (
            <CgClose size={35} style={{ color: "white" }} />
          )}
        </button>
      </BotButtonCont>
    </>
  );
}
