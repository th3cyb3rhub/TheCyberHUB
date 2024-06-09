import React, { useState } from "react";
import { SubmissionBoxContainer, SubmitButton, Input, InputSection } from "./SubmissionBoxElements";
import { PiUploadDuotone } from "react-icons/pi";

const SubmissionBox = ({ submitType, onSubmit, setUserInput }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setUserInput(event.target.value);
    };

    const handleSubmit = () => {
        onSubmit();
        setInputValue("");
    };

    return (
        <SubmissionBoxContainer>
            <InputSection>
                <Input placeholder={`Enter your ${submitType} here`} value={inputValue} onChange={handleInputChange} />
                <SubmitButton onClick={handleSubmit}>
                    <PiUploadDuotone size={20} />
                </SubmitButton>
            </InputSection>
        </SubmissionBoxContainer>
    );
};

export default SubmissionBox;
