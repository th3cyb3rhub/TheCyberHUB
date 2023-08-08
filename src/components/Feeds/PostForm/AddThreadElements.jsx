import styled from "styled-components";
import { ImCross } from "react-icons/im";

export const AddThreadsContainer = styled.div`
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 5px;

    .popup-inner {
        border: #2a2a2a solid 1px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const CloseButton = styled(ImCross)`
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 25px;
    color: #090a0c;
    background: #fc6c1a;
    border-radius: 50%;
    padding: 5px;

    transition: all 0.3s ease-in-out;
    &:hover {
        background: #f5f5f5;

        color: #000;
    }
`;
