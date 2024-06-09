export const checklistData = [
    {
        Methodology: "Web Application Pentesting Checklist",
        Description:
            "A comprehensive checklist for conducting web application penetration testing to identify vulnerabilities and security flaws.",
        Topics: [
            {
                Topic: "Reconnaissance Phase",
                Description: "Gather initial information about the target application and infrastructure.",
                SubTopics: [
                    {
                        Name: "Identify Web Server, Technologies, and Database",
                        Summary: "Determine the technologies and platforms used by the target application.",
                        Goals: [
                            "Identify potential vulnerabilities associated with specific technologies.",
                            "Understand the underlying infrastructure for targeted attacks.",
                        ],
                        Tools: ["Nmap", "WhatWeb", "Wappalyzer"],
                    },
                    {
                        Name: "Subsidiary and Acquisition Enumeration",
                        Summary:
                            "Search for any related domains or entities that could be associated with the target organization.",
                        Goals: [
                            "Identify additional attack surfaces beyond the primary target.",
                            "Discover potential entry points for lateral movement.",
                        ],
                        Tools: ["Google Search", "Business Registry Databases"],
                    },
                    {
                        Name: "Reverse Lookup",
                        Summary:
                            "Perform reverse IP and DNS lookups to gather information about the target infrastructure.",
                        Goals: [
                            "Identify other domains and services hosted on the same infrastructure.",
                            "Discover potential targets for further reconnaissance.",
                        ],
                        Tools: ["Nslookup", "Recon-ng"],
                    },
                    // Add more subtopics here...
                ],
            },
            {
                Topic: "Registration Feature Testing",
                Description: "Assess the security of user registration functionalities.",
                SubTopics: [
                    {
                        Name: "Check for Duplicate Registration",
                        Summary: "Verify if the application allows multiple registrations with the same credentials.",
                        Goals: [
                            "Prevent potential account enumeration or exploitation.",
                            "Ensure data integrity and user identity verification.",
                        ],
                        Tools: ["Manual Testing", "Custom Scripts"],
                    },
                    {
                        Name: "Weak Password Policy",
                        Summary: "Evaluate the strength of the password policy implemented by the application.",
                        Goals: [
                            "Prevent weak or easily guessable passwords.",
                            "Enhance overall account security and authentication resilience.",
                        ],
                        Tools: ["Manual Testing", "OWASP ZAP"],
                    },
                    // Add more subtopics here...
                ],
            },
            {
                Topic: "Session Management Testing",
                Description: "Evaluate the handling of user sessions and cookies.",
                SubTopics: [
                    {
                        Name: "Identify Actual Session Cookie",
                        Summary:
                            "Locate and identify the session cookie used by the application for user tracking and authentication.",
                        Goals: [
                            "Understand the session management mechanism.",
                            "Identify potential vulnerabilities related to session handling.",
                        ],
                        Tools: ["Browser Developer Tools", "Burp Suite"],
                    },
                    {
                        Name: "Decode Cookies",
                        Summary: "Decode and analyze the contents of cookies used for session management.",
                        Goals: [
                            "Understand the information stored in session cookies.",
                            "Identify potential security risks associated with cookie data.",
                        ],
                        Tools: ["Base64 Decoder", "Online Tools"],
                    },
                    // Add more subtopics here...
                ],
            },
            {
                Topic: "Authentication Testing",
                Description: "Test the authentication mechanisms for weaknesses and vulnerabilities.",
                SubTopics: [
                    {
                        Name: "Username Enumeration",
                        Summary:
                            "Identify if the application leaks information about valid user accounts through error messages or other responses.",
                        Goals: ["Prevent account enumeration attacks.", "Enhance user privacy and security."],
                        Tools: ["Manual Testing", "Custom Scripts"],
                    },
                    {
                        Name: "Bypass Authentication with SQL Injection",
                        Summary:
                            "Exploit SQL injection vulnerabilities to bypass authentication controls and gain unauthorized access.",
                        Goals: [
                            "Identify and mitigate SQL injection vulnerabilities.",
                            "Ensure robust authentication mechanisms.",
                        ],
                        Tools: ["SQLMap", "Burp Suite"],
                    },
                    // Add more subtopics here...
                ],
            },
            {
                Topic: "My Account (Post Login) Testing",
                Description: "Examine features available to authenticated users for security flaws.",
                SubTopics: [
                    {
                        Name: "Tamper with User Account Parameters",
                        Summary:
                            "Manipulate parameters related to user accounts to test for security vulnerabilities or access control issues.",
                        Goals: [
                            "Identify and fix potential vulnerabilities in user account management functionalities.",
                            "Ensure proper access control and data protection.",
                        ],
                        Tools: ["Manual Testing", "Custom Scripts"],
                    },
                    {
                        Name: "Profile Picture URL Analysis",
                        Summary:
                            "Analyze the URL structure and permissions associated with profile pictures or avatars.",
                        Goals: [
                            "Prevent unauthorized access to user profile images.",
                            "Ensure data privacy and user consent.",
                        ],
                        Tools: ["Browser Developer Tools", "URL Analysis Tools"],
                    },
                    // Add more subtopics here...
                ],
            },
            // Add more topics here...
        ],
    },
];
