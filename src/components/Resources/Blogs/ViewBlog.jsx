import React from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { Section } from "../WriteUps/WriteUpsElements";
import image from "./img.webp";
import "./Blog.css";

import blogs from "./BlogsData";
import {encodeURL} from "./util";

const ViewBlog = (props) => {
  const {title} = useParams();
  let searchedBlog = blogs.find(
    (blog) => encodeURL(blog.title).toLowerCase() === title.toLowerCase()
  );
  return (
    <Section>
      <div className="viewBlog">
        <img className="viewImg" src={image} alt="Blog Image" />
        <h1>{searchedBlog.title}</h1>
        <h3>
          {searchedBlog.author} | {searchedBlog.date}
        </h3>
        <p>{searchedBlog.content}</p>
      </div>
      <div className="tags">
        tags:
        {searchedBlog.tags.map((tag, index) => (
          <div className="tag" key={index}>
            {tag}
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ViewBlog;
