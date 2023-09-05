import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthPopup from "../../../pages/AuthPopup/AuthPopup";
import AddPostTags from "./AddPostTags/AddPostTags";
import {
    AddFeedCommentContainer,
    AddImage,
    FooterSection,
    ImageContainer,
    ImagesContainer,
    PostFormButton,
    RemoveButton,
    FeedImage,
} from "./AddPostElements";
import { FeedCommentInput } from "../FeedPage/FeedComments/AddFeedCommentsElements";
import { LeftSection, PostHeaderImg, RightSection } from "../FeedPosts/FeedPostsElements";
import { ImageUploadLabel } from "../../Blogs/ManageBlogs/CreateBlog/CreateBlogElements";
import { cdnContentImagesUrl, getApiUrl } from "../../../features/apiUrl";
import axios from "axios";
import { CircleSpinner } from "react-spinners-kit";
import { createFeed } from "../../../features/feeds/feedsSlice";
import { toast } from "react-toastify";

const AddPost = ({ showPostTags, userDetails }) => {
    const dispatch = useDispatch();
    const textareaRef = useRef(null);
    const imageInputRef = useRef(null);

    const { user } = useSelector((state) => state.auth);

    const [isFeedLoading, setIsFeedLoading] = useState(false);

    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [files, setFiles] = useState([]);
    const [feedImages, setFeedImages] = useState([]);
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const maxCharacterCount = 1500;

    const [remainingCharacters, setRemainingCharacters] = useState(maxCharacterCount);

    useEffect(() => {
        setRemainingCharacters(maxCharacterCount - content.length);
    }, [content]);

    const handleChange = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto"; // Reset height to recalculate scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to fit content
        setContent(textarea.value);
    };

    const handleImageChange = (e) => {
        const imageFiles = e.target.files;

        const newFileNames = [];
        const feedImageNames = [];
        const newFiles = [];

        for (const file of imageFiles) {
            if (file.type !== "image/jpeg" && file.type !== "image/png") {
                toast.warn("Only JPEG and PNG are allowed");
                return;
            }
            const fileName = `feed-${Date.now()}.${file && file.type.split("/")[1]}`;

            const reader = new FileReader();
            reader.onloadend = () => {
                const newFile = new File([reader.result], fileName, { type: file && file.type });
                newFileNames.push(fileName);
                feedImageNames.push(fileName.split("-")[1]);

                newFiles.push(newFile);

                if (newFiles.length === imageFiles.length) {
                    setFeedImages((prevFileNames) => [...prevFileNames, ...feedImageNames]);
                    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleRemoveImage = (index) => {
        setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1);
            return updatedFiles;
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsFeedLoading(true);

        if (!user) {
            setShowAuthPopup(true);
            setIsFeedLoading(false);
        } else if (!content) {
            toast.warn("Please enter some content");
            setIsFeedLoading(false);
        } else if (content.length > 1500) {
            toast.warn("Content cannot be more than 1500 characters");
            setIsFeedLoading(false);
            setIsFeedLoading(false);
        } else if (tags.length < 2) {
            toast.warn("Please add at least 2 tags");
            setIsFeedLoading(false);
        } else if (tags.length > 10) {
            toast.warn("You can add a maximum of 10 tags");
            setIsFeedLoading(false);
        } else if (files.length > 4) {
            toast.warn("You can upload a maximum of 4 images");
            setIsFeedLoading(false);
        } else {
            async function uploadFeedImages() {
                async function uploadFeedImage({ file }) {
                    const formData = new FormData();
                    formData.append("image", file);
                    const API_URL = getApiUrl("api/upload");
                    await axios.post(API_URL, formData);
                }

                for (const file of files) {
                    await uploadFeedImage({ file });
                }
            }

            if (files) await uploadFeedImages();

            const data = {
                content,
                tags,
                images: feedImages,
            };

            dispatch(createFeed(data));

            toast.success("Feed posted successfully");

            setIsFeedLoading(false);
            setContent("");
            setTags([]);
            setFiles([]);
            setFeedImages([]);

            // Reset the file input to clear the selected images
            if (imageInputRef.current) {
                imageInputRef.current.value = "";
            }
        }
    };

    const userDetail = userDetails?.find((userDetail) => userDetail?.user === user?._id);
    const avatar = cdnContentImagesUrl("/user/" + (userDetail?.avatar || "avatarDummy.png"));

    return (
        <AddFeedCommentContainer>
            <LeftSection>
                <PostHeaderImg src={avatar} alt="Profile picture" />
            </LeftSection>
            <RightSection>
                <div>
                    <FeedCommentInput
                        ref={textareaRef}
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={handleChange}
                    />
                    <p
                        style={{
                            color:
                                remainingCharacters <= 99 ? "#ff2525" : remainingCharacters <= 500 ? "#ff6b08" : "grey",
                            width: "100%",
                            textAlign: "right",
                            fontSize: "12px",
                            fontWeight: "bold",
                            // border: '1px solid #ff6b08',
                            marginTop: "-15px",
                            marginBottom: "-10px",
                        }}
                    >
                        {remainingCharacters < 0 ? "-" : ""} {Math.abs(remainingCharacters)}
                    </p>
                </div>

                <ImagesContainer>
                    {files.map((file, index) => (
                        <ImageContainer key={index}>
                            <FeedImage src={URL.createObjectURL(file)} alt={`Uploaded ${index + 1}`} />
                            <RemoveButton onClick={() => handleRemoveImage(index)}>&#10005;</RemoveButton>
                        </ImageContainer>
                    ))}
                </ImagesContainer>

                {/* File input for image upload */}
                {files.length < 4 && (
                    <input
                        type="file"
                        name="feedImage"
                        id="feedImage"
                        ref={imageInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        multiple
                        style={{ display: "none" }}
                    />
                )}

                {showPostTags && <AddPostTags tags={tags} setTags={setTags} />}

                <FooterSection>
                    <ImageUploadLabel
                        style={{ background: "transparent", border: "transparent", padding: "0" }}
                        htmlFor="feedImage"
                    >
                        {files.length < 4 && <AddImage />}
                    </ImageUploadLabel>

                    {isFeedLoading ? (
                        <PostFormButton>
                            {" "}
                            <CircleSpinner size={17} />{" "}
                        </PostFormButton>
                    ) : (
                        <PostFormButton onClick={onSubmit}>Create</PostFormButton>
                    )}
                </FooterSection>
            </RightSection>

            {/* Render the AuthPopup component */}
            {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)} />}
        </AddFeedCommentContainer>
    );
};

export default AddPost;
