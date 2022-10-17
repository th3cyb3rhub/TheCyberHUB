import React from 'react';

import {ResourcesListSection, SectionSubHeading, SectionHeading, Heading, ListContent, List, Link} from "./RoadmapResourcesElements";

const RoadmapResources = () => {
    return (
        <ResourcesListSection>
            <SectionHeading>👨‍💻Cyber Sec Roadmap👨‍💻</SectionHeading>
            <SectionSubHeading>Resources are in order</SectionSubHeading>

            <Heading> Essential Skills </Heading>
            <ListContent>
                <List><Link href={"https://www.professormesser.com/free-a-plus-training/220-1001/220-1000-training-course/"} target={"_blank"}>Basic IT Skills</Link></List>
            </ListContent>

            <Heading> Computer Networking </Heading>
            <ListContent>
                <List><Link href={"https://youtu.be/IPvYjXCsTg8"} target={"_blank"}>Computer Networking</Link></List>
                <List><Link href={"https://www.professormesser.com/network-plus/n10-007/n10-007-training-course/"} target={"_blank"}>Network-plus n10-007</Link></List>
                <List><Link href={"https://www.netacad.com/courses/packet-tracer"} target={"_blank"}>NetCad Packet Tracer</Link></List>
            </ListContent>

            <Heading> Linux </Heading>
            <ListContent>
                <List><Link href={"https://youtu.be/v_1zB2WNN14"} target={"_blank"}>Linux Tutorial</Link></List>
                <List><Link href={"https://youtu.be/1hvVcEhcbLM"} target={"_blank"}>Linux Essentials for Ethical Hackers</Link></List>
                <List><Link href={"https://linuxjourney.com/"} target={"_blank"}>Linux Journey</Link></List>
                <List><Link href={"https://overthewire.org/wargames/bandit/"} target={"_blank"}>OverTheWire Bandit</Link></List>
            </ListContent>

            <Heading> Programming </Heading>
            <ListContent>
                <List><Link href={"https://www.youtube.com/watch?v=qz0aGYrrlhU"} target={"_blank"}>HTML Tutorial for Beginners: HTML Crash Course</Link></List>
                <List><Link href={"https://www.youtube.com/watch?v=W6NZfCO5SIk"} target={"_blank"}>JavaScript Tutorial for Beginners</Link></List>
                <List><Link href={"https://www.youtube.com/watch?v=p3qvj9hO_Bo"} target={"_blank"}>Learn SQL In 60 Minutes</Link></List>
                <List><Link href={"https://www.youtube.com/watch?v=Zl7npywCB84"} target={"_blank"}>Basics of Bash Shell Scripting</Link></List>
                <List><Link href={"https://www.youtube.com/watch?v=7utwZYKweho&t=8861s"} target={"_blank"}>Python for Beginners / Hackers</Link></List>
            </ListContent>

            <Heading> Cyber Security </Heading>
            <ListContent>
                <List><Link href={"https://youtu.be/fNzpcB7ODxQ"} target={"_blank"}>Ethical Hacking Course</Link></List>
                <List><Link href={"https://youtu.be/qwA6MmbeGNo"} target={"_blank"}>Open-Source Intelligence</Link></List>
            </ListContent>


            <Heading> WebApp Pen-testing </Heading>
            <ListContent>
                <List><Link href={"https://youtu.be/X4eRbHgRawI"} target={"_blank"}>Web App Pentesting</Link></List>
                <List><Link href={"https://www.youtube.com/playlist?list=PLBf0hzazHTGO3EpGAs718LvLsiMIv9dSC"} target={"_blank"}>Web App Penetration Testing Tutorials</Link></List>
            </ListContent>

            <Heading> Bug Hunting </Heading>
            <ListContent>
                <List><Link href={"https://www.youtube.com/watch?v=hDYqWZ11njU&list=PLbyncTkpno5FAC0DJYuJrEqHSMdudEffw"} target={"_blank"}>New to bug hunting</Link></List>
                <List><Link href={"https://www.youtube.com/watch?v=yCUQBc2rY9Y&list=PLbyncTkpno5HqX1h2MnV6Qt4wvTb8Mpol"} target={"_blank"}>Everything API Hacking</Link></List>
                <List><Link href={"https://www.youtube.com/playlist?list=PLF7JR1a3dLONdkRYU_8-5OcgOzrWe2549"} target={"_blank"}>Bug bounty / webapp pentesting tutorials</Link></List>
                <List><Link href={"https://www.youtube.com/c/RanaKhalil101/videos"} target={"_blank"}>Web Security Academy</Link></List>
                <List><Link href={"https://www.youtube.com/playlist?list=PLhfP6zOcRP1f_FyWc_gk1fRz1mxst0QE5"} target={"_blank"}>Guide to Failing at Bug Bounties</Link></List>
                <List><Link href={"https://www.youtube.com/playlist?list=PLhfP6zOcRP1fXtBtxhTlu9KR-PKDA6biX"} target={"_blank"}>What after Recon?</Link></List>
                <List><Link href={"https://www.youtube.com/playlist?list=PLhfP6zOcRP1dCTjbENt4ilFKFwFpspOoS"} target={"_blank"}>No BS Guides</Link>
                </List>
            </ListContent>

            <Heading> Practice / Learn - Web App Pen-testing </Heading>
            <ListContent>
                <List><Link href={"https://portswigger.net/web-security/learning-path"} target={"_blank"}>Web Security Academy</Link></List>
                <List><Link href={"https://pentesterlab.com"} target={"_blank"}>Pentesterlab</Link></List>
                <List><Link href={"https://www.bugbountyhunter.com"} target={"_blank"}>Bugbountyhunter</Link></List>
                <List><Link href={"https://application.security"} target={"_blank"}>Kontra</Link></List>
            </ListContent>


            <Heading> CTF Practice </Heading>
            <ListContent>
                <List><Link href={"https://ctf.hacker101.com/"} target={"_blank"}>ctf.hacker101.com</Link></List>
                <List><Link href={"https://overthewire.org/wargames/"} target={"_blank"}>overthewire.org</Link></List>
                <List><Link href={"https://vulnhub.com"} target={"_blank"}>VulnHub</Link></List>
                <List><Link href={"https://ctfchallenge.com/"} target={"_blank"}>ctfchallenge.com</Link></List>
                <List><Link href={"https://tryhackme.com/"} target={"_blank"}>tryhackme.com</Link></List>
                <List><Link href={"https://www.hackthebox.com/"} target={"_blank"}>www.hackthebox.com</Link></List>
                <List><Link href={"https://www.bugbountyhunter.com/"} target={"_blank"}>www.bugbountyhunter.com</Link></List>
                <List><Link href={"https://ctftime.org"} target={"_blank"}>CTF Time - CTF Events</Link></List>
            </ListContent>

            <Heading> Bug bounty hunting Programs </Heading>
            <ListContent>
                <List><Link href={"https://bugcrowd.com/ "} target={"_blank"}>bugcrowd.com</Link></List>
                <List><Link href={"https://hackerone.com/ "} target={"_blank"}>hackerone.com</Link></List>
                <List><Link href={"https://www.facebook.com/whitehat"} target={"_blank"}>facebook.com/whitehat</Link></List>
                <List><Link href={"https://www.intigriti.com/ "} target={"_blank"}>intigriti.com</Link></List>
                <List><Link href={"https://www.yeswehack.com/ "} target={"_blank"}>yeswehack.com</Link></List>
                <List><Link href={"https://yogosha.com/ "} target={"_blank"}>yogosha.com</Link></List>
            </ListContent>
        </ResourcesListSection>
    );
};

export default RoadmapResources;
