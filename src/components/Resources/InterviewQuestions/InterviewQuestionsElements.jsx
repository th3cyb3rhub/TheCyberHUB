import styled from "styled-components";

export const InterviewQuestionContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    max-width: 1500px;
    gap: 25px;
`;
export const InterviewQuestionSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 100%;
    text-align: center;
    color: #cecac3;
    background: #090909;
`;

export const InterviewsQuestionsCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    text-align: start;
    color: white;
    background: #0a0a0a;
    border: #383838 1px solid;
    border-radius: 3px;
    padding: 10px 15px;
    transition: all 0.3s ease-in-out;
    gap: 5px;
`;

export const InterviewsQuestionsHeading = styled.h2`
    margin: 10px 5px;
    color: #ff6b08;
    font-size: 25px;
`;
export const InterviewsAnswerQuestionsHeading = styled.h2`
    margin: 10px 0;
    color: #ff6b08;
    font-size: 25px;
    width: 100%;
`;

export const ArrowIcon = styled.p`
    margin: 0 10px;
    color: #ff6b08;
    font-size: 1rem;

    &:hover {
        color: #0a0a0a;
    }
`;
export const SingleQuestion = styled.p`
    border-radius: 3px;
    width: 100%;
    background: ${(props) => (props.isSelected ? "#ff6b08" : "#131313")};
    color: ${(props) => (props.isSelected ? "#0A0A0A" : "#e1e1e1")};
    display: flex;
    padding: 5px 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: #ff6b08;
        color: #0a0a0a;
    }
`;

export const QuestionSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 100%;
`;
export const InterviewsQuestionsTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
`;

export const AnswerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    text-align: left;
    width: 100%;
    color: #ccc;
    background: #0a0a0a;
    border: #383838 1px solid;
    border-radius: 3px;
    padding: 10px 15px;
    transition: all 0.3s ease-in-out;
    position: sticky;
    height: auto;
    font-size: 1rem;
    z-index: 2;
    top: 80px;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    overflow: auto;
    max-height: 80vh;

    /* hide scrollbar */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
        width: 0;
        background: transparent; /* Chrome/Safari/Webkit */
    }
`;
