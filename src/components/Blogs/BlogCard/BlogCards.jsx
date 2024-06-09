import React from "react";
import { AllBlogs } from "src/components/Blogs/BlogsElements";
import BlogCard from "./BlogCard";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";
import NotFound from "src/NotFound";

const BlogCards = ({ blogs, searchTerm, isBlogLoading, blogsBookmarksData, displayAt, selectedTags, bookmarks }) => {
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

        const allFilterTagsIncluded =
            !selectedTags || selectedTags.length === 0
                ? true
                : selectedTags.every((selectedTag) =>
                      blog?.tags?.some((blogTag) => blogTag.toLowerCase() === selectedTag.toLowerCase()),
                  );

        // Combine the conditions to determine if the blog should be included in the filtered blogs
        return allFilterTagsIncluded && (!searchTerm || isBookmarked || contentIncludesSearchTerm);
    });

    return filteredData.length > 0 ? (
        <AllBlogs $displayAt={displayAt}>
            {filteredData
                ?.slice()
                .reverse()
                .map((blog) => (
                    <BlogCard key={blog?._id} blog={blog} bookmarks={bookmarks} />
                ))}
        </AllBlogs>
    ) : null;
};

export default BlogCards;
