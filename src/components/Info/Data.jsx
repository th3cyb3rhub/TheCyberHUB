import carSvg from '../../assets/images/svg-1.svg';
import piggyBankSvg from '../../assets/images/piggyBank.svg';
// import secureDataSvg from '../../assets/images/secure_data.svg';
import contributeSvg from '../../assets/images/undraw_developer_activity_re_39tg.svg';
import communitySvg from '../../assets/images/undraw_work_chat_re_qes4.svg';
import {FaGithub} from "react-icons/fa";
import {IconsSpacing} from "../Buttons/ButtonElements";
import {IconsSpacing2} from "../Buttons/ButtonElements";
// import {CgCommunity} from "react-icons/ca";
// import {MdOutlineVideoLibrary} from "react-icons/md";
// import {FcCollaboration} from "react-icons/fc";
// import {BiGitPullRequest} from "react-icons/bi";
// import {BiNews} from "react-icons/bi";
import {BsCollectionPlayFill, BsFillPlayFill} from "react-icons/bs";

export const aboutData = {
    id: 'about',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Thecyberworld Community',
    headline: 'About Thecyberworld',
    description: <p>
        We help new folks to get into Cyber-security field.
        We resolve folk's doubts relates to Cyber-security.
        Guided more than 20k folks to get into Cyber-security.
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

export const coursesData = {
    id: 'courses',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Free Courses',
    headline: 'Cyber Security Courses',
    description: 'Start your cyber security journey today with our free courses.',
    buttonLabel: <> Explore <IconsSpacing2> <BsFillPlayFill /> </IconsSpacing2>  </>,
    imgStart: true,
    img: piggyBankSvg,
    alt: 'PiggyBank',
    dark: false,
    primary: false,
    darkText: true,
};

export const communityData = {
    id: 'community',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Join our Community',
    headline: 'Over 1,0000 members',
    description: 'We help new folks get started into cyber security and get them up to speed with the latest tools and techniques.',
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
    description: 'We help new folks get started into cyber security and get them up to speed with the latest tools and techniques.',
    buttonLabel: <> <IconsSpacing> <FaGithub/> </IconsSpacing>  Contribute now </>,
    imgStart: false,
    img: contributeSvg,
    alt: 'Secure data',
    dark: true,
    primary: true,
    darkText: false,
};