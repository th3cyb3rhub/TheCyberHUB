export const CBQQuestions = [
    {
        questionText: "Which of the following should you do to restrict access to your files and devices?",
        answerOptions: [
            { answerText: "Update your software once a year.", isCorrect: false },
            {
                answerText: "Share passwords only with colleagues you trust.",
                isCorrect: false,
            },
            {
                answerText: "Have your staff members access information via an open Wi-Fi network.",
                isCorrect: false,
            },
            { answerText: "Use multi-factor authentication.", isCorrect: true },
        ],
    },
    {
        questionText:
            "Backing up important files offline, on an external hard drive or in the cloud, will help protect your business in the event of a cyber attack. True or False?",
        answerOptions: [
            { answerText: "True", isCorrect: true },
            { answerText: "False", isCorrect: false },
        ],
    },
    {
        questionText:
            "Which is the best answer for which people in a business should be responsible for cybersecurity?",
        answerOptions: [
            {
                answerText:
                    "Business owners. They run the business, so they need to know cybersecurity basics and put them in practice to reduce the risk of cyber attacks.",
                isCorrect: false,
            },
            {
                answerText:
                    "IT specialists, because they are in the best position to know about and promote cybersecurity within a business.",
                isCorrect: false,
            },
            {
                answerText:
                    "Managers, because they are responsible for making sure that staff members are following the right practices.",
                isCorrect: false,
            },
            {
                answerText:
                    "All staff members should know some cybersecurity basics to reduce the risk of cyber attacks.",
                isCorrect: true,
            },
        ],
    },
    {
        questionText: "Cyber criminals only target large companies?",
        answerOptions: [
            { answerText: "True", isCorrect: false },
            { answerText: "False", isCorrect: true },
        ],
    },
    {
        questionText: "Which of the following is the best answer for how to secure your router?",
        answerOptions: [
            {
                answerText: "Change the default name and password of the router.",
                isCorrect: false,
            },
            {
                answerText: "Turn off the router’s remote management.",
                isCorrect: false,
            },
            {
                answerText: "Log out as the administrator once the router is set up.",
                isCorrect: false,
            },
            { answerText: "All of the above.", isCorrect: true },
        ],
    },
];

export const PhishingQuestions = [
    {
        questionText: "Which one of these statements is correct?",
        answerOptions: [
            {
                answerText:
                    "If you get an email that looks like it's from someone you know, you can click on any links as long as you have a spam blocker and anti-virus protection.",
                isCorrect: false,
            },
            {
                answerText:
                    "You can trust an email really comes from a client if it uses the client's logo and contains at least one fact about the client that you know to be true.",
                isCorrect: false,
            },
            {
                answerText:
                    "If you get a message from a colleague who needs your network password, you should never give it out unless the colleague says it's an emergency.",
                isCorrect: false,
            },
            {
                answerText:
                    "If you get an email from Human Resources asking you to provide personal information right away, you should check it out first to make sure they are who they say are.",
                isCorrect: true,
            },
        ],
    },
    {
        questionText:
            "An email from your boss asks for the name, addresses, and credit card information of the company's top clients. The email says it's urgent and to please reply right away. You should reply right away. True or False?",
        answerOptions: [
            { answerText: "True", isCorrect: false },
            { answerText: "False", isCorrect: true },
        ],
    },
    {
        questionText:
            "You get a text message from a vendor who asks you to click on a link to renew your password so that you can log in to its website. You should:",
        answerOptions: [
            {
                answerText: "Reply to the text to confirm that you really need to renew your password.",
                isCorrect: false,
            },
            {
                answerText:
                    "Pick up the phone and call the vendor, using a phone number you know to be correct, to confirm that the request is real.",
                isCorrect: true,
            },
            {
                answerText:
                    "Click on the link. If it takes you to the vendor's website, then you'll know it's not a scam.",
                isCorrect: false,
            },
        ],
    },
    {
        questionText: "Email authentication can help protect against phishing attacks. True or False?",
        answerOptions: [
            { answerText: "True", isCorrect: true },
            { answerText: "False", isCorrect: false },
        ],
    },
    {
        questionText: "If you fall for a phishing scam, what should you do to limit the damage?",
        answerOptions: [
            {
                answerText: "Delete the phishing email.",
                isCorrect: false,
            },
            {
                answerText: "Unplug the computer. This will get rid of any malware.",
                isCorrect: false,
            },
            {
                answerText: "Change any compromised passwords.",
                isCorrect: true,
            },
        ],
    },
];

