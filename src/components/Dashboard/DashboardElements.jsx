import styled from "styled-components";
import { Link } from "react-router-dom";
export const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const DashboardItemsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin: 25px;
    border-radius: 10px;
    color: whitesmoke;

    @media screen and (max-width: 768px) {
        flex-wrap: wrap;
    }
`;

export const DashboardItemsLink = styled(Link)`
    width: 100%;
    max-width: 300px;
    text-align: center;
    border: #2a2a2a 1px solid;
    margin: 10px;
    padding: 50px 100px;
    border-radius: 10px;
    cursor: pointer;
    color: whitesmoke;
`;
