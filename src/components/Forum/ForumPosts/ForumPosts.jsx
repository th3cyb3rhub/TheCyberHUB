import React from "react";
import { Cards } from "./ForumPostsElements";
import Card from "./Card";

const ForumPosts = ({ forums, searchTerm, forumBookmarksData, displayAt }) => {
    const filteredData = forums.filter((post) => {
        // Check if post is bookmarked
        const isBookmarked = forumBookmarksData
            ? forumBookmarksData.some((bookmark) => bookmark.itemId === post._id)
            : false;

        // Check if post content or tags match the search term
        const contentIncludesSearchTerm =
            !searchTerm || post?.content?.toLowerCase().includes(searchTerm?.toLowerCase()) || false;
        const tagsIncludeSearchTerm =
            !searchTerm || post?.tags?.join(" ").toLowerCase().includes(searchTerm?.toLowerCase()) || false;

        // Combine the conditions to determine if the post should be included in the filtered posts
        return !searchTerm || isBookmarked || contentIncludesSearchTerm || tagsIncludeSearchTerm;
    });
    return filteredData.length > 0 ? (
        <Cards displayAt={displayAt}>
            {filteredData.map((item, id) => (
                <Card
                    key={id}
                    title={item?.title}
                    description={item?.content}
                    username={item?.username}
                    categories={item?.tags}
                    views={item?.views}
                    answers={item?.answers}
                    answerAccepted={item?.answerAccepted}
                    votes={item?.votes}
                />
            ))}
        </Cards>
    ) : null;
};

export default ForumPosts;
