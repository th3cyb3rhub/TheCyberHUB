import contributeSvg from '../../../assets/images/open-source-contribution.svg';
import VersionControlSvg from '../../../assets/images/Servies/undraw_version_control_re_mg66.svg';
import communitySvg from '../../../assets/images/undraw_public_discussion_re_w9up.svg';
import ResourcesSvg from '../../../assets/images/undraw_programming_re_kg9v.svg';
import logo_thecyberworld from '../../../assets/LogoTrans_theCyberw0rld.png';

import {FaGithub} from "react-icons/fa";
import {IconsSpacing} from "../../MixComponenets/Buttons/ButtonElements";
import {IconsSpacing2} from "../../MixComponenets/Buttons/ButtonElements";
import {Symbol} from "./InfoElements";
import {BsFillPlayFill} from "react-icons/bs";

const GSymbol = () => {
    return (<Symbol>></Symbol>)
}

export const aboutData = {
    id: 'about',
    idTo: 'community',
    buttonType: 'scroll',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Thecyberworld Community',
    headline: 'About Thecyberworld',
    description:
        <p>
            <GSymbol/> Community with more than 100,000 members. <br/><br/>
            <GSymbol/> Community's goal is to help new folks to get started with open-source and cyber-security. <br/><br/>
            <GSymbol/> Open-source projects. <br/><br/>
            <GSymbol/> A Hub of Cyber Security. <br/><br/>
        </p>,
    buttonLabel: 'Get started',
    buttonLabel2: 'Contribute',
    buttonLabel3: 'Join',
    imgStart: false,
    img: logo_thecyberworld,
    alt: 'Car',
    dark: true,
    primary: true,
    darkText: false,
};

export const ResourcesData = {
    id: 'resources',
    idTo: 'resources',
    buttonType: 'router',
    link: "/resources",
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Resources',
    headline: 'Cyber Sec Resources',
    description:
        <p>
            We provide free courses for Cyber-security. <br/>
            Cyber WriteUps, RoadMap, and much more.
        </p>,
    buttonLabel: <> Explore <IconsSpacing2> <BsFillPlayFill/> </IconsSpacing2>  </>,
    imgStart: true,
    img: ResourcesSvg,
    alt: 'ResourcesSvg',
    dark: true,
    primary: true,
    darkText: false,
};

export const communityData = {
    id: 'community',
    idTo: 'join',
    buttonType: 'scroll',
    link: "joinUs",
    link2: "https://www.linktree.com/thecyberworld",
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Join our Community',
    headline: 'Over 100,0000 members',
    description:
        <p>
            Community's goal is to help new folks to get started with open-source, cyber-security and to help existing
            folks get more involved in the open-source and cyber-security communities.
        </p>,
    buttonLabel: 'Join now',
    imgStart: false,
    img: communitySvg,
    alt: 'Secure data',
    dark: true,
    primary: true,
    darkText: false,
};

export const OpenSource = {
    id: 'contribute',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Open Source',
    headline: 'What is Open Source?',
    description:
        <p>
            Open source software (OSS) is software that is distributed with its source code, making it available for use, modification, and distribution with its original rights.
        </p>,
    buttonLabel: <> <IconsSpacing> <FaGithub/> </IconsSpacing> Contribute now </>,
    imgStart: false,
    img: VersionControlSvg,
    alt: 'Secure data',
    dark: true,
    primary: true,
    darkText: false,
};

export const contributeData = {
    id: 'contribute',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Contribute to Thecyberworld',
    headline: 'Want to contribute?',
    description:
        <p>
            That's great! We welcome all sorts of contributions from raising issues, starting discussions, adding
            documentation, making pull requests and so much more! Help each other and make improvements! Check the
            contributing guidelines in each repository for guidance on how to get started.
        </p>,
    buttonLabel: <> <IconsSpacing> <FaGithub/> </IconsSpacing> Contribute now </>,
    imgStart: false,
    img: contributeSvg,
    alt: 'Secure data',
    dark: true,
    primary: true,
    darkText: false,
};
