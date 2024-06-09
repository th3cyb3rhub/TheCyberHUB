import React, { useState } from "react";
import { AddThreadsContainer } from "./AddThreadElements";
import { CloseButton } from "src/pages/AuthPopup/AuthPopupElements";
import AddPost from "./ModifyFeed";

const AddThreads = ({ onClose, threadsData }) => {
    const [addThread, setAddThread] = useState(true);

    const togglePop = () => {
        setAddThread(!addThread);
        onClose(); // Call the onClose prop to close the popup
    };

    return (
        <AddThreadsContainer>
            {/* Conditionally render the popup content based on the 'seen' state */}
            {threadsData.map((thread, index) => (
                <AddPost
                    key={index}
                    showPostTags={false}
                    // Pass the thread content and tags to the child AddPost component
                    content={thread.content}
                    tags={thread.tags}
                    // Pass the onSubmitThread function to handle the thread submission
                    // onSubmitThread={(threadContent, threadTags) => onSubmitThread(threadContent, threadTags, content)}
                />
            ))}
            <CloseButton onClick={togglePop} />
        </AddThreadsContainer>
    );
};

export default AddThreads;
