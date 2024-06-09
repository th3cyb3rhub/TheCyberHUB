import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";

const SyntaxHighlight = ({ code, language }) => {
    return (
        <SyntaxHighlighterPreview
            language={language}
            style={oneDark}
            customStyle={{
                backgroundColor: "rgb(32,32,32)",
                whiteSpace: "pre-wrap",
                overflowX: "auto",
                wordWrap: "break-word",
                wordBreak: "break-all",
            }}
        >
            {code}
        </SyntaxHighlighterPreview>
    );
};

const SyntaxHighlighterPreview = styled(SyntaxHighlighter)`
    * {
        background-color: #202020ff;
        white-space: pre-wrap;
        overflow-x: auto;
        word-wrap: break-word;
        word-break: break-all;
        max-width: 100%;
    }

    pre,
    code,
    code > span {
        background-color: #202020ff;
    }

    /* Apply background color to the whole component */
    background-color: #202020ff !important;

    /* Apply background color to pre, code, and spans */
    & > pre,
    & > code,
    & > code > span {
        background-color: #202020ff !important;
    }

    /* Apply white-space and overflow styles */
    white-space: pre-wrap !important;
    overflow-x: auto !important;
    word-wrap: break-word !important;
    word-break: break-all !important;
    max-width: 100%;
`;

export default SyntaxHighlight;
