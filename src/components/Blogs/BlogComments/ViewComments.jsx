import React from "react";
import {
    Comment,
    CommentDate,
    CommentSection,
    SectionCommentDetails,
    // SectionUserPicture,
    Username,
    // UserPicture,
    ViewCommentsContainer,
} from "./ViewCommentsElements";
// import { CircleSpinner } from "react-spinners-kit";
// import { getCdnAssets } from "../../../features/apiUrl";

const ViewComments = ({ comments }) => {
    return (
        <ViewCommentsContainer>
            {comments?.map((item, id) => (
                <CommentSection key={id}>
                    {/* <SectionUserPicture> */}
                    {/*    <UserPicture */}
                    {/*        src={ */}
                    {/*            userComment?.picture !== undefined */}
                    {/*                ? `${API_URL}/images/blog/${userComment?.picture}` */}
                    {/*                : dummyPicture */}
                    {/*        } */}
                    {/*        alt={userComment?.picture} */}
                    {/*    /> */}
                    {/* </SectionUserPicture> */}
                    <SectionCommentDetails>
                        <Username>{item?.user}</Username>
                        <CommentDate> Jan 26, 2023</CommentDate>
                        <Comment>{item?.comment}</Comment>
                    </SectionCommentDetails>
                </CommentSection>
            ))}
            {/* {props?.isLoading && <CircleSpinner size={20} color={"#1fc10d"} />} */}
        </ViewCommentsContainer>
    );
};

export default ViewComments;
