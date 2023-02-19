import React from "react";
import { ListContent, List, Link } from "../../../Learn/Roadmaps/RoadmapsElements";
import { getCDNUrl } from "../../../../features/apiUrl";
const HacktoberfestXthecyberworld = `${getCDNUrl}/assets/images/Events/HacktoberfestXthecyberworld.png`;

const HacktoberfestEventData = [
    {
        id: 1,
        title: "We are happy to announce that Thecyberworld is participating in Hacktoberfest 2022.",
        date: "1st October 2022",
        image: HacktoberfestXthecyberworld,
        venue: (
            <>
                <a style={{ color: "white" }} href={"https://discord.gg/QHBPq6xP5p"} target={"_blank"} rel="noreferrer">
                    Discord
                </a>
                ,
                <a style={{ color: "white" }} href={"https://github.com/thecyberworld/"} target={"_blank"} rel="noreferrer">
                    GitHub
                </a>
                ,
            </>
        ),
        content: (
            <>
                <p>
                    Go through the Hacktoberfest 2022 contributor section to know more about what you should do and the
                    rewards you will receive. We would be genuinely happy if you choose the “plant a tree” option as
                    your reward. <br />
                    Contributions/pull requests can be made to the following repositories under the
                    <b>
                        <Link href={"https://github.com/thecyberworld/"} target={"_blank"}>
                            Thecyberworld
                        </Link>
                    </b>
                    organization: <br />
                    <div style={{ margin: "10px 20px" }}>
                        <ListContent>
                            <List>
                                Thecyberhub website:
                                <Link href={"https://github.com/thecyberworld/thecyberhub.org"} target={"_blank"}>
                                    link
                                </Link>
                            </List>
                            <List>
                                Thecyberhub App:
                                <Link href={"https://github.com/thecyberworld/thecyberhub-app"} target={"_blank"}>
                                    link
                                </Link>
                            </List>
                            <List>
                                Thecyberbot discord:
                                <Link href={"https://github.com/thecyberworld/thecyberbot-discord"} target={"_blank"}>
                                    link
                                </Link>
                            </List>
                            <List>
                                Thecyberhub Extension:
                                <Link href={"https://github.com/thecyberworld/thecyberhub-ext"} target={"_blank"}>
                                    link
                                </Link>
                            </List>
                            <List>
                                Port scanner:
                                <Link href={"https://github.com/thecyberworld/port-scanner"} target={"_blank"}>
                                    link
                                </Link>
                            </List>
                            <List>
                                Subdomain finder:
                                <Link href={"https://github.com/thecyberworld/subdomain-finder"} target={"_blank"}>
                                    link
                                </Link>
                            </List>
                        </ListContent>
                    </div>
                    Read the
                    <Link
                        href={"https://github.com/thecyberworld/thecyberhub.org/blob/main/CONTRIBUTING.md"}
                        target={"_blank"}
                    >
                        Thecyberworld Contributing Guide
                    </Link>
                    . If you are a beginner, please check out the curated
                    <Link
                        href={
                            "https://github.com/search?q=org%3Athecyberworld+is%3Aopen+is%3Aissue+label%3AHacktoberFest"
                        }
                        target={"_blank"}
                    >
                        Hacktoberfest issues
                    </Link>
                    on the main Thecyberworld org. If you would like to challenge yourself, you can create some issues
                    and features requests on
                    <b>
                        <Link href={"https://github.com/thecyberworld"} target={"_blank"}>
                            Thecyberworld
                        </Link>
                    </b>
                    and work on those issues.
                    <br />
                    <br />
                    <Link href={"https://github.com/thecyberworld/"} target={"_blank"}></Link>
                    Some good resources to get started for beginners:
                    <div style={{ margin: "10px 20px" }}>
                        <ListContent>
                            <List>
                                Open Source Guides:
                                <Link href={"https://opensource.guide/how-to-contribute/"} target={"_blank"}>
                                    How to contribute to Open Source
                                </Link>
                            </List>
                            <List>
                                GitHub:
                                <Link href={"https://training.github.com/"} target={"_blank"}>
                                    GitHub training kit
                                </Link>
                            </List>
                            <List>
                                DigitalOcean:
                                <Link
                                    href={
                                        "https://www.digitalocean.com/community/tutorial_series/an-introduction-to-open-source"
                                    }
                                    target={"_blank"}
                                >
                                    Introduction to Open Source
                                </Link>
                            </List>
                            <List>
                                GitHub:
                                <Link
                                    href={"https://github.blog/2015-01-21-how-to-write-the-perfect-pull-request/"}
                                    target={"_blank"}
                                >
                                    Write good PRs
                                </Link>
                            </List>
                        </ListContent>
                    </div>
                </p>
            </>
        ),
    },
];

export default HacktoberfestEventData;
