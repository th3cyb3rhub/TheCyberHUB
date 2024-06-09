import React from "react";
import { Route, Routes } from "react-router-dom";
import { Blogs, CreateBlog, EditBlog, NotFound, SingleBlog, UserBlogs } from "src/components/index";
import CreateBlogV2 from "src/components/Blogs/ManageBlogs/CreateBlogV2/CreateBlogV2.jsx";

const BlogsRoute = () => {
    return (
        <Routes>
            <Route index element={<Blogs />} />
            <Route exact path={":title"} element={<SingleBlog />} />
            <Route exact path={"create-blog"} element={<CreateBlog />} />

            <Route exact path={"my-blogs"} element={<UserBlogs />} />

            <Route exact path={"create"} element={<CreateBlogV2 />} />
            <Route exact path={"my-blogs/edit/:blogTitle"} element={<EditBlog />} />

            {/* <Route element={<NotFound/>}/> */}
            <Route path={"*"} element={<NotFound />} />
        </Routes>
    );
};

export default BlogsRoute;
