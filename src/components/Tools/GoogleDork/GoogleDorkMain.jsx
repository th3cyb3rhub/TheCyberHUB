import React, { useState } from "react";
import { Input } from "src/components/Blogs/ViewBlog/BlogComments/BlogCommentsElements.jsx";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";

export default function GoogleDorks() {
    const [selectedOption, setSelectedOption] = useState("");
    const [query, setQuery] = useState("");
    const [inputUrl, setInputUrl] = useState("");

    const options = [
        {
            "Publicly exposed documents":
                "ext:doc | ext:docx | ext:odt | ext:rtf | ext:sxw | ext:psw | ext:ppt | ext:pptx | ext:pps | ext:csv",
            "Directory listing vulnerabilities": "intitle:index.of",
            "Configuration files exposed":
                "ext:xml | ext:conf | ext:cnf | ext:reg | ext:inf | ext:rdp | ext:cfg | ext:txt | ext:ora | ext:ini | ext:env",
            "Database files exposed": "ext:sql | ext:dbf | ext:mdb",
            "Log files exposed": "ext:log",
            "Backup and old files": "ext:bkf | ext:bkp | ext:bak | ext:old | ext:backup",
            "Login pages": 'inurl:login | inurl:signin | intitle:Login | intitle:"sign in" | inurl:auth',
            "SQL errors":
                'intext:"sql syntax near" | intext:"syntax error has occurred" | intext:"incorrect syntax near" | intext:"unexpected end of SQL command" | intext:"Warning: mysql_connect()" | intext:"Warning: mysql_query()" | intext:"Warning: pg_connect()"',
            "Signup pages": "inurl:signup | inurl:register | intitle:Signup",
        },
        {
            "PHP errors / warning": '"PHP Parse error" | "PHP Warning" | "PHP Error"',
            "phpinfo()": 'ext:php intitle:phpinfo "published by the PHP Group"',
            "Search pastebin.com / pasting sites": `site:pastebin.com | site:paste2.org | site:pastehtml.com | site:slexy.org | site:snipplr.com | site:snipt.net | site:textsnip.com | site:bitpaste.app | site:justpaste.it | site:heypasteit.com | site:hastebin.com | site:dpaste.org | site:dpaste.com | site:codepad.org | site:jsitor.com | site:codepen.io | site:jsfiddle.net | site:dotnetfiddle.net | site:phpfiddle.org | site:ide.geeksforgeeks.org | site:repl.it | site:ideone.com | site:paste.debian.net | site:paste.org | site:paste.org.ru | site:codebeautify.org  | site:codeshare.io | site:trello.com `,
            "Search github.com and gitlab.com": "site:github.com | site:gitlab.com",
            "Search stackoverflow.com": "site:stackoverflow.com",
        },
        // {
        //     "Find Subdomains": "site:*.",
        //     "Find Sub-Subdomains": "site:*.*."
        // }
    ];

    const handleSelectChange = (event) => {
        const selected = event.target.value;
        setSelectedOption(selected);
        for (const dic of options) {
            if (dic[selected]) {
                setQuery(dic[selected]);
                break;
            }
        }
    };

    const handleInputChange = (event) => {
        setInputUrl(event.target.value);
    };

    const handleSearchClick = () => {
        if (inputUrl && query) {
            const searchQuery = `${query} ${inputUrl}`;
            const encodedQuery = encodeURIComponent(searchQuery);
            window.open(`https://www.google.com/search?q=${encodedQuery}`, "_blank");
        } else {
            alert("Please enter a URL and select a Google Dork option.");
        }
    };

    return (
        <Wrapper>
            <div>
                <h1 style={{ fontSize: "50px" }}>Google Dork</h1>
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Input placeholder="www.example.com" value={inputUrl} onChange={handleInputChange} />
                <select
                    style={{
                        background: "#262525",
                        padding: "12.5px",
                        margin: "10px",
                        borderRadius: "5px",
                        height: "100%",
                        color: "white",
                        marginLeft: "10px",
                    }}
                    onChange={handleSelectChange}
                    value={selectedOption}
                >
                    <option value="" disabled>
                        Select an option
                    </option>
                    {options.map((dic, index) =>
                        Object.keys(dic).map((option) => (
                            <option key={`${option}-${index}`} value={option}>
                                {option}
                            </option>
                        )),
                    )}
                </select>
                <button
                    style={{
                        background: "#FF6B08",
                        marginLeft: "10px",
                        padding: "12px",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    onClick={handleSearchClick}
                >
                    Search
                </button>
            </div>
        </Wrapper>
    );
}
