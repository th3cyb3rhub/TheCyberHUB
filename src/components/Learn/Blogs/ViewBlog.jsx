import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Section } from "../../Resources/WriteUps/WriteUpsElements";
import image from "./img.webp";

import blogs from "./BlogsData";
import { encodeURL } from "./util";
import { Tag, Tags } from "./BlogCard";

const ViewBlogComponent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px 300px;
    padding-top: 0;
    align-items: center;
    justify-content: space-between;
    font-family: "Montserrat", sans-serif;

    * {
        margin: 10px 0;
    }

    p {
        text-align: left;
        padding: 0 50px;
        white-space: pre-line;
        font-size: 20px;
    }

    img {
        margin-top: 0;
    }
`;

const ViewBlog = () => {
    const { title } = useParams();
    let searchedBlog = blogs.find((blog) => encodeURL(blog.title).toLowerCase() === title.toLowerCase());
    return (
        <Section>
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
        </Section>
    );
};

export default ViewBlog;
