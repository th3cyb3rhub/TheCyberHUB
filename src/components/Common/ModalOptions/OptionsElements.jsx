import styled from "styled-components";

export const OptionsMainContainer = styled.div`
    position: relative;
    padding: 2px;
    max-width: 32px;

    &:hover {
        transform: ${({ $isOpen }) => !$isOpen && "scale(1.1)"};
    }

    cursor: pointer;
`;
export const OptionsContainer = styled.div`
    position: absolute;
`;
export const OptionsList = styled.ul`
    padding: 15px 20px;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
`;
export const OptionsItem = styled.li`
    &:hover {
        border-bottom: 0.5px #a1a1a1 solid;
        opacity: 0.7;
        transition: all 0.3s ease;
    }

    display: flex;
    justify-content: space-between;
`;
export const OptionLabel = styled.p`
    font-size: 20px;
    color: #a1a1a1;
`;

export const OptionsClose = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
`;
export const OptionsOverlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 20%);
    z-index: 70;
    cursor: default;
`;
export const OptionsModalContainer = styled.div`
    width: 200px;
    height: 160px;
    position: relative;
    background-color: #0e0e0e;
    border-radius: 10px;
    border: 1px #3d3d3d solid;
    box-shadow: 2px 2px 10px #333;
    padding: 20px 0;
    z-index: 100;
`;
