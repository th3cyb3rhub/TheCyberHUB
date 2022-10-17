import React from "react";
import "./Blog.css";
import image from "./img.webp";

const BlogsElements = (props) => {
  return (
    <>
      <div className="blogs__container">
        <div className="blogs__container__title">
          <div className="blogs__container__blogImage">
            <img className="blogImg" src={image} alt="Blog Image" width="100%" height="auto" />
          </div>
          <h2>{props.title}</h2>
          <h6>
            {props.date} • {props.author}
          </h6>
        </div>
//         <div className="blogs__container__content">{props.content.slice(0, 200)}{props.content.length>200?"...":""}</div>
        <div className="tags">
          {/*tags:*/}
          {props.tags.map((tag, index) => (
            <div className="tag" key={index}>{tag}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogsElements;
