import React from "react";
import { Outlet } from "react-router";

import YoutubeCoursesSidebar from "./YoutubeCoursesSidebar";
import { Container, MainContent } from "./YouTubeVideosElements";

const FreeYoutubeCoursesLayout = () => {
    return (
        <Container>
            <MainContent>
                <Outlet />
            </MainContent>
            <YoutubeCoursesSidebar />
        </Container>
    );
};

export default FreeYoutubeCoursesLayout;
