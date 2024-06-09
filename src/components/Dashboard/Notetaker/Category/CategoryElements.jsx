import styled from "styled-components";

export const CategoriesSidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 250px;

    @media screen and (width <= 800px) {
        width: 35%;
    }
`;

export const CategoriesSidebarHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border: 2px solid #111;
    height: 3rem;
`;

export const CategoriesSidebarHeaderTitle = styled.h3`
    color: #fff;
    text-align: center;
    margin-bottom: 0;
    font-family: "Roboto Mono", monospace;
`;
export const CategoriesListContainer = styled.ul`
    flex: ${(props) => (props.required || props.$addMode ? "" : 1)};
    margin-bottom: ${(props) => (props.required ? "5px" : "0")};
    display: flex;
    flex-direction: column;
    gap: 5px;
    border: 2px solid #111;
    border-top: 0;
    border-bottom: ${(props) => (props.$addMode ? "0px" : "2px solid #111111")};
    padding: 5px;
    overflow-y: auto;
    z-index: ${(props) => (props.$addMode ? "-100" : 0)};
`;
export const CategoriesListNoFound = styled.h4`
    color: #787878;
    text-align: center;
    margin-bottom: 0;
    font-family: "Roboto Mono", monospace;
`;
export const CategoryOptionsMenuContainer = styled.div`
    display: none;
    padding: 1px;
    position: absolute;
    right: 5px;
`;
export const CategoryItemElementContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover ${CategoryOptionsMenuContainer} {
        display: block;
    }
`;

export const CategoryItemElement = styled.li`
    position: relative;
    width: 100%;
    padding: 10px;
    gap: 5px;
    background-color: ${(props) => (props.$isPicked ? "#2a2a2a" : "#090909")};
    border: 1px solid #111;
    border-radius: 5px;
    color: #f5f5f5;

    &:hover {
        background-color: #383838;
        cursor: pointer;
    }

    @media screen and (width <= 500px) {
        font-size: 1.5rem;
        padding: 25px;
    }
`;
export const CategoryItemShortTitle = styled.p`
    text-transform: capitalize;
    font:
        15px "Roboto Mono",
        monospace;
    font-weight: 600;
`;

export const ModifyCategoryModalContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #111;
    background-color: #111;
    padding: 2px;
`;
export const ModifyCategoryModalInput = styled.input`
    padding: 7px 12px;
    color: white;
    width: 100%;
    border-radius: 3px;
    outline: none;
    text-transform: capitalize;
    background-color: #090909;
    font:
        16px Poppins,
        sans-serif;
    line-height: 1;
`;
export const ModifyCategoryModalButtons = styled.div`
    display: flex;
    padding: 7px;
    justify-content: space-between;
    width: 70px;
`;
export const CategoriesOptionsModeTitle = styled.div`
    font-size: 14px;
`;
export const CategoriesOptionsModeButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70px;
`;
export const CategoryMenuButtons = styled.div`
    padding: 20px 10px 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    width: 100px;
    right: 0;
    z-index: 5;
    border: #383838 1px solid;
    background-color: #090909;
    border-radius: 8px;
    box-shadow: 2px 2px #383838;
`;
export const CategoryMenuButton = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    cursor: pointer;
    margin-bottom: 15px;

    &:hover {
        opacity: 0.7;
    }
`;
export const CategoryMenuButtonLabel = styled.label`
    color: #fff;
    cursor: pointer;
    text-align: start;
    margin-left: 10px;
`;
export const CategoryCreateContainer = styled.div`
    padding: 7px;
`;
