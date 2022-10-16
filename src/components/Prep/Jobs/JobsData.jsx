import {
    FaStar,
    FaBriefcase,
    FaClock,
    FaTelegramPlane,
    FaBolt,
    FaCircle,
    FaMoneyCheckAlt,
    FaUserPlus,
} from "react-icons/fa";

const iconSize = 15;

export const JobsData = [
    {
        id: "Data Analysts",
        status: "new",
        jobTitle: "Data Analysts",
        jobRoleTitle: "Cloudstaff",
        jobRating: (<> 4.1 <FaStar size={iconSize} style={{color: "orange"}}/> </>),
        jobLocation: "Remote",
        jobDetails: [
            {item: (<> <FaMoneyCheckAlt size={iconSize}/> $10,000 - $40,000 a month </>),},
            {item: (<> <FaBriefcase size={iconSize}/> Full-time </>),},
            {item: (<> <FaClock size={iconSize}/> Morning shift </>),},
        ],
        jobDetails2: [
            <> <FaTelegramPlane size={iconSize} style={{color: "#20c20e"}}/> Apply securely with Indeed Resume </>,
            <> <FaBolt size={iconSize} style={{color: "#20c20e"}}/> Responsive employer </>,
        ],
        jobReq: [
            <>Technical expertise in data models, database design development, data mining, and segmentation technique.</>,
            <>Strong knowledge of and experience with reporting packages (Business Objects, etc.), databases...</>,
        ],
        jobTimeline: {
            datePosted: "Posted 3 days ago",
            separator: (<><FaCircle/></>),
            directory: "remote",
        },
    },
    {
        id: "Content Copywriter",
        jobTitle: "Content Copywriter for travel blog",
        jobRoleTitle: "Trip101 Pte ltd",
        jobRating: (<>5.0<FaStar size={iconSize} style={{color: "orange"}}/></>),
        jobLocation: "India",
        jobDetails: [
            {
                item: (<><FaMoneyCheckAlt size={iconSize}/>$7000 - $30,000 a month</>),
            },
            {
                badge: "1",
                item: (<><FaBriefcase size={iconSize}/>Part-time</>),
            },
            {
                badge: "2",
                item: (<><FaClock size={iconSize}/>Weekend availability</>),
            },
        ],
        jobDetails2: [
            <><FaClock size={iconSize} style={{color: "orange"}}/>Urgently hiring</>,
            <><FaUserPlus size={iconSize} style={{color: "orange"}}/>Hiring multiple candidates</>,
        ],
        jobReq: [
            <>Produce a minimum of 5 articles per month.</>,
            <>Curate travel content for a global readership.</>,
            <>Research relevant facts and details to drive informative, engaging, and inspirational articles</>,
        ],
        jobTimeline: {
            datePosted: "Hiring ongoing",
            separator: (<><FaCircle/></>),
            directory: "remote",
        },
    },
    {
        id: "Frontend Engineer",
        jobTitle: "Frontend Engineer",
        jobRoleTitle: "Thecyberhub",
        jobRating: (<>5.0<FaStar size={iconSize} style={{color: "orange"}}/></>),
        jobLocation: "Hybrid",
        jobDetails: [
            {
                item: (<><FaMoneyCheckAlt size={iconSize}/>$10,000 - $35,000 a month</>),
            },
            {
                badge: "3",
                item: (<><FaBriefcase size={iconSize}/>Full-time</>),
            },
        ],
        jobDetails2: [
            <><FaTelegramPlane size={iconSize} style={{color: "#20c20e"}}/>Apply securely with Indeed Resume</>,
            <><FaBolt size={iconSize} style={{color: "#20c20e"}}/>Responsive employe</>,
            <><FaUserPlus size={iconSize} style={{color: "orange"}}/>Hiring multiple candidates</>,
        ],
        jobReq: [
            <>Lorem ipsum dolor sit amet consectetur adipisicing elit.</>,
            <>Lorem ipsum dolor sit amet consectetur adipisicing elit.</>,
            <>Lorem ipsum dolor sit amet consectetur adipisicing elit, Mollitia expedita perferendis neque.</>,
        ],
        jobTimeline: {
            datePosted: "Hiring ongoing",
            separator: (<><FaCircle/></>),
            directory: "remote",
        },
    },
    {
        id: "Backend Engineer",
        jobTitle: "Backend Engineer",
        jobRoleTitle: "Thecyberhub",
        jobRating: (<>4.6<FaStar size={iconSize} style={{color: "orange"}}/></>),
        jobLocation: "Remote",
        jobDetails: [
            {
                item: (<><FaMoneyCheckAlt size={iconSize}/>$10,000 - $20,000 a month</>),
            },
            {
                badge: "4",
                item: (<><FaBriefcase size={iconSize}/>Part-time</>),
            },
            {
                badge: "2",
                item: (<><FaClock size={iconSize}/>Weekend availability</>),
            },
        ],
        jobDetails2: [
            <><FaTelegramPlane size={iconSize} style={{color: "#20c20e"}}/>Apply securely with Indeed Resume</>,
            <><FaBolt size={iconSize} style={{color: "#20c20e"}}/>Responsive employer</>,
            <><FaUserPlus size={iconSize} style={{color: "orange"}}/>Hiring multiple candidates</>,
        ],
        jobReq: [
            <>Lorem ipsum dolor sit amet consectetur adipisicing elit.</>,
            <>Lorem ipsum dolor sit amet consectetur adipisicing elit.</>,
            <>Lorem ipsum dolor sit amet consectetur adipisicing elit, Mollitia expedita perferendis neque.</>,
        ],
        jobTimeline: {
            datePosted: "Hiring ongoing",
            separator: (<><FaCircle/></>),
            directory: "remote",
        },
    },
    {
        id: "Product Designer",
        jobTitle: "Product Designer",
        jobRoleTitle: "Thecyberhub",
        jobRating: (<>4.8<FaStar size={iconSize} style={{color: "orange"}}/></>),
        jobLocation: "Hybrid",
        jobDetails: [
            {
                item: (
                    <><FaMoneyCheckAlt size={iconSize}/>$10,000 - $40,000 a month</>),
            },
            {
                badge: "4",
                item: (<><FaBriefcase size={iconSize}/>Full-time</>),
            },
            {
                item: (<><FaClock size={iconSize}/>Morning shift</>),
            },
        ],
        jobDetails2: [
            <><FaClock size={iconSize} style={{color: "orange"}}/>Urgently hiring</>,
            <><FaTelegramPlane size={iconSize} style={{color: "#20c20e"}}/>Apply securely with Indeed Resume</>,
            <><FaBolt size={iconSize} style={{color: "#20c20e"}}/>Responsive employer</>,
            <><FaUserPlus size={iconSize} style={{color: "orange"}}/>Hiring multiple candidates</>,
        ],
        jobReq: [
            <>Lorem ipsum dolor sit amet consectetur adipisicing elit.</>,
            <>Lorem ipsum dolor sit amet consectetur adipisicing elit.</>,
            <>Lorem ipsum dolor sit amet consectetur adipisicing elit, Mollitia expedita perferendis neque.</>,
        ],
        jobTimeline: {
            datePosted: "Hiring ongoing",
            separator: (<><FaCircle/></>),
            directory: "remote",
        },
    },
    {
        id: "DevOps Engineer",
        jobTitle: "DevOps Engineer",
        jobRoleTitle: "Thecyberhub",
        jobRating: (<>5.0<FaStar size={iconSize} style={{color: "orange"}}/></>),
        jobLocation: "U.S.A",
        jobDetails: [
            {
                item: (<><FaMoneyCheckAlt size={iconSize}/>$10,000 - $50,000 a month</>),
            },
            {
                badge: "5",
                item: (<><FaBriefcase size={iconSize}/>Full-time</>),
            },
            {
                badge: "2",
                item: (<><FaClock size={iconSize}/>Morning shift</>),
            },
        ],
        jobDetails2: [
            <><FaClock size={iconSize} style={{color: "orange"}}/>Urgently hiring</>,
            <><FaTelegramPlane size={iconSize} style={{color: "#20c20e"}}/>Apply securely with Indeed Resume</>,
            <><FaBolt size={iconSize} style={{color: "#20c20e"}}/>Responsive employer</>,
            <><FaUserPlus size={iconSize} style={{color: "orange"}}/>Hiring multiple candidates</>,
        ],
        jobReq: [
            <>Lorem ipsum dolor sit amet consectetur adipisicing elit.</>,
            <>Lorem ipsum dolor sit amet consectetur adipisicing elit.</>,
            <>Lorem ipsum dolor sit amet consectetur adipisicing elit, Mollitia expedita perferendis neque.</>,
        ],
        jobTimeline: {
            datePosted: "Hiring ongoing",
            separator: (<><FaCircle/></>),
            directory: "remote",
        },
    },
];
