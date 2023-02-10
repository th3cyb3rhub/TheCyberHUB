import React from "react";
import TrendingBlogCard from "./TrendingBlogCard";
import { ComponentTrendingBlogs } from "./TrendingBlogsElements";
import forumData from "../../Beta/Forum/ForumData";

const TrendingBlogs = () => {
    return (
        <ComponentTrendingBlogs>
            <h1> Trending Blogs </h1>
            {"// Dummy Data //"}
            {forumData.map((item, id) => (
                <TrendingBlogCard
                    key={id}
                    title={item.title}
                    description={item.description}
                    username={item.username}
                    date={item.date}
                    categories={item.categories}
                    views={item.views}
                    answers={item.answers}
                    votes={item.votes}
                />
            ))}
        </ComponentTrendingBlogs>
    );
};

export default TrendingBlogs;
