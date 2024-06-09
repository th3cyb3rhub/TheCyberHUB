import React from "react";
import { ContentReactMarkdown } from "src/components/Blogs/ViewBlog/ViewBlogElements";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const PreviewMarkdown = (props) => {
    return (
        <ContentReactMarkdown
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                        <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" {...props}>
                            {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {props.content !== "" ? props.content : "PLease add Some Content"}
        </ContentReactMarkdown>
    );
};

export default PreviewMarkdown;
