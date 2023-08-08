import React from "react";
import { Route, Routes } from "react-router-dom";
import Forum from "./Forum";
import ForumSubPage from "./ForumSubPage";
import { NotFound } from "../index";

const ForumRoute = () => {
    return (
        <Routes>
            <Route index element={<Forum />} />
            <Route path={":title"} element={<ForumSubPage />} />
            <Route path={"*"} element={<NotFound />} />
        </Routes>
    );
};

export default ForumRoute;
