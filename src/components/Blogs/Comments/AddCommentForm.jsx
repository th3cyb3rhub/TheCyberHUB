import React, { useState } from "react";
import { AddCommentFormContainer, Form, Input } from "./AddCommentFormElements";
import { addComment, getAllBlogs } from "../../../features/blogs/blogSlice";
import { useDispatch } from "react-redux";
import { GlowingButton } from "../../Other/MixComponents/Buttons/ButtonElements";

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
            const addCommentData = { comment };
            dispatch(addComment({ blogId: props.blog_id, addCommentData }));
            setAddCommentData({
                comment: "",
            });
            setError("");
            dispatch(getAllBlogs());
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
                <GlowingButton width={"100%"} type="submit">
                    Submit
                </GlowingButton>
            </Form>
            {error && <p style={{ marginTop: "10px" }}>{error}</p>}
        </AddCommentFormContainer>
    );
};

export default AddCommentForm;
