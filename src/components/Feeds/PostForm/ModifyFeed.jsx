import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AuthPopup from "src/pages/AuthPopup/AuthPopup";
import AddPostTags from "./AddPostTags/AddPostTags";
import { AddFeedCommentContainer, FooterSection, PostFormButton } from "./AddPostElements";
import { FeedCommentInput } from "src/components/Feeds/FeedPage/FeedComments/AddFeedCommentsElements";
import { LeftSection, PostHeaderImg, RightSection } from "src/components/Feeds/FeedPosts/FeedPostsElements";
import { cdnContentImagesUrl } from "src/features/apiUrl";
import { CircleSpinner } from "react-spinners-kit";
import { toast } from "react-toastify";
import { ImageInput, ImagePreview, useUploadImages } from "src/components/Common/ImageUpload";

const MAX_IMAGE_SIZE_BYTES = 1048576;
const ModifyPost = ({ showPostTags, userDetails, onModifyFeed, editFeed = "" }) => {
    const {
        images,
        imagesName,
        onImageRemove,
        onImageChange,
        onImageDragOver,
        onImageDrop,
        onManyImageSubmit,
        onImagePaste,
        onResetImages,
    } = useUploadImages({
        maxImageSizeByte: MAX_IMAGE_SIZE_BYTES,
        pageName: "feed",
        initImages: editFeed?.images,
        requiredImageWidth: 400,
    });
    const textareaRef = useRef(null);
    const { user } = useSelector((state) => state.auth);

    const [isFeedLoading, setIsFeedLoading] = useState(false);

    const [content, setContent] = useState(editFeed?.content || "");
    const [tags, setTags] = useState(editFeed?.tags || []);
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const MAX_CHARACTER_COUNT = 1500;

    const [remainingCharacters, setRemainingCharacters] = useState(MAX_CHARACTER_COUNT);

    useEffect(() => {
        setRemainingCharacters(MAX_CHARACTER_COUNT - content.length);
    }, [content]);

    const handleChange = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto"; // Reset height to recalculate scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to fit content
        setContent(textarea.value);
    };

    const handleSubmit = async (e) => {
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
        } else if (images.length > 4) {
            toast.warn("You can upload a maximum of 4 images");
            setIsFeedLoading(false);
        } else {
            if (images) await onManyImageSubmit(images);

            const data = {
                content,
                tags: tags || [],
                images: imagesName,
            };
            onModifyFeed(data);

            toast.success("Feed posted successfully");

            setIsFeedLoading(false);
            setContent("");
            setTags([]);
            onResetImages();
        }
    };

    const userDetail = userDetails?.find((userDetail) => userDetail?.user === user?._id);
    const avatar = cdnContentImagesUrl("/user/" + (userDetail?.avatar || editFeed?.avatar || "avatar.png"));
    return (
        <AddFeedCommentContainer onDrop={(e) => onImageDrop(e, true, 4)} onDragOver={onImageDragOver}>
            {!editFeed && (
                <LeftSection>
                    <PostHeaderImg src={avatar} alt="Profile picture" />
                </LeftSection>
            )}
            <RightSection>
                <div>
                    <FeedCommentInput
                        ref={textareaRef}
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={handleChange}
                        onPaste={(e) => onImagePaste(e, true, 4)}
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

                <ImagePreview files={images} filesName={imagesName} onRemove={onImageRemove} />

                {showPostTags && <AddPostTags tags={tags} setTags={setTags} />}

                <FooterSection>
                    <ImageInput
                        inputName={editFeed ? `${editFeed._id}feedImage` : "feedImage"}
                        onChange={(e) => onImageChange(e, true, 4)}
                        labelStyles={{ background: "transparent", border: "transparent", padding: "0" }}
                        filesName={imagesName}
                        multiple
                        key={editFeed ? `${editFeed._id}feedImage` : "feedImage"}
                    />

                    {isFeedLoading ? (
                        <PostFormButton>
                            <CircleSpinner size={17} />
                        </PostFormButton>
                    ) : (
                        <PostFormButton onClick={handleSubmit}>{editFeed ? "Update" : "Create"}</PostFormButton>
                    )}
                </FooterSection>
            </RightSection>

            {/* Render the AuthPopup component */}
            {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)} />}
        </AddFeedCommentContainer>
    );
};

export default ModifyPost;
