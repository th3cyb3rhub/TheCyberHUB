import React from "react";
import {Route, Routes, Link} from "react-router-dom";
import {Section} from "../WriteUps/WriteUpsElements";
import BlogsElements from "./BlogsElements";
import "./Blog.css";
import blogs from "./BlogsData";
// probably received by an api call

const Blogs = () => {
    return (
        <Section>
            <h1> Blogs </h1>
            <div className="AllBlogs">
                {blogs.map((blog) => (
                    <Link className={"styles"}
                        to={{
                            pathname: `viewBlog?id=${blog.id}`,
                        }}
                    >
                        <BlogsElements
                            title={blog.title}
                            author={blog.author}
                            date={blog.date}
                            content={blog.content}
                            tags={blog.tags}
                            key={blog.id}
                        />
                    </Link>
                ))}
            </div>
        </Section>
    );
};

export default Blogs;
