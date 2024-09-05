import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import ReactQuill from "react-quill";

export const BlogImageContainer = styled.div`
    border-radius: 5px;
    padding: 10px;
    background-color: #111;
`;
export const BlogImage = styled.img`
    width: 100%;
    height: 100%;
    max-height: 400px;
    max-width: 1000px;
    object-fit: cover;
    display: block;
    margin: 0 auto;
    border-radius: 15px 15px 0 0;
    font-size: 12px;
    color: #999;
    word-break: break-all;
`;

export const BlogTitle = styled.h1`
    padding-top: 15px;
    text-align: center;
    word-wrap: break-word;
    width: 100%;
    max-width: 1000px;

    @media screen and (width <= 600px) {
        width: 100%;
        font-size: 20px;
    }
`;

export const UsernameAndDate = styled.h4`
    word-wrap: break-word;
    max-width: 800px;
    color: #e7e7e7;

    @media screen and (width <= 600px) {
        font-size: 12px;
    }
`;

export const PreviewMarkdownHeading = styled.h1`
    padding: 25px 50px 15px;
`;

export const Tags = styled.div`
    padding: 25px 50px;
    display: flex;
    font-size: 150%;
    flex-wrap: wrap;
    word-wrap: break-word;
    max-width: 1000px;

    @media screen and (width <= 600px) {
        flex-wrap: wrap;
        padding: 15px 0;
        width: 100%;
        font-size: 10px;
    }
`;

export const Tag = styled.p`
    background: #142638;
    padding: 0 10px;
    margin: 5px 10px 5px 0;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: transform 0.3s;
    flex-wrap: wrap;
    word-wrap: break-word;
    max-width: 400px;

    &:hover {
        transform: scale(1.03);
    }
`;

export const ContentSection = styled.div`
    background: #090909;
    border: 1px solid #111;
    width: 100%;
`;

export const BlogSummary = styled.div`
    padding: 40px;
    font:
        17px Poppins,
        sans-serif;
`;
export const BlogContent = styled(ReactQuill)`
    padding: 25px;

    .ql-container.ql-snow {
        border: none;
    }

    * {
        font-family: Poppins, sans-serif;
        font-size: 17px;
    }

    a {
        margin: 0 5px 0 2px;
        color: #009dff;
        text-decoration: underline;
        transition: 0.3s ease-in-out;

        &:hover {
            color: #ff6b08;
            transition: 0.3s ease-in-out;
            scale: 1.05;
        }
    }

    pre {
        font-family: "Roboto Mono", monospace;
        white-space: pre-wrap;
        word-break: break-word;
        overflow-wrap: break-word;
    }

    code {
        font-family: "Roboto Mono", monospace;
        white-space: pre-wrap;
        word-break: break-word;
        overflow-wrap: break-word;
    }

    img {
        margin: 5px 0 10px;
        padding: 0;
        width: 100%;
        object-fit: contain;
        border-radius: 5px;
    }
`;

export const ContentReactMarkdown = styled(ReactMarkdown)`
    text-align: start;
    padding: 25px 50px;
    word-wrap: break-word;

    * {
        font-family: Poppins, sans-serif;
        margin: 10px auto;
    }

    a {
        color: #f5f5f5;
    }

    h1 {
        font-size: 2em;
        border-bottom: 1px #2a2a2a solid;
    }

    h2 {
        font-size: 1.5em;
        border-bottom: 1px #2a2a2a solid;
        margin-top: 1em;
    }

    h3 {
        font-size: 1.17em;
    }

    h4 {
        font-size: 1em;
    }

    h5 {
        font-size: 0.83em;
    }

    h6 {
        font-size: 0.67em;
    }

    code {
        font-family: "Roboto Mono", monospace;
        white-space: pre-wrap;
        word-break: break-word;
        background-color: #1d1f21;
        border-radius: 5px;
        padding: 5px 10px;
        overflow-wrap: break-word;
    }

    p {
        font-family: Poppins, sans-serif;
        text-align: left;
        white-space: pre-line;
        font-size: 18px;
        line-height: 1.5;
    }

    ol {
        list-style-type: decimal;
        text-align: left;
        font-size: 20px;
        line-height: 1.5;
        margin: 0 -60px;
        padding-left: -10px;
    }

    li {
        list-style-type: square;
        text-align: left;
        margin: 0 50px;
        padding: 0 10px;
        white-space: pre-line;
        font-size: 20px;
        line-height: 1.5;
    }

    img {
        margin: 5px 0 50px;
        padding: 0;
        width: 100%;
        object-fit: contain;
        border-radius: 5px;
    }

    hr {
        border: 0;
        height: 1px;
        background: #333;
    }

    @media screen and (width <= 600px) {
        padding: 10px 20px;

        * {
            font-family: Poppins, sans-serif;
            margin: 10px auto;
        }

        a {
            color: #f5f5f5;
        }

        h1 {
            font-size: 20px;
            border-bottom: 1px #2a2a2a solid;
        }

        h2 {
            font-size: 18px;
        }

        h3 {
            font-size: 17px;
        }

        h4 {
            font-size: 16px;
        }

        h5 {
            font-size: 15px;
        }

        h6 {
            font-size: 14px;
        }

        code {
            font-size: 14px;
            font-family: "Roboto Mono", monospace;
            white-space: pre-wrap;
            word-break: break-word;
            background-color: #1d1f21;
            border-radius: 5px;
            overflow-wrap: break-word;
        }

        p {
            font-family: Poppins, sans-serif;
            text-align: left;
            white-space: pre-line;
            font-size: 13px;
            line-height: 1.5;
        }

        ol {
            list-style-type: decimal;
            text-align: left;
            font-size: 13px;
            line-height: 1.5;
            margin: 0 -60px;
            padding-left: -10px;
        }

        li {
            list-style-type: square;
            text-align: left;
            margin: 0 50px;
            padding: 0 10px;
            white-space: pre-line;
            font-size: 13px;
            line-height: 1.5;
        }

        img {
            margin-top: 0;
            object-fit: contain;
            border-radius: 5px;
        }

        hr {
            border: 0;
            height: 1px;
            background: #333;
        }
    }
`;

export const ViewBlogContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;

    @media screen and (width <= 720px) {
        flex-direction: column;
    }
`;

export const ContainerViewBlog = styled.div`
    max-width: 1000px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const ViewBlogHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #cecac3;
    width: 100%;
    gap: 15px;
`;

export const CommentContainer = styled.div`
    background-color: #090909;
    border-radius: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-wrap: normal;
`;
