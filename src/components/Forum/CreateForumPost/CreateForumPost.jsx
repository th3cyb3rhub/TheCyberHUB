import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import BlogPostFormV2 from "./BlogPostFormV2";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import {
    CreateBlogContainer,
    Form,
    Input,
    SectionCreateBlog,
    Submit,
    // , TextArea
} from "./CreateBlogV2Elements";
// import {
//     AddCoverImageSection, AddImage, ImageSelected, ImageUploadInput, ImageUploadLabel, TextGrey
// } from "../../Blogs/ManageBlogs/CreateBlog/CreateBlogElements";
import { createForum, reset } from "../../../features/forum/forumSlice";
import { useDispatch, useSelector } from "react-redux";
import { getApiUrl } from "../../../features/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";
// import AddBlogTags from "./AddBlogTags";
import AddFeedTags from "../../Feeds/PostForm/AddPostTags/AddPostTags";

const CreateForumPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const {
        // forums, isLoading,
        isError,
        message,
    } = useSelector((state) => state.forums);
    const [isSuccess, setInSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState(["", ""]);

    // const [file, setFile] = useState('');
    // const [fileName, setFileName] = useState("");

    let updatedContent;

    useEffect(() => {
        if (isError || errorMessage) {
            toast.error(errorMessage || message);
        }
        if (!user) navigate("/login");
        console.log(isSuccess);
        if (isSuccess) {
            toast.success(isSuccess);
            navigate("/forum");
        }
        return () => dispatch(reset());
    }, [user, isError, message, isSuccess, navigate, dispatch]);

    const createNewPost = async (ev) => {
        ev.preventDefault();

        setInSuccess(false);
        setErrorMessage("");

        try {
            const imageTags = content.match(/<img[^>]*src="([^"]*)"[^>]*>/g) || [];
            updatedContent = content;

            if (imageTags.length > 0) {
                async function uploadContentImages() {
                    const imageUrls = imageTags.map((tag) => {
                        const match = tag.match(/src="([^"]*)"/);
                        return match ? match[1] : null;
                    });

                    for (const imageUrl of imageUrls) {
                        if (!isImageUrl(imageUrl)) {
                            await uploadContentImage(imageUrl);
                        }
                    }
                }

                await uploadContentImages();
            }

            async function uploadContentImage(imageUrl) {
                const [imageType, base64Data] = imageUrl.split(";base64,");
                const filename = `blog-content-${Date.now()}.${imageType.split("/")[1]}`;
                updatedContent = updatedContent.replace(imageUrl, filename);

                const newFile = bufferToFile(base64Data, filename, imageType);

                const contentImageData = new FormData();
                contentImageData.append("image", newFile);

                try {
                    const API_URL = getApiUrl("api/upload");
                    await axios.post(API_URL, contentImageData);
                } catch (err) {
                    toast.error(err.message);
                }
            }

            const blogData = {
                title: title.trim(),
                summary,
                content: updatedContent,
                tags,
            };

            try {
                toast.success(isSuccess);
                toast.info(isSuccess);
                toast.loading(isSuccess);
                toast.error(isSuccess);
                toast.warning(isSuccess);
                toast.warn(isSuccess);
                toast.dark(isSuccess);
                toast.dismiss(isSuccess);
                toast.clearWaitingQueue(isSuccess);
                toast.isActive(isSuccess);
                toast.update(isSuccess);
                toast.done(isSuccess);
                setInSuccess(true);
                await dispatch(createForum(blogData));
            } catch (err) {
                setErrorMessage(err.message);
            }
        } catch (err) {
            setErrorMessage(err.message);
        }

        setTitle("");
        setSummary("");
        setContent("");
        setTags(["", ""]);
        // setFileName("");
        // setFile('');
    };

    return (
        <Wrapper>
            <CreateBlogContainer>
                <SectionCreateBlog>
                    <Form>
                        <Input
                            name={"title"}
                            type="title"
                            placeholder={"Title"}
                            value={title}
                            onChange={(ev) => setTitle(ev.target.value)}
                        />

                        <BlogPostFormV2 content={content} setContent={setContent} />

                        <AddFeedTags tags={tags} setTags={setTags} size={"lg"} />

                        <Submit onClick={createNewPost} style={{ marginTop: "5px" }}>
                            Create post
                        </Submit>
                    </Form>
                </SectionCreateBlog>
            </CreateBlogContainer>
        </Wrapper>
    );
};

function isImageUrl(url) {
    return (
        url.startsWith("http://") || url.startsWith("https://") || url.replace(/^data:/, "").startsWith("data:image")
    );
}

function bufferToFile(base64Data, fileName, imageType) {
    const byteCharacters = atob(base64Data);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const uint8Array = new Uint8Array(byteNumbers);
    const blob = new Blob([uint8Array], { type: imageType });
    return new File([blob], fileName, { type: imageType.replace(/^data:/, "") });
}

// Usage:

export default CreateForumPost;
