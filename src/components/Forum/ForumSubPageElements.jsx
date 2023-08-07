import styled from "styled-components";
import { MdOutlinePreview } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { ContentReactMarkdown } from "../Blogs/ViewBlog/ViewBlogElements";

export const ForumSubPageContainer = styled.div`
    max-width: 1000px;
    color: #939393;
`;
export const QuestionSection = styled.div`
    background: #090909;
    padding: 25px;
`;
export const Title = styled.h1``;
export const Description = styled.p`
    max-width: 800px;
`;
export const Username = styled.p``;
export const Date = styled.p``;
export const Tags = styled.div``;
export const Tag = styled.p``;
export const Answer = styled.p``;
export const Views = styled.p``;
export const Vote = styled.p``;

export const PreviewSection = styled.div``;
export const Button = styled.button`
    background: #1a1c1d;
    color: gainsboro;
    border: 1px solid #1a1c1d;
    border-radius: 3px;
    font-size: 14px;
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 10px 20px;
    @media screen and (max-width: 500px) {
        padding: 5px 5px;
        width: 100%;
    }
`;

export const PreviewIcon = styled(MdOutlinePreview)`
    margin: 0 5px;
    font-size: 200%;
`;

export const PublishSection = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const SolutionPreview = styled(ReactMarkdown)``;

export const CommentMarkdownPreviewContainer = styled.div`
    background: #111111;
    height: 100%;
    margin: 10px 0;
`;

export const CommentTextArea = styled.textarea`
    font-family: "Poppins", sans-serif;
    border: #222222 1px solid;
    padding: 25px;
    margin: 10px 0;
    font-size: 17px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: transparent;
    color: gainsboro;
    width: 100%;
    min-height: 250px;

    ::placeholder {
        color: gainsboro;
    }

    &:focus {
        outline: none;
    }
`;

export const CommentContentMarkdownPreview = styled(ContentReactMarkdown)`
    max-width: 100%;
    padding: 25px;
    min-height: 250px;
    height: 100%;
    font-size: 17px;

    * {
        font-family: "Poppins", sans-serif;
        margin: 0;
    }

    p {
        //font-family: "Roboto Mono", monospace;
        font-family: "Poppins", sans-serif;
        text-align: left;
        white-space: pre-line;
        font-size: 17px;
    }
`;
