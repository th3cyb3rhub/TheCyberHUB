import styled from "styled-components";
import { ImCross } from "react-icons/im";

export const PopupContainer = styled.div`
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 40%);
    border-radius: 5px;
    overflow: hidden;

    .popup-inner {
        margin-top: 50px;
        border: #2a2a2a solid 1px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0 0 0 / 59%);
    }

    @media screen and (width <= 768px) {
        .popup-inner {
            margin-top: 0;
            width: 90%;
        }
    }
`;

export const CloseButton = styled(ImCross)`
    position: absolute;
    top: 13px;
    right: 13px;
    border: none;
    cursor: pointer;
    font-size: 25px;
    color: #090a0c;
    background: #f67c07;
    border-radius: 50%;
    padding: 5px;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: #fff;
        color: #000;
    }
`;
