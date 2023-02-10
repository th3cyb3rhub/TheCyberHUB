import styled from "styled-components";

export const BlogsComponent = styled.div`
    display: flex;
    width: 100%;
    max-width: 1500px;
    align-items: center;
    justify-content: center;
`;

export const MiddleContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: start;
    justify-content: space-between;
`;

export const SubContainerTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const SubContainerHeading = styled.h4``;

export const AllBlogs = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    a {
        text-decoration: none;
        color: #cecac3;
    }
`;
