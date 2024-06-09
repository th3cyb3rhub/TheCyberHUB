import React, { useEffect, useState } from "react";
import { InputEditorContainer, InputEditorTextarea, InputEditorTheInput } from "./InputEditorElements";

const InputEditor = ({ content, label, onCopyChanges, placeholder, inputType, isTextarea = false, textAreaHeight }) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(content);
    }, [content, label]);

    const handleChange = (e) => {
        setValue(e.target.value);
        onCopyChanges(label, e.target.value);
    };

    return (
        <InputEditorContainer>
            {isTextarea ? (
                <InputEditorTextarea
                    type={inputType}
                    textAreaHeight={textAreaHeight}
                    onChange={handleChange}
                    value={value}
                    placeholder={placeholder}
                />
            ) : (
                <InputEditorTheInput type={inputType} onChange={handleChange} value={value} placeholder={placeholder} />
            )}
        </InputEditorContainer>
    );
};
export default InputEditor;
