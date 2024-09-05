import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import AuthPopup from "src/pages/AuthPopup/AuthPopup.jsx";
import { cdnContentImagesUrl } from "src/features/apiUrl.js";

import "react-quill/dist/quill.bubble.css";

import { CommentContainer } from "src/components/Blogs/ViewBlog/ViewBlogElements.jsx";
import { addBlogComment, blogCommentReset, getBlogComments } from "src/features/blogs/blogComments/blogCommentSlice.js";
import { ButtonGreen } from "src/components/Other/MixComponents/Buttons/ButtonElements.jsx";
import {
    Comment,
    CommentDate,
    CommentSection,
    SectionCommentDetails,
    SectionUserPicture,
    Username,
    UserPicture,
    ViewCommentsContainer,
    AddCommentFormContainer,
    Input,
    StyledForm,
} from "src/components/Blogs/ViewBlog/BlogComments/BlogCommentsElements.jsx";

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
};

const BlogComments = ({ blogId }) => {
    const dispatch = useDispatch();
    const { blogComments } = useSelector((state) => state.blogComments);
    const [comment, setComment] = useState("");
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getBlogComments(blogId));

        return () => {
            dispatch(blogCommentReset());
        };
    }, [dispatch]);

    const onChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            setShowAuthPopup(true);
            return;
        }

        if (comment.trim() !== "") {
            if (comment.length > 500) {
                toast.warn("Comment is too long.");
                return;
            }
            const commentData = { comment };
            dispatch(addBlogComment({ blogId, commentData }));
            setComment("");
        } else {
            toast.warn("Please add a comment first.");
        }
    };

    const handleCloseAuthPopup = () => {
        setShowAuthPopup(false);
    };

    return (
        <CommentContainer id={"comments"}>
            {/* View Comments */}
            <ViewCommentsContainer>
                {blogComments &&
                    blogComments?.map((comment, id) => {
                        const commentCreatedAt = formatDate(comment?.createdAt);

                        return (
                            <CommentSection key={id}>
                                <SectionUserPicture>
                                    <UserPicture
                                        src={cdnContentImagesUrl("/user/" + comment?.avatar)}
                                        alt={`${comment?.username}, avatar`}
                                    />
                                </SectionUserPicture>
                                <SectionCommentDetails>
                                    <Username>{comment?.username}</Username>
                                    <CommentDate>{commentCreatedAt}</CommentDate>
                                    <Comment>{comment?.comment}</Comment>
                                </SectionCommentDetails>
                            </CommentSection>
                        );
                    })}
                {/* {props?.isBlogLoading && <CircleSpinner size={20} color={"#ff6b08"} />} */}
            </ViewCommentsContainer>

            {/* Comment on Blog */}
            <AddCommentFormContainer>
                {showAuthPopup && <AuthPopup onClose={() => handleCloseAuthPopup()} />}
                <StyledForm onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="comment"
                        id="comment"
                        value={comment}
                        onChange={onChange}
                        placeholder="Add your comment here..."
                    />
                    <ButtonGreen width={"100%"} type="submit">
                        Submit
                    </ButtonGreen>
                </StyledForm>
            </AddCommentFormContainer>
        </CommentContainer>
    );
};

export default BlogComments;
