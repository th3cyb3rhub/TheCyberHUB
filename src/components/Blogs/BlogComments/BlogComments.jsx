import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogsCommentsContainer } from "./ViewCommentsElements";
import AddCommentForm from "./AddCommentForm";
import ViewComments from "./ViewComments";
import { getBlogComments } from "../../../features/blogs/blogComments/blogCommentsSlice";
import { reset } from "../../../features/feeds/feedComments/feedCommentsSlice";
const BlogComments = ({ blog }) => {
    const dispatch = useDispatch();

    const { blogComments } = useSelector((state) => state.blogComments);

    useEffect(() => {
        dispatch(getBlogComments({ blogId: blog?._id }));

        return () => {
            dispatch(reset());
        };
    }, [blog?._id, dispatch]);

    return (
        <BlogsCommentsContainer>
            <ViewComments comments={blogComments} />
            <AddCommentForm blogId={blog?._id} />
        </BlogsCommentsContainer>
    );
};

export default BlogComments;
