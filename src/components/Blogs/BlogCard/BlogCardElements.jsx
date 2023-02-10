import styled from "styled-components";

export const BlogsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    text-align: left;
    height: 100%;
    max-width: 400px;
    border-radius: 5px;
    background: #101010;
    margin: 20px 20px;
    padding: 15px 20px;
    border: 1px solid #2a2a2a;
    transition: 260ms all;
    color: white;

    &:hover {
        border-color: #545454;
    }
`;

export const BottomSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

export const BlogsContainerTitle = styled.div`
    padding: 10px 0;

    h6 {
        font-size: 0.9rem;
        font-weight: 400;
    }

    .blogImage-wrapper {
        position: relative;
        margin: auto;
        overflow: hidden;

        img {
            max-width: 100%;
            transition: all 0.3s;
            display: block;
            width: 100%;
            height: auto;
            transform: scale(1);
            margin-bottom: 10px;

            &:hover {
                transform: scale(1.04);
            }
        }
    }
`;

export const Counts = styled.div`
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Bookmark = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const Comments = styled.div`
    margin-right: 10px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const Likes = styled.div`
    margin-right: 10px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const Views = styled.div`
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Tags = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 10px 0 20px 0;
`;

export const Tag = styled.div`
    margin: 0 2px;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: transparent;
    border: 1px solid #545454;
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
    transition: 260ms all;

    &:hover {
        background-color: rgba(0, 121, 255, 0.89);
        color: white;
    }
`;
