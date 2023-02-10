import styled from "styled-components";
import { Link } from "react-router-dom";
export const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const DashboardItemsContainer = styled.div`
    margin: 50px;
    border-radius: 10px;
    color: whitesmoke;
`;

export const DashboardItemsLink = styled(Link)`
    border: #2a2a2a 1px solid;
    width: 250px;
    margin: 10px;
    padding: 50px 100px;
    border-radius: 10px;
    cursor: pointer;
    color: whitesmoke;
`;
