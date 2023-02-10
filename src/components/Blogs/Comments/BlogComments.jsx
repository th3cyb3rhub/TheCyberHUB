import React, { useState } from "react";
import { addComment, getAllBlogs } from "../../../features/blogs/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { AddCommentFormContainer, Form, Input } from "./AddCommentFormElements";
import { GlowingButton, RouterButtonGreen } from "../../Other/MixComponents/Buttons/ButtonElements";
import {
    BlogsCommentsContainer,
    Comment,
    CommentSection,
    SectionCommentDetails,
    SectionUserPicture,
    Username,
    UserPicture,
    ViewCommentsContainer,
} from "./ViewCommentsElements";

const BlogComments = ({ blog }) => {
    const [addCommentData, setAddCommentData] = useState({ comment: "" });
    const { comment } = addCommentData;
    const [error, setError] = useState("");
    const [comments, setComments] = useState(blog);
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const onChange = (e) => {
        setAddCommentData({
            ...addCommentData,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (comment !== "") {
            const newComment = { username: user.username, picture: user.picture, comment };
            const updatedComments = [...blog.comments, newComment];
            setComments({ ...blog, comments: updatedComments });
            const addCommentData = { comment };
            dispatch(addComment({ blogId: blog._id, addCommentData }));
            setAddCommentData({
                comment: "",
            });
            setError("");
            dispatch(getAllBlogs());
        } else {
            setError("Please add a comment first.");
        }
    };
    const API_URL = import.meta.env.VITE_CDN_URL;
    const dummyPicture =
        "https://user-images.githubusercontent.com/44284877/210164205-8dfa753b-f98a-4b25-a243-164c9790b625.png";

    return (
        <BlogsCommentsContainer>
            <ViewCommentsContainer>
                {comments.comments?.map((userComment, id) => (
                    <CommentSection key={id}>
                        <SectionUserPicture>
                            <UserPicture
                                src={
                                    userComment.picture === ""
                                        ? `${API_URL}/profile_pictures/${userComment?.picture}`
                                        : dummyPicture
                                }
                                alt={userComment?.picture}
                            />
                        </SectionUserPicture>
                        <SectionCommentDetails>
                            <Username>{userComment?.username}</Username>
                            {/* <CommentDate> Jan 26, 2023</CommentDate> */}
                            <Comment>{userComment?.comment}</Comment>
                        </SectionCommentDetails>
                    </CommentSection>
                ))}
                {/* {isLoading && <CircleSpinner size={20} color={"#1fc10d"}/>} */}
            </ViewCommentsContainer>
            <AddCommentFormContainer>
                {user ? (
                    <Form onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            name="comment"
                            id={"comment"}
                            value={comment}
                            onChange={onChange}
                            placeholder="Add your comment here..."
                        />
                        <GlowingButton width={"100%"} type="submit">
                            Submit
                        </GlowingButton>
                    </Form>
                ) : (
                    <RouterButtonGreen to={"/login"} width={"100%"}>
                        Login to Comment
                    </RouterButtonGreen>
                )}
                {error && <p style={{ marginTop: "10px" }}>{error}</p>}
            </AddCommentFormContainer>

            {/* <AddCommentForm blog_id={blog?._id} isLoading={isLoading} /> */}
        </BlogsCommentsContainer>
    );
};

export default BlogComments;
