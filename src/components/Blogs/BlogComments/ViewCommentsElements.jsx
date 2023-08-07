import styled from "styled-components";

export const BlogsCommentsContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
`;
export const ViewCommentsContainer = styled.div`
    width: 100%;
`;

export const CommentSection = styled.div`
    display: flex;
    flex-direction: row;
    text-align: left;
    margin: 10px;
`;

export const ReplySection = styled.div`
    text-align: left;
    margin-left: 15px;
`;

export const ReplyButton = styled.button`
    padding: 5px 10px;
`;

export const SectionUserPicture = styled.div`
    margin: 10px;
    margin-top: 13px;
`;
export const UserPicture = styled.img`
    width: 40px;
    border-radius: 5px;
`;

export const SectionCommentDetails = styled.div`
    margin: 10px;
    max-width: 600px;
`;
export const Username = styled.p`
    font-size: 15px;
`;

export const CommentDate = styled.p`
    font-size: 12px;
`;

export const Comment = styled.p`
    background-color: #252525;
    margin: 10px auto;
    padding: 10px;
    max-width: 600px;
    word-wrap: break-word;
    border-radius: 5px;
    @media screen and (max-width: 600px) {
        width: 100%;
        padding: 5px 10px;
        font-size: 12px;
    }
`;
