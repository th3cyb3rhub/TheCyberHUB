import React from "react";
import {
    Comment,
    CommentDate,
    CommentSection,
    SectionCommentDetails,
    SectionUserPicture,
    Username,
    UserPicture,
    ViewCommentsContainer,
} from "src/components/Blogs/BlogComments/ViewCommentsElements";
import { cdnContentImagesUrl } from "src/features/apiUrl";

const ViewComments = ({ comments }) => {
    return (
        <ViewCommentsContainer>
            {comments?.map((comment, id) => (
                <CommentSection key={id}>
                    <SectionUserPicture>
                        <UserPicture
                            src={cdnContentImagesUrl("/user/" + (comment?.avatar || "avatarDummy.png"))}
                            alt={comment?.avatar}
                        />
                    </SectionUserPicture>
                    <SectionCommentDetails>
                        <Username>{comment?.username}</Username>
                        <CommentDate> Jan 26, 2023</CommentDate>
                        <Comment>{comment?.comment}</Comment>
                    </SectionCommentDetails>
                </CommentSection>
            ))}
            {/* {props?.isBlogLoading && <CircleSpinner size={20} color={"#ff6b08"} />} */}
        </ViewCommentsContainer>
    );
};

export default ViewComments;
