import styled from "styled-components";

export const AddFeedCommentContainer = styled.div`
    border-bottom: 1px solid #1a1a1a;
    background: #000000;
    padding: 25px 25px 10px;
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
    color: #fff;
    width: 100%;
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    text-underline-offset: 5px;
    word-wrap: break-word;
    resize: none; /* Disable resizing via drag */
    overflow: hidden; /* Hide scrollbars */

    padding: 15px;

    ::placeholder {
        color: #fff;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        background: transparent;
        border: transparent;
        color: #fff;
    }
`;

export const AddCommentButton = styled.button`
    padding: 4px 8px;
    border-radius: 15px;
    background: #2a2a2a;
    border: 1px solid #2a2a2a;
    color: #fff;

    cursor: pointer;

    transition: all 0.2s ease-in-out;
    &:hover {
        background: #444444;
        border: 1px solid #2a2a2a;
        color: #fff;
        font-size: 15px;
    }
`;
