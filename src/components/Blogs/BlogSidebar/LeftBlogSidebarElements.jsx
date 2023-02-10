import styled from "styled-components";
import { Link } from "react-router-dom";

export const RouterLink = styled(Link)``;

export const LeftBlogSidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 600px;
    min-width: 250px;
    align-items: flex-start;
    justify-content: flex-start;

    @media screen and (max-width: 970px) {
        width: auto;
        min-width: auto;
    }
`;

export const ExploreHeading = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    font-size: 17px;
    cursor: pointer;
`;

export const ExploreContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: start;
    padding: 10px;
    width: 100%;
    height: auto;
    background: #101010;
    margin-bottom: 15px;
    border-radius: 5px;
`;
