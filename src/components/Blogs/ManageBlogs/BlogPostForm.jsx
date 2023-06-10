import React from "react";
import { Form, Input, SectionCreateBlog, Submit, TagInput, TextArea } from "./CreateBlog/CreateBlogElements";
import { LoadingButton, LoadingRedirectButton } from "../../Other/MixComponents/Buttons/ButtonElements";
import { CircleSpinner } from "react-spinners-kit";

const BlogPostForm = (props) => {
    return (
        <SectionCreateBlog>
            <Form onSubmit={props.onSubmit}>
                <div>
                    <Input
                        type="title"
                        name="title"
                        id="title"
                        value={props.title}
                        onChange={(e) => {
                            if (e.target.value.length <= 100) {
                                props.onChange(e);
                            }
                        }}
                        placeholder="Title"
                        maxLength="100"
                    />
                    <TextArea
                        name="content"
                        id="content"
                        value={props.content}
                        onDrop={props.handleDrop}
                        onChange={props.onChange}
                        onDragOver={props.handleDragOver}
                        onPaste={props.handlePaste}
                        placeholder="Enter your content here in markdown"
                    />
                    <TagInput
                        type="text"
                        name="tags"
                        id="tags"
                        value={props.tags}
                        onChange={props.onChange}
                        placeholder="tag1, tag2, tag3"
                    />
                </div>
                <div>
                    <Submit type={"submit"}>Publish Blog</Submit>

                    {props.onSuccess ? (
                        <>
                            <LoadingRedirectButton to={"/blogs"} width={"100%"}>
                                Published Successfully
                            </LoadingRedirectButton>
                        </>
                    ) : (
                        props.isLoading && (
                            <LoadingButton width={"100%"}>
                                <CircleSpinner size={20} color={"#131313"} />
                            </LoadingButton>
                        )
                    )}
                </div>
            </Form>
        </SectionCreateBlog>
    );
};

export default BlogPostForm;
