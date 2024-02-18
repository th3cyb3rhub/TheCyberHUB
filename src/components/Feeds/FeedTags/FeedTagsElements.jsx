import styled from "styled-components";

export const TagsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: start;
    padding: 20px;
    width: 100%;
    max-width: 500px;
    background: #131313;
    border-radius: 5px;
    @media screen and (max-width: 800px) {
        padding: 15px;
        display: none;
    }

    @media screen and (max-width: 600px) {
        padding: 15px;
        display: none;
    }
`;

export const AllTags = styled.div`
    display: flex;
    //font-size: 150%;
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
    background: #212121;
    padding: 0 10px;
    margin: 5px 10px 5px 0;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: transform 0.3s;
    flex-wrap: wrap;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
    text-transform: capitalize;
    user-select: none;
    color: #e5e5e5;

    &:hover {
        transform: scale(1.03);
    }
`;
