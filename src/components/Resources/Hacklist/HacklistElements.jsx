import styled from "styled-components";
import ReactMarkdown from "react-markdown";

export const MarkdownContent = styled(ReactMarkdown)`
    font-family: Inter, sans-serif;
    line-height: 1.6;
    color: #e0e0e0;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: #f60;
        margin-top: 1em;
        margin-bottom: 0.5em;
        font-weight: 600;
    }

    h1 {
        font-size: 2.5em;
    }

    h2 {
        font-size: 2em;
    }

    h3 {
        font-size: 1.75em;
    }

    h4 {
        font-size: 1.5em;
    }

    h5 {
        font-size: 1.25em;
    }

    h6 {
        font-size: 1em;
    }

    p {
        margin-bottom: 10px;
    }

    ul,
    ol {
        margin-bottom: 10px;
        padding-left: 1.5em;
    }

    li {
        margin-bottom: 5px;
        list-style-type: disc;
        line-height: 1.6;
    }

    a {
        color: #4a9eff;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
            color: #f60;
        }
    }

    blockquote {
        border-left: 4px solid #f60;
        padding-left: 1em;
        margin-left: 0;
        font-style: italic;
        color: #b0b0b0;
    }

    code {
        background-color: #2a2a2a;
        padding: 0.2em 0.4em;
        border-radius: 3px;
        font-family: "Fira Code", monospace;
        font-size: 0.9em;
    }

    pre {
        overflow-x: auto;
        font-family: "Fira Code", monospace;
        font-size: 0.9em;
    }

    pre > code {
        background-color: transparent;
        border: none;
        font-family: "Fira Code", monospace;
        font-size: 0.9em;
    }

    img {
        max-width: 100%;
        height: auto;
        border-radius: 5px;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 1em;
    }

    th,
    td {
        border: 1px solid #333;
        padding: 0.5em;
        text-align: left;
    }

    th {
        background-color: #2a2a2a;
        font-weight: 600;
    }
`;

export const Container = styled.div`
    display: flex;
    margin-top: 80px;
    min-height: 100vh;
    background-color: #121212;
`;

export const Sidebar = styled.nav`
    width: 250px;
    background-color: #1a1a1a;
    padding: 2em;
    overflow-y: auto;
    border-right: 1px solid #333;
`;

export const Content = styled.main`
    flex: 1;
    padding: 25px 50px;
    overflow-y: auto;
`;

export const SidebarTitle = styled.h2`
    color: #f60;
    font-size: 1.5em;
    margin-bottom: 1em;
    font-weight: 600;
`;

export const SidebarCategory = styled.div`
    margin-bottom: 1em;
`;

export const SidebarCategoryTitle = styled.div`
    color: #d0d7de;
    cursor: pointer;
    padding: 0.5em;
    background-color: #252525;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #333;
    }
`;

export const SidebarItem = styled.div`
    color: #d0d7de;
    cursor: pointer;
    padding: 0.5em 1em;
    margin-top: 0.5em;
    border-radius: 4px;
    transition:
        background-color 0.3s ease,
        border-left 0.3s ease;

    &:hover {
        background-color: #252525;
    }

    ${({ active }) =>
        active &&
        `
        background-color: #252525;
        font-weight: 600;
        border-left: 3px solid #ff6600;
    `}
`;

export const ContentTitle = styled.h1`
    color: #fff;
    font-size: 2.5em;
    margin-bottom: 0.5em;
    font-weight: 700;
`;

export const RightSidebar = styled.aside`
    width: 250px;
    background-color: #1e1e1e;
    padding: 20px;
    overflow-y: auto;
`;

// export const ContentSection = styled.section`
//     margin-bottom: 30px;
// `;

// export const SectionTitle = styled.h2`
//     color: #ff6600;
//     margin-bottom: 10px;
//     font-size: 22px;
// `;

export const TableOfContents = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const TOCItem = styled.li`
    margin-bottom: 8px;
    cursor: pointer;
    color: ${(props) => (props.active ? "#ff6600" : "#e0e0e0")};

    &:hover {
        color: #f60;
    }
`;
