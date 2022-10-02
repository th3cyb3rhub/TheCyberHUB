import React from "react";
import { Section } from "../WriteUps/WriteUpsElements";
import BlogsElements from "./BlogsElements";
import "./Blog.css";

// probably received by a api call

const blogs = {
  title: "What is Docker?",
  author: "@author",
  date: "1st October 2022",
  content: "A platform for building, running, and shipping applications in a consistent manner.\n" +
      "If your application works on the development machine, in the same way it will work on other machines.\n" +
      "It works on my machine! most of the time our applications do not work on the other machines. Reasons:\n" +
      "    One or more files missing " +
      "    Software version mismatch " +
      "        node14.1 - on your machine " +
      "        node9 - on another machine " +
      "    Different configuration settings " +
      "Here docker comes to rescue you. " +
      "if your application works on your machine, definitely it will run on another machine. ",
  tags: ["coding", "gaming"]
}

const Blogs = () => {
  return (
    <Section>
      <h1> All Blogs </h1>
      <div className="AllBlogs">
        <BlogsElements title={blogs.title} author={blogs.author} date={blogs.date} content={blogs.content}/>
        <BlogsElements title={blogs.title} author={blogs.author} date={blogs.date} content={blogs.content}/>
        <BlogsElements title={blogs.title} author={blogs.author} date={blogs.date} content={blogs.content}/>
        <BlogsElements title={blogs.title} author={blogs.author} date={blogs.date} content={blogs.content}/>
        <BlogsElements title={blogs.title} author={blogs.author} date={blogs.date} content={blogs.content}/>
        <BlogsElements title={blogs.title} author={blogs.author} date={blogs.date} content={blogs.content}/>
      </div>
    </Section>
  );
};

export default Blogs;
