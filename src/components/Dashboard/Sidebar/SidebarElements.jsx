import styled from "styled-components";
import { Link } from "react-router-dom";

export const DashboardSidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 25px;
    background: #090909;
    width: 300px;
    height: 100vh;
    border-radius: 10px;
    color: #d3d3d3;
    border-right: #2a2a2a 1px solid;
    gap: 15px;

    // stick to the top
    position: sticky;
    top: 0;
`;

export const RouteLink = styled(Link)`
    text-decoration: none;
    color: #d3d3d3;
`;

export const SidebarTitle = styled.h2`
    color: #d3d3d3;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover {
        transition: 0.3s ease-in-out;
        color: #fff;
        scale: 1.1;
    }
`;
