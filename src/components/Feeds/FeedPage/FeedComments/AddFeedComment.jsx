import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddFeedCommentContainer, FeedCommentInput } from "./AddFeedCommentsElements";
import { FooterSection, PostFormButton } from "../PostForm/AddPostElements";
import { addFeedComment } from "../../../features/feeds/feedComments/feedCommentsSlice";
import { LeftSection, PostHeader, PostHeaderImg, RightSection } from "../FeedPosts/FeedPostsElements";
import AuthPopup from "../../../pages/AuthPopup/AuthPopup";
import { cdnContentImagesUrl } from "../../../features/apiUrl";

const AddFeedComment = ({ feedId, userDetail }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [addReply, setAddReply] = useState({ reply: "" });
    const { reply } = addReply;
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            setShowAuthPopup(true); // Show the login popup if the user is not logged in
            return;
        }

        const replyData = { reply };
        dispatch(addFeedComment({ feedId, replyData }));
        setAddReply({ reply: "" });
    };

    const textareaRef = useRef(null);

    const handleChange = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto"; // Reset height to recalculate scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to fit content
        setAddReply({ reply: textarea.value }); // Update only the 'reply' property in the state
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
                        placeholder="Add a reply..."
                        value={reply} // Use 'reply' directly instead of 'addComment'
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
