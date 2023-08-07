import React from "react";
import FreeCourse from "./LearningPath/FreeCourse";
import { CoursesContainer } from "./CoursesElements";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";

const Courses = () => {
    return (
        <Wrapper>
            <CoursesContainer>
                <FreeCourse />
            </CoursesContainer>
        </Wrapper>
    );
};

export default Courses;
