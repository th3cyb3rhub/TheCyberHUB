import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard, EditBlog, GoalSetter, NotFound, UserBlogs } from "../index";
import CreateBlogV2 from "../Blogs/ManageBlogs/CreateBlogV2/CreateBlogV2";
import Sidebar from "./Sidebar/Sidebar";
import { DashboardRoutesContainer } from "./DashboardElements";
import Bookmarks from "./Bookmarks/Bookmarks";

const DashboardRoute = () => {
    return (
        <DashboardRoutesContainer>
            <Sidebar />

            <Routes>
                <Route index element={<Dashboard />} />
                <Route path={"goals"} element={<GoalSetter />} />
                <Route path={"bookmarks"} element={<Bookmarks />} />
                <Route path={"blogs"}>
                    <Route index element={<UserBlogs />} />
                    <Route exact path={"create"} element={<CreateBlogV2 />} />
                    <Route exact path={"edit/:blogTitle"} element={<EditBlog />} />
                    <Route path={"*"} element={<NotFound />} />
                </Route>
                <Route path={"*"} element={<NotFound />} />
            </Routes>
        </DashboardRoutesContainer>
    );
};

export default DashboardRoute;
