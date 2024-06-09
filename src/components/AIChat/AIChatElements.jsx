import styled from "styled-components";

export const AIChatContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-direction: row;
    max-width: 1500px;
    width: 100%;
    margin: 0 auto;
    height: 80vh;

    /* padding: 20px; */
    border-radius: 10px;
    box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
`;

export const Divider = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1px;
    height: 100%;
    background: rgb(42 42 42 / 35%);
    padding: 5px;
    border-radius: 10px;
    border: rgb(42 42 42 / 78%) 1px solid;
`;

export const ToggleSection = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ff6b08;
    cursor: pointer;
    background: #252525;
    border-radius: 10px;
    padding: 5px;
    font-size: 30px;
    transition: all 0.3s ease;

    &:hover {
        background: #464646;
        scale: 1.1;
    }
`;

export const ChatBox = styled.div`
    display: flex;
    background: #111;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid rgb(70 70 70 / 55%);

    /* border-radius: 10px; */
    border-radius: 0 10px 10px 0;
    font-size: 18px;
    width: 100%;

    /* max-width: 1100px; */
    gap: 25px;
    padding: 25px;
`;

export const ChatHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ChatTitle = styled.p`
    background: #252525;
    color: #fff;
    border-radius: 10px;
    transition: background 0.3s ease;
    padding: 10px 15px;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    width: 100%;
    margin: 0 auto;
    max-width: 80%;
`;

export const ChatInput = styled.form`
    display: flex;
    gap: 10px;

    input,
    p {
        padding: 10px 15px;
        flex: 1;
        background: #1a1c1d;
        color: #fff;
        border: 1px solid #464646;
        border-radius: 5px;
        font-size: 18px;
        outline: none;

        &::placeholder {
            color: #464646;
        }

        &:focus {
            border: 1px solid #ff6b08;
        }

        &:hover {
            border: 1px solid #ff6b08;
        }

        &:active {
            border: 1px solid #ff6b08;
        }
    }

    button {
        padding: 10px 15px;
        background-color: #ff6b08;
        color: #151515;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
`;

export const BotMessage = styled.div`
    border-radius: 5px;

    &.bot {
        align-self: flex-start;
    }

    &.user {
        align-self: flex-end;
    }

    word-wrap: break-word;
    overflow-wrap: break-word;
`;

export const UserMessage = styled.div`
    /* background: #3d3d3d; vote pankaj */

    background: #1e1e1e; /* vote kabir */
    align-self: flex-end;
    border: 1px solid #333;
    margin-top: 10px;
    border-radius: 10px 1px 0 0;
    font-size: 18px;
    font-weight: bold;
    padding: 15px 20px;
    color: #afafaf; /* Light gray or white */
    font-family: Roboto, sans-serif;
    line-height: 1.5;
    width: 100%;

    .message-content {
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
`;

export const LoadingSpinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #fff;
    margin-top: 20px;
`;

export const ErrorMessage = styled.div`
    color: #ff4c4c;
    margin-top: 20px;
`;

export const Messages = styled.div`
    border-radius: 5px;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow-y: auto;
    height: 100%;
    max-height: 60vh;
`;

export const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    font-size: 18px;
`;