export const PSQQuestions = [
    {
        questionText: "Promoting physical security includes protecting:",
        answerOptions: [
            {
                answerText: "Only paper files.",
                isCorrect: false,
            },
            {
                answerText: "Only paper files and any computer on which you store electronic copies of those files.",
                isCorrect: false,
            },
            {
                answerText: "Only paper files, flash drives, and point-of-sale devices.",
                isCorrect: false,
            },
            {
                answerText: "All the above plus any other device with sensitive information on it.",
                isCorrect: true,
            },
        ],
    },
    {
        questionText:
            "Paper files that have sensitive information should be disposed of in a locked trash bin. True or False?",
        answerOptions: [
            { answerText: "True", isCorrect: false },
            { answerText: "False", isCorrect: true },
        ],
    },
    {
        questionText:
            "When you hit the “delete” key, that means a file is automatically removed from your computer. True or False?",
        answerOptions: [
            {
                answerText: "True",
                isCorrect: false,
            },
            {
                answerText: "False",
                isCorrect: true,
            },
        ],
    },
    {
        questionText: "Which one of these statements is true?",
        answerOptions: [
            {
                answerText:
                    " It's best to use multi-factor authentication to access areas of the business network with sensitive information.",
                isCorrect: true,
            },
            {
                answerText:
                    "You should use the same password for key business devices to guarantee that high-level employees can access them in an emergency.",
                isCorrect: false,
            },
            {
                answerText: "The best way to protect business data is to make sure no one loses any device.",
                isCorrect: false,
            },
            {
                answerText:
                    "You shouldn't limit login attempts on key business devices, because getting locked out for having too many incorrect attempts would leave you unable to access your accounts.",
                isCorrect: false,
            },
        ],
    },
    {
        questionText:
            "Only people with access to sensitive data need to be trained on the importance of the physical security of files and equipment. True or False?",
        answerOptions: [
            {
                answerText: "True",
                isCorrect: false,
            },
            {
                answerText: "False",
                isCorrect: true,
            },
        ],
    },
];

export const RansomwareQuestions = [
    {
        questionText: "What is ransomware?",
        answerOptions: [
            {
                answerText:
                    "Software that infects computer networks and mobile devices to hold your data hostage until you send the attackers money.",
                isCorrect: true,
            },
            {
                answerText: "Computer equipment that criminals steal from you and won't return until you pay them.",
                isCorrect: false,
            },
            {
                answerText: "Software used to protect your computer or mobile device from harmful viruses.",
                isCorrect: false,
            },
            {
                answerText: "A form of cryptocurrency.",
                isCorrect: false,
            },
        ],
    },
    {
        questionText:
            "Local backup files saved on your computer will protect your data from being lost in a ransomware attack. True or False?",
        answerOptions: [
            { answerText: "True", isCorrect: false },
            { answerText: "False", isCorrect: true },
        ],
    },
    {
        questionText: "Which of these best describes how criminals start ransomware attacks?",
        answerOptions: [
            {
                answerText: "Sending a scam email with links or attachments that put your data and network at risk.",
                isCorrect: false,
            },
            {
                answerText: "Getting into your server through vulnerabilities and installing malware.",
                isCorrect: false,
            },
            {
                answerText:
                    "Using infected websites that automatically download malicious software to your computer or mobile device.",
                isCorrect: false,
            },
            {
                answerText: "All of the above.",
                isCorrect: true,
            },
        ],
    },
    {
        questionText:
            "If you encounter a ransomware attack, the first thing you should do is pay the ransom. True or False?",
        answerOptions: [
            {
                answerText: "True",
                isCorrect: false,
            },
            {
                answerText: "False",
                isCorrect: true,
            },
        ],
    },
    {
        questionText:
            "Setting your software to auto-update is one way you can help protect your business from ransomware. True or False?",
        answerOptions: [
            {
                answerText: "True",
                isCorrect: true,
            },
            {
                answerText: "False",
                isCorrect: false,
            },
        ],
    },
];

