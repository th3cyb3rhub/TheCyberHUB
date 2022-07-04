import contributeSvg from '../../../assets/images/open-source-contribution.svg';
import communitySvg from '../../../assets/images/undraw_public_discussion_re_w9up.svg';
import coursesSvg from '../../../assets/images/undraw_programming_re_kg9v.svg';
import logo_thecyberworld from '../../../assets/LogoTrans_theCyberw0rld.png';
import {FaGithub} from "react-icons/fa";
import {IconsSpacing} from "../../Buttons/ButtonElements";
import {IconsSpacing2} from "../../Buttons/ButtonElements";
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
            <GSymbol/> We help new folks to get into Cyber-security field. <br/><br/>
            <GSymbol/> We resolve folk's doubts relates to Cyber-security. <br/><br/>
            <GSymbol/> Guided more than 20k folks to get into Cyber-security.<br/><br/>
            <GSymbol/> Open-source projects.
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

export const coursesData = {
    id: 'courses',
    idTo: 'courses',
    buttonType: 'scroll',
    link: "/freeCourses",
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Free Courses',
    headline: 'Cyber Security Courses',
    description:
        <p>
            We provide free courses for Cyber-security. <br/>
            You can start your cyber-security journey today with our free courses.
        </p>,
    buttonLabel: <> Explore <IconsSpacing2> <BsFillPlayFill/> </IconsSpacing2>  </>,
    imgStart: true,
    img: coursesSvg,
    alt: 'coursesSvg',
    dark: false,
    primary: false,
    darkText: true,
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
    headline: 'Over 100,000 members',
    description: 'We help new folks get started into cyber-security field and guided them properly. ' +
        'We also resolve folk\'s doubts relates to cyber-security.',
    buttonLabel: 'Join now',
    imgStart: false,
    img: communitySvg,
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
    headline: 'Open Source Projects',
    description: 'We also help new folks get started into open-source world and guided them about open-source. ' +
        'We have open-source projects, where you can contribute to it.',
    buttonLabel: <> <IconsSpacing> <FaGithub/> </IconsSpacing> Contribute now </>,
    imgStart: false,
    img: contributeSvg,
    alt: 'Secure data',
    dark: true,
    primary: true,
    darkText: false,
};
