import React from "react";
import { FaBolt, FaBriefcase, FaCircle, FaMoneyCheckAlt, FaStar, FaTelegramPlane } from "react-icons/fa";
import { RouterLink } from "./JobsElements";
import { MdWork } from "react-icons/md";

const iconSize = 15;

export const JobsData = [
    {
        id: "Penetration Testing Internship",
        status: "new",
        jobTitle: "Penetration Testing Internship",
        jobRoleTitle: "Penetration Tester",
        jobRating: (
            <>
                5 <FaStar size={iconSize} style={{ color: "#07b6f6" }} />
            </>
        ),
        jobLocation: "Remote",
        jobDetails: [
            {
                item: (
                    <>
                        <MdWork size={iconSize} style={{ color: "#07b6f6" }} /> 10 Openings
                    </>
                ),
            },
            {
                item: (
                    <>
                        <FaBriefcase size={iconSize} style={{ color: "#07b6f6" }} /> Real world experience
                    </>
                ),
            },
            // {item: (<><FaMoneyCheckAlt size={iconSize} style={{ color: "#07b6f6" }} /> Including Swag</>),},
            {
                item: (
                    <>
                        <FaMoneyCheckAlt size={iconSize} style={{ color: "#07b6f6" }} /> Unpaid Internship
                    </>
                ),
            },
        ],
        jobDetails2: [
            <>
                <FaTelegramPlane size={iconSize} style={{ color: "#ff6b08" }} /> Apply securely with Thecyberhub Resume
            </>,
            <>
                <FaBolt size={iconSize} style={{ color: "#ff6b08" }} /> Responsive employer
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
                We&apos;re excited to offer a unique internship opportunity designed to provide you with hands-on,
                real-world experience in the field. Although this is an
                <strong style={{ color: "#07b6f6" }}> unpaid </strong> internship, we are committed to making it a
                valuable experience for you.
                {/* After two months of hard work and dedication, we&apos;ll provide you with some swag to show our appreciation. */}
                <br />
                <br />
                This internship is an excellent chance to gain practical experience, develop your skills, and build your
                professional network. You&apos;ll work alongside experienced professionals who are dedicated to helping
                you succeed. Plus, we&apos;ll provide training and support to ensure you&apos;re equipped with the tools
                and knowledge you need to excel in your role.
                <br />
                <br />
                By joining our internship program, you&apos;ll gain invaluable experience and set yourself up for
                success in your future career. Apply today and take the first step towards an exciting and rewarding
                career!
                <br />
                <br />
                If you&apos;re eager to learn and make a difference,
                <br />
                Submit your resume and cover letter through our
                <RouterLink to={"/contact"} style={{ color: "#07b6f6" }}>
                    <b> Contact us </b>
                </RouterLink>
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
            "Good understanding of computer networks, web application security, and penetration testing methodologies, including OWASP Top 10",
            "Experience with penetration testing tools, such as Burp Suite, Nmap, Metasploit, and Kali Linux",
            "CTF experience is a plus",
            "Ability to work independently and as part of a team",
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
        jobResources: {
            title: "Resources",
            resources: [
                {
                    id: "Cyber Security beginner",
                    title: "Cyber Security beginner",
                    link: "/roadmaps/cyber-security-beginner",
                },
                {
                    id: "Bug Hunting",
                    title: "Bug Hunting Roadmap",
                    link: "/roadmaps/bug-hunting",
                },
                {
                    id: "Penetration and Vulnerability Testing",
                    title: "Penetration and Vulnerability Testing Roadmap",
                    link: "/roadmaps/penetration-and-vulnerability-tester",
                },
            ],
        },
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
        id: "MERN Stack Internship",
        status: "new",
        jobTitle: "MERN Stack Internship",
        jobRoleTitle: "MERN Stack Developer",
        jobRating: (
            <>
                5 <FaStar size={iconSize} style={{ color: "#07b6f6" }} />
            </>
        ),
        jobLocation: "Remote",
        jobDetails: [
            {
                item: (
                    <>
                        <MdWork size={iconSize} style={{ color: "#07b6f6" }} /> 10 Openings
                    </>
                ),
            },
            {
                item: (
                    <>
                        <FaBriefcase size={iconSize} style={{ color: "#07b6f6" }} /> Real world experience
                    </>
                ),
            },
            // {item: (<><FaMoneyCheckAlt size={iconSize} style={{ color: "#07b6f6" }} /> Including Swag</>),},
            {
                item: (
                    <>
                        <FaMoneyCheckAlt size={iconSize} style={{ color: "#07b6f6" }} /> Unpaid Internship
                    </>
                ),
            },
        ],
        jobDetails2: [
            <>
                <FaTelegramPlane size={iconSize} style={{ color: "#ff6b08" }} /> Apply securely with Thecyberhub Resume
            </>,
            <>
                <FaBolt size={iconSize} style={{ color: "#ff6b08" }} /> Responsive employer
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
                This is a unique opportunity for individuals interested in building a career in web development.
                <br />
                <br />
                We&apos;re excited to offer a unique internship opportunity designed to provide you with hands-on,
                real-world experience in the field. Although this is an
                <strong style={{ color: "#07b6f6" }}> unpaid </strong> internship, we are committed to making it a
                valuable experience for you.
                {/* After two months of hard work and dedication, we&apos;ll provide you with some swag to show our appreciation. */}
                <br />
                <br />
                This internship is an excellent chance to gain practical experience, develop your skills, and build your
                professional network. You&apos;ll work alongside experienced professionals who are dedicated to helping
                you succeed. Plus, we&apos;ll provide training and support to ensure you&apos;re equipped with the tools
                and knowledge you need to excel in your role.
                <br />
                <br />
                By joining our internship program, you&apos;ll gain invaluable experience and set yourself up for
                success in your future career. Apply today and take the first step towards an exciting and rewarding
                career!
                <br />
                <br />
                If you&apos;re eager to learn and make a difference,
                <br />
                Submit your resume and cover letter through our
                <RouterLink to={"/contact"} style={{ color: "#07b6f6" }}>
                    <b> Contact us </b>
                </RouterLink>
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
        jobResources: {
            title: "Resources",
            resources: [
                {
                    id: "",
                    title: "MERN Stack Roadmap",
                    link: "/roadmaps/mern-stack-roadmap",
                },
            ],
        },
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
];
