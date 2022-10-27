import React, { useState } from "react";
import { useParams } from "react-router";
import { AiFillCaretRight as CaretRightIcon } from "react-icons/ai";

import {
    SideBar,
    ListContent,
    Link,
    SideBarHeading,
    CaretDownIcon,
    Content,
    HeadingContainer,
    IconContainer,
} from "./YouTubeVideosElements";

const COURSES = [
    {
        title: "Linux",
        key: "linux",
    },
    {
        title: "Cyber Security",
        key: "cyber_security",
    },
    {
        title: "Bug Bounty Hunting",
        key: "bug_hunting",
    },
    {
        title: "Red Team",
        key: "red_team",
    },
    {
        title: "Blue Team",
        key: "blue_team",
    },
];

const YoutubeCoursesSidebar = () => {
    const params = useParams();
    const [showCourses, setShowCourses] = useState(true);

    return (
        <SideBar>
            <HeadingContainer onClick={() => setShowCourses((prev) => !prev)}>
                <IconContainer>{!showCourses ? <CaretRightIcon /> : <CaretDownIcon />}</IconContainer>
                <SideBarHeading>All Courses</SideBarHeading>
            </HeadingContainer>
            <Content visible={showCourses}>
                {COURSES.map((course) => (
                    <ListContent visible={showCourses} key={course.key} isActive={params.id === course.key}>
                        <Link to={course.key} isActive={params.id === course.key}>
                            {course.title}
                        </Link>
                    </ListContent>
                ))}
            </Content>
        </SideBar>
    );
};

export default YoutubeCoursesSidebar;
