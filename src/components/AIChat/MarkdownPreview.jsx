import React from "react";
import MDEditor from "@uiw/react-md-editor";

const MarkdownPreview = ({ source }) => {
    return (
        <MDEditor.Markdown
            source={source || ""}
            style={{
                borderRadius: "0 0 10px 10px",
                border: "1px solid #333",
                background: "#262626",
                textAlign: "left",
                width: "100%",
                fontSize: "16px",
                padding: "20px",
                fontFamily: "Roboto, sans-serif",
            }}
            // rehypePlugins={[rehypeSanitize]}
            components={{
                pre: ({ children, ...props }) => (
                    <pre
                        {...props}
                        style={{
                            background: "#1f1e1e",
                            color: "#d7d7d7",
                            borderRadius: "5px",
                            fontSize: "16px",
                            padding: "10px",
                        }}
                    >
                        <code className="hljs">{children}</code>
                    </pre>
                ),
            }}
        />
    );
};

export default MarkdownPreview;
