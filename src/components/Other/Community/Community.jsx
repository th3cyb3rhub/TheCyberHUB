import React from "react";
import {
    Button,
    Container,
    DiscordButton,
    DiscordLink,
    Header,
    Heading,
    Overlay,
    Paragraph,
} from "./CommunityElements";

const Community = () => {
    return (
        <Header>
            <Overlay></Overlay>
            <Container>
                <Heading>
                    Empowering the Next Generation of <br />
                    Cybersecurity Experts
                </Heading>
                <Paragraph>
                    Our community aims to assist new individuals in getting started with open-source and cybersecurity
                    through creating cybersecurity courses and developing open-source projects for both hackers and
                    beginners. <br />
                    We are loved by thousands of hackers..
                </Paragraph>
                <DiscordLink href="https://discord.gg/thecyberworld-799183504759324672" target="blanck">
                    <Button>
                        <DiscordButton />
                        <span>Join our Community on Discord</span>
                    </Button>
                </DiscordLink>
            </Container>
        </Header>
    );
};

export default Community;
