import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import BlogPostFormV2 from "./BlogPostFormV2";
import { Wrapper } from "../../../Dashboard/Profile/ProfileElements";
import {
    CreateBlogContainer,
    Form,
    ImageUploadAndPreviewSection,
    Input,
    SectionCreateBlog,
    Submit,
    TextArea,
} from "./CreateBlogV2Elements";
import {
    AddCoverImageSection,
    AddImage,
    ImageSelected,
    ImageUploadInput,
    ImageUploadLabel,
    TextGrey,
} from "../CreateBlog/CreateBlogElements";
import { createBlog, reset } from "../../../../features/blogs/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { getApiUrl } from "../../../../features/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";
import AddFeedTags from "../../../Feeds/PostForm/AddPostTags/AddPostTags";
import AuthPopup from "../../../../pages/AuthPopup/AuthPopup";

const CreateBlogV2 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const {
        // blogs, isLoading,
        isError,
        message,
    } = useSelector((state) => state.blogs);
    const [isSuccess, setInSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [tags, setTags] = useState(["", ""]);

    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("");

    let updatedContent;

    useEffect(() => {
        if (isError || errorMessage) {
            toast.error(errorMessage || message);
        }
        if (!user) navigate("/login");
        if (isSuccess) {
            navigate("/blogs");
        }
        return () => dispatch(reset());
    }, [user, isError, message, isSuccess, navigate, dispatch]);

    const onFileChange = (e) => {
        const file = e.target.files[0];
        const fileName = `blog-cover-${Date.now()}.${file && file.type.split("/")[1]}`;
        setFileName(fileName);
        setCoverImage(fileName);

        const reader = new FileReader();
        reader.onloadend = () => {
            setFile();
            const newFile = new File([reader.result], fileName, { type: file && file.type });
            setFile(newFile);
        };
        reader.readAsArrayBuffer(file);
    };

    const createNewPost = async (ev) => {
        ev.preventDefault();
        if (!user) {
            setShowAuthPopup(true); // Show the login popup if the user is not logged in
        } else {
            setInSuccess(false);
            setErrorMessage("");

            if (!title) {
                toast.error("Title is required");
                return;
            }
            if (!summary) {
                toast.error("Summary is required");
                return;
            }
            if (!content) {
                toast.error("Content is required");
                return;
            }
            if (!coverImage) {
                toast.error("Cover Image is required");
                return;
            }
            if (tags[0] === "" || tags[1] === "") {
                toast.error("Tags are required");
                return;
            }
            if (!file) {
                toast.error("CoverImage is required");
                return;
            }

            try {
                async function uploadCoverImage() {
                    try {
                        const formData = new FormData();
                        formData.append("image", file);
                        const API_URL = getApiUrl("api/upload");
                        await axios.post(API_URL, formData);
                    } catch (err) {
                        toast.error(err.message);
                    }
                }

                await uploadCoverImage();

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
                    coverImage,
                    tags,
                };

                try {
                    console.log(blogData);
                    await dispatch(createBlog(blogData));
                    setInSuccess(true);
                } catch (err) {
                    setErrorMessage(err.message);
                }
            } catch (err) {
                setErrorMessage(err.message);
            }

            setTitle("");
            setSummary("");
            setContent("");
            setCoverImage("");
            setTags(["", ""]);
            setFileName("");
            setFile("");
        }
    };

    return (
        <Wrapper>
            {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)} />}
            <CreateBlogContainer>
                <ImageUploadAndPreviewSection>
                    <AddCoverImageSection>
                        <ImageUploadLabel style={{ color: "grey" }} htmlFor="addCoverImage">
                            <AddImage />
                            {!fileName ? (
                                <> Add Cover Image </>
                            ) : (
                                !fileName && <ImageSelected> Please select an image </ImageSelected>
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
                </ImageUploadAndPreviewSection>
                <SectionCreateBlog>
                    <Form>
                        <Input
                            name={"title"}
                            type="title"
                            placeholder={"Title"}
                            value={title}
                            onChange={(ev) => setTitle(ev.target.value)}
                        />

                        <TextArea
                            name={"summary"}
                            type="summary"
                            placeholder={"Summary"}
                            value={summary}
                            onChange={(ev) => setSummary(ev.target.value)}
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
    console.log("base64Data", base64Data);
    console.log("byteCharacters", byteCharacters);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const uint8Array = new Uint8Array(byteNumbers);
    const blob = new Blob([uint8Array], { type: imageType });
    return new File([blob], fileName, { type: imageType.replace(/^data:/, "") });
}

// Usage:

export default CreateBlogV2;
