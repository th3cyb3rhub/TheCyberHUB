const InterviewsQuestionsData = [
    {
        id: 1,
        title: "Encryption and Authentication",
        level: "Beginner",
        desc: "Step by step guide to learn Cyber Security",
        details: [
            {
                question: "How do cookies work?",
                answer: `Cookies are small text files that a website sends to your browser and are stored on your computer or device. When you visit the website again, your browser sends the cookie back to the website's server, allowing it to remember your preferences or login information.

For example, when you log in to a website, a cookie is usually created so that the website can remember that you are logged in as you navigate to different pages. Without cookies, you would need to log in again every time you visited a new page on the site.

Another example is when you visit an e-commerce website and add items to your shopping cart. The website uses cookies to keep track of your cart, so if you leave the site and come back later, your items will still be in the cart.

Overall, cookies allow websites to provide a more personalized and convenient experience for users. However, some users may choose to disable cookies for privacy or security reasons.`,
            },
            {
                question: "How do sessions work?",
                answer: `In web development, a session refers to a way to store information about a user across multiple pages or requests. When a user first visits a website, a session is typically created on the server side, and a unique session ID is generated and stored in a cookie on the user's browser.

As the user continues to interact with the website, the session ID is sent back to the server with each request, allowing the server to retrieve information about the user's session and personalize the user's experience. For example, a shopping website might use sessions to keep track of items in a user's shopping cart as they browse the site.

Sessions can also be used to implement user authentication and authorization. For example, a user might log in to a website and then be assigned a session that grants them access to certain parts of the site that are only available to authenticated users.

Overall, sessions are a powerful tool for building dynamic, personalized web applications that can remember user preferences and provide a seamless user experience across multiple pages or requests.`,
            },
            {
                question: "Explain how OAuth works?",
                answer: ``,
            },
            {
                question: "What is a public key infrastructure flow and how would I diagram it?",
                answer: ``,
            },
            {
                question: "Describe the difference between synchronous and asynchronous encryption?",
                answer: ``,
            },
            {
                question: "Describe SSL handshake?",
                answer: ``,
            },
            {
                question: "How does HMAC work?",
                answer: ``,
            },
            {
                question: "Why HMAC is designed in that way?",
                answer: ``,
            },
            {
                question: "What is the difference between authentication vs authorization name spaces?",
                answer: ``,
            },
            {
                question: "What’s the difference between Diffie-Hellman and RSA?",
                answer: ``,
            },
            {
                question: "How does Kerberos work?",
                answer: ``,
            },
            {
                question: "If you're going to compress and encrypt a file, which do you do first and why??",
                answer: ``,
            },
            {
                question: "How do I authenticate you and know you sent the message?",
                answer: ``,
            },
            {
                question: "Should you encrypt all data at rest?",
                answer: ``,
            },
            {
                question: "What is Perfect Forward Secrecy?",
                answer: ``,
            },
        ],
    },
    {
        id: 1,
        title: "Network Level and Logging",
        level: "Beginner",
        desc: "Step by step guide to learn Cyber Security",
        details: [
            {
                question: "What are common ports involving security, what are the risks and mitigations?",
                answer: ``,
            },
            {
                question: "Which one for DNS?",
                answer: ``,
            },
            {
                question: "Describe HTTPs and how it is used?",
                answer: ``,
            },
            {
                question: "What is the difference between HTTPS and SSL?",
                answer: ``,
            },
            {
                question: "How does threat modeling work?",
                answer: ``,
            },
            {
                question: "What is a subnet and how is it useful in security?",
                answer: ``,
            },
            {
                question: "What is subnet mask?",
                answer: ``,
            },
            {
                question: "Explain what traceroute is?",
                answer: ``,
            },
            {
                question:
                    "Draw a network, then expect them to raise an issue and have to figure out where it happened?",
                answer: ``,
            },
            {
                question:
                    "Write out a Cisco ASA firewall configuration on the white board to allow three networks unfiltered access, 12 networks limited access to different resources on different networks, and 8 networks to be blocked altogether.?",
                answer: ``,
            },
            {
                question: "Explain TCP/IP concepts?",
                answer: ``,
            },
            {
                question: "What is OSI model?",
                answer: ``,
            },
            {
                question: "How does a router differ from a switch?",
                answer: ``,
            },
            {
                question:
                    "Describe the Risk Management Framework process and a project where you successfully implemented compliance with RMF.?",
                answer: ``,
            },
            {
                question: "How does a packet travel between two hosts connected in same network?",
                answer: ``,
            },
            {
                question: "Explain the difference between TCP and UDP?",
                answer: ``,
            },
            {
                question: "Which is more secure and why?",
                answer: ``,
            },
            {
                question: "What is the TCP three way handshake?",
                answer: ``,
            },
            {
                question: "What is the difference between IPSEC Phase 1 and Phase 2?",
                answer: ``,
            },
            {
                question: "What are biggest AWS security vulnerabilities?",
                answer: ``,
            },
            {
                question: "How do web certificates for HTTPS work?",
                answer: ``,
            },
            {
                question: "What is the purpose of TLS?",
                answer: ``,
            },
            {
                question: "Is ARP UDP or TCP?",
                answer: ``,
            },
        ],
    },
    {
        id: 1,
        title: "OWASP Top 10, Pentesting and/or Web Applications",
        level: "Beginner",
        desc: "Step by step guide to learn Cyber Security",
        details: [
            {
                question: "Differentiate XSS from CSRF.",
                answer: ``,
            },
            {
                question: "What do you do if a user brings you a pc that is acting weird? You suspect malware.",
                answer: ``,
            },
            {
                question: "What is the difference between tcp dump and FWmonitor?",
                answer: ``,
            },
            {
                question: "Do you know what XXE is?",
                answer: ``,
            },
            {
                question: "Explain man-in-the-middle attacks.",
                answer: ``,
            },
            {
                question: "What is a Server Side Request Forgery attack?",
                answer: ``,
            },
            {
                question: "Describe what are egghunters and their use in exploit development.",
                answer: ``,
            },
            {
                question: "How is pad lock icon in browser generated?",
                answer: ``,
            },
            {
                question: "What is Same Origin Policy and CORS?",
                answer: ``,
            },
        ],
    },
    {
        id: 1,
        title: "Databases",
        level: "Beginner",
        desc: "Step by step guide to learn Cyber Security",
        details: [
            {
                question: "How would you secure a Mongo database?",
                answer: ``,
            },
            {
                question: "Postgres?",
                answer: ``,
            },
            {
                question:
                    "Our DB was stolen/exfiltrated. It was secured with one round of sha256 with a static salt?, What do we do now?, Are we at risk?, What do we change?",
                answer: ``,
            },
            {
                question: "What are the 6 aggregate functions of SQL?",
                answer: ``,
            },
        ],
    },
    {
        id: 1,
        title: "Tools and Games",
        level: "Beginner",
        desc: "Step by step guide to learn Cyber Security",
        details: [
            {
                question: "Have I played CTF?",
                answer: ``,
            },
            {
                question: "Would you decrypt a steganography image?",
                answer: ``,
            },
            {
                question: "You're given an ip-based phone and asked me to decrypt the message in the phone.",
                answer: ``,
            },
            {
                question: "What CND tools do you knowledge or experience with?",
                answer: ``,
            },
            {
                question: "What is the difference between nmap -ss and nmap -st?",
                answer: ``,
            },
            {
                question: "How would you filter xyz in Wireshark?",
                answer: ``,
            },
            {
                question:
                    "Given a sample packet capture - Identify the protocol, the traffic, and the likelihood of malicious intent. ",
                answer: ``,
            },
            {
                question: "If left alone in office with access to a computer, how would you exploit it?",
                answer: ``,
            },
            {
                question: "How do you fingerprint an iPhone so you can monitor it even after wiping it?",
                answer: ``,
            },
            {
                question: "How would you use CI/CD to improve security?",
                answer: ``,
            },
            {
                question:
                    "You have a pipeline for Docker images. How would you design everything to ensure the proper security checks? ",
                answer: ``,
            },
            {
                question: "How would you create a secret storage system?",
                answer: ``,
            },
            {
                question: "What technical skill or project are you working on for fun in your free time?",
                answer: ``,
            },
            {
                question: "How would you harden your work laptop if you needed it at Defcon?",
                answer: ``,
            },
            {
                question: "If you had to set up supply chain attack prevention, how would you do that?",
                answer: ``,
            },
        ],
    },
    {
        id: 1,
        title: "Programming and Code",
        level: "Beginner",
        desc: "Step by step guide to learn Cyber Security",
        details: [
            {
                question: "Code review a project and look for the vulnerability.",
                answer: ``,
            },
            {
                question: "How would you conduct a security code review?",
                answer: ``,
            },
            {
                question: "How can Github webhooks be used in a malicious way?",
                answer: ``,
            },
            {
                question: "Given a CVE, walk us through it and how the solution works.",
                answer: ``,
            },
            {
                question: "Tell me about a repetitive task at work that you automated away.",
                answer: ``,
            },
        ],
    },
    {
        id: 1,
        title: "Compliance",
        level: "Beginner",
        desc: "Step by step guide to learn Cyber Security",
        details: [
            {
                question: "Can you explain SOC 2?",
                answer: ``,
            },
            {
                question: "What are the five trust criteria?",
                answer: ``,
            },
            {
                question: "How is ISO27001 different?",
                answer: ``,
            },
            {
                question: "Can you list examples of controls these frameworks require?",
                answer: ``,
            },
            {
                question: "What is the difference between Governance, Risk and Compliance?",
                answer: ``,
            },
            {
                question: "What does Zero Trust mean?",
                answer: ``,
            },
            {
                question: "What is role-based access control (RBAC) and why is it covered by compliance frameworks?",
                answer: ``,
            },
            {
                question: "What is the NIST framework and why is it influential?",
                answer: ``,
            },
        ],
    },
];

export default InterviewsQuestionsData;
