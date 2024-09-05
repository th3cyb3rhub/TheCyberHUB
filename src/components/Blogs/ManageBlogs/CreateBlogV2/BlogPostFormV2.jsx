import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import styled from "styled-components";

const BlogPostFormV2 = ({ content, setContent }) => {
    hljs.configure({
        languages: ["javascript", "ruby", "python", "rust"],
    });

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link", "image"],
            [{ "code-block": "code-block" }],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "list-style",
        "link",
        "image",
        "code-block",
    ];

    return <QuillContainer value={content} theme={"snow"} formats={formats} onChange={setContent} modules={modules} />;
};

const QuillContainer = styled(ReactQuill)`
    .ql-editor {
        min-height: 350px;
        height: 100%;
        width: 100%;
        color: #f5f5f5;
        padding: 20px;
        background: #0c0c0c;
        font-size: 17px;
    }

    .ql-toolbar {
        background: transparent;
        border: #1f1f1f 1px solid;
        font-family: Poppins, sans-serif;
        font-size: 17px;
        color: #f5f5f5;
    }

    .ql-toolbar.ql-snow {
        border: #1f1f1f 1px solid;
        font-family: Poppins, sans-serif;
        font-size: 17px;
    }

    /* hide the main border */
    .ql-container.ql-snow {
        border: #1f1f1f 1px solid;
        max-height: 500px;
        overflow-y: auto;
    }
`;
export default BlogPostFormV2;
