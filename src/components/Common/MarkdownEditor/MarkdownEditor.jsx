import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import { MarkdownContainer, MarkdownEditorContainer } from "./MarkdownEditorElements";
import rehypeSanitize from "rehype-sanitize";
import "./MarkdownEditor.css";
import useImageUploadEvents from "./useImageUploadEvents";

const MarkdownEditor = ({ content, label, previewModeOnly, onCopyChanges, pageName }) => {
    const [value, setValue] = useState("");

    const handleChange = (value) => {
        setValue(value);
        onCopyChanges(label, value);
    };

    const { onPasteImage, onDragOverImage, onDropImage } = useImageUploadEvents(value, handleChange, pageName);

    useEffect(() => {
        setValue(content);
    }, [content, label]);

    if (previewModeOnly) {
        return (
            <MDEditor.Markdown
                source={value}
                style={{
                    color: "#f5f5f5",
                    fontSize: "18px",
                    backgroundColor: "#090909",
                    padding: "5px 10px",
                }}
                components={{
                    img: (props) => {
                        return <img {...props} className="image" alt={""} />;
                    },
                }}
            />
        );
    }

    return (
        <MarkdownContainer>
            <MarkdownEditorContainer>
                <MDEditor
                    value={value}
                    onChange={handleChange}
                    preview={"live"}
                    visibleDragbar={false}
                    onDrop={onDropImage}
                    onDragOver={onDragOverImage}
                    onPaste={onPasteImage}
                    className={"md-editor"}
                    style={{
                        backgroundColor: "#090909",
                        color: "#f5f5f5",
                        fontSize: "14px",
                    }}
                    textareaProps={{
                        placeholder: "Write note content here...",
                        style: { backgroundColor: "#090909" },
                    }}
                    previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                        style: { color: "#f5f5f5", fontSize: "18px", backgroundColor: "#090909" },
                    }}
                />
            </MarkdownEditorContainer>
        </MarkdownContainer>
    );
};

export default MarkdownEditor;
