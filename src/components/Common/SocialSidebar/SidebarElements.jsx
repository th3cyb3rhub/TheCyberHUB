import styled from "styled-components";

export const SidebarContainer = styled.div`
    position: sticky;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    top: 100px;
    width: 100%;
    max-width: 200px;
    min-width: ${(props) => (props.$sidebarType === "explore" ? "310px" : "400px")};
    color: #fff;
    box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
    border-radius: 10px;
`;

export const FilterButton = styled.button`
    font-size: 15px;
    width: 100%;
    gap: 10px;
    font-weight: 600;
    background-color: ${({ $activeButton }) => ($activeButton ? "#ff6b08" : "")};
    color: ${({ $activeButton }) => ($activeButton ? "#0a0a0a" : "")};
    height: 6vh;
    padding: 0 20px;

    &:first-child {
        border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
    }

    &:last-child {
        border-top-right-radius: 7px;
        border-bottom-right-radius: 7px;
    }
`;
