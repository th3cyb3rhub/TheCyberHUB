import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBlog } from "src/features/blogs/blogSlice";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { reset } from "src/features/goals/goalSlice";
import {
    AddCoverImageSection,
    AddImage,
    CreateBlogContainer,
    ImageSelected,
    ImageUploadAndPreviewSection,
    ImageUploadLabel,
    TextGrey,
} from "./CreateBlogElements";
import axios from "axios";
import PreviewBlogContent from "src/components/Blogs/PreviewBlogContent";
import { Button, PreviewIcon } from "src/components/Forum/ForumSubPageElements";
import { getApiUrl } from "src/features/apiUrl";
import { toast } from "react-toastify";
import BlogPostForm from "src/components/Blogs/ManageBlogs/BlogPostForm";

const CreateBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { blogs } = useSelector((state) => state.blogs);
    const { isBlogLoading, isBlogError, blogMessage } = useSelector((state) => state.blogs);
    const [isSuccess, setInSuccess] = useState(false);
    const [preview, setPreview] = useState(false); // added state variable for preview
    const [errorMessage, setErrorMessage] = useState("");
    const onPreview = () => setPreview(true);
    const closePreview = () => setPreview(false);

    const [blogData, setBlogData] = useState({
        title: "",
        summary: "",
        content: "",
        coverImage: "",
        tags: [],
    });

    const { title, content, tags } = blogData;
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

    const maxFileSize = 500000; // 500KB
    useEffect(() => {
        if (isBlogError) {
            console.log(blogMessage);
        }
        if (!user) navigate("/login");
        return () => dispatch(reset());
    }, [user, isBlogError, blogMessage, isSuccess, navigate, dispatch]);

    const onChange = (e) => {
        const value = e.target.value;
        setBlogData((prevState) => ({
            ...prevState,
            [e.target.name]: value,
        }));
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];
        const currentDateTimeNumber = new Date().getTime();
        const fileName = `${currentDateTimeNumber}.${file && file.type.split("/")[1]}`;
        setFileName(fileName);
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Invalid file type. Only images are allowed.");
            return;
        }
        if (file.size > maxFileSize) {
            toast.error(`File size should be less than ${maxFileSize / 1000}KB.`);
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setFile();
            const newFile = new File([reader.result], fileName, { type: file && file.type });
            setFile(newFile);
        };
        reader.readAsArrayBuffer(file);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const ImageName = file.name.split(".")[0];
        const ImageExt = file.name.split(".")[1];
        const ImageNameWithExt = `${ImageName}cover.${ImageExt}`;

        if (title !== " ") {
            const blog = blogs.find((blog) => blog.username === user?.username && blog.title === title);
            if (blog !== undefined && title === blog.title) {
                toast.error("You already have a blog with this title please change the title and try again");
                return;
            }
        }

        let multipleTags = tags.split(",");
        multipleTags = multipleTags.map((tag) => tag.trim());
        if (title !== "" && content !== "" && file && tags.length !== 0) {
            const blogData = { title: title.trim(), content, coverImage: ImageNameWithExt, tags: multipleTags };
            dispatch(createBlog(blogData));
            setInSuccess(true);

            const formData = new FormData();
            formData.append("image", file);
            formData.append("folderName", "blog");
            formData.append("fileName", `${ImageNameWithExt}`);

            try {
                const API_URL = getApiUrl("api/upload");
                await axios.post(API_URL, formData);
            } catch (err) {
                if (err.message === "Request failed with status code 429") {
                    setErrorMessage("You are uploading images too fast. Please wait a few seconds and try again.");
                    errorMessage && toast.error(errorMessage);
                    if (errorMessage === "") {
                        toast("You are uploading images too fast. Please wait a few seconds and try again.");
                    }
                }
            }

            setBlogData({ title: "", content: "", coverImage: "", tags: [] });
            setFileName("");
        } else {
            toast.error("Please fill all the fields");
        }
    };

    // if (user) {
    //     return <UnderMaintenance />;
    // }

    return (
        <Wrapper>
            <CreateBlogContainer>
                <ImageUploadAndPreviewSection>
                    <AddCoverImageSection>
                        <ImageUploadLabel style={{ color: "grey" }} htmlFor="addCoverImage">
                            <AddImage />
                            {!fileName ? (
                                <> Add Cover Image </>
                            ) : (
                                !preview && !fileName && <ImageSelected> Please select an image </ImageSelected>
                            )}
                            <ImageSelected> {file && <p>{fileName.slice(0, 20)}..</p>} </ImageSelected>
                        </ImageUploadLabel>
                        <input
                            type="file"
                            name="addCoverImage"
                            id="addCoverImage"
                            onChange={onFileChange}
                            style={{ display: "none" }}
                        />
                    </AddCoverImageSection>

                    <TextGrey>Required Image Size: 1280 x 720 pixels</TextGrey>

                    <div>
                        {!preview ? (
                            <Button onClick={onPreview}>
                                <PreviewIcon /> Show Preview
                            </Button>
                        ) : (
                            <Button onClick={closePreview}>
                                <PreviewIcon /> Close Preview
                            </Button>
                        )}
                    </div>
                </ImageUploadAndPreviewSection>

                {preview ? (
                    <PreviewBlogContent
                        preview={preview}
                        closePreview={closePreview}
                        title={title}
                        content={content}
                        tags={tags}
                    />
                ) : (
                    <BlogPostForm
                        title={title}
                        content={content}
                        tags={tags}
                        onSubmit={onSubmit}
                        onChange={onChange}
                        isBlogLoading={isBlogLoading}
                        onSuccess={isSuccess}
                        handleDragOver={handleDragOver}
                        user={user}
                    />
                )}
            </CreateBlogContainer>
        </Wrapper>
    );
};

export default CreateBlog;
