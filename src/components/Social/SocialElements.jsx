import styled from "styled-components";

export const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
`;

export const Content = styled.div`
    padding: 20px;
`;

export const PostForm = styled.div`
    padding: 20px;
    margin-bottom: 20px;
`;

export const Post = styled.div`
    border: 1px solid #1a1a1a;
    margin-bottom: 20px;
    padding: 20px;
`;

export const PostHeader = styled.div`
    display: flex;
    align-items: center;
`;

export const PostHeaderImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-right: 20px;
`;

export const PostHeaderUsername = styled.h2`
    margin: 0;
    font-size: 18px;
`;

export const PostTimestamp = styled.p`
    font-size: 14px;
    color: #999;
`;

export const PostContent = styled.p`
    margin-top: 10px;
    font-size: 16px;
`;

export const PostStats = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 14px;
    color: #999;
`;

export const PostStat = styled.div`
    &:not(:last-child) {
        margin-right: 20px;
    }
`;

export const PostStatLabel = styled.span`
    font-weight: bold;
`;

export const PostStatValue = styled.span`
    margin-left: 5px;
`;

export const Footer = styled.div`
    background-color: #333;
    color: #fff;
    padding: 20px;
    text-align: center;
`;
