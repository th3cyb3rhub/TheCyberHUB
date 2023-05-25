import React from "react";
import { ButtonSection, Form, PostFormButton, PostFormTextarea } from "./AddPostElements";
import { AddImage } from "../Blogs/ManageBlogs/CreateBlog/CreateBlogElements";

const AddPostForm = () => {
    return (
        <Form>
            <PostFormTextarea className="auto-grow" placeholder="What's on your mind?"></PostFormTextarea>
            <AddImage />
            <ButtonSection>
                <PostFormButton type="submit">Post</PostFormButton>
            </ButtonSection>
        </Form>
    );
};

export default AddPostForm;
