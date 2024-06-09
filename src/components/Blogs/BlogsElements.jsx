import styled from "styled-components";
import { ExploreContentContainer } from "src/components/Explore/ExploreElements";

export const BlogsContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1500px;
    align-items: center;
    justify-content: center;
`;
export const BlogsSection = styled.div`
    width: 100%;
    display: flex;
    gap: 25px;
    flex-direction: row;
    max-width: 1500px;
    align-items: flex-start;
    justify-content: space-between;
    padding: 15px;

    @media screen and (width <= 800px) {
        flex-direction: column;
    }
`;
export const MiddleContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
`;

export const SubContainerTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const AllBlogs = styled(ExploreContentContainer)`
    background-color: ${(props) => (props.$displayAt === "explore" ? "#090909" : "#000000")};
    padding: ${(props) => (props.$displayAt ? "15px" : "0")};
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Adjust this as per your requirement */
    gap: 15px;

    @media screen and (width <= 800px) {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
`;

export const Select = styled.select`
    border: 1px solid #000;
    padding: 8px;
    font-size: 16px;
    width: 200px;
    border-radius: 4px;
    background: #252525;
    color: #d7d7d7;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 1px #1a1c1d;
    }

    @media screen and (width <= 380px) {
        width: 100%;
    }
`;

export const Option = styled.option`
    border: 1px solid #000;
    font-size: 16px;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 1px #1a1c1d;
    }
`;
