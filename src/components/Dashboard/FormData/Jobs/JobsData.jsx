import React from "react";
import { FaBolt, FaBriefcase, FaCircle, FaMoneyCheckAlt, FaStar, FaTelegramPlane } from "react-icons/fa";
import { RouterLink } from "./JobsElements";

const iconSize = 15;

export const JobsData = [
    {
        id: "Business Development Internship",
        status: "new",
        jobTitle: "Business Development Internship",
        jobRoleTitle: "Business Development Intern",
        jobRating: (
            <>
                4 <FaStar size={iconSize} style={{ color: "yellowgreen" }} />
            </>
        ),
        jobLocation: "Remote",
        jobDetails: [
            {
                item: (
                    <>
                        <FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Including Swag
                    </>
                ),
            },
            {
                item: (
                    <>
                        <FaBriefcase size={iconSize} style={{ color: "yellowgreen" }} /> Performance-based incentives
                    </>
                ),
            },
        ],
        jobDetails2: [
            <>
                <FaTelegramPlane size={iconSize} style={{ color: "#20c20e" }} /> Apply securely with Resume
            </>,
            <>
                <FaBolt size={iconSize} style={{ color: "#20c20e" }} /> Responsive employer
            </>,
        ],
        jobDesc1: (
            <p>
                Our company is seeking highly motivated interns for business development projects in the field of cyber
                security.
            </p>
        ),
        jobDesc2: (
            <p>
                This is a unique opportunity for individuals interested in building a career in business development.
                Your role will be to analyze and research companies to determine their need for cyber security services.
                If a company is not currently utilizing these services, you will then be responsible for scheduling a
                meeting and presenting our services to them.
                <br />
                <br />
                If you&apos;re eager to learn and make a difference,
                <br /> Submit your resume and cover letter through our
                <RouterLink to={"/contact"} style={{ color: "yellowgreen" }}>
                    {" "}
                    <b> Contact us </b>{" "}
                </RouterLink>{" "}
                form.
                <br />
                <br />
                Our company is committed to diversity and equal opportunity and does not discriminate based on race,
                religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or
                disability status.
            </p>
        ),
        jobReq: [
            "Strong research and analytical skills",
            "Excellent written and verbal communication skills",
            "Familiarity with business development techniques",
            "Passion for technology and cyber security",
            "Ability to work independently and as a team",
        ],
        jobRes: [
            "Conduct research and analysis on companies to determine their need for cyber security services",
            "Schedule and attend meetings with potential clients to present our services",
            "Contribute to the growth and success of the company through business development efforts",
            "Gain valuable experience and knowledge in the field of business development",
        ],
        jobTimeline: {
            datePosted: "Posted 2 days ago",
            separator: (
                <>
                    <FaCircle />
                </>
            ),
            directory: "remote",
        },
    },
    {
        id: "MERN Stack Internship",
        status: "new",
        jobTitle: "MERN Stack Internship",
        jobRoleTitle: "MERN Stack Developer",
        jobRating: (
            <>
                5 <FaStar size={iconSize} style={{ color: "yellowgreen" }} />
            </>
        ),
        jobLocation: "Remote",
        jobDetails: [
            {
                item: (
                    <>
                        <FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Including Swag
                    </>
                ),
            },
            {
                item: (
                    <>
                        <FaBriefcase size={iconSize} style={{ color: "yellowgreen" }} /> Performance-based incentives
                    </>
                ),
            },
        ],
        jobDetails2: [
            <>
                <FaTelegramPlane size={iconSize} style={{ color: "#20c20e" }} /> Apply securely with Thecyberhub Resume
            </>,
            <>
                <FaBolt size={iconSize} style={{ color: "#20c20e" }} /> Responsive employer
            </>,
        ],
        jobDesc1: (
            <p>
                Thecyberworld is a leading cyber security company seeking highly motivated interns for exciting projects
                in the field.
            </p>
        ),
        jobDesc2: (
            <p>
                This is a unique opportunity for individuals interested in building a career in cyber security.
                <br />
                <br />
                If you&apos;re eager to learn and make a difference,
                <br /> Submit your resume and cover letter through our
                <RouterLink to={"/contact"} style={{ color: "yellowgreen" }}>
                    {" "}
                    <b> Contact us </b>{" "}
                </RouterLink>{" "}
                form.
                <br />
                <br />
                Thecyberworld is committed to diversity and equal opportunity and does not discriminate based on race,
                religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or
                disability status.
            </p>
        ),
        jobReq: [
            "Strong knowledge of MONGODB, Express.js, Node.js, React.js, JavaScript, HTML, and CSS",
            "Good understanding of Redux and open-source technologies (a plus)",
            "Excellent problem-solving skills",
            "Strong written and verbal communication skills",
            "Passion for technology and cyber security",
        ],
        jobRes: [
            "Collaborate with team on development and implementation of cyber security projects",
            "Utilize skills in MONGODB, Express.js, Node.js, React.js, JavaScript, HTML, and CSS to improve systems and processes",
            "Gain hands-on experience in the field of cyber security",
            "Familiarize yourself with Redux and open-source technologies",
        ],
        jobTimeline: {
            datePosted: "Posted 3 days ago",
            separator: (
                <>
                    <FaCircle />
                </>
            ),
            directory: "remote",
        },
    },
    {
        id: "Content Creator Internship",
        status: "new",
        jobTitle: "Content Creator Internship",
        jobRoleTitle: "Content Creator",
        jobRating: (
            <>
                4.5 <FaStar size={iconSize} style={{ color: "yellowgreen" }} />
            </>
        ),
        jobLocation: "Remote",
        jobDetails: [
            {
                item: (
                    <>
                        <FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Including Swag
                    </>
                ),
            },
            {
                item: (
                    <>
                        <FaBriefcase size={iconSize} style={{ color: "yellowgreen" }} /> Performance-based incentives
                    </>
                ),
            },
        ],
        jobDetails2: [
            <>
                <FaTelegramPlane size={iconSize} style={{ color: "#20c20e" }} /> Apply securely with Thecyberhub Resume
            </>,
            <>
                <FaBolt size={iconSize} style={{ color: "#20c20e" }} /> Responsive employer
            </>,
        ],
        jobDesc1: (
            <p>
                We are a leading content creation company seeking highly motivated interns for exciting projects in the
                field.
            </p>
        ),
        jobDesc2: (
            <p>
                This is a unique opportunity for individuals interested in building a career in content creation.
                <br />
                <br />
                If you&apos;re eager to learn and make a difference,
                <br /> Submit your resume and cover letter through our
                <RouterLink to={"/contact"} style={{ color: "yellowgreen" }}>
                    {" "}
                    <b> Contact us </b>{" "}
                </RouterLink>{" "}
                form.
                <br />
                <br />
                Our company is committed to diversity and equal opportunity and does not discriminate based on race,
                religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or
                disability status.
            </p>
        ),
        jobReq: [
            "Strong writing and editing skills",
            "Creative thinking and problem-solving abilities",
            "Familiarity with SEO and digital content creation",
            "Good understanding of social media platforms and their algorithms",
            "Excellent research and organizational skills",
            "Strong written and verbal communication skills",
            "Passion for writing and content creation",
        ],
        jobRes: [
            "Collaborate with team on content creation projects",
            "Create and edit written content for websites, blogs, and social media",
            "Research and gather information for articles and blog posts",
            "Optimize content for SEO and social media algorithms",
            "Familiarize yourself with digital content creation tools and techniques",
        ],
        jobTimeline: {
            datePosted: "Posted 3 days ago",
            separator: (
                <>
                    <FaCircle />
                </>
            ),
            directory: "remote",
        },
    },
    {
        id: "Next.js Internship",
        status: "new",
        jobTitle: "Next.js Internship for Web Extension Development",
        jobRoleTitle: "Next.js Developer",
        jobRating: (
            <>
                5 <FaStar size={iconSize} style={{ color: "yellowgreen" }} />
            </>
        ),
        jobLocation: "Remote",
        jobDetails: [
            {
                item: (
                    <>
                        <FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Including Swag
                    </>
                ),
            },
            {
                item: (
                    <>
                        <FaBriefcase size={iconSize} style={{ color: "yellowgreen" }} /> Performance-based incentives
                    </>
                ),
            },
        ],
        jobDetails2: [
            <>
                <FaTelegramPlane size={iconSize} style={{ color: "#20c20e" }} /> Apply securely with Thecyberhub Resume
            </>,
            <>
                <FaBolt size={iconSize} style={{ color: "#20c20e" }} /> Responsive employer
            </>,
        ],
        jobDesc1: (
            <p>
                Our company is seeking a highly motivated intern with a passion for web development to join our team.
                The focus of this internship is specifically on web extension development using Next.js and TypeScript.
            </p>
        ),
        jobDesc2: (
            <p>
                This is a unique opportunity for individuals interested in building a career in web development. <br />
                <br />
                <br />
                <br />
                If you&apos;re eager to learn and make a difference,
                <br /> Submit your resume and cover letter through our
                <RouterLink to={"/contact"} style={{ color: "yellowgreen" }}>
                    {" "}
                    <b> Contact us </b>{" "}
                </RouterLink>{" "}
                form.
                <br />
                <br />
                Our company is committed to diversity and equal opportunity and does not discriminate based on race,
                religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or
                disability status.
            </p>
        ),
        jobReq: [
            "Strong knowledge of Next.js and TypeScript",
            "Good understanding of web extension development",
            "Excellent problem-solving skills",
            "Strong written and verbal communication skills",
            "Passion for technology and web development",
        ],
        jobRes: [
            "Collaborate with team on development of web extensions using Next.js and TypeScript",
            "Utilize skills in Next.js and TypeScript to improve systems and processes",
            "Gain hands-on experience in web extension development",
            "Contribute to the design, development and implementation of web extensions",
        ],
        jobTimeline: {
            datePosted: "Posted 3 days ago",
            separator: (
                <>
                    <FaCircle />
                </>
            ),
            directory: "remote",
        },
    },
    {
        id: "Penetration Testing Internship",
        status: "new",
        jobTitle: "Penetration Testing Internship",
        jobRoleTitle: "Penetration Tester",
        jobRating: (
            <>
                5 <FaStar size={iconSize} style={{ color: "yellowgreen" }} />
            </>
        ),
        jobLocation: "Remote",
        jobDetails: [
            {
                item: (
                    <>
                        <FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Including Swag
                    </>
                ),
            },
            {
                item: (
                    <>
                        <FaBriefcase size={iconSize} style={{ color: "yellowgreen" }} /> Performance-based incentives
                    </>
                ),
            },
        ],
        jobDetails2: [
            <>
                <FaTelegramPlane size={iconSize} style={{ color: "#20c20e" }} /> Apply securely with Thecyberhub Resume
            </>,
            <>
                <FaBolt size={iconSize} style={{ color: "#20c20e" }} /> Responsive employer
            </>,
        ],
        jobDesc1: (
            <p>
                We are seeking a highly motivated intern to join our penetration testing team to work on exciting
                projects in the field.
            </p>
        ),
        jobDesc2: (
            <p>
                This is a unique opportunity for individuals interested in building a career in penetration testing.
                <br />
                <br />
                If you&apos;re eager to learn and make a difference,
                <br /> Submit your resume and cover letter through our
                <RouterLink to={"/contact"} style={{ color: "yellowgreen" }}>
                    {" "}
                    <b> Contact us </b>{" "}
                </RouterLink>{" "}
                form.
                <br />
                <br />
                Thecyberworld is committed to diversity and equal opportunity and does not discriminate based on race,
                religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or
                disability status.
            </p>
        ),
        jobReq: [
            "Strong knowledge of ethical hacking techniques and tools",
            "Good understanding of computer networks, web application security, and penetration testing methodologies",
            "Excellent problem-solving skills",
            "Strong written and verbal communication skills",
            "Passion for technology and cyber security",
        ],
        jobRes: [
            "Collaborate with team on penetration testing projects",
            "Utilize knowledge of ethical hacking techniques and tools to improve systems and processes",
            "Gain hands-on experience in the field of penetration testing",
            "Perform security assessments on web applications and computer networks",
            "Prepare detailed reports on findings and recommend remediation strategies",
        ],
        jobTimeline: {
            datePosted: "Posted 3 days ago",
            separator: (
                <>
                    <FaCircle />
                </>
            ),
            directory: "remote",
        },
    },
    {
        id: "SOC Analyst Internship",
        status: "new",
        jobTitle: "SOC Analyst Internship",
        jobRoleTitle: "SOC Analyst",
        jobRating: (
            <>
                5 <FaStar size={iconSize} style={{ color: "yellowgreen" }} />
            </>
        ),
        jobLocation: "Remote",
        jobDetails: [
            {
                item: (
                    <>
                        <FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Including Swag
                    </>
                ),
            },
            {
                item: (
                    <>
                        <FaBriefcase size={iconSize} style={{ color: "yellowgreen" }} /> Performance-based incentives
                    </>
                ),
            },
        ],
        jobDetails2: [
            <>
                <FaTelegramPlane size={iconSize} style={{ color: "#20c20e" }} /> Apply securely with Thecyberhub Resume
            </>,
            <>
                <FaBolt size={iconSize} style={{ color: "#20c20e" }} /> Responsive employer
            </>,
        ],
        jobDesc1: (
            <p>
                Join the team at Thecyberworld as a SOC Analyst Intern and help protect businesses against cyber
                threats.
            </p>
        ),
        jobDesc2: (
            <p>
                This is an excellent opportunity for individuals interested in the field of cyber security.
                <br />
                <br />
                If you&apos;re eager to learn and make a difference,
                <br /> Submit your resume and cover letter through our
                <RouterLink to={"/contact"} style={{ color: "yellowgreen" }}>
                    {" "}
                    <b> Contact us </b>{" "}
                </RouterLink>{" "}
                form.
                <br />
                <br />
                Thecyberworld is committed to diversity and equal opportunity and does not discriminate based on race,
                religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or
                disability status.
            </p>
        ),
        jobReq: [
            "Strong understanding of cyber security concepts and technologies",
            "Familiarity with security information and event management (SIEM) tools",
            "Good understanding of network protocols and network security",
            "Knowledge of incident response procedures and methodologies",
            "Strong written and verbal communication skills",
            "Ability to work in a fast-paced and dynamic environment",
        ],
        jobRes: [
            "Assist in identifying and analyzing security threats and incidents",
            "Collaborate with the SOC team in incident response and threat mitigation efforts",
            "Assist in the implementation of security solutions and technologies",
            "Contribute to the continuous improvement of the SOC processes and procedures",
            "Gain hands-on experience in the field of cyber security",
        ],
        jobTimeline: {
            datePosted: "Posted 3 days ago",
            separator: (
                <>
                    <FaCircle />
                </>
            ),
            directory: "remote",
        },
    },
    {
        id: "React Native Android Developer Internship",
        status: "new",
        jobTitle: "React Native Android Developer Internship",
        jobRoleTitle: "React Native Android Developer Intern",
        jobRating: (
            <>
                4 <FaStar size={iconSize} style={{ color: "yellowgreen" }} />
            </>
        ),
        jobLocation: "Remote",
        jobDetails: [
            {
                item: (
                    <>
                        <FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Including Swag
                    </>
                ),
            },
            {
                item: (
                    <>
                        <FaBriefcase size={iconSize} style={{ color: "yellowgreen" }} /> Performance-based incentives
                    </>
                ),
            },
        ],
        jobDetails2: [
            <>
                <FaTelegramPlane size={iconSize} style={{ color: "#20c20e" }} /> Apply securely with Resume
            </>,
            <>
                <FaBolt size={iconSize} style={{ color: "#20c20e" }} /> Responsive employer
            </>,
        ],
        jobDesc1: (
            <p>
                Our company is seeking a highly motivated intern with experience in React Native and Android development
                to assist in converting our MERN website with Redux into a native Android app.
            </p>
        ),
        jobDesc2: (
            <p>
                This is an excellent opportunity to gain hands-on experience in the field of mobile development while
                working on a real-world project. You will be working closely with our development team to bring our
                website to life on the Android platform.
                <br />
                <br />
                If you&apos;re eager to learn and make a difference,
                <br /> Submit your resume and cover letter through our
                <RouterLink to={"/contact"} style={{ color: "yellowgreen" }}>
                    {" "}
                    <b> Contact us </b>{" "}
                </RouterLink>{" "}
                form.
                <br />
                <br />
                Our company is committed to diversity and equal opportunity and does not discriminate based on race,
                religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or
                disability status.
            </p>
        ),
        jobReq: [
            "Experience with React Native and Android development",
            "Knowledge of MERN stack and Redux",
            "Excellent problem-solving skills",
            "Strong attention to detail",
            "Ability to work independently and as a team",
        ],
        jobRes: [
            "Assist in converting a MERN website with Redux into a native Android app",
            "Gain hands-on experience in the field of mobile development",
            "Collaborate with development team to bring the website to life on the Android platform",
            "Contribute to the growth and success of the company through your development efforts",
        ],
        jobTimeline: {
            datePosted: "Posted 2 days ago",
            separator: (
                <>
                    <FaCircle />
                </>
            ),
            directory: "remote",
        },
    },
    // {
    //     id: "Content Copywriter",
    //     jobTitle: "Content Copywriter for travel blog",
    //     jobRoleTitle: "Trip101 Pte ltd",
    //     jobRating: (
    //         <>
    //             5.0
    //             <FaStar size={iconSize} style={{ color: "yellowgreen" }} />
    //         </>
    //     ),
    //     jobLocation: "India",
    //     jobDetails: [
    //         {
    //             item: (
    //                 <>
    //                     <FaMoneyCheckAlt size={iconSize} />
    //                     $7000 - $30,000 a month
    //                 </>
    //             ),
    //         },
    //         {
    //             badge: "1",
    //             item: (
    //                 <>
    //                     <FaBriefcase size={iconSize} />
    //                     Part-time
    //                 </>
    //             ),
    //         },
    //         {
    //             badge: "2",
    //             item: (
    //                 <>
    //                     <FaClock size={iconSize} />
    //                     Weekend availability
    //                 </>
    //             ),
    //         },
    //     ],
    //     jobDetails2: [
    //         <>
    //             <FaClock size={iconSize} style={{ color: "yellowgreen" }} />
    //             Urgently hiring
    //         </>,
    //         <>
    //             <FaUserPlus size={iconSize} style={{ color: "yellowgreen" }} />
    //             Hiring multiple candidates
    //         </>,
    //     ],
    //     jobDesc:  <p>
    //
    //     </p>,
    //     jobReq: ["Produce a minimum of 5 articles per month.", "Curate travel content for a global readership."],
    //     jobTimeline: {
    //         datePosted: "Hiring ongoing",
    //         separator: (
    //             <>
    //                 <FaCircle />
    //             </>
    //         ),
    //         directory: "remote",
    //     },
    // },
    // {
    //     id: "Frontend Engineer",
    //     jobTitle: "Frontend Engineer",
    //     jobRoleTitle: "Thecyberhub",
    //     jobRating: (
    //         <>
    //             5.0
    //             <FaStar size={iconSize} style={{ color: "yellowgreen" }} />
    //         </>
    //     ),
    //     jobLocation: "Hybrid",
    //     jobDetails: [
    //         {
    //             item: (
    //                 <>
    //                     <FaMoneyCheckAlt size={iconSize} />
    //                     $10,000 - $35,000 a month
    //                 </>
    //             ),
    //         },
    //         {
    //             badge: "3",
    //             item: (
    //                 <>
    //                     <FaBriefcase size={iconSize} />
    //                     Full-time
    //                 </>
    //             ),
    //         },
    //     ],
    //     jobDetails2: [
    //         <>
    //             <FaTelegramPlane size={iconSize} style={{ color: "#20c20e" }} />
    //             Apply securely with Thecyberhub Resume
    //         </>,
    //         <>
    //             <FaBolt size={iconSize} style={{ color: "#20c20e" }} />
    //             Responsive employe
    //         </>,
    //         <>
    //             <FaUserPlus size={iconSize} style={{ color: "yellowgreen" }} />
    //             Hiring multiple candidates
    //         </>,
    //     ],
    //     jobDesc:  <p>
    //
    //     </p>,
    //     jobReq: [
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //     ],
    //     jobTimeline: {
    //         datePosted: "Hiring ongoing",
    //         separator: (
    //             <>
    //                 <FaCircle />
    //             </>
    //         ),
    //         directory: "remote",
    //     },
    // },
    // {
    //     id: "Backend Engineer",
    //     jobTitle: "Backend Engineer",
    //     jobRoleTitle: "Thecyberhub",
    //     jobRating: (
    //         <>
    //             4.6
    //             <FaStar size={iconSize} style={{ color: "yellowgreen" }} />
    //         </>
    //     ),
    //     jobLocation: "Remote",
    //     jobDetails: [
    //         {
    //             item: (
    //                 <>
    //                     <FaMoneyCheckAlt size={iconSize} />
    //                     $10,000 - $20,000 a month
    //                 </>
    //             ),
    //         },
    //         {
    //             badge: "4",
    //             item: (
    //                 <>
    //                     <FaBriefcase size={iconSize} />
    //                     Part-time
    //                 </>
    //             ),
    //         },
    //         {
    //             badge: "2",
    //             item: (
    //                 <>
    //                     <FaClock size={iconSize} />
    //                     Weekend availability
    //                 </>
    //             ),
    //         },
    //     ],
    //     jobDetails2: [
    //         <>
    //             <FaTelegramPlane size={iconSize} style={{ color: "#20c20e" }} />
    //             Apply securely with Thecyberhub Resume
    //         </>,
    //         <>
    //             <FaBolt size={iconSize} style={{ color: "#20c20e" }} />
    //             Responsive employer
    //         </>,
    //         <>
    //             <FaUserPlus size={iconSize} style={{ color: "yellowgreen" }} />
    //             Hiring multiple candidates
    //         </>,
    //     ],
    //     jobDesc:  <p>
    //
    //     </p>,
    //     jobReq: [
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //     ],
    //     jobTimeline: {
    //         datePosted: "Hiring ongoing",
    //         separator: (
    //             <>
    //                 <FaCircle />
    //             </>
    //         ),
    //         directory: "remote",
    //     },
    // },
    // {
    //     id: "Product Designer",
    //     jobTitle: "Product Designer",
    //     jobRoleTitle: "Thecyberhub",
    //     jobRating: (
    //         <>
    //             4.8
    //             <FaStar size={iconSize} style={{ color: "yellowgreen" }} />
    //         </>
    //     ),
    //     jobLocation: "Hybrid",
    //     jobDetails: [
    //         {
    //             item: (
    //                 <>
    //                     <FaMoneyCheckAlt size={iconSize} />
    //                     $10,000 - $40,000 a month
    //                 </>
    //             ),
    //         },
    //         {
    //             badge: "4",
    //             item: (
    //                 <>
    //                     <FaBriefcase size={iconSize} />
    //                     Full-time
    //                 </>
    //             ),
    //         },
    //         {
    //             item: (
    //                 <>
    //                     <FaClock size={iconSize} />
    //                     Morning shift
    //                 </>
    //             ),
    //         },
    //     ],
    //     jobDetails2: [
    //         <>
    //             <FaClock size={iconSize} style={{ color: "yellowgreen" }} />
    //             Urgently hiring
    //         </>,
    //         <>
    //             <FaTelegramPlane size={iconSize} style={{ color: "#20c20e" }} />
    //             Apply securely with Thecyberhub Resume
    //         </>,
    //         <>
    //             <FaBolt size={iconSize} style={{ color: "#20c20e" }} />
    //             Responsive employer
    //         </>,
    //         <>
    //             <FaUserPlus size={iconSize} style={{ color: "yellowgreen" }} />
    //             Hiring multiple candidates
    //         </>,
    //     ],
    //     jobDesc:  <p>
    //
    //     </p>,
    //     jobReq: [
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //     ],
    //     jobTimeline: {
    //         datePosted: "Hiring ongoing",
    //         separator: (
    //             <>
    //                 <FaCircle />
    //             </>
    //         ),
    //         directory: "remote",
    //     },
    // },
    // {
    //     id: "DevOps Engineer",
    //     jobTitle: "DevOps Engineer",
    //     jobRoleTitle: "Thecyberhub",
    //     jobRating: (
    //         <>
    //             5.0
    //             <FaStar size={iconSize} style={{ color: "yellowgreen" }} />
    //         </>
    //     ),
    //     jobLocation: "U.S.A",
    //     jobDetails: [
    //         {
    //             item: (
    //                 <>
    //                     <FaMoneyCheckAlt size={iconSize} />
    //                     $10,000 - $50,000 a month
    //                 </>
    //             ),
    //         },
    //         {
    //             badge: "5",
    //             item: (
    //                 <>
    //                     <FaBriefcase size={iconSize} />
    //                     Full-time
    //                 </>
    //             ),
    //         },
    //         {
    //             badge: "2",
    //             item: (
    //                 <>
    //                     <FaClock size={iconSize} />
    //                     Morning shift
    //                 </>
    //             ),
    //         },
    //     ],
    //     jobDetails2: [
    //         <>
    //             <FaClock size={iconSize} style={{ color: "yellowgreen" }} />
    //             Urgently hiring
    //         </>,
    //         <>
    //             <FaTelegramPlane size={iconSize} style={{ color: "#20c20e" }} />
    //             Apply securely with Thecyberhub Resume
    //         </>,
    //         <>
    //             <FaBolt size={iconSize} style={{ color: "#20c20e" }} />
    //             Responsive employer
    //         </>,
    //         <>
    //             <FaUserPlus size={iconSize} style={{ color: "yellowgreen" }} />
    //             Hiring multiple candidates
    //         </>,
    //     ],
    //     jobDesc: <p></p>,
    //     jobReq: [
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //     ],
    //     jobTimeline: {
    //         datePosted: "Hiring ongoing",
    //         separator: (
    //             <>
    //                 <FaCircle />
    //             </>
    //         ),
    //         directory: "remote",
    //     },
    // },
];
