import styled from "styled-components";
import ReactMarkdown from "react-markdown";

export const BlogImageContainer = styled.div`
    border-radius: 5px;
    padding: 10px;
    background-color: #111111;
`;
export const BlogImage = styled.img`
    border-radius: 5px;
`;

export const BlogTitle = styled.h1`
    text-align: center;
    margin-top: 20px;
    word-wrap: break-word;
    width: 100%;
    max-width: 1000px;

    @media screen and (max-width: 600px) {
        width: 100%;
        font-size: 20px;
    }
`;

export const UsernameAndDate = styled.h4`
    margin: 5px auto;
    word-wrap: break-word;
    max-width: 8000px;

    @media screen and (max-width: 600px) {
        font-size: 12px;
    }
`;

export const PreviewMarkdownHeading = styled.h1`
    padding: 25px 50px 15px;
`;

export const TagsSection = styled.div`
    padding: 25px 50px;
    display: flex;
    font-size: 150%;
    flex-wrap: wrap;
    word-wrap: break-word;
    max-width: 1000px;

    @media screen and (max-width: 600px) {
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

export const ContentReactMarkdown = styled(ReactMarkdown)`
  text-align: start;
  padding: 25px 50px;
  word-wrap: break-word;

  * {
    font-family: "Poppins", sans-serif;
    margin: 10px auto;
  }

  a {
    color: #f4f4f4;
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
    overflow-wrap: break-word;
  }

  p {
    //font-family: "Roboto Mono", monospace;
    font-family: "Poppins", sans-serif;
    text-align: left;
    white-space: pre-line;
    font-size: 18px;
    line-height: 1.5;
  }

  ol {
    list-style-type: decimal;
    //font-family: "Roboto Mono", monospace;
    text-align: left;
    font-size: 20px;
    line-height: 1.5;
    margin: 0 -60px;
    padding-left: -10px;
  }

  ul {
  }

  li {
    list-style-type: square;
    //font-family: "Roboto Mono", monospace;
    text-align: left;
    margin: 0 50px;
    padding: 0 10px;
    white-space: pre-line;
    font-size: 20px;
    line-height: 1.5;
  }

  img {
    margin-top: 0;
    object-fit: contain;
    border-radius: 5px;
  }

  @media screen and (max-width: 600px) {
    padding: 10px 20px;

    * {
      font-family: "Poppins", sans-serif;
      margin: 10px auto;
    }

    a {
      color: #f4f4f4;
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
      //font-family: "Roboto Mono", monospace;
      font-family: "Poppins", sans-serif;
      text-align: left;
      white-space: pre-line;
      font-size: 13px;
      line-height: 1.5;
    }

    ol {
      list-style-type: decimal;
      //font-family: "Roboto Mono", monospace;
      text-align: left;
      font-size: 13px;
      line-height: 1.5;
      margin: 0 -60px;
      padding-left: -10px;
    }

    ul {
    }

    li {
      list-style-type: square;
      //font-family: "Roboto Mono", monospace;
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
`;

export const ContentSection = styled.div`
    background: #111111;
    width: 100%;
    margin: 5px auto;
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
    //font-family: "Montserrat", sans-serif;
    color: #cecac3;
    width: 100%;
`;

export const CommentContainer = styled.div`
    background-color: #111111;
    border-radius: 5px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-wrap: normal;
`;
