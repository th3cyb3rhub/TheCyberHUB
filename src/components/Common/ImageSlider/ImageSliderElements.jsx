import styled from "styled-components";
import { ImCross } from "react-icons/im";

export const ImageSliderContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: #343434 solid 1px;
`;

export const ImagesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

export const Image = styled.img`
    width: 100%;
    max-height: 80vh;
    object-fit: cover;
    transition: all 0.3s ease-in-out;
    font-size: 12px;
    color: #999;
    word-break: break-all;
`;

export const ArrowButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
`;

export const LeftArrow = styled(ArrowButton)`
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    color: #ff6b08;
`;

export const RightArrow = styled(ArrowButton)`
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    color: #ff6b08;
`;

export const CloseButton = styled(ImCross)`
    position: absolute;
    top: 5px;
    right: 5px;
    border: none;
    cursor: pointer;
    font-size: 25px;
    color: #090a0c;
    background: #ff6b08;
    border-radius: 50%;
    padding: 5px;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: #f5f5f5;
        color: #000;
    }
`;
