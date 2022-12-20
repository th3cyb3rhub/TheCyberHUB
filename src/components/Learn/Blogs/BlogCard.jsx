import React from "react";
import styled from "styled-components";
import image from "./img.webp";

const BlogsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    text-align: left;
    height: 100%;
    max-width: 400px;
    border-radius: 10px;
    background-color: rgba(32, 194, 14, 0.04);
    margin: 20px 20px;
    padding: 15px 20px;
    border: 1px solid #2a2a2a;
    transition: 260ms all;

    &:hover {
        border-color: #545454;
        background-color: rgba(32, 194, 14, 0.1);
    }
`;

const BlogsContainerTitle = styled.div`
    margin: 10px 0;
    padding: 10px 0;

    h6 {
        font-size: 0.9rem;
        font-weight: 400;
    }

    .blogImage-wrapper {
        position: relative;
        margin: auto;
        overflow: hidden;

        img {
            max-width: 100%;
            transition: all 0.3s;
            display: block;
            width: 100%;
            height: auto;
            transform: scale(1);
            margin-bottom: 9px;

            &:hover {
                transform: scale(1.04);
            }
        }
    }
`;

export const Tags = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 10px 0;
`;

export const Tag = styled.div`
    margin: 0 5px;
    padding: 8px 10px;
    border-radius: 5px;
    background-color: transparent;
    border: 1px solid #545454;
    color: white;
    font-size: 0.9rem;
    font-weight: 600;
    transition: 260ms all;

    &:hover {
        background-color: rgba(32, 194, 14, 0.41);
        color: white;
    }
`;

const BlogCard = (props) => {
    return (
        <>
            <BlogsContainer>
                <BlogsContainerTitle>
                    <div className="blogImage-wrapper">
                        <img src={image} alt="Blog Image" width="100%" height="auto" />
                    </div>
                    <h2>{props.title}</h2>
                    <h6>
                        {props.date} • {props.author}
                    </h6>
                </BlogsContainerTitle>
                {/* <div> */}
                {/*    {props.content.slice(0, 200)} */}
                {/*    {props.content.length > 200 ? "..." : ""} */}
                {/* </div> */}
                <Tags>
                    {/* tags: */}
                    {props.tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                    ))}
                </Tags>
            </BlogsContainer>
        </>
    );
};

export default BlogCard;
