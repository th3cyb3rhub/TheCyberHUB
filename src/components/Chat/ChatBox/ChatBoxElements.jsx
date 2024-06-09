import styled from "styled-components";

export const ChatBoxContainer = styled.div`
    z-index: 2;
    color: white;
    position: relative;
`;

export const ChatBoxShowButton = styled.button`
    position: fixed;
    bottom: 0;
    right: 20px;
    width: 250px;
    background-color: #151515;
    color: white;
    border: 1px solid #2a2a2a;
    border-radius: ${(props) => (props?.$isOpen ? "0" : "5px 5px 0 0")};
    padding: 10px 25px;
    font-size: 18px;
    cursor: pointer;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ChatBoxUserList = styled.div`
    position: fixed;
    bottom: 62px;
    right: 20px;
    width: 250px;
    background-color: #151515;
    color: white;
    border-radius: 0 10px 0 0;
    border: 1px solid #2a2a2a;
    border-left: none;
    font-size: 18px;
    z-index: 2;
    padding: 5px;
    max-height: 460px;
    height: 100%;

    /* display: flex;
    flex-direction: column;
    gap: 10px; */
`;

export const SearchBox = styled.div`
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const UserChatContainer = styled.div`
    position: fixed;
    bottom: 0;
    right: 275px;
    background: #121212;
    border: 1px solid #2a2a2a;
    border-radius: 10px 0 0;
    border-right: none;
    padding: 10px;
    box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
    max-height: 530px;
    z-index: 999;
`;
