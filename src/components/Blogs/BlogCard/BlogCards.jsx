import React from "react";
import { AllBlogs } from "../BlogsElements";
import BlogCard from "./BlogCard";
import LoadingSpinner from "../../Other/MixComponents/Spinner/LoadingSpinner";
import NotFound from "../../../NotFound";

const BlogCards = ({ blogs, searchTerm, isBlogLoading, blogsBookmarksData, displayAt }) => {
    if (isBlogLoading) return <LoadingSpinner />;
    if (!blogs.length) return <NotFound title="Blogs Not Found" description="There are no blog posts" />;

    const filteredData = blogs?.filter((blog) => {
        // Check if blog is bookmarked
        const isBookmarked = blogsBookmarksData
            ? blogsBookmarksData.some((bookmark) => bookmark.itemId === blog._id)
            : false;

        // Check if blog content or tags match the search term
        const contentIncludesSearchTerm =
            !searchTerm || blog?.content?.toLowerCase().includes(searchTerm?.toLowerCase());
        const tagsIncludeSearchTerm =
            !searchTerm || blog?.tags?.join(" ").toLowerCase().includes(searchTerm?.toLowerCase());

        // Combine the conditions to determine if the blog should be included in the filtered blogs
        return !searchTerm || isBookmarked || contentIncludesSearchTerm || tagsIncludeSearchTerm;
    });

    return filteredData.length > 0 ? (
        <AllBlogs displayAt={displayAt}>
            {filteredData
                ?.slice()
                .reverse()
                .map((blog) => (
                    <BlogCard key={blog?._id} blog={blog} />
                ))}
        </AllBlogs>
    ) : null;
};

export default BlogCards;
