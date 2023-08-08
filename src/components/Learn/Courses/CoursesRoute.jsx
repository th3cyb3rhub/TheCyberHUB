import React from "react";
import { Route, Routes } from "react-router-dom";
import Courses from "../../Courses/Courses";
import { NotFound } from "../../index";

const CoursesRoute = () => {
    return (
        <Routes>
            <Route index element={<Courses />} />
            <Route path={"*"} element={<NotFound />} />
        </Routes>
    );
};

export default CoursesRoute;
