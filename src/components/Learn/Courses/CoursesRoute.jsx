import React from "react";
import { Route, Routes } from "react-router-dom";
import Courses from "src/components/Courses/Courses";
import { NotFound } from "src/components/index";

const CoursesRoute = () => {
    return (
        <Routes>
            <Route index element={<Courses />} />
            <Route path={"*"} element={<NotFound />} />
        </Routes>
    );
};

export default CoursesRoute;
