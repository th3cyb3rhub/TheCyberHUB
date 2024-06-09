import React from "react";
import { AboutSection } from "src/components/Dashboard/Profile/ProfileElements";
import styled from "styled-components";

const AboutMe = ({ aboutMe, userDetailData, setUserDetailData }) => {
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
            <AboutTextArea
                value={userDetailData.aboutMe || aboutMe}
                onChange={onChange}
                placeholder="Write something about yourself..."
            />
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
    font-family: Arial, sans-serif;
    color: #a2a2a2;

    /* Additional styles for the textarea when in edit mode */
    background-color: #131313;
    outline: none;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);

    /* Placeholder text color */

    &::placeholder {
        color: #d0d0d0;
    }
`;

export default AboutMe;
