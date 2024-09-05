import styled from "styled-components";

export const ReconageSidebarContainer = styled.div`
    width: 250px; /* Set the width of the sidebar */
    background-color: #2c3e50; /* Dark background color */
    color: #ecf0f1; /* Light text color */
    padding: 20px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 20%); /* Add shadow for better visual effect */
    height: 100%;
`;

export const SidebarTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 30px; /* Space between title and list */
`;

export const SidebarList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const SidebarItem = styled.li`
    font-size: 18px;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    color: #fff; /* Change text color on hover */
    transition:
        background-color 0.3s,
        color 0.3s;

    &:hover {
        background-color: #34495e; /* Darker background on hover */
        color: #fff; /* Change text color on hover */
    }
`;
