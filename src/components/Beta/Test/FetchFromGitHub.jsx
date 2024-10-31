import React, { useState, useEffect } from "react";
import PreviewMarkdown from "src/components/Blogs/ViewBlog/PreviewMarkdown";

const FetchFromGitHub = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("https://raw.githubusercontent.com/th3cyb3rhub/hackliner/main/README.md");
            const data = await res.text();
            setContent(data);
        }
        fetchData();
    }, []);

    return (
        <div style={{ width: "1000px" }}>
            <PreviewMarkdown content={content} />
        </div>
    );
};

export default FetchFromGitHub;
