import styled from "styled-components";
import { ExploreContentContainer } from "src/components/Explore/ExploreElements";

export const FeedPostsContainer = styled(ExploreContentContainer)`
    background-color: ${({ $displayAt }) => ($displayAt === "explore" ? "#090909" : "#000000")};
    padding: ${({ $displayAt }) => ($displayAt === "explore" ? "15px" : "0")};
    grid-auto-rows: minmax(min-content, max-content);
    gap: ${({ $displayAt }) => ($displayAt === "explore" ? "25px" : "0")};

    @media (width <= 1230px) {
        grid-auto-rows: auto;
        gap: 15px;
    }
`;

export const Content = styled.div`
    padding: 20px;
`;

export const PostForm = styled.div`
    padding: 20px;
`;

export const FeedPostContainer = styled.div`
    border-bottom: 1px solid #1a1a1a;
    background: #000;
    padding: 15px;
    display: flex;
    width: 100%;
    flex-direction: row;
    height: ${({ $displayAt }) => ($displayAt === "explore" ? "auto" : "min-content")};

    @media screen and (width <= 800px) {
        width: 100%;
        height: min-content;
    }
`;

export const LeftSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: flex-start;
    gap: 5px;
    width: max-content;
    min-width: 60px;
`;

export const RightSection = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`;
export const RightHeaderSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 10px;
`;
export const PostTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;
    color: #999;
    gap: 5px;
    width: max-content;
`;

export const PostTag = styled.span`
    background: #1a1a1a;
    color: #adadad;
    padding: 2px 5px;
    border-radius: 5px;
    font-size: ${({ size }) => (size === "lg" ? "15px" : "0.8rem")};
`;

export const PostHeader = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 10px;
    margin-bottom: 10px;
    width: 100%;
`;

export const PostHeaderImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    font-size: 12px;
    color: #999;
    word-break: break-all;
`;

export const PostHeaderUsername = styled.h2`
    margin: 0;
    font-size: 18px;
    color: #f5f5f5;
`;

export const PostTimestamp = styled.p`
    font-size: 14px;
    color: #999;
    margin-left: auto;
`;

export const PostContent = styled.p`
    font-size: 16px;
    flex-wrap: wrap;
    width: 100%;
    overflow: hidden;

    /* break text */
    word-wrap: break-word;

    /* pre line */
    white-space: pre-line;
    display: -webkit-box;
    -webkit-line-clamp: 5;

    /* -webkit-box-orient: vertical; */
`;

export const PostActions = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
    padding: 15px 0 0;
    font-size: 14px;
    color: #999;
`;

export const PostActionsAndStatsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    font-size: 14px;
    color: #999;
    width: 100%;
`;

export const PostStat = styled.div`
    display: flex;
    gap: 7px;
`;

export const PostStatLabel = styled.span`
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        scale: 1.1;
    }
`;

export const PostStatValue = styled.span`
    font-size: 10px;
    margin-top: 2px;
`;

export const Footer = styled.div`
    background-color: #333;
    color: #f5f5f5;
    text-align: center;
`;
