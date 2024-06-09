import styled from "styled-components";
import { ExploreContentContainer } from "src/components/Explore/ExploreElements";

export const Cards = styled(ExploreContentContainer)`
    background-color: ${(props) => (props.$displayAt === "explore" ? "#090909" : "#000000")};
    padding: ${(props) => (props.$displayAt ? "15px" : "0")};

    /* for multi line text */
`;
