import React from "react";
import "./Blog.css";
import image from "./img.jpg";
// const image = require('./img.jpg');

const BlogsElements = (props) => {
  return (
    <>
      <div className="blogs__container">
        <div className="blogs__container__title">
          <img className="blogImg" src={image} alt="Blog Image" width="360px" height="180px" />
          <h2>{props.title}</h2>
          <h6>
            {props.author} | {props.date}
          </h6>
        </div>
        <div className="blogs__container__content">{props.content.slice(0, 200)}{props.content.length>200?"...":""}</div>
        <div className="tags">
          tags:
          {props.tags.map((tag) => (
            <div className="tag">{tag}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogsElements;
