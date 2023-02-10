import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { encodeURL } from "../../util";
import { useDispatch, useSelector } from "react-redux";
import PreviewBlogContent from "../../PreviewBlogContent";
import { getAllBlogs, reset, updateBlog } from "../../../../features/blogs/blogSlice";
import {
    AddCoverImageSection,
    AddImage,
    CreateBlogContainer,
    Form,
    ImageUploadAndPreviewSection,
    ImageUploadLabel,
    Input,
    SectionCreateBlog,
    Submit,
    TagInput,
    TextArea,
} from "../CreateBlog/CreateBlogElements";
import { Wrapper } from "../../../Dashboard/Profile/ProfileElements";
import { Button, PreviewIcon, PreviewSection } from "../../../Beta/Forum/ForumSubPageElements";
import { toast } from "react-toastify";
import getApiUrl from "../../../../features/apiUrl";
import axios from "axios";

const EditBlog = () => {
    const dispatch = useDispatch();
    const { blogs, isError, message } = useSelector((state) => state.blogs);
    const [preview, setPreview] = useState(false); // added state variable for preview
    const navigate = useNavigate();
    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        tags: [],
    });

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        dispatch(getAllBlogs());
        return () => dispatch(reset());
    }, [dispatch, isError, message]);

    const { title } = useParams();
    const blog = blogs.find((blog) => encodeURL(blog.title).toLowerCase() === title.toLowerCase()) || {
        tags: [],
    };

    const onPreview = () => setPreview(true);
    const closePreview = () => setPreview(false);

    const onChange = (e) => {
        let value = e.target.value;
        if (e.target.name === "tags") {
            value = value.split(",").map((tag) => tag.trim());
        }
        setBlogData((prevState) => ({
            ...prevState,
            [e.target.name]: value,
        }));
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Invalid file type. Only images are allowed.");
            return;
        }
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

        if (!allowedTypes.includes(file.type)) {
            toast.error("Invalid file type. Only png and jpg are allowed.");
            return;
        }
        const maxFileSize = 1000000; // 1000KB
        if (file.size > maxFileSize) {
            toast.error(`File size should be less than ${maxFileSize / 1000}KB.`);
            return;
        }
        try {
            const currentDateTimeNumber = new Date().getTime();
            const fileName = `${currentDateTimeNumber}.${file && file.type.split("/")[1]}`;
            const formData = new FormData();
            formData.append("file", file);
            formData.append("key", `blog_images/${fileName}`);
            const API_URL = getApiUrl("api/upload");
            await axios.post(API_URL, formData);
            const newImageUrl = `https://thecyberhub.nyc3.cdn.digitaloceanspaces.com/blog_images/${fileName}`;
            setBlogData((prevState) => ({
                ...prevState,
                content: prevState.content + `\n![PLEASE_ADD_A_NAME_FOR_THIS_IMAGE_HERE](${newImageUrl})`,
            }));
        } catch (err) {
            console.error(err.message);
        }
    };
    const handlePaste = async (e) => {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        let file = null;

        // Check if the paste event contains an image
        for (const item of items) {
            if (item.type.startsWith("image")) {
                file = item.getAsFile();
                break;
            }
        }
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Invalid file type. Only images are allowed.");
            return;
        }

        if (file.type !== ("image/png" || "image/jpeg" || "image/jpg")) {
            toast.error("Invalid file type. Only png and jpg are allowed.");
            return;
        }
        const maxFileSize = 1000000; // 1000KB
        if (file.size > maxFileSize) {
            toast.error(`File size should be less than ${maxFileSize / 1000}KB.`);
            return;
        }
        try {
            const currentDateTimeNumber = new Date().getTime();
            const fileName = `${currentDateTimeNumber}.${file && file.type.split("/")[1]}`;
            const formData = new FormData();
            formData.append("file", file);
            formData.append("key", `blog_images/${fileName}`);
            const API_URL = getApiUrl("api/upload");
            await axios.post(API_URL, formData);
            const newImageUrl = `https://thecyberhub.nyc3.cdn.digitaloceanspaces.com/blog_images/${fileName}`;
            setBlogData((prevState) => ({
                ...prevState,
                content: prevState.content + `\n![PLEASE_ADD_A_NAME_FOR_THIS_IMAGE_HERE](${newImageUrl})`,
            }));
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const tagData = blogData.tags.length === 0 ? blog.tags : blogData.tags;

        const updatedBlogData = {
            title: blogData.title || blog.title,
            content: blogData.content || blog.content,
            tags: tagData,
        };

        dispatch(updateBlog({ id: blog._id, blogData: updatedBlogData }));
        navigate("../");
    };

    return (
        <Wrapper>
            <CreateBlogContainer>
                <ImageUploadAndPreviewSection>
                    <AddCoverImageSection>
                        <ImageUploadLabel style={{ color: "grey" }} htmlFor="addCoverImage">
                            <AddImage /> Updating Cover Image is not Implemented yet
                            {/* {!fileName ? <> Add Cover Image </> : */}
                            {/*    !preview && (!fileName && <ImageSelected> Please select an image </ImageSelected> */}
                            {/*    )} */}
                            {/* <ImageSelected> {file && <p>{fileName} selected</p>} </ImageSelected> */}
                        </ImageUploadLabel>
                        {/* <ImageUploadInput */}
                        {/*    type="file" name="addCoverImage" id="addCoverImage" */}
                        {/*    // onChange={onFileChange} */}
                        {/*    style={{display: "none"}} */}
                        {/* /> */}
                    </AddCoverImageSection>

                    <PreviewSection>
                        {!preview ? (
                            <Button onClick={onPreview}>
                                <PreviewIcon /> Show Preview
                            </Button>
                        ) : (
                            <Button onClick={closePreview}>
                                <PreviewIcon /> Close Preview
                            </Button>
                        )}
                    </PreviewSection>
                </ImageUploadAndPreviewSection>
                {preview ? (
                    <PreviewBlogContent
                        preview={preview}
                        closePreview={closePreview}
                        title={blogData.title || blog.title}
                        content={blogData.content || blog.content}
                        tags={blogData.tags.length !== 0 ? blogData.tags : blog.tags}
                    />
                ) : (
                    <SectionCreateBlog>
                        <Form onSubmit={onSubmit}>
                            <div>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={blogData.title || blog.title}
                                    onChange={onChange}
                                />
                                <TextArea
                                    name="content"
                                    id="content"
                                    value={blogData.content || blog.content}
                                    onChange={onChange}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onPaste={handlePaste}
                                />
                                <TagInput
                                    type="text"
                                    name="tags"
                                    id="tags"
                                    value={blogData.tags.join(", ") || blog.tags.join(", ")}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <Submit type="submit" className="btn btn-primary">
                                    Update Blog
                                </Submit>
                                <Submit type="button" className="btn btn-secondary" onClick={() => navigate("../")}>
                                    Cancel
                                </Submit>
                            </div>
                        </Form>
                    </SectionCreateBlog>
                )}
            </CreateBlogContainer>
        </Wrapper>
    );
};

export default EditBlog;
