import styled from "styled-components";

export const StyledTopicsContainer = styled.div`
    width: 100%;
    max-width: 1500px;
    height: 100%;
    background-color: #090909;
    display: flex;
    flex-direction: row;
    gap: 20px;
`;

export const StyledTopicCard = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 300px;
    padding: 20px;
    border-radius: 10px;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 18%);

    &:hover {
        transition: all 0.3s ease-in-out;
        transform: translateY(-5px);
        background: #1f0b02;
    }
`;

export const StyledTag = styled.span`
    display: inline-block;
    margin: 2px;
    padding: 4px 8px;
    background: rgb(61 61 61 / 53%);
    border-radius: 4px;

    /* border: 1px solid #444; */
    color: #a1a1a1; /* Tag Text Color */
`;
