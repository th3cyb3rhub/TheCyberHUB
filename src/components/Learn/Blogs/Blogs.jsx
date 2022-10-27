import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Section } from "../../Resources/WriteUps/WriteUpsElements";
import BlogCard from "./BlogCard";
import blogs from "./BlogsData";
import { encodeURL } from "./util";

const AllBlogsComponent = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  a {
    color: #cecac3;
  }
`;

const Blogs = () => {
  return (
    <Section>
      <h1> Blogs </h1>
      <AllBlogsComponent>
        {blogs.map((blog) => (
          <Link
            className={"styles"}
            to={{
              pathname: `${encodeURL(blog.title)}`,
            }}
          >
            <BlogCard
              title={blog.title}
              author={blog.author}
              date={blog.date}
              content={blog.content}
              tags={blog.tags}
              key={blog.id}
            />
          </Link>
        ))}
      </AllBlogsComponent>
    </Section>
  );
};

export default Blogs;
