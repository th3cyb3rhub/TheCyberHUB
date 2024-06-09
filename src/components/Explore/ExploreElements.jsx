import styled from "styled-components";

export const ExploreContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    gap: 25px;
    max-width: 1500px;

    /* background: #090909; */

    @media screen and (width <= 800px) {
        flex-direction: column;
        gap: 0;
        align-items: center;
    }
`;

export const SearchContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 5px;
    border-radius: 5px;

    @media screen and (width <= 800px) {
        /* padding: 15px; */
    }
`;

export const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    max-width: 300px;

    @media screen and (width <= 800px) {
        max-width: 100%;
    }
`;

export const RightContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

export const ExploreContentContainer = styled.div`
    background: #090909;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-auto-rows: 1fr;
    grid-gap: 25px;
    width: 100%;
    border-radius: 5px;
    font-size: 0.8rem;
    padding: 15px;
    gap: 15px;
`;

export const SearchTypeContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    width: 100%;
    background: #090909;
    border-radius: 4px;
    padding: 5px;
`;

export const SearchTypeButton = styled.button`
    background-color: ${(props) => (props.selected ? "#333333" : "#1e1e1e")};
    color: ${(props) => (props.selected ? "#e8e8e8" : "#dadada")};
    font-size: ${(props) => (props.selected ? "1.2rem" : "1rem")};
    border: none;
    padding: 5px 15px;
    cursor: pointer;
    border-radius: 4px;
    width: auto; /* Adjust the button width based on content */
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: #333;
        color: #f5f5f5;
    }
`;

export const BlogsContainer = styled(ExploreContentContainer)`
    /* ExploreContentContainer */
`;

export const JobsContainer = styled(ExploreContentContainer)`
    /* ExploreContentContainer */
`;

export const ToolsContainer = styled(ExploreContentContainer)`
    /* ExploreContentContainer */
`;

export const CoursesContainer = styled(ExploreContentContainer)`
    /* ExploreContentContainer */
`;

export const EventsContainer = styled(ExploreContentContainer)`
    /* ExploreContentContainer */
`;

export const QuizContainer = styled(ExploreContentContainer)`
    /* ExploreContentContainer */
`;

export const InterviewQuesContainer = styled(ExploreContentContainer)`
    /* ExploreContentContainer */
`;

export const RadioContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const RadioLabel = styled.label`
    margin-bottom: 5px;
`;
