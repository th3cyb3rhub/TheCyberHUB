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
    CategorySection,
    ImageSelected,
    ImageUploadInput,
    ImageUploadLabel,
    TextGrey,
} from "../CreateBlog/CreateBlogElements";
import { blogReset, createBlog } from "../../../../features/blogs/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { getApiUrl } from "../../../../features/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";
import AddFeedTags from "../../../Feeds/PostForm/AddPostTags/AddPostTags";
import AuthPopup from "../../../../pages/AuthPopup/AuthPopup";
import { CircleSpinner } from "react-spinners-kit";
import { LoadingButton } from "../../../Other/MixComponents/Buttons/ButtonElements";
import { Option, Select } from "../../../CaptureTheFlag/CTFElements";

const CreateBlogV2 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const {
        // blogs,
        isBlogLoading,
        isBlogError,
        blogMessage,
    } = useSelector((state) => state.blogs);
    const [isSuccess, setInSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [category, setCategory] = useState("Blog");
    const [tags, setTags] = useState([]);

    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("");

    const maxCharacterCount = 10000;

    const [remainingCharacters, setRemainingCharacters] = useState(maxCharacterCount);

    useEffect(() => {
        setRemainingCharacters(maxCharacterCount - content.length);
    }, [content]);

    let updatedContent;

    useEffect(() => {
        if (isBlogError || errorMessage) {
            toast.error(errorMessage || blogMessage);
        }
        if (!user) navigate("/login");
        if (isSuccess) navigate("/blogs");

        return () => dispatch(blogReset());
    }, [user, isSuccess, isBlogError, blogMessage, errorMessage, dispatch, navigate]);

    const onFileChange = (e) => {
        const file = e.target.files[0];
        const fileName = `blog-${Date.now()}.${file && file.type.split("/")[1]}`;

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
                toast.warn("Title is required");
                return;
            }
            if (!summary) {
                toast.warn("Summary is required");
                return;
            }
            if (!content) {
                toast.warn("Content is required");
                return;
            }
            if (content.length < 100) {
                toast.warn("Content should be atleast 100 characters");
                return;
            }
            if (content.length > 10000) {
                toast.warn("Content should be less than 10000 characters");
                return;
            }
            if (!coverImage) {
                toast.warn("Cover Image is required");
                return;
            }
            if (tags.length === 0) {
                toast.warn("Tags are required");
                return;
            }
            if (!file) {
                toast.warn("CoverImage is required");
                return;
            }

            if (!category) {
                toast.warn("Category is required");
                return;
            }

            try {
                setIsLoading(true);

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
                    const filename = `blog-${Date.now()}.${imageType.split("/")[1]}`;
                    updatedContent = updatedContent.replace(imageUrl, filename.split("-")[1]);

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
                    coverImage: fileName.split("-")[1],
                    category,
                    tags,
                };

                try {
                    await dispatch(createBlog(blogData));
                    setInSuccess(true);
                    setIsLoading(false);
                    toast("Blog created successfully");
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
            setCategory("");
            setTags([]);
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
                            <ImageSelected> {file && <>{fileName.slice(0, 20)}..</>} </ImageSelected>
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
                        <p
                            style={{
                                color:
                                    remainingCharacters <= 1000
                                        ? "#ff2525"
                                        : remainingCharacters <= 5000
                                        ? "#ff6b08"
                                        : "grey",
                                width: "100%",
                                textAlign: "right",
                                fontSize: "12px",
                                fontWeight: "bold",
                                // border: '1px solid #ff6b08',
                                // marginTop: '-15px',
                                // marginBottom: '-10px',
                            }}
                        >
                            {remainingCharacters < 0 ? "-" : ""} {Math.abs(remainingCharacters)}
                        </p>
                        <CategorySection>
                            Category
                            <Select
                                name={"category"}
                                type="category"
                                placeholder={"Category"}
                                value={category}
                                onChange={(ev) => setCategory(ev.target.value)}
                            >
                                <Option value="Blog">Blog</Option>
                                <Option value="CTF Walkthrough">CTF Walkthrough</Option>
                                <Option value="Bug Hunting WriteUp">Bug Hunting WriteUp</Option>
                                <Option value="Tools Walkthrough">Tools Walkthrough</Option>
                                <Option value="Tips & Tricks">Tips & Tricks</Option>
                                <Option value="News">News</Option>
                                <Option value="Others">Others</Option>
                            </Select>
                        </CategorySection>

                        <AddFeedTags tags={tags} setTags={setTags} size={"lg"} />

                        {isLoading || isBlogLoading ? (
                            <LoadingButton width={"100%"}>
                                <CircleSpinner size={20} color={"#131313"} />
                            </LoadingButton>
                        ) : (
                            <Submit onClick={createNewPost} style={{ marginTop: "5px" }}>
                                Create Blog
                            </Submit>
                        )}
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

export default CreateBlogV2;
