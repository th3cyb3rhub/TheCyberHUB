import React from "react";
import { AboutSection } from "./ProfileElements";
import styled from "styled-components";

const AboutMe = ({ aboutMe, userDetailData, setUserDetailData, isEdit }) => {
    const onChange = (e) => {
        const value = e.target.value;
        setUserDetailData((prevState) => ({
            ...prevState,
            aboutMe: value,
        }));
    };

    return (
        <AboutSection>
            <h3>About Me</h3>
            {isEdit ? (
                <AboutTextArea
                    isEdit={isEdit} // Pass down the isEdit prop to AboutTextArea
                    value={userDetailData.aboutMe || aboutMe}
                    onChange={onChange}
                    placeholder="Write something about yourself..."
                />
            ) : (
                <p className="about-me">{aboutMe}</p>
            )}
        </AboutSection>
    );
};

export const AboutTextArea = styled.textarea`
    width: 100%;
    height: 150px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    resize: none;
    font-size: 18px;
    font-family: "Arial", sans-serif;
    color: #a2a2a2;

    /* Additional styles for the textarea when in edit mode */
    background-color: ${({ isEdit }) => (isEdit ? "#131313" : "transparent")};
    outline: none;
    box-shadow: ${({ isEdit }) => (isEdit ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none")};

    /* Placeholder text color */

    &::placeholder {
        color: #d0d0d0;
    }
`;

export default AboutMe;
