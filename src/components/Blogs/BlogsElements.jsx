import styled from "styled-components";

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

export const AllBlogs = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-gap: 1rem;
    @media screen and (max-width: 600px) {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
`;
