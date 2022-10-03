import React from "react";
import { Route, Routes } from "react-router-dom";
import AllBlogs from "./AllBlogs";
import ViewBlog from "./ViewBlog";
import "./Blog.css";

const Blogs = () => {
  return (
    <>
    <Routes>
      <Route exact path={""} element={<AllBlogs />} />
      <Route exact path={"viewBlog"} element={<ViewBlog />} />
    </Routes>
    </>

  );
};

export default Blogs;
