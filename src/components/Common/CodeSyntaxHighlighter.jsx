import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/src/styles/hljs";

const CodeSyntaxHighlighter = ({ code }) => {
    return (
        <SyntaxHighlighter
            language="javascript"
            style={a11yDark}
            customStyle={{
                borderRadius: "10px",
                padding: "20px",
                fontFamily: "'Fira Code', monospace",
                fontSize: "16px",
                lineHeight: "1.5",
                overflowX: "scroll",
                overflowY: "auto",
                maxHeight: "600px",
                maxWidth: "800px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
                wrap: "pre-wrap",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                backgroundColor: "#1e1e1e",
                color: "#f5f5f5",
            }}
        >
            {code}
        </SyntaxHighlighter>
    );
};

export default CodeSyntaxHighlighter;
