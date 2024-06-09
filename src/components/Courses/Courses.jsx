import React from "react";
// import FreeCourse from "./LearningPath/FreeCourse";
import NewCourses from "./NewCourses/NewCourses";
import { CoursesContainer } from "./CoursesElements";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";

const Courses = () => {
    return (
        <Wrapper>
            <CoursesContainer>
                {/* <FreeCourse /> */}
                <NewCourses />
            </CoursesContainer>
        </Wrapper>
    );
};

export default Courses;
