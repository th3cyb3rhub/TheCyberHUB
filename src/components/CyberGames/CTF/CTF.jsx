import React from "react";
import { MarginTop, Section } from "../../Resources/WriteUps/WriteUpsElements";
import CTFElements from "./CTFElements";
import "./CTF.css";
import { useState } from "react";
import { Heading } from "../../Community/CommunityElements";
import { OSINTGameContainer } from "../OSINTGame/OSINTGameElements";

// const CtfsData = {
//     title: "TheCyberCTF",
//     date: "October 8 2022",
//     venue: <a style={{ color: "white" }} href={"https://discord.gg/QHBPq6xP5p"} target={"_blank"}>Discord</a>,
//     content: <p>
//         We host every weekend for the community for free. Take participate in the CTF and win exciting prizes and this is free for everyone.<br />Join Discord now."
//     </p>
// }

const CTF = () => {
  const number = 193471289037;
  const [value, setValue] = useState(null);
  const [correct, setCorrect] = useState(false);
  console.log(value);
  const handleClick = () => {
    value == number ? setCorrect(true) : setCorrect(false);
  };
  return (
    <OSINTGameContainer>
      <Section>
        <Heading> Coming soon </Heading>
      </Section>
    </OSINTGameContainer>
  );
};

export default CTF;
