import styled from "styled-components";

import { ToastContainer } from "react-toastify";

export const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    flex: 0 0 20%;
    background: #151414;
    padding: 15px;
    height: 100%;
    border-radius: 10px;
    gap: 15px;
`;

export const PayloadsContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1500px;
    gap: 25px;
    height: calc(100vh - 100px);
`;

export const SidebarItem = styled.li`
    padding: 5px 8px;
    background-color: ${({ isSelected }) => (isSelected ? "#3a3939" : "#252424")};
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ isSelected }) => (isSelected ? "#3a3939" : "#2f2f2f")};
    }
`;

export const PayloadGroup = styled.div`
    margin-bottom: 30px;
`;

export const PayloadTitle = styled.h2`
    margin-bottom: 15px;
    color: #e0e0e0;
`;

export const PayloadList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const CopyButton = styled.button`
    background-color: #ff7300;
    border: none;
    color: #252525;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 3px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }
`;

export const CopyAllButton = styled(CopyButton)`
    position: absolute;
    top: 10px;
    right: 10px;
`;

export const MainContent = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: #151414;
    border-radius: 10px;
    position: relative;
`;

export const StyledToastContainer = styled(ToastContainer).attrs({
    className: "toast-container",
    toastClassName: "dark-toast",
    bodyClassName: "toast-body",
    progressClassName: "toast-progress",
})`
    .dark-toast {
        background-color: #333;
        color: #fff;
    }

    .toast-body {
        font-family: Arial, sans-serif;
    }

    .toast-progress {
        background-color: #4caf50;
    }
`;
