import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthPopup from "../../../pages/AuthPopup/AuthPopup";
import AddPostTags from "./AddPostTags/AddPostTags";
import {
    AddFeedCommentContainer,
    AddImage,
    FooterSection,
    ImageContainer,
    ImageUploadContainer,
    PostFormButton,
    RemoveButton,
    UploadedImage,
} from "./AddPostElements";
import { FeedCommentInput } from "../FeedComments/AddFeedCommentsElements";
import { LeftSection, PostHeaderImg, RightSection } from "../FeedPosts/FeedPostsElements";
import { ImageUploadLabel } from "../../Blogs/ManageBlogs/CreateBlog/CreateBlogElements";
import { getApiUrl } from "../../../features/apiUrl";
import axios from "axios";
import { CircleSpinner } from "react-spinners-kit";
import { createFeed } from "../../../features/feeds/feedsSlice";
import { toast } from "react-toastify";

const AddPost = ({ showPostTags }) => {
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
                toast.error("Only JPEG and PNG are allowed");
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
            setShowAuthPopup(true); // Show the login popup if the user is not logged in
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

            await uploadFeedImages();

            const data = {
                content,
                tags,
                images: feedImages,
            };

            dispatch(createFeed(data));

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

    return (
        <AddFeedCommentContainer>
            <LeftSection>
                <PostHeaderImg src={"https://avatars.githubusercontent.com/u/44284877?v=4"} alt="Profile picture" />
            </LeftSection>
            <RightSection>
                <FeedCommentInput
                    ref={textareaRef}
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={handleChange}
                />

                <ImageUploadContainer>
                    {files.map((file, index) => (
                        <ImageContainer key={index}>
                            <UploadedImage src={URL.createObjectURL(file)} alt={`Uploaded ${index + 1}`} />
                            <RemoveButton onClick={() => handleRemoveImage(index)}>&#10005;</RemoveButton>
                        </ImageContainer>
                    ))}
                </ImageUploadContainer>

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
                        <AddImage />
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
