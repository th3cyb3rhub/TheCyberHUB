import styled from "styled-components";

export const BlogsTagsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: start;
    padding: 25px;
    width: 100%;
    max-width: 250px;
    height: auto;
    background: #101010;
    margin-bottom: 15px;
    border-radius: 15px;
`;

export const Tags = styled.div`
    display: flex;
    font-size: 150%;
    flex-wrap: wrap;
    word-wrap: break-word;

    @media screen and (max-width: 600px) {
        flex-wrap: wrap;
        padding: 15px 0;
        width: 100%;
        font-size: 10px;
    }
`;

export const Tag = styled.p`
    background: #252525;
    padding: 0 10px;
    margin: 5px 10px 5px 0;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: transform 0.3s;
    flex-wrap: wrap;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;

    &:hover {
        transform: scale(1.03);
    }
`;
