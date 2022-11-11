import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import image from "./img.webp";

import blogs from "./BlogsData";
import { encodeURL } from "./util";
import { Tag, Tags } from "./BlogCard";

const ViewBlogComponent = styled.div`
    width: 80%;
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    max-width: 800px;
    padding-top: 0;
    align-items: center;
    justify-content: space-between;
    font-family: "Montserrat", sans-serif;
    color: #cecac3;

    * {
        margin: 10px auto;
    }
    p {
        font-family: "Roboto Mono", monospace;
        text-align: left;
        padding: 0 50px;
        white-space: pre-line;
        font-size: 20px;
    }

    img {
        margin-top: 0;
        width: 100%;
        object-fit: contain;
        border-radius: 5px;
    }
`;

const ViewBlog = () => {
    const { title } = useParams();
    const searchedBlog = blogs.find((blog) => encodeURL(blog.title).toLowerCase() === title.toLowerCase());
    return (
        <>
            <ViewBlogComponent>
                <img className="viewImg" src={image} alt="Blog Image" />
                <h1>{searchedBlog.title}</h1>
                <h3>
                    {searchedBlog.author} | {searchedBlog.date}
                </h3>
                <p>{searchedBlog.content}</p>
            </ViewBlogComponent>
            <Tags>
                {searchedBlog.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
            </Tags>
        </>
    );
};

export default ViewBlog;
