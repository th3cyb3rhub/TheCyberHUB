import styled from "styled-components";

export const ConnectionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: #171718;
    border-radius: 20px;
    padding: 25px;
    margin: 10px;
    border: 1px solid #3a3a3a;
    gap: 10px;
    width: 100%;
    max-width: 800px;
`;

export const ConnectionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #e0e0e0;
`;

export const DropdownButton = styled.button`
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
`;

export const DropdownContent = styled.div`
    background: #1a1c1d;
    position: absolute;
    min-width: 160px;
    box-shadow: 0 8px 16px rgb(0 0 0 / 20%);
    z-index: 1;
`;

export const DropdownItem = styled.div`
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #f1f1f1;
    }
`;
