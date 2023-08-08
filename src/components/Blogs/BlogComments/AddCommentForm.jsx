import React, { useState } from "react";
import { AddCommentFormContainer, Form, Input } from "./AddCommentFormElements";
import { addBlogComment } from "../../../features/blogs/blogComments/blogCommentSlice"; // Import the comment slice action
import { useDispatch } from "react-redux";
import { ButtonGreen } from "../../Other/MixComponents/Buttons/ButtonElements";

const AddCommentForm = (props) => {
    const [addCommentData, setAddCommentData] = useState({ comment: "" });
    const { comment } = addCommentData;
    const [error, setError] = useState("");
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
            const commentData = { comment };
            dispatch(addBlogComment({ blogId: props.blogId, commentData }));
            setAddCommentData({
                comment: "",
            });
            setError("");
        } else {
            setError("Please add a comment first.");
        }
    };

    return (
        <AddCommentFormContainer>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="comment"
                    id={"comment"}
                    value={comment}
                    onChange={onChange}
                    placeholder="Add your comment here..."
                />
                <ButtonGreen width={"100%"} type="submit">
                    Submit
                </ButtonGreen>
            </Form>
            {error && <p style={{ marginTop: "10px" }}>{error}</p>}
        </AddCommentFormContainer>
    );
};

export default AddCommentForm;
