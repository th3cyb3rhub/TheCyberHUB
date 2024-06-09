import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddFeedCommentContainer, FeedCommentInput } from "./AddFeedCommentsElements";
import { FooterSection, PostFormButton } from "src/components/Feeds/PostForm/AddPostElements";
import { createFeed } from "src/features/feeds/feedsSlice";
import { LeftSection, PostHeader, PostHeaderImg, RightSection } from "src/components/Feeds/FeedPosts/FeedPostsElements";
import AuthPopup from "src/pages/AuthPopup/AuthPopup";
import { cdnContentImagesUrl } from "src/features/apiUrl";

const AddFeedComment = ({ feedId, userDetails }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const userDetail = userDetails?.find((userDetail) => userDetail?.user === user?._id);

    const [addReply, setAddReply] = useState({ content: "" });
    const { content } = addReply;
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            setShowAuthPopup(true); // Show the login popup if the user is not logged in
            return;
        }

        const replyData = { content };
        dispatch(createFeed({ feedData: replyData, parentId: feedId }));
        setAddReply({ content: "" });
    };

    const textareaRef = useRef(null);

    const handleChange = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto"; // Reset height to recalculate scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to fit content
        setAddReply({ content: textarea.value }); // Update only the 'content' property in the state
    };

    const avatar = cdnContentImagesUrl("/user/" + (userDetail?.avatar || "avatarDummy.png"));

    return (
        <AddFeedCommentContainer>
            {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)} />}
            <LeftSection>
                <PostHeaderImg src={avatar} alt={userDetail?.username + `avatar`} />
            </LeftSection>
            <RightSection>
                <PostHeader>
                    <FeedCommentInput
                        ref={textareaRef}
                        placeholder="Add a content..."
                        value={content} // Use 'content' directly instead of 'addComment'
                        onChange={handleChange}
                    />
                </PostHeader>

                <FooterSection>
                    <p></p>
                    <PostFormButton onClick={handleSubmit}>Submit</PostFormButton>
                </FooterSection>
            </RightSection>
        </AddFeedCommentContainer>
    );
};

export default AddFeedComment;
