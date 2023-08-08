import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { encodeURL } from "../../util";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, blogReset, updateBlog } from "../../../../features/blogs/blogSlice";
import {
    AddCoverImageSection,
    AddImage,
    CategorySection,
    CreateBlogContainer,
    Form,
    ImageSelected,
    ImageUploadAndPreviewSection,
    ImageUploadInput,
    ImageUploadLabel,
    Input,
    SectionCreateBlog,
    Submit,
    TextArea,
    TextGrey,
} from "../CreateBlog/CreateBlogElements";
import { Wrapper } from "../../../Dashboard/Profile/ProfileElements";
import { toast } from "react-toastify";
import { getApiUrl } from "../../../../features/apiUrl";
import axios from "axios";
import AuthPopup from "../../../../pages/AuthPopup/AuthPopup";
import BlogPostFormV2 from "../CreateBlogV2/BlogPostFormV2";
import { Option, Select } from "../../../CaptureTheFlag/CTFElements";
import AddFeedTags from "../../../Feeds/PostForm/AddPostTags/AddPostTags";
import { LoadingButton } from "../../../Other/MixComponents/Buttons/ButtonElements";
import { CircleSpinner } from "react-spinners-kit";

const EditBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { blogTitle } = useParams();
    const { blogs, isBlogLoading, isBlogError, blogMessage } = useSelector((state) => state.blogs);

    const [isSuccess, setInSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (isBlogError || errorMessage) {
            toast.error(errorMessage || blogMessage);
        }
        dispatch(getAllBlogs());

        if (!user) navigate("/login");
        if (isSuccess) navigate("/blogs");

        return () => dispatch(blogReset());
    }, [isBlogError, blogMessage, isSuccess, errorMessage]);

    const blog = blogs.find((blog) => encodeURL(blog.title).toLowerCase() === blogTitle.toLowerCase()) || {
        tags: [],
    };
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const [title, setTitle] = useState(blog?.title);
    const [summary, setSummary] = useState(blog?.summary);
    const [content, setContent] = useState(blog?.content);
    const [coverImage, setCoverImage] = useState(blog?.coverImage);
    const [category, setCategory] = useState(blog?.category);
    const [tags, setTags] = useState(blog?.tags || []);

    // const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(blog?.coverImage);

    let updatedContent;

    // const onFileChange = (e) => {
    //     const file = e.target.files[0];
    //     const fileName = `blog-${Date.now()}.${file && file.type.split("/")[1]}`;
    //
    //     setFileName(fileName);
    //     setCoverImage(fileName);
    //
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         setFile();
    //         const newFile = new File([reader.result], fileName, {type: file && file.type});
    //         setFile(newFile);
    //     };
    //     reader.readAsArrayBuffer(file);
    // };

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
            if (tags.length === 0) {
                toast.error("Tags are required");
                return;
            }
            // if (!file) {
            //     toast.error("CoverImage is required");
            //     return;
            // }

            try {
                // async function uploadCoverImage() {
                //     try {
                //         const formData = new FormData();
                //         formData.append("image", file);
                //         const API_URL = getApiUrl("api/upload");
                //         await axios.post(API_URL, formData);
                //     } catch (err) {
                //         toast.error(err.message);
                //     }
                // }

                // await uploadCoverImage();

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
                    coverImage: fileName,
                    category,
                    tags,
                };

                try {
                    await dispatch(updateBlog({ id: blog._id, blogData }));
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
            setCategory("");
            setTags([]);
            setFileName("");
            // setFile("");
        }
    };

    // const coverImagePreview = cdnContentImagesUrl(`/blog/${blog?.coverImage}`);
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
                            <ImageSelected> {fileName && <>{fileName.slice(0, 20)}..</>} </ImageSelected>
                            {/* <img src={file ? URL.createObjectURL(file) : coverImagePreview}  alt={""} style={{height: "100px", width:"auto"}}/> */}
                        </ImageUploadLabel>
                        <ImageUploadInput
                            // type="file"
                            // name="addCoverImage"
                            // id="addCoverImage"
                            // onChange={onFileChange}
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

                        {isBlogLoading ? (
                            <LoadingButton width={"100%"}>
                                <CircleSpinner size={20} color={"#131313"} />
                            </LoadingButton>
                        ) : (
                            <Submit onClick={createNewPost} style={{ marginTop: "5px" }}>
                                Update Blog
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

export default EditBlog;
