import carSvg from '../../assets/images/svg-1.svg';
import piggyBankSvg from '../../assets/images/piggyBank.svg';
import secureDataSvg from '../../assets/images/secure_data.svg';

export const homeObjOne = {
    id: 'about',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Premium Bank',
    headline: 'Unlimited Transactions with zero fees',
    description: 'Get access to our exclusive app that allows you to send unlimited transactions without getting charged any fees.',
    buttonLabel: 'Get started',
    imgStart: false,
    img: carSvg,
    alt: 'Car',
    dark: true,
    primary: true,
    darkText: false,
};

export const homeObjTwo = {
    id: 'freeCourses',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Free Courses',
    headline: 'Cyber Security Courses',
    description: 'Start your cyber security journey today with our free courses.',
    buttonLabel: 'Learn more',
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
    buttonLabel: 'Start now',
    imgStart: false,
    img: secureDataSvg,
    alt: 'Secure data',
    dark: true,
    primary: true,
    darkText: false,
};