export const SRAQQuestions = [
    {
        questionText:
            "Before connecting remotely to the company network, your personal device should meet the same security requirements as company-issued devices. True or False?",
        answerOptions: [
            {
                answerText: "True",
                isCorrect: true,
            },
            {
                answerText: "False",
                isCorrect: false,
            },
        ],
    },
    {
        questionText: "What is a common way to help protect devices connected to the company network?",
        answerOptions: [
            {
                answerText: "Only use laptops and other mobile devices with full-disk encryption.",
                isCorrect: true,
            },
            {
                answerText:
                    "Change your smartphone settings to let your devices connect automatically to public Wi-Fi.",
                isCorrect: false,
            },
            {
                answerText: "Let guests and customers use the same secure Wi-Fi that you use.",
                isCorrect: false,
            },
            {
                answerText: "Use the router's pre-set password so you won't forget it.",
                isCorrect: false,
            },
        ],
    },
    {
        questionText:
            "Keeping your router's default name will help security professionals identify it and thus help protect your network's security. True or False?",
        answerOptions: [
            {
                answerText: "True",
                isCorrect: false,
            },
            {
                answerText: "False",
                isCorrect: true,
            },
        ],
    },
    {
        questionText:
            "WPA2 and WPA3 encryption are the encryption standards that will protect information sent over a wireless network. True or False?",
        answerOptions: [
            {
                answerText: "True",
                isCorrect: true,
            },
            {
                answerText: "False",
                isCorrect: false,
            },
        ],
    },
    {
        questionText:
            "Which of the following describes the best way to make sure you are securely accessing the company network remotely?",
        answerOptions: [
            {
                answerText: "Read your company's cybersecurity policies thoroughly.",
                isCorrect: false,
            },
            {
                answerText: "Use VPN when connecting remotely to the company network.",
                isCorrect: false,
            },
            {
                answerText: "Use unique, complex network passwords and avoid unattended, open workstations.",
                isCorrect: false,
            },
            {
                answerText: "Do all of the above.",
                isCorrect: true,
            },
        ],
    },
];

