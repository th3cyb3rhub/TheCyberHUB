import React from "react";
import "./OpenSourceProjects.css";

// const image = require('./img.jpg');

const OspElements = (props) => {
  return (
    <>
      <div className="Osp__container">
        <div className="Osp__container__title">
          <h2>{props.title}</h2>
        </div>
        <div className="Osp__container__content">
          {props.content.slice(0, 200)}
          {props.content.length > 200 ? "..." : ""}
        </div>
        <div className="tags">
          {props.tags.map((tag, index) => (
            <div className="tag" key={index}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OspElements;
