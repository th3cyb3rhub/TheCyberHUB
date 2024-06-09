import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import BlogPostFormV2 from "src/components/Blogs/ManageBlogs/CreateBlogV2/BlogPostFormV2";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import {
    CreateBlogContainer,
    Form,
    ImageUploadAndPreviewSection,
    Input,
    SectionCreateBlog,
    Submit,
    TextArea,
} from "src/components/Blogs/ManageBlogs/CreateBlogV2/CreateBlogV2Elements";
import {
    AddCoverImageSection,
    CategorySection,
    TextGrey,
} from "src/components/Blogs/ManageBlogs/CreateBlog/CreateBlogElements";
import { blogReset, createBlog } from "src/features/blogs/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddFeedTags from "src/components/Feeds/PostForm/AddPostTags/AddPostTags";
import AuthPopup from "src/pages/AuthPopup/AuthPopup";
import { CircleSpinner } from "react-spinners-kit";
import { LoadingButton } from "src/components/Other/MixComponents/Buttons/ButtonElements";
import { Option, Select } from "src/components/CaptureTheFlag/CTFElements";
import { ImageInput, useUploadImages } from "src/components/Common/ImageUpload";

const maxImageSizeByte = 1000000;
const CreateBlogV2 = () => {
    const {
        images,
        setImages,
        imagesName,
        setImagesName,
        onImageChange,
        onImageFromContentSubmit,
        onImageSubmit,
        onImageDrop,
        onImageDragOver,
    } = useUploadImages({
        maxImageSizeByte,
        pageName: "blog",
    });
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
    const [category, setCategory] = useState("Blog");
    const [tags, setTags] = useState([]);

    const maxCharacterCount = 10000;

    const [remainingCharacters, setRemainingCharacters] = useState(maxCharacterCount);

    useEffect(() => {
        const filteredContentLength = content.replace(/<img src="data:image[^>]*>/g, "").length;
        setRemainingCharacters(maxCharacterCount - filteredContentLength);
    }, [content, maxCharacterCount]);

    useEffect(() => {
        if (isBlogError || errorMessage) {
            toast.error(errorMessage || blogMessage);
        }

        if (!user) navigate("/login");

        if (isSuccess) navigate("/blogs");

        return () => dispatch(blogReset());
    }, [user, isSuccess, isBlogError, blogMessage, errorMessage, dispatch, navigate]);

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
                toast.warn("Content should be at least 100 characters");
                return;
            }
            if (remainingCharacters > 10000) {
                toast.warn("Content should be less than 10000 characters");
                return;
            }
            if (!images.length) {
                toast.warn("Cover Image is required");
                return;
            }
            if (tags.length === 0) {
                toast.warn("Tags are required");
                return;
            }

            if (!category) {
                toast.warn("Category is required");
                return;
            }

            try {
                setIsLoading(true);
                await onImageSubmit(images[0]);

                const blogData = {
                    title: title.trim(),
                    summary,
                    content: await onImageFromContentSubmit(content),
                    coverImage: imagesName[0],
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
            setImagesName("");
            setCategory("");
            setTags([]);
            setImages("");
        }
    };

    return (
        <Wrapper>
            {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)} />}
            <CreateBlogContainer>
                <ImageUploadAndPreviewSection onDragOver={onImageDragOver} onDrop={onImageDrop}>
                    <AddCoverImageSection>
                        <ImageInput
                            inputName="addCoverImage"
                            onChange={onImageChange}
                            labelStyles={{ color: "grey" }}
                            filesName={imagesName}
                            labelPlaceholder={{ choose: "Add Cover Image", pick: "Please select an image" }}
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

export default CreateBlogV2;
