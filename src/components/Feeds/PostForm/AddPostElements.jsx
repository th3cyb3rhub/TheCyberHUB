import styled from "styled-components";
import { FcAddImage } from "react-icons/fc";

export const AddFeedCommentContainer = styled.div`
    border-bottom: 1px solid #1a1a1a;
    background: #000;
    border-radius: 5px;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding-bottom: 20px;
`;

export const PostFormTextarea = styled.textarea`
    font-family: Poppins, sans-serif;
    border: none;
    padding: 25px;
    margin: 10px 0;
    font-size: 17px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: transparent;
    color: #f5f5f5;
    width: 100%;
    height: 250px;

    &::placeholder {
        color: #f5f5f5;
    }

    &:focus {
        outline: none;
    }
`;

export const FooterSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const AddImage = styled(FcAddImage)`
    margin-right: 10px;
    cursor: pointer;
    font-size: 200%;
`;

export const PostFormButton = styled.button`
    padding: 10px 20px;
    cursor: pointer;
    background: transparent;
    color: #f5f5f5;
    border: 1px solid #1a1c1d;
    border-radius: 25px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #1a1c1d;
    }
`;

export const ImageContainer = styled.div`
    position: relative;
    margin-right: 8px;
    margin-bottom: 8px;
`;

export const FeedImage = styled.img`
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-size: 12px;
    color: #999;
    word-break: break-all;

    &:hover {
        opacity: 0.8;
        transform: scale(1.1);
    }
`;

export const RemoveButton = styled.button`
    position: absolute;
    top: 4px;
    right: 4px;
    background: rgb(42 42 42 / 78%);
    border: none;
    border-radius: 50%;
    color: #f00;
    cursor: pointer;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15px;
    width: 15px;
    font-size: 10px;
`;

export const ImagesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 10px;
`;
