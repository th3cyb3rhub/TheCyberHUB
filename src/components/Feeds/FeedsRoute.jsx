import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../index";
// import {Dashboard, EditBlog, GoalSetter, UserBlogs} from "../index";
// import Bookmarks from "../Dashboard/Bookmarks/Bookmarks";
// import CreateBlogV2 from "../Blogs/ManageBlogs/CreateBlogV2/CreateBlogV2";
import Feeds from "./Feeds";
import FeedPage from "./FeedPage/FeedPage";

const FeedsRoute = () => {
    return (
        <Routes>
            <Route index element={<Feeds />} />
            <Route path={":feedId"} element={<FeedPage />} />
            <Route path={"*"} element={<NotFound />} />
        </Routes>
    );
};

export default FeedsRoute;
