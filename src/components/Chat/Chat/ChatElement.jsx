import styled from "styled-components";

export const ChatRoutesContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    width: 100%;

    /* max-width: 1500px; */
`;

export const ChatContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    z-index: 1000;
    top: 0;
    width: 100%;

    /* border-bottom: 1px solid gray;
    max-width: 1500px; */
`;

export const ChatItemsContainer = styled.div`
    width: 100%;
    height: ${(props) => (props?.isBox ? "100%" : "100vh")};
    max-height: ${(props) => (props?.isBox ? "500px" : "100vh")};
    min-height: ${(props) => (props?.isBox ? "500px" : "100vh")};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #f5f5f5;
    overflow: hidden; /* Hide the overflowing content */
    background: #121212;
    padding: 5px;
`;

export const MessageInputContainer = styled.div`
    width: 100%;
    position: relative;
    height: 100%;

    /* padding: 15px; */
    overflow: auto; /* Enable vertical scrolling if content overflows */
`;

export const Message = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #121212;
`;

export const LeftNav = styled.div`
    font-size: 25px;
    font-weight: bold;
    font-family: "Fire Code", monospace;
    display: flex;
    align-items: center;
`;
export const RightNav = styled.div`
    font-size: 20px;
    gap: 25px;
    display: flex;
    list-style: none;
    align-items: center;
`;

export const Chatbox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export const Input = styled.input`
    border-radius: 15px;
    display: block;
    height: calc(2.25rem + 2px);
    padding: 0 10px;
    font-size: 16px;
    color: #fff;
    background-color: #2a2a2a;
    background-clip: padding-box;
    transition:
        border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
    position: relative;
    flex: 1 1 auto;
    width: 100%;
    border: 1px solid #000;

    &:focus {
        outline: none;
        border: none !important;
        box-shadow: none !important;
    }
`;

export const InputGroup = styled.span`
    cursor: pointer;
    padding: 10px;
    margin: 5px;
    display: flex;
    background: #1a1c1d;
    border-radius: 10px;
    border-left: 1px solid #3f3f3f;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #464646;
    }
`;
