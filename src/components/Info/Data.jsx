import carSvg from '../../assets/images/svg-1.svg';
import piggyBankSvg from '../../assets/images/piggyBank.svg';
import secureDataSvg from '../../assets/images/secure_data.svg';
import contributeSvg from '../../assets/images/undraw_developer_activity_re_39tg.svg';
import {FaGithub} from "react-icons/fa";

export const homeObjOne = {
    id: 'about',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Thecyberworld Community',
    headline: 'About Thecyberworld',
    // description: <ul>
    //     <li> We help new folks to get into Cyber-security field. </li>
    //     <li> We resolve folk's issues, doubts relates to Cyber-security. </li>
    //     <li> Guided more than 20k folks to get into Cyber-security. </li>
    //     <li> Working on Open-source projects. </li>
    // </ul>,
    description: <p>
        We help new folks to get into Cyber-security field. <br/>
        We resolve folk's doubts relates to Cyber-security. <br/>
        Guided more than 20k folks to get into Cyber-security. <br/>
        Working on Open-source projects.
    </p>,
    buttonLabel: 'Get started',
    buttonLabel2: 'Contribute',
    buttonLabel3: 'Join',
    imgStart: false,
    img: carSvg,
    alt: 'Car',
    dark: true,
    primary: true,
    darkText: false,
};

export const homeObjTwo = {
    id: 'courses',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Free Courses',
    headline: 'Cyber Security Courses',
    description: 'Start your cyber security journey today with our free courses.',
    buttonLabel: 'Explore',
    imgStart: true,
    img: piggyBankSvg,
    alt: 'PiggyBank',
    dark: false,
    primary: false,
    darkText: true,
};

export const homeObjThree = {
    id: 'community',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Join our Community',
    headline: 'Over 1,0000 members',
    description: 'We help new folks get started into cyber security and get them up to speed with the latest tools and techniques.',
    buttonLabel: 'Join now',
    imgStart: false,
    img: secureDataSvg,
    alt: 'Secure data',
    dark: true,
    primary: true,
    darkText: false,
};

export const Contribute = {
    id: 'contribute',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Contribute to Thecyberworld',
    headline: 'Open Source Projects',
    description: 'We help new folks get started into cyber security and get them up to speed with the latest tools and techniques.',
    buttonLabel: <p> <FaGithub /> Contribute now </p>,
    imgStart: false,
    img: contributeSvg,
    alt: 'Secure data',
    dark: true,
    primary: true,
    darkText: false,
};