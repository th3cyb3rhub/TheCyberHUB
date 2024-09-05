import styled from "styled-components";
import { FcAddImage } from "react-icons/fc";

export const ImageUploadLabel = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1c1d;
    color: #f5f5f5;
    border: 1px solid #1a1c1d;
    border-radius: 3px;
    padding: 10px 20px;
    cursor: pointer;

    @media screen and (width <= 500px) {
        padding: 5px;
    }
`;
export const AddImage = styled(FcAddImage)`
    font-size: 25px;
    cursor: pointer;
`;
export const ImageContainer = styled.div`
    position: relative;
    margin-right: 8px;
    margin-bottom: 8px;
`;
export const PreviewImage = styled.img`
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
