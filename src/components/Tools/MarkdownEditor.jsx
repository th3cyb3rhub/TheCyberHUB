import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import ReactMarkdown from "react-markdown";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Fira+Code&display=swap');

    body {
        margin: 0;
        padding: 0;
        font-family: Inter, sans-serif;
    }
`;

const EditorContainer = styled.div`
    display: flex;
    height: calc(100vh - 80px);
    margin-top: 80px;
    background-color: #1e1e1e;
    color: #e0e0e0;
`;

const TextArea = styled.textarea`
    flex: 1;
    padding: 2rem;
    font-size: 1rem;
    line-height: 1.5;
    background-color: #2d2d2d;
    color: #e0e0e0;
    border: none;
    resize: none;
    outline: none;
    font-family: "Fira Code", monospace;
`;

const PreviewContainer = styled.div`
    flex: 1;
    position: relative;
`;

const PreviewArea = styled.div`
    height: 100%;
    padding: 2rem;
    overflow-y: auto;
    background-color: #1e1e1e;
    font-family: Inter, sans-serif;
    line-height: 1.6;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: #fba161;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
    }

    h1 {
        font-size: 2.5em;
    }

    h2 {
        font-size: 2em;
    }

    h3 {
        font-size: 1.75em;
    }

    h4 {
        font-size: 1.5em;
    }

    h5 {
        font-size: 1.25em;
    }

    h6 {
        font-size: 1em;
    }

    p {
        margin-bottom: 1em;
    }

    a {
        color: #f9a825;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    code {
        border: 1px solid rgb(251 161 97 / 69%);
        border-radius: 5px;
        background-color: #2c2c2c;
        padding: 2px 7px;
        font-family: "Fira Code", monospace;
        font-size: 0.9em;
    }

    pre {
        background-color: #3d3d3d;
        padding: 1em;
        border-radius: 5px;
        overflow-x: auto;
        margin: 1em 0;
    }

    pre > code {
        border: none;
        background-color: transparent;
        padding: 0;
    }

    ul,
    ol {
        padding-left: 2em;
        margin-bottom: 1em;
    }

    blockquote {
        border-left: 4px solid #fba161;
        margin: 1em 0;
        padding-left: 1em;
        color: #b0b0b0;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 1em;
    }

    th,
    td {
        border: 1px solid #4d4d4d;
        padding: 0.5em;
    }

    th {
        background-color: #3d3d3d;
    }
`;

const CopyButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: #fba161;
    color: #1e1e1e;
    border: none;
    border-radius: 4px;
    padding: 0.5em 1em;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #ff7a1b;
    }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const Toast = styled.div`
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: #4caf50;
    color: white;
    padding: 1rem;
    border-radius: 4px;
    animation:
        ${fadeIn} 0.3s,
        ${fadeOut} 0.3s 2.7s;
    z-index: 1000;
`;

const MarkdownEditor = () => {
    const [markdown, setMarkdown] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleChange = (e) => {
        setMarkdown(e.target.value);
    };

    const handleCopy = () => {
        navigator.clipboard
            .writeText(markdown)
            .then(() => {
                setShowToast(true);
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    };

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    return (
        <>
            <GlobalStyle />
            <EditorContainer>
                <TextArea value={markdown} onChange={handleChange} placeholder="Enter your Markdown here..." />
                <PreviewContainer>
                    <CopyButton onClick={handleCopy}>Copy Markdown</CopyButton>
                    <PreviewArea>
                        <ReactMarkdown>{markdown}</ReactMarkdown>
                    </PreviewArea>
                </PreviewContainer>
            </EditorContainer>
            {showToast && <Toast>Markdown copied to clipboard!</Toast>}
        </>
    );
};

export default MarkdownEditor;
