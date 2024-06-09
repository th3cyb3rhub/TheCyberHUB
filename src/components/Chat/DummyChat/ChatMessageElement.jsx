import styled from "styled-components";

export const MessageContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: ${({ isOur }) => (isOur ? "flex-end" : "flex-start")};
    margin: 10px;
`;

export const MessageContainerSelf = styled.div`
    display: flex;
    justify-content: ${({ isOur }) => (isOur ? "flex-end" : "flex-start")};
    margin: 10px;
`;

export const SenderImage = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
    margin-top: 5px;
`;

export const MessageContent = styled.div`
    background-color: ${({ isOur }) => (isOur ? "#1f96ec" : "#3d3d3d")};
    border: 1px solid #28292a;
    padding: 10px;
    border-radius: 10px;
    min-width: 200px;
    max-width: 300px;
    font-size: 14px;

    @media screen and (width <= 600px) {
        width: 100%;
    }
`;

export const MessageContentSelf = styled.div`
    background-color: #4284db;
    padding: 10px;
    border-radius: 10px;
    max-width: 300px;
    font-size: 14px;
`;

export const Timestamp = styled.div`
    font-size: 12px;
    color: #bdbdbd;
    margin-top: 5px;
`;