export const TSSQQuestions = [
    {
        questionText: "Which of the following scenarios does NOT describe a tech support scam?",
        answerOptions: [
            {
                answerText:
                    "Someone calls and tells you they've found viruses on your computer, then asks for credit card information so they can bill you for tech support services.",
                isCorrect: false,
            },
            {
                answerText:
                    "While you're browsing online, an urgent message pops up telling you that there's a problem with your computer and directs you to a website to pay for tech support services.",
                isCorrect: false,
            },
            {
                answerText:
                    "A caller asks you to give him remote access to your computer to fix a problem in your computer.",
                isCorrect: false,
            },
            {
                answerText:
                    "You pay a trusted security professional to check your network for intrusions, and the professional tells you that your network has a problem that needs to be fixed.",
                isCorrect: true,
            },
        ],
    },
    {
        questionText:
            "True or False? You can avoid scams by only taking tech support calls from well-known tech companies.",
        answerOptions: [
            { answerText: "True", isCorrect: false },
            { answerText: "False", isCorrect: true },
        ],
    },
    {
        questionText: "Which of these answers describes the best way to protect against tech support scams?",
        answerOptions: [
            {
                answerText: "Use a unique password for each account.",
                isCorrect: false,
            },
            {
                answerText: "Scan your computer for any unknown software.",
                isCorrect: false,
            },
            {
                answerText: "Hang up on callers who say your computer has a problem.",
                isCorrect: false,
            },
            {
                answerText: "All of the above.",
                isCorrect: true,
            },
        ],
    },
    {
        questionText:
            "True or False? Small businesses should focus more on other cybersecurity threats, because tech support scammers usually target only large companies.",
        answerOptions: [
            {
                answerText: "True",
                isCorrect: false,
            },
            {
                answerText: "False",
                isCorrect: true,
            },
        ],
    },
    {
        questionText: "Which is the best way to protect against viruses or other security threats?",
        answerOptions: [
            {
                answerText:
                    "Call your security software company to review the steps it has taken to set up virus protection and what else it has done or can do to protect your business.",
                isCorrect: true,
            },
            {
                answerText:
                    "Hire a new company that has made the effort to alert you to viruses on your system and offers to help you fix them.",
                isCorrect: false,
            },
            {
                answerText: "Install new virus protection software that you find online.",
                isCorrect: false,
            },
            {
                answerText: "Change the network password.",
                isCorrect: false,
            },
        ],
    },
];

export const VSQQuestions = [
    {
        questionText:
            "What steps should you take when selecting vendors who will have access to your sensitive information? Pick the best answer.",
        answerOptions: [
            {
                answerText:
                    "Include provisions for security in your vendor contracts, like a plan to evaluate and update security controls.",
                isCorrect: true,
            },
            {
                answerText: "Only do business with well-known vendors.",
                isCorrect: false,
            },
            {
                answerText: "Ensure that your vendors understand your compliance rules.",
                isCorrect: false,
            },
            {
                answerText: "Confirm that the vendor understands the importance of cybersecurity.",
                isCorrect: false,
            },
        ],
    },
    {
        questionText:
            "Anyone with access to your business network should be required to use a strong password. How long should a strong password be?",
        answerOptions: [
            {
                answerText:
                    "Passwords should be at least 8 characters with a mix of numbers, symbols, and both capital and lowercase letters.",
                isCorrect: false,
            },
            {
                answerText:
                    "Passwords should be at least 5 characters with a mix of numbers, symbols, and both capital and lowercase letters.",
                isCorrect: false,
            },
            {
                answerText:
                    "Passwords should be at least 12 characters with a mix of numbers, symbols, and both capital and lowercase letters.",
                isCorrect: true,
            },
            {
                answerText:
                    "Passwords should be at least 10 characters with a mix of numbers, symbols, and both capital and lowercase letters.",
                isCorrect: false,
            },
        ],
    },
    {
        questionText:
            "Requiring vendors to use multi-factor authentication to access your network makes users take an additional step beyond logging in with a password. True or False?",
        answerOptions: [
            {
                answerText: "True",
                isCorrect: true,
            },
            {
                answerText: "False",
                isCorrect: false,
            },
        ],
    },
    {
        questionText:
            "Properly configured strong encryption, recommended for any devices that connect remotely to your network, can help you detect cyber attacks in your system. True or False?",
        answerOptions: [
            {
                answerText: "True",
                isCorrect: false,
            },
            {
                answerText: "False",
                isCorrect: true,
            },
        ],
    },
    {
        questionText:
            "What should you do if a vendor has a breach that impacts your business data? Pick the best answer.",
        answerOptions: [
            {
                answerText: "Change all network passwords.",
                isCorrect: false,
            },
            {
                answerText: "Turn off all your computers and devices.",
                isCorrect: false,
            },
            {
                answerText:
                    "Make sure that the vendor fixes the vulnerabilities and ensures that your information will be safe going forward.",
                isCorrect: true,
            },
            {
                answerText: "Disable multi-factor authentication systems.",
                isCorrect: false,
            },
        ],
    },
];
