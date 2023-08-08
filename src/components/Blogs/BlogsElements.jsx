import styled from "styled-components";
import { ExploreContentContainer } from "../Explore/ExploreElements";

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
    flex-direction: column;
    max-width: 1500px;
`;
export const MiddleContainer = styled.div`
    width: 100%;
    max-width: 1500px;
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

export const SubContainerHeading = styled.h4``;

export const AllBlogs = styled(ExploreContentContainer)`
    background-color: ${(props) => (props.displayAt === "explore" ? "#090909" : "#000000")};
    padding: ${(props) => (props.displayAt ? "15px" : "0")};

    @media screen and (max-width: 800px) {
        grid-auto-rows: 0fr;
        gap: 15px;
        padding: 15px;
    }
`;
