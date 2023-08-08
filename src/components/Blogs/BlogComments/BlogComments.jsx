import React from "react";
import { BlogsCommentsContainer } from "./ViewCommentsElements";
import AddCommentForm from "./AddCommentForm";
const BlogComments = ({ blogId }) => {
    return (
        <BlogsCommentsContainer>
            <AddCommentForm blogId={blogId} />
        </BlogsCommentsContainer>
    );
};

export default BlogComments;
