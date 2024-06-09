import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ButtonGreen } from "src/components/Other/MixComponents/Buttons/ButtonElements";
import { AddCommentFormContainer, StyledForm, Input } from "src/components/Blogs/BlogComments/AddCommentFormElements";
import { addBlogComment } from "src/features/blogs/blogComments/blogCommentSlice"; // Import the comment slice action
import AuthPopup from "src/pages/AuthPopup/AuthPopup";

const AddCommentForm = (props) => {
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const { user } = useSelector((state) => state.auth);

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
            dispatch(addBlogComment({ blogId: props.blogId, commentData }));
            setComment("");
        } else {
            toast.warn("Please add a comment first.");
        }
    };

    const handleCloseAuthPopup = () => {
        setShowAuthPopup(false);
    };

    return (
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
    );
};

export default AddCommentForm;
