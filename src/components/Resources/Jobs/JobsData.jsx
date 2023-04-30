import React from "react";
import { FaBolt, FaBriefcase, FaCircle, FaMoneyCheckAlt, FaStar, FaTelegramPlane } from "react-icons/fa";
import { RouterLink } from "./JobsElements";
import { MdWork } from "react-icons/all";

const iconSize = 15;

export const JobsData = [
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
                        <MdWork size={iconSize} style={{ color: "yellowgreen" }} /> 10 Openings
                    </>
                ),
            },
            {
                item: (
                    <>
                        <FaBriefcase size={iconSize} style={{ color: "yellowgreen" }} /> Real world experience
                    </>
                ),
            },
            // {item: (<><FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Including Swag</>),},
            {
                item: (
                    <>
                        <FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Unpaid Internship
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
                We&apos;re excited to offer a unique internship opportunity designed to provide you with hands-on,
                real-world experience in the field. Although this is an
                <strong style={{ color: "yellowgreen" }}> unpaid </strong> internship, we are committed to making it a
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
                <RouterLink to={"/contact"} style={{ color: "yellowgreen" }}>
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
        id: "Content Creator Internship",
        status: "new",
        jobTitle: "Content Creator Internship",
        jobRoleTitle: "Content Creator",
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
                        <MdWork size={iconSize} style={{ color: "yellowgreen" }} /> 10 Openings
                    </>
                ),
            },
            {
                item: (
                    <>
                        <FaBriefcase size={iconSize} style={{ color: "yellowgreen" }} /> Real world experience
                    </>
                ),
            },
            // {item: (<><FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Including Swag</>),},
            {
                item: (
                    <>
                        <FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Unpaid Internship
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
                We&apos;re excited to offer a unique internship opportunity designed to provide you with hands-on,
                real-world experience in the field. Although this is an
                <strong style={{ color: "yellowgreen" }}> unpaid </strong> internship, we are committed to making it a
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
                <RouterLink to={"/contact"} style={{ color: "yellowgreen" }}>
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
                        <MdWork size={iconSize} style={{ color: "yellowgreen" }} /> 10 Openings
                    </>
                ),
            },
            {
                item: (
                    <>
                        <FaBriefcase size={iconSize} style={{ color: "yellowgreen" }} /> Real world experience
                    </>
                ),
            },
            // {item: (<><FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Including Swag</>),},
            {
                item: (
                    <>
                        <FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Unpaid Internship
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
                This is a unique opportunity for individuals interested in building a career in web development.
                <br />
                <br />
                We&apos;re excited to offer a unique internship opportunity designed to provide you with hands-on,
                real-world experience in the field. Although this is an
                <strong style={{ color: "yellowgreen" }}> unpaid </strong> internship, we are committed to making it a
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
                <RouterLink to={"/contact"} style={{ color: "yellowgreen" }}>
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
    {
        id: "Next.js Internship",
        status: "new",
        jobTitle: "Next.js Internship",
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
                        <MdWork size={iconSize} style={{ color: "yellowgreen" }} /> 10 Openings
                    </>
                ),
            },
            {
                item: (
                    <>
                        <FaBriefcase size={iconSize} style={{ color: "yellowgreen" }} /> Real world experience
                    </>
                ),
            },
            // {item: (<><FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Including Swag</>),},
            {
                item: (
                    <>
                        <FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Unpaid Internship
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
                This is a unique opportunity for individuals interested in building a career in web development.
                <br />
                <br />
                We&apos;re excited to offer a unique internship opportunity designed to provide you with hands-on,
                real-world experience in the field. Although this is an
                <strong style={{ color: "yellowgreen" }}> unpaid </strong> internship, we are committed to making it a
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
                <RouterLink to={"/contact"} style={{ color: "yellowgreen" }}>
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
            "Strong knowledge of Next.js and TypeScript",
            "Good understanding of web development",
            "Excellent problem-solving skills",
            "Strong written and verbal communication skills",
            "Passion for technology and web development",
        ],
        jobRes: [
            "Collaborate with team on development of website using Next.js and TypeScript",
            "Utilize skills in Next.js and TypeScript to improve systems and processes",
            "Gain hands-on experience in web extension development",
            "Contribute to the design, development and implementation of web extensions",
        ],
        jobResources: {
            title: "Resources",
            resources: [
                {
                    id: "3",
                    title: "Next JS Roadmap",
                    link: "/roadmaps/next-js-roadmap",
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
        id: "React Native Android Developer Internship",
        status: "new",
        jobTitle: "React Native Android Developer Internship",
        jobRoleTitle: "React Native Android Developer Intern",
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
                        <MdWork size={iconSize} style={{ color: "yellowgreen" }} /> 10 Openings
                    </>
                ),
            },
            {
                item: (
                    <>
                        <FaBriefcase size={iconSize} style={{ color: "yellowgreen" }} /> Real world experience
                    </>
                ),
            },
            // {item: (<><FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Including Swag</>),},
            {
                item: (
                    <>
                        <FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Unpaid Internship
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
                We&apos;re excited to offer a unique internship opportunity designed to provide you with hands-on,
                real-world experience in the field. Although this is an
                <strong style={{ color: "yellowgreen" }}> unpaid </strong> internship, we are committed to making it a
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
                <RouterLink to={"/contact"} style={{ color: "yellowgreen" }}>
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
        jobResources: {
            title: "Resources",
            resources: [
                {
                    id: "3",
                    title: "React Native Roadmap",
                    link: "/roadmaps/react-native-roadmap",
                },
            ],
        },
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
        id: "Graphic Design Internship",
        status: "new",
        jobTitle: "Graphic Design Internship",
        jobRoleTitle: "Graphic Design Intern",
        jobRating: (
            <>
                5 <FaStar size={iconSize} style={{ color: "yellowgreen" }} />
            </>
        ),
        jobLocation: "On-site/Remote",
        jobDetails: [
            {
                item: (
                    <>
                        <MdWork size={iconSize} style={{ color: "yellowgreen" }} /> 10 Openings
                    </>
                ),
            },
            {
                item: (
                    <>
                        <FaBriefcase size={iconSize} style={{ color: "yellowgreen" }} /> Real world experience
                    </>
                ),
            },
            // {item: (<><FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Including Swag</>),},
            {
                item: (
                    <>
                        <FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Unpaid Internship
                    </>
                ),
            },
        ],
        jobDetails2: [
            <>
                <FaTelegramPlane size={iconSize} style={{ color: "#20c20e" }} /> Apply securely with Resume and
                Portfolio
            </>,
            <>
                <FaBolt size={iconSize} style={{ color: "#20c20e" }} /> Responsive employer
            </>,
        ],
        jobDesc1: (
            <p>
                We are seeking a highly motivated Graphic Design Intern with a passion for creating visual content and
                communicating messages to a target audience. The ideal candidate will be proficient in industry-standard
                design software and tools such as Adobe Creative Suite, Sketch, and InVision, and have an eye for detail
                and design aesthetics.
            </p>
        ),
        jobDesc2: (
            <p>
                As a Graphic Design Intern, you will work closely with our design team on real-world design projects.
                This is an excellent opportunity to gain hands-on experience in the field of graphic design while
                building your portfolio of work.
                <br />
                <br />
                We&apos;re excited to offer a unique internship opportunity designed to provide you with hands-on,
                real-world experience in the field. Although this is an
                <strong style={{ color: "yellowgreen" }}> unpaid </strong> internship, we are committed to making it a
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
                <RouterLink to={"/contact"} style={{ color: "yellowgreen" }}>
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
            "Proficiency in industry-standard design software and tools",
            "Strong eye for design aesthetics",
            "Excellent communication and collaboration skills",
            "Ability to work independently and as part of a team",
        ],
        jobRes: [
            "Collaborate with design team on real-world design projects",
            "Create visually appealing and effective designs for clients across various industries",
            "Build your portfolio of work and gain hands-on experience in the field of graphic design",
            "Contribute to the growth and success of the company through your design efforts",
        ],
        jobTimeline: {
            datePosted: "Posted 1 week ago",
            separator: (
                <>
                    <FaCircle />
                </>
            ),
            directory: "on-site/remote",
        },
    },
    {
        id: "UI/UX Design Internship",
        status: "new",
        jobTitle: "UI/UX Design Internship",
        jobRoleTitle: "UI/UX Design Intern",
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
                        <MdWork size={iconSize} style={{ color: "yellowgreen" }} /> 10 Openings
                    </>
                ),
            },
            {
                item: (
                    <>
                        <FaBriefcase size={iconSize} style={{ color: "yellowgreen" }} /> Real world experience
                    </>
                ),
            },
            // {item: (<><FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Including Swag</>),},
            {
                item: (
                    <>
                        <FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Unpaid Internship
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
                Our company is looking for a UI/UX Design Intern who is passionate about creating innovative and
                engaging digital experiences. As an intern, you will have the opportunity to work on real-world design
                projects and learn from a team of experienced designers and developers.
            </p>
        ),
        jobDesc2: (
            <p>
                You will be responsible for working with our development team to design and create user interfaces for
                web and mobile applications. You will also collaborate with our marketing and product teams to create
                visual designs and prototypes for new features and product enhancements.
                <br /> <br />
                We&apos;re excited to offer a unique internship opportunity designed to provide you with hands-on,
                real-world experience in the field. Although this is an
                <strong style={{ color: "yellowgreen" }}> unpaid </strong> internship, we are committed to making it a
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
                <RouterLink to={"/contact"} style={{ color: "yellowgreen" }}>
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
            "Strong design skills and knowledge of design principles",
            "Experience with design tools such as Sketch, Figma, or Adobe Creative Suite",
            "Excellent communication and collaboration skills",
            "Ability to work independently and manage multiple projects",
        ],
        jobRes: [
            "Design and create user interfaces for web and mobile applications",
            "Collaborate with development, marketing, and product teams to create visual designs and prototypes",
            "Learn from experienced designers and developers and gain hands-on experience in the field",
            "Contribute to the growth and success of the company through your design efforts",
        ],
        jobTimeline: {
            datePosted: "Posted 1 day ago",
            separator: (
                <>
                    <FaCircle />
                </>
            ),
            directory: "remote",
        },
    },
    {
        id: "Business Development Internship",
        status: "new",
        jobTitle: "Business Development Internship",
        jobRoleTitle: "Business Development Intern",
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
                        <MdWork size={iconSize} style={{ color: "yellowgreen" }} /> 10 Openings
                    </>
                ),
            },
            {
                item: (
                    <>
                        <FaBriefcase size={iconSize} style={{ color: "yellowgreen" }} /> Real world experience
                    </>
                ),
            },
            // {item: (<><FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Including Swag</>),},
            {
                item: (
                    <>
                        <FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Unpaid Internship
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
                <br />
                <br />
                We&apos;re excited to offer a unique internship opportunity designed to provide you with hands-on,
                real-world experience in the field. Although this is an
                <strong style={{ color: "yellowgreen" }}> unpaid </strong> internship, we are committed to making it a
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
                <RouterLink to={"/contact"} style={{ color: "yellowgreen" }}>
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
    // {
    //     id: "SOC Analyst Internship",
    //     status: "new",
    //     jobTitle: "SOC Analyst Internship",
    //     jobRoleTitle: "SOC Analyst",
    //     jobRating: (
    //         <>
    //             5 <FaStar size={iconSize} style={{ color: "yellowgreen" }} />
    //         </>
    //     ),
    //     jobLocation: "Remote",
    //     jobDetails: [
    //         {
    //             item: (
    //                 <>
    //                     <FaMoneyCheckAlt size={iconSize} style={{ color: "yellowgreen" }} /> Including Swag
    //                 </>
    //             ),
    //         },
    //         {
    //             item: (
    //                 <>
    //                     <MdWork size={iconSize} style={{ color: "yellowgreen" }} /> 10 Openings
    //                 </>
    //             ),
    //         },
    //         {
    //             item: (
    //                 <>
    //                     <FaBriefcase size={iconSize} style={{ color: "yellowgreen" }} /> Performance-based incentives
    //                 </>
    //             ),
    //         },
    //     ],
    //     jobDetails2: [
    //         <>
    //             <FaTelegramPlane size={iconSize} style={{ color: "#20c20e" }} /> Apply securely with Thecyberhub Resume
    //         </>,
    //         <>
    //             <FaBolt size={iconSize} style={{ color: "#20c20e" }} /> Responsive employer
    //         </>,
    //     ],
    //     jobDesc1: (
    //         <p>
    //             Join the team at Thecyberworld as a SOC Analyst Intern and help protect businesses against cyber
    //             threats.
    //         </p>
    //     ),
    //     jobDesc2: (
    //         <p>
    //             This is an excellent opportunity for individuals interested in the field of cyber security.
    //             <br />
    //             <br />
    //             If you&apos;re eager to learn and make a difference,
    //             <br /> Submit your resume and cover letter through our
    //             <RouterLink to={"/contact"} style={{ color: "yellowgreen" }}>
    //
    //                 <b> Contact us </b>
    //             </RouterLink>
    //             form.
    //             <br />
    //             <br />
    //             We are thrilled to offer an <strong style={{ color: "yellowgreen" }}> unpaid </strong> internship opportunity aimed at providing you with valuable
    //             experience in this field. After three months of hard work and dedication, you will receive swags as a
    //             token of our appreciation. Starting from the fourth month, we will also provide incentives to recognize
    //             and reward your contributions. This is a fantastic chance to gain hands-on experience and develop your
    //             skills while working with us.
    //             <br />
    //             <br />
    //             Thecyberworld is committed to diversity and equal opportunity and does not discriminate based on race,
    //             religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or
    //             disability status.
    //         </p>
    //     ),
    //     jobReq: [
    //         "Strong understanding of cyber security concepts and technologies",
    //         "Familiarity with security information and event management (SIEM) tools",
    //         "Good understanding of network protocols and network security",
    //         "Knowledge of incident response procedures and methodologies",
    //         "Strong written and verbal communication skills",
    //         "Ability to work in a fast-paced and dynamic environment",
    //     ],
    //     jobRes: [
    //         "Assist in identifying and analyzing security threats and incidents",
    //         "Collaborate with the SOC team in incident response and threat mitigation efforts",
    //         "Assist in the implementation of security solutions and technologies",
    //         "Contribute to the continuous improvement of the SOC processes and procedures",
    //         "Gain hands-on experience in the field of cyber security",
    //     ],
    //     jobTimeline: {
    //         datePosted: "Posted 3 days ago",
    //         separator: (
    //             <>
    //                 <FaCircle />
    //             </>
    //         ),
    //         directory: "remote",
    //     },
    // },
];
