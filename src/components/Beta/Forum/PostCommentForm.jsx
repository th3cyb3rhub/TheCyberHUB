import React from "react";
import { CommentForm, PostCommentFormContainer } from "./PostCommentFormElements";
import { CommentTextArea } from "./ForumSubPageElements";

const PostCommentForm = (props) => {
    return (
        <PostCommentFormContainer>
            <CommentForm onSubmit={props.onSubmit}>
                <CommentTextArea
                    name="comment"
                    id={"comment"}
                    value={props.comment}
                    onChange={props.onChange}
                    placeholder="Add your comment here..."
                />
            </CommentForm>
        </PostCommentFormContainer>
    );
};

export default PostCommentForm;
