import React from "react";
import {
    Comment,
    CommentDate,
    CommentSection,
    SectionCommentDetails,
    SectionUserPicture,
    // SectionUserPicture,
    Username,
    UserPicture,
    // UserPicture,
    ViewCommentsContainer,
} from "./ViewCommentsElements";
import { cdnContentImagesUrl } from "../../../features/apiUrl";
// import { CircleSpinner } from "react-spinners-kit";
// import { getCdnAssets } from "../../../features/apiUrl";

const ViewComments = ({ comments }) => {
    return (
        <ViewCommentsContainer>
            {comments?.map((comment, id) => (
                <CommentSection key={id}>
                    <SectionUserPicture>
                        <UserPicture
                            src={cdnContentImagesUrl("/user/" + (comment?.avatar || "1691297013370.png"))}
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
