import React from "react";
import { getCdnAssets } from "src/features/apiUrl";
import { FaGithub } from "react-icons/fa";
import { IconsSpacing, IconsSpacing2 } from "src/components/Other/MixComponents/Buttons/ButtonElements";
import { BsFillPlayFill } from "react-icons/bs";
import { List, ListContainer, ListContent, ListIcon } from "src/components/Resources/Jobs/JobDetailsElements";
import contributeSvg from "src/assets/images/open-source-contribution.svg";
import ResourcesSvg from "src/assets/images/undraw_firmware_re_fgdy.svg";
import VersionControlSvg from "src/assets/images/undraw_version_control_re_mg66.svg";
import { PiWindowsLogoFill } from "react-icons/pi";

const logoThecyberworld = `${getCdnAssets}/images/ThecyberworldLogo/Thecyberworld_logo_outlined.png`;
const desktopApp =
    "https://thecyberhub-assets.s3.ap-south-1.amazonaws.com/thecyberhub-assets/assets/images/TheCyberHUB-Desktop.png";

export const aboutData = {
    id: "about",
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: "TheCyberHUB Community",
    headline: "Empowering the Next Generation of Cybersecurity Experts",
    description: (
        <>
            Welcome to TheCyberHUB, the ultimate destination for cybersecurity enthusiasts.
            <br />
            <br />
            Explore our offerings:
            <ListContainer>
                <List>
                    <ListIcon />
                    <ListContent>Free Cybersecurity courses (coming soon).</ListContent>
                </List>
                <List>
                    <ListIcon />
                    <ListContent>Guidance for newcomers in open-source and cybersecurity.</ListContent>
                </List>
                <List>
                    <ListIcon />
                    <ListContent>A community of over 150,000 members.</ListContent>
                </List>
                <List>
                    <ListIcon />
                    <ListContent>Contribute to open-source projects, including our website and apps.</ListContent>
                </List>
                <List>
                    <ListIcon />
                    <ListContent>Become part of a hub for cybersecurity.</ListContent>
                </List>
            </ListContainer>
        </>
    ),
    buttonLabel1: "Join our Community",
    link1: "/community",
    buttonType1: "router",
    buttonLabel2: "Contribute to Open Source",
    link2: "/opensec-projects",
    buttonType2: "router",
    imgStart: false,
    img: logoThecyberworld,
    alt: "TheCyberHUB Community Logo",
    dark: true,
    primary: true,
    darkText: false,
};

export const desktopAppDownloadData = {
    id: "desktop-download",
    buttonLabel1: (
        <>
            Download for Windows{" "}
            <IconsSpacing style={{ marginLeft: "10px" }}>
                <PiWindowsLogoFill />
            </IconsSpacing>
        </>
    ),
    link1: "https://github.com/th3cyb3rhub/TheCyberHUB-Desktop/releases",
    buttonType1: "redirect",
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: "Download TheCyberHUB Desktop App",
    headline: "Join 150,000+ Users Enhancing Their Cybersecurity Skills",
    description: (
        <>
            TheCyberHUB Desktop App offers seamless access to essential resources and tools for cybersecurity
            enthusiasts. Join a community of users advancing their skills with our intuitive application, featuring
            regular updates to keep you informed and equipped.
        </>
    ),
    img: desktopApp,
    imgStart: true,
    dark: true,
    primary: true,
    darkText: false,
};

export const ResourcesData = {
    id: "resources",
    buttonType1: "router",
    link1: "/roadmaps",
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: "Resources",
    headline: "Cyber Sec Resources",
    description: (
        <>
            Explore a variety of Cyber Security Resources, including courses, CTFs, events, blogs, tools, write-ups, and
            roadmaps.
        </>
    ),
    buttonLabel1: (
        <>
            Explore
            <IconsSpacing2>
                <BsFillPlayFill />
            </IconsSpacing2>
        </>
    ),
    imgStart: false,
    img: ResourcesSvg,
    alt: "Free Cyber Security Course SVG",
    dark: true,
    primary: true,
    darkText: false,
};

export const contributeData = {
    id: "contribute",
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: "Contribute to TheCyberHUB",
    headline: "Want to Contribute?",
    description: (
        <>
            We welcome contributions such as raising issues, discussions, documentation, and pull requests. Check the
            contributing guidelines in each repository to get started.
        </>
    ),
    buttonLabel1: (
        <>
            <IconsSpacing>
                <FaGithub />
            </IconsSpacing>
            Contribute to Projects
        </>
    ),
    link1: "https://github.com/th3cyb3rhub",
    buttonType1: "redirect",
    buttonLabel2: "Contribute to Community",
    link2: "/community",
    buttonType2: "router",
    imgStart: true,
    img: contributeSvg,
    alt: "Open Source Contribution SVG",
    dark: true,
    primary: true,
    darkText: false,
};

export const communityData = {
    id: "community",
    idTo: "join",
    buttonLabel1: "Join Community",
    link1: "https://discord.com/invite/thecyberhub-799183504759324672",
    buttonType1: "redirect",
    buttonLabel2: "All Community Links",
    link2: "https://linktr.ee/th3cyb3rhub",
    buttonType2: "redirect",
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: "Join our Community",
    headline: "150,000+ Members",
    description: (
        <>
            Our community helps newcomers get started with open-source and cybersecurity while encouraging existing
            members to engage further.
        </>
    ),
    imgStart: false,
    dark: true,
    primary: true,
    darkText: false,
};

export const OpenSource = {
    id: "open-source",
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: "Open Source",
    headline: "What is Open Source?",
    description: (
        <p>
            Open source software (OSS) is distributed with its source code, allowing for use, modification, and
            redistribution under its original rights.
        </p>
    ),
    buttonLabel_ContributeToOpensource: (
        <>
            <IconsSpacing>
                <FaGithub />
            </IconsSpacing>
            Contribute Now
        </>
    ),
    buttonLabelNew: "Open Source Projects",
    imgStart: false,
    img: VersionControlSvg,
    alt: "Secure Data",
    dark: true,
    primary: true,
    darkText: false,
};
