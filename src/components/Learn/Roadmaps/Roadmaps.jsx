import React from "react";
import {
    RoadmapCard,
    RoadmapHeading,
    RoadmapDesc,
    Overlay,
    RoadmapContainer,
    OverlayDetails,
} from "./RoadmapsElements";

import RoadmapsData from "./RoadmapsData";
import { encodeURL } from "../Blogs/util";
import { RouterLink } from "./RoadmapElements";

const Roadmaps = () => {
    return (
        <>
            <RoadmapContainer>
                {RoadmapsData.map((roadmap, id) => {
                    return (
                        <RouterLink key={id} to={{ pathname: `${encodeURL(roadmap.title)}` }}>
                            {roadmap.details.map((resources) => {
                                return (
                                    <>
                                        {resources.section === "Coming Soon" && (
                                            <Overlay key={id}>
                                                <OverlayDetails>{resources.section}</OverlayDetails>
                                            </Overlay>
                                        )}
                                    </>
                                );
                            })}
                            <RoadmapCard key={id}>
                                <RoadmapHeading> {roadmap.title} </RoadmapHeading>
                                <RoadmapDesc> {roadmap.desc} </RoadmapDesc>
                            </RoadmapCard>
                        </RouterLink>
                    );
                })}
            </RoadmapContainer>

            {/*<ResourcesListSection>*/}
            {/*    <SectionHeading>👨‍💻Cyber Sec Roadmap👨‍💻</SectionHeading>*/}
            {/*    <SectionSubHeading>Resources are in order</SectionSubHeading>*/}

            {/*  */}
            {/*    <Heading> Practice / Learn - Web App Pen-testing </Heading>*/}
            {/*    <ListContent>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://portswigger.net/web-security/learning-path"} target={"_blank"}>*/}
            {/*                Web Security Academy*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://pentesterlab.com"} target={"_blank"}>*/}
            {/*                Pentesterlab*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://www.bugbountyhunter.com"} target={"_blank"}>*/}
            {/*                Bugbountyhunter*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://application.security"} target={"_blank"}>*/}
            {/*                Kontra*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*    </ListContent>*/}

            {/*    <Heading> CTF Practice </Heading>*/}
            {/*    <ListContent>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://ctf.hacker101.com/"} target={"_blank"}>*/}
            {/*                ctf.hacker101.com*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://overthewire.org/wargames/"} target={"_blank"}>*/}
            {/*                overthewire.org*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://vulnhub.com"} target={"_blank"}>*/}
            {/*                VulnHub*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://ctfchallenge.com/"} target={"_blank"}>*/}
            {/*                ctfchallenge.com*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://tryhackme.com/"} target={"_blank"}>*/}
            {/*                tryhackme.com*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://www.hackthebox.com/"} target={"_blank"}>*/}
            {/*                www.hackthebox.com*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://www.bugbountyhunter.com/"} target={"_blank"}>*/}
            {/*                www.bugbountyhunter.com*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://ctftime.org"} target={"_blank"}>*/}
            {/*                CTF Time - CTF Events*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*    </ListContent>*/}

            {/*    <Heading> Bug bounty hunting Programs </Heading>*/}
            {/*    <ListContent>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://bugcrowd.com/ "} target={"_blank"}>*/}
            {/*                bugcrowd.com*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://hackerone.com/ "} target={"_blank"}>*/}
            {/*                hackerone.com*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://www.facebook.com/whitehat"} target={"_blank"}>*/}
            {/*                facebook.com/whitehat*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://www.intigriti.com/ "} target={"_blank"}>*/}
            {/*                intigriti.com*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://www.yeswehack.com/ "} target={"_blank"}>*/}
            {/*                yeswehack.com*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*        <List>*/}
            {/*            <Link href={"https://yogosha.com/ "} target={"_blank"}>*/}
            {/*                yogosha.com*/}
            {/*            </Link>*/}
            {/*        </List>*/}
            {/*    </ListContent>*/}
            {/*</ResourcesListSection>*/}
        </>
    );
};

export default Roadmaps;
