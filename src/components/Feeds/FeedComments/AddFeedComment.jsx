import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddFeedCommentContainer, FeedCommentInput } from "./AddFeedCommentsElements";
import { AddImage, FooterSection, PostFormButton } from "../PostForm/AddPostElements";
import { addFeedComment } from "../../../features/feeds/feedComments/feedCommentsSlice";
import { LeftSection, PostHeader, PostHeaderImg, RightSection } from "../FeedPosts/FeedPostsElements";
import AuthPopup from "../../../pages/AuthPopup/AuthPopup";

const AddFeedComment = ({ feedId }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [addComment, setAddComment] = useState({ comment: "" });
    const { comment } = addComment;
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            setShowAuthPopup(true); // Show the login popup if the user is not logged in
            return;
        }

        const commentData = { comment };
        dispatch(addFeedComment({ feedId, commentData }));
        setAddComment({ comment: "" });
    };

    const textareaRef = useRef(null);

    const handleChange = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto"; // Reset height to recalculate scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to fit content
        setAddComment({ comment: textarea.value }); // Update only the 'comment' property in the state
    };
    return (
        <AddFeedCommentContainer>
            {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)} />}
            <LeftSection>
                <PostHeaderImg src={"https://avatars.githubusercontent.com/u/44284877?v=4"} alt="Profile picture" />
            </LeftSection>
            <RightSection>
                <PostHeader>
                    <FeedCommentInput
                        ref={textareaRef}
                        placeholder="Add a comment..."
                        value={comment} // Use 'comment' directly instead of 'addComment'
                        onChange={handleChange}
                    />
                </PostHeader>

                <FooterSection>
                    <AddImage />
                    <PostFormButton onClick={handleSubmit}>Submit</PostFormButton>
                </FooterSection>
            </RightSection>
        </AddFeedCommentContainer>
    );
};

export default AddFeedComment;
