import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../../../../features/blogs/blogSlice";
import { Wrapper } from "../../../Dashboard/Profile/ProfileElements";
import { reset } from "../../../../features/goals/goalSlice";
import {
    AddCoverImageSection,
    AddImage,
    CreateBlogContainer,
    ImageSelected,
    ImageUploadAndPreviewSection,
    ImageUploadInput,
    ImageUploadLabel,
    TextGrey,
} from "./CreateBlogElements";
import axios from "axios";
import PreviewBlogContent from "../../PreviewBlogContent";
import { Button, PreviewIcon, PreviewSection } from "../../../Beta/Forum/ForumSubPageElements";
import { getApiUrl, getCDNUrlContent } from "../../../../features/apiUrl";
import BlogPostForm from "../BlogPostForm";
import { toast } from "react-toastify";

const CreateBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { blogs } = useSelector((state) => state.blogs);
    const { isLoading, isError, message } = useSelector((state) => state.blogs);
    const [isSuccess, setInSuccess] = useState(false);
    const [preview, setPreview] = useState(false); // added state variable for preview
    const [errorMessage, setErrorMessage] = useState("");
    const onPreview = () => setPreview(true);
    const closePreview = () => setPreview(false);

    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        coverImage: "",
        tags: [],
    });
    const { title, content, tags } = blogData;
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

    const maxFileSize = 500000; // 500KB
    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (!user) navigate("/login");
        return () => dispatch(reset());
    }, [user, isError, message, isSuccess, navigate, dispatch]);

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
            formData.append("image", file);
            formData.append("folderName", "images/blog");
            formData.append("fileName", `${fileName}`);
            const API_URL = getApiUrl("api/upload");
            await axios.post(API_URL, formData);
            const newImageUrl = `${getCDNUrlContent}/images/blog/${fileName}`;
            setBlogData((prevState) => ({
                ...prevState,
                content: prevState.content + `\n![PLEASE_ADD_A_NAME_FOR_THIS_IMAGE_HERE](${newImageUrl})`,
            }));
        } catch (err) {
            if (err.message === "Request failed with status code 429") {
                setErrorMessage("You are uploading images too fast. Please wait a few seconds and try again.");
                errorMessage && toast.error(errorMessage);
                if (errorMessage === "") {
                    toast("You are uploading images too fast. Please wait a few seconds and try again.");
                }
            }
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
            formData.append("image", file);
            formData.append("folderName", "images/blog");
            formData.append("fileName", `${fileName}`);
            const API_URL = getApiUrl("api/upload");
            await axios.post(API_URL, formData);
            const newImageUrl = `${getCDNUrlContent}/images/blog/${fileName}`;
            setBlogData((prevState) => ({
                ...prevState,
                content: prevState.content + `\n![PLEASE_ADD_A_NAME_FOR_THIS_IMAGE_HERE](${newImageUrl})`,
            }));
        } catch (err) {
            if (err.message === "Request failed with status code 429") {
                setErrorMessage("You are uploading images too fast. Please wait a few seconds and try again.");
                errorMessage && toast.error(errorMessage);
                if (errorMessage === "") {
                    toast("You are uploading images too fast. Please wait a few seconds and try again.");
                }
            }
        }
    };

    const onChange = (e) => {
        const value = e.target.value;
        // if (e.target.name === "tags") value = value.split(",").map((tag) => tag.trim());

        // if (file) {
        //     if (e.target.name === "title") {
        //         const newFile = new File(
        //             [file],
        //             `${
        //                 value &&
        //                 value
        //                     .toLowerCase()
        //                     .replace(/ +/g, "_")
        //                     .replace(/[^a-zA-Z0-9]/g, "_")
        //                     .replace(/_+/g, "_")
        //             }_by_${user.username}.${file && file.type.split("/")[1]}`,
        //             { type: file && file.type },
        //         );
        //         setFile(newFile);
        //     }
        // }
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
            const blog = blogs.find((blog) => blog.username === user.username && blog.title === title);
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
            formData.append("folderName", "images/blog");
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
                        <ImageUploadInput
                            type="file"
                            name="addCoverImage"
                            id="addCoverImage"
                            onChange={onFileChange}
                            style={{ display: "none" }}
                        />
                    </AddCoverImageSection>

                    <TextGrey>Required Image Size: 1280 x 720 pixels</TextGrey>

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
                        isLoading={isLoading}
                        onSuccess={isSuccess}
                        handleDrop={handleDrop}
                        handleDragOver={handleDragOver}
                        handlePaste={handlePaste}
                        user={user}
                    />
                )}
            </CreateBlogContainer>
        </Wrapper>
    );
};

export default CreateBlog;
