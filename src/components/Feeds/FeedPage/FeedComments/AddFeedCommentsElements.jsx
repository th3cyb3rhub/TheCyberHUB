import styled from "styled-components";

export const AddFeedCommentContainer = styled.div`
    border-bottom: 1px solid #1a1a1a;
    background: #000;
    padding: 15px;
    border-radius: 5px;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export const FeedCommentInput = styled.textarea`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    background: transparent;
    border: transparent;
    color: #f5f5f5;
    width: 100%;
    font-family: Roboto, sans-serif;
    line-height: 1.5;
    font-size: 15px;
    text-underline-offset: 5px;
    word-wrap: break-word;
    resize: none; /* Disable resizing via drag */
    overflow: hidden; /* Hide scrollbars */
    padding: 15px 0;

    &::placeholder {
        color: #f5f5f5;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        background: transparent;
        border: transparent;
        color: #f5f5f5;
    }
`;

export const AddCommentButton = styled.button`
    padding: 4px 8px;
    border-radius: 15px;
    background: #2a2a2a;
    border: 1px solid #2a2a2a;
    color: #f5f5f5;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background: #444;
        border: 1px solid #2a2a2a;
        color: #f5f5f5;
        font-size: 15px;
    }
`;
