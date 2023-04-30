const RoadmapsData = [
    {
        id: 1,
        title: "Cyber Security Beginner",
        level: "Beginner",
        desc: "Step by step guide to learn Cyber Security from scratch",
        details: [
            {
                section: "Essential SkillLevel",
                resources: [
                    {
                        title: "Basic IT SkillLevel",
                        url: "https://www.professormesser.com/free-a-plus-training/220-1001/220-1000-training-course/",
                    },
                    {
                        title: "Linux Essentials for Ethical Hackers",
                        url: "https://www.youtube.com/watch?v=1hvVcEhcbLM&t=12602s&pp=ygUSbGludXggIGZvciBoY2FrcmVz",
                    },
                ],
            },
            {
                section: "Computer Networking",
                resources: [
                    {
                        title: "Computer Networking",
                        url: "https://www.professormesser.com/free-a-plus-training/220-1001/220-1000-training-course/",
                    },
                    {
                        title: "Network-plus n10-007",
                        url: "https://www.professormesser.com/network-plus/n10-007/n10-007-training-course/",
                    },
                ],
            },
            {
                section: "Programming",
                resources: [
                    {
                        title: "HTML",
                        url: "https://www.youtube.com/watch?v=qz0aGYrrlhU",
                    },
                    {
                        title: "JavaScript",
                        url: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
                    },
                    {
                        title: "SQL",
                        url: "https://www.youtube.com/watch?v=p3qvj9hO_Bo",
                    },
                    {
                        title: "Bash Shell Scripting",
                        url: "https://www.youtube.com/watch?v=Zl7npywCB84",
                    },
                    {
                        title: "Python",
                        url: "https://www.youtube.com/watch?v=7utwZYKweho&t=8861s",
                    },
                ],
            },
            {
                section: "Cyber Security",
                resources: [
                    {
                        title: "Ethical Hacking Course",
                        url: "https://youtu.be/fNzpcB7ODxQ",
                    },
                    {
                        title: "Open-Source Intelligence",
                        url: "https://youtu.be/qwA6MmbeGNo",
                    },
                ],
            },
            {
                section: "WebApp Pen-testing",
                resources: [
                    {
                        title: "Web App Pentesting",
                        url: "https://youtu.be/X4eRbHgRawI",
                    },
                    {
                        title: "Web App Penetration Testing Tutorials",
                        url: "https://www.youtube.com/playlist?list=PLBf0hzazHTGO3EpGAs718LvLsiMIv9dSC",
                    },
                ],
            },
            {
                section: "Books",
                resources: [
                    {
                        title: "Bug Bounty Bootcamp: The Guide to Finding and Reporting Web Vulnerabilities",
                        url: "https://amzn.to/3LEmZPi",
                    },
                    {
                        title: "Hacking: The Art of Exploitation",
                        url: "https://amzn.to/428G6WX",
                    },
                    {
                        title: "Metasploit: The Penetration Tester's Guide",
                        url: "https://amzn.to/3HqkQUC",
                    },
                    {
                        title: "Black Hat Python: Python Programming for Hackers and Pentesters",
                        url: "https://amzn.to/3LGaYJ7",
                    },
                    {
                        title: "Black Hat Python, 2nd Edition: Python Programming for Hackers and Pentesters",
                        url: "https://amzn.to/3ne0xTB",
                    },
                ],
            },
            {
                section: "Important for Improving skills",
                resources: [
                    {
                        title: "PortSwigger Academy",
                        url: "https://portswigger.net/web-security/learning-path",
                    },
                    {
                        title: "TryHackMe",
                        url: "https://tryhackme.com/",
                    },
                    {
                        title: "TheCyberCTF",
                        url: "https://thecyberhub.org/ctf",
                    },
                    {
                        title: "VulnHub",
                        url: "https://www.vulnhub.com/",
                    },
                ],
            },
            // {
            //     section: "Bug Hunting",
            //     resources: [
            //         {
            //             title: "New to bug hunting",
            //             url: "https://www.youtube.com/watch?v=hDYqWZ11njU&list=PLbyncTkpno5FAC0DJYuJrEqHSMdudEffw",
            //         },
            //         {
            //             title: "Everything API Hacking",
            //             url: "https://www.youtube.com/watch?v=yCUQBc2rY9Y&list=PLbyncTkpno5HqX1h2MnV6Qt4wvTb8Mpol",
            //         },
            //         {
            //             title: "Bug bounty / webapp pentesting tutorials",
            //             url: "https://www.youtube.com/playlist?list=PLF7JR1a3dLONdkRYU_8-5OcgOzrWe2549",
            //         },
            //         {
            //             title: "Web Security Academy",
            //             url: "https://www.youtube.com/c/RanaKhalil101/videos",
            //         },
            //         {
            //             title: "Guide to Failing at Bug Bounties",
            //             url: "https://www.youtube.com/playlist?list=PLhfP6zOcRP1f_FyWc_gk1fRz1mxst0QE5",
            //         },
            //         {
            //             title: "What after Recon?",
            //             url: "https://www.youtube.com/playlist?list=PLhfP6zOcRP1fXtBtxhTlu9KR-PKDA6biX",
            //         },
            //         {
            //             title: "No BS Guides",
            //             url: "https://www.youtube.com/playlist?list=PLhfP6zOcRP1dCTjbENt4ilFKFwFpspOoS",
            //         },
            //     ],
            // },
        ],
    },
    {
        id: 8,
        title: "Penetration & Vulnerability Tester",
        level: "Mid",
        desc: "Step by step guide to becoming a Penetration & Vulnerability Tester",
        details: [
            {
                section: "Coming Soon",
                resources: [
                    {
                        title: "Coming Soon",
                        url: "Coming Soon",
                    },
                ],
            },
        ],
    },
    // {
    //     id: 2,
    //     title: "Cybersecurity Specialist",
    //     level: "Entry",
    //     desc: "Step by step guide to becoming a Cybersecurity Specialist",
    //     details: [
    //         {
    //             section: "Coming Soon",
    //             resources: [
    //                 {
    //                     title: "Coming Soon",
    //                     url: "Coming Soon",
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     id: 3,
    //     title: "Cyber Crime Analyst",
    //     level: "Entry",
    //     desc: "Step by step guide to becoming a Cyber Crime Analyst",
    //     details: [
    //         {
    //             section: "Coming Soon",
    //             resources: [
    //                 {
    //                     title: "Coming Soon",
    //                     url: "Coming Soon",
    //                 },
    //             ],
    //         },
    //     ],
    // },
    {
        id: 4,
        title: "Incident & Intrusion Analyst",
        level: "Entry",
        desc: "Step by step guide to becoming an Incident & Intrusion Analyst",
        details: [
            {
                section: "Coming Soon",
                resources: [
                    {
                        title: "Coming Soon",
                        url: "Coming Soon",
                    },
                ],
            },
        ],
    },
    // {
    //     id: 5,
    //     title: "IT Auditor",
    //     level: "Entry",
    //     desc: "Step by step guide to becoming an IT Auditor",
    //     details: [
    //         {
    //             section: "Coming Soon",
    //             resources: [
    //                 {
    //                     title: "Coming Soon",
    //                     url: "Coming Soon",
    //                 },
    //             ],
    //         },
    //     ],
    // },
    {
        id: 6,
        title: "Cybersecurity Analyst",
        level: "Mid",
        desc: "Step by step guide to becoming a Cybersecurity Analyst",
        details: [
            {
                section: "Coming Soon",
                resources: [
                    {
                        title: "Coming Soon",
                        url: "Coming Soon",
                    },
                ],
            },
        ],
    },
    {
        id: 7,
        title: "Cybersecurity Consultant",
        level: "Mid",
        desc: "Step by step guide to becoming a Cybersecurity Consultant",
        details: [
            {
                section: "Coming Soon",
                resources: [
                    {
                        title: "Coming Soon",
                        url: "Coming Soon",
                    },
                ],
            },
        ],
    },

    // {
    //     id: 9,
    //     title: "Cybersecurity Manager",
    //     level: "Advanced",
    //     desc: "Step by step guide to becoming a Cybersecurity Manager",
    //     details: [
    //         {
    //             section: "Coming Soon",
    //             resources: [
    //                 {
    //                     title: "Coming Soon",
    //                     url: "Coming Soon",
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     id: 10,
    //     title: "Cybersecurity Engineer",
    //     level: "Advanced",
    //     desc: "Step by step guide to becoming a Cybersecurity Engineer",
    //     details: [
    //         {
    //             section: "Coming Soon",
    //             resources: [
    //                 {
    //                     title: "Coming Soon",
    //                     url: "Coming Soon",
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     id: 11,
    //     title: "Cybersecurity Architect Analyst",
    //     level: "Advanced",
    //     desc: "Step by step guide to becoming a Cybersecurity Architect Analyst",
    //     details: [
    //         {
    //             section: "Coming Soon",
    //             resources: [
    //                 {
    //                     title: "Coming Soon",
    //                     url: "Coming Soon",
    //                 },
    //             ],
    //         },
    //     ],
    // },
];

export default RoadmapsData;
