import styled from "styled-components";

export const InterviewQuestionContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: row;
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
    @media screen and (min-width: 800px) {
        width: 70%;
    }
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
`;

export const InterviewsQuestionsHeading = styled.h2`
    margin: 10px 5px;
    color: #ff6b08;
    font-size: 25px;
`;
export const InterviewsAnswerQuestionsHeading = styled.h2`
    margin: 10px 0px;
    color: #ff6b08;
    font-size: 25px;
    width: 100%;
`;

export const SingleQuestion = styled.p`
    margin: 0 10px;
    color: #ff6b08;
    font-size: 1rem;

    &:hover {
        color: #0a0a0a;
    }
`;
export const InterviewsQuestionsTitle = styled.div`
    //border: #4cc23e 1px solid;
    border-radius: 3px;
    width: 100%;
    background: #131313;
    display: flex;
    margin: 0 0 5px 0;
    padding: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: #e1e1e1;

    &:hover {
        background: #ff6b08;
        color: #0a0a0a;
    }
`;

export const AnswerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    text-align: left;
    width: 100%;
    color: #cccccc;
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
        width: 0px;
        background: transparent; /* Chrome/Safari/Webkit */
    }
`;

export const AnswerCard = styled.div``;

export const BackArrowSection = styled.div``;
