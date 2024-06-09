export const LabData = [
    {
        id: 1,
        title: "Basic Reflected XSS Lab",
        description: `Explore and understand basics reflected XSS vulnerabilities.
This lab demonstrates a basic reflected XSS vulnerability in a search input field.
The lab is designed to help you understand the impact and potential risk of reflected XSS vulnerabilities.
`,
        labLink: "https://xss-labs.thecyberhub.org/xss1",
        tags: ["XSS", "Web Security", "Cyber Security"],
        category: "XSS",
        level: "Beginner",
        solution: [
            "Visit the provided lab link.",
            "Enter a search term in the search input field on the page.",
            "Observe the reflected search term in the search results.",
            "Try injecting a basic XSS payload in the search input to see if it gets executed.",
            "Understand the impact and potential risk of the reflected XSS vulnerability.",
        ],
        hint: "Try injecting a basic XSS payload in the search input to see if it gets executed.",
    },
    {
        id: 2,
        title: "Stored XSS Lab",
        description:
            "Explore and understand basics Stored XSS vulnerabilities. This Stored XSS Lab demonstrates how attackers can inject malicious scripts into a web application, where the scripts are stored on the server and executed in the context of other users' browsers, allowing the attacker to steal data, hijack sessions, or perform other malicious actions.",
        labLink: "https://xss-labs.thecyberhub.org/xss2",
        tags: ["XSS", "Web Security", "Cyber Security"],
        category: "SQLi",
        level: "Beginner",
        hint: "Try to analyse the reflected point and use a suitable payload to break-out of it.",
        solution: [
            "Visit the provided lab link.",
            "Enter a search term in the search input field on the page.",
            "Observe the reflected search term in the search results.",
            "Try injecting a XSS payload that can be executed in `href` field and see if it gets executed.",
            "Understand the impact and potential risk of the reflected XSS vulnerability.",
        ],
    },
];
