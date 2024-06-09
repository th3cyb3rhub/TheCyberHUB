import styled from "styled-components";

export const MarkdownContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;

export const MarkdownEditorContainer = styled.div`
    border: 1px solid #4f4f4f;
    border-radius: 5px;
    background-color: #090909;
    color: #f5f5f5;
    font-size: 14px;
    overflow: auto;
    height: 100%;
    min-height: 500px;
    max-height: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    &:focus {
        outline: none;
    }

    .md-editor {
        width: 100%;
        min-height: 80vh;
        overflow: auto;
        font-size: 14px;
        background-color: #090909;
        color: #f5f5f5;

        &:focus {
            outline: none;
        }

        &::placeholder {
            color: #f5f5f5;
        }
    }
`;

export const MarkdownLabel = styled.h2`
    text-transform: capitalize;
    text-align: center;
    color: #4f4f4f;
`;
