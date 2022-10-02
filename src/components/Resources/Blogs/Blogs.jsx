import React from "react";
import { Section } from "../WriteUps/WriteUpsElements";
import BlogsElements from "./BlogsElements";
import "./Blog.css";

// probably recieved by a api call
const blogs = {
  title: "Lorem, ipsum",
  author: "Dean A.",
  date: "1st October 2022",
  content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex molestias nam, iure hic, sunt totam, eaque corporis inventore mollitia nemo saepe eligendi cumque numquam dolor placeat architecto pariatur fugiat accusantium!\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, cum perspiciatis pariatur facere soluta consectetur rerum aut ex quas deserunt inventore, dignissimos dicta blanditiis? Adipisci incidunt odio eaque nobis earum sit! Sequi, ducimus debitis. Commodi officiis vel quae sequi aspernatur iusto reprehenderit repellendus autem architecto!",
  tags: ["coding", "gaming"]
}

const Blogs = () => {
  return (
    <Section>
      <h1> All Blogs </h1>
      <div className="AllBlogs">
        <BlogsElements title={blogs.title} author={blogs.author} date={blogs.date} content={blogs.content} tags={blogs.tags}/>
        <BlogsElements title={blogs.title} author={blogs.author} date={blogs.date} content={blogs.content} tags={blogs.tags}/>
        <BlogsElements title={blogs.title} author={blogs.author} date={blogs.date} content={blogs.content} tags={blogs.tags}/>
        <BlogsElements title={blogs.title} author={blogs.author} date={blogs.date} content={blogs.content} tags={blogs.tags}/>
      </div>
    </Section>
  );
};

export default Blogs;
