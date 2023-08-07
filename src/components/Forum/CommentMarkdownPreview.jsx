import React from "react";
import { CommentContentMarkdownPreview, CommentMarkdownPreviewContainer } from "./ForumSubPageElements";
import remarkGfm from "remark-gfm";

const CommentMarkdownPreview = (props) => {
    return (
        <CommentMarkdownPreviewContainer>
            <CommentContentMarkdownPreview
                remarkPlugins={[remarkGfm]}
                components={{
                    h2: "h1",
                }}
            >
                {props.comment}
            </CommentContentMarkdownPreview>
        </CommentMarkdownPreviewContainer>
    );
};

export default CommentMarkdownPreview;
