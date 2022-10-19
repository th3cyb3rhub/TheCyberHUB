import React from "react";
import { Header, Overlay, Container, Heading, Paragraph, Button } from "./CommunityElements";
import { IconContext } from "react-icons";
import { FaDiscord } from "react-icons/fa";

const Community = () => {
  return (
    <Header>
      <Overlay></Overlay>
      <Container>
        <Heading>Loved by thousands of hackers</Heading>
        <Paragraph>
          Community's goal is to help new folks to get started with open-source and cyber-security. <br />
          We build open-source projects for hackers and developers
        </Paragraph>
        <a href="https://discord.gg/QHBPq6xP5p" target="blanck">
          <Button>
            <IconContext.Provider value={{ size: "2em", style: { margin: "0 0.2rem" } }}>
              <FaDiscord />
            </IconContext.Provider>
            <span>Join our Discord Channel</span>
          </Button>
        </a>
      </Container>
    </Header>
  );
};

export default Community;
