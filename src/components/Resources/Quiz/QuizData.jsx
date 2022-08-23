export const questions = [
    {
        questionText: <>
            <h3>The below logic is an example of what kind of cyber-attack targets the vulnerabilities on the
                Databases?</h3> <br/>
            <b><p>{"‘ OR ‘1’=’1′ — ‘ OR ‘1’=’1′ {‘ OR ‘1’=’1′ /*"}</p></b>
        </>,
        answerOptions: [
            {answerText: 'XSS', isCorrect: false},
            {answerText: 'ShellCode', isCorrect: false},
            {answerText: 'SQL Injection', isCorrect: true},
            {answerText: 'None of the above', isCorrect: false},
        ],
    },
    {
        questionText: 'This is a Debian-derived Linux distribution managed and funded by Offensive Security Ltd, designed for digital forensics and penetration testing. Which is this very famous OS majorly developed for Hackers and software testers?',
        answerOptions: [
            {answerText: 'Ubuntu', isCorrect: false},
            {answerText: 'Kali Linux', isCorrect: true},
            {answerText: 'Black arch', isCorrect: false},
            {answerText: 'Windows 10', isCorrect: false},
        ],
    },
    {
        questionText: 'This is a small piece of code used as the payload in the exploitation of a software vulnerability. It starts the command shell and the attacker can control the machine. Commonly it is written in Machine code. What is this piece of code generally called?',
        answerOptions: [
            {answerText: 'ShellCode', isCorrect: true},
            {answerText: 'ByteCode', isCorrect: false},
            {answerText: 'payload', isCorrect: false},
            {answerText: 'Malware', isCorrect: false},
        ],
    },
    {
        questionText: 'Cyber criminals only target large companies?',
        answerOptions: [
            {answerText: 'True', isCorrect: false},
            {answerText: 'false', isCorrect: true},
        ],
    },
    {
        questionText: 'A hacker locks out users and encrypts their personal computer files and data, holding it hostage until they agree to pay to the attacker. What is this practice called?',
        answerOptions: [
            {answerText: 'Browser hijacker.', isCorrect: false},
            {answerText: 'Ransomware', isCorrect: true},
            {answerText: 'Brute-force.', isCorrect: false},
        ],
    },
    {
        questionText: 'On the evening news you heard the reporter talking about an Internet threat called a \'Botnet\'. What exactly is a Botnet?',
        answerOptions: [
            {
                answerText: 'It is a malicious program that attempts to hide itself, other files, or computer data so they cannot be found on a computer.',
                isCorrect: false
            },
            {
                answerText: 'A group of computers running malicious programs that are remotely controlled by cybercriminals.',
                isCorrect: true
            },
            {
                answerText: 'A new type of cyber virus spread from China causing havoc around the globe.',
                isCorrect: false
            },
        ],
    },
    {
        questionText: 'Which of the following is a common example of a "phishing" attack?',
        answerOptions: [
            {
                answerText: 'You receive an email from an acquaintance who you are rarely in contact with that contains only a web link.',
                isCorrect: false
            },
            {
                answerText: 'You got an email that appears to be from your bank asking you to enter your account number and password, but the web address looks unfamiliar.',
                isCorrect: false
            },
            {
                answerText: 'You received a text message claiming that you won a contest and asking you to click on the link.',
                isCorrect: false
            },
            {answerText: 'All of the above', isCorrect: true},
        ],
    },
    {
        questionText: 'You are on a business trip and sitting in the local cafe trying to send emails to your colleagues to catch up on a few tasks.' +
            '> To protect your communications over these public networks you should always do the following:',
        answerOptions: [
            {answerText: 'Find the strongest WiFi signal near you', isCorrect: false},
            {answerText: 'Turn off your file sharing', isCorrect: false},
            {answerText: 'Use a Virtual Private Network (VPN)', isCorrect: true},
        ],
    },
    {
        questionText: 'Which one of the following is also referred to as malicious software?',
        answerOptions: [
            {answerText: 'Maliciousware', isCorrect: false},
            {answerText: 'Badware', isCorrect: false},
            {answerText: 'Ilegalware', isCorrect: false},
            {answerText: 'Malware', isCorrect: true},

        ],
    },
    {
        questionText: 'Which of the following is not a type of scanning?',
        answerOptions: [
            {answerText: 'Xmas Tree Scan', isCorrect: false},
            {answerText: 'SYN Stealth', isCorrect: false},
            {answerText: 'Null Scan', isCorrect: false},
            {answerText: 'Cloud scan', isCorrect: true},

        ],
    },
];
