import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFeed } from "../../../features/feeds/feedsSlice";
import AuthPopup from "../../../pages/AuthPopup/AuthPopup";
import AddPostTags from "./AddPostTags/AddPostTags";
import { AddImage, FooterSection, AddFeedCommentContainer, PostFormButton } from "./AddPostElements";
// import { IconAdd, TagInput, TagsInput } from '../../Blogs/ManageBlogs/CreateBlogV2/CreateBlogV2Elements';
import { FeedCommentInput } from "../FeedComments/AddFeedCommentsElements";
import { LeftSection, PostHeaderImg, RightSection } from "../FeedPosts/FeedPostsElements";

const AddPostForm = ({ showPostTags }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const textareaRef = useRef(null);

    const handleChange = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto"; // Reset height to recalculate scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to fit content
        setContent(textarea.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            setShowAuthPopup(true); // Show the login popup if the user is not logged in
        } else {
            const data = {
                content,
                tags,
            };
            console.log(data);
            dispatch(createFeed(data));
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
                {showPostTags && <AddPostTags tags={tags} setTags={setTags} />}

                <FooterSection>
                    <AddImage />
                    <PostFormButton onClick={onSubmit}>Create</PostFormButton>
                </FooterSection>
            </RightSection>

            {/* Render the AuthPopup component */}
            {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)} />}
        </AddFeedCommentContainer>
    );
};

export default AddPostForm;
