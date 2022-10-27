import React from "react";
import {
    InterviewQuestionSection,
    InterviewsQuestionsHeading,
    InterviewsQuestionsCard,
    InterviewsQuestionsTitle,
} from "./InterviewQuestionsElements";
import InterviewsQuestionsData from "./InterviewQuestionsData";

const InterviewQuestions = () => {
    return (
        <InterviewQuestionSection>
            {InterviewsQuestionsData.map((Question, id) => {
                return (
                    <InterviewsQuestionsCard key={id}>
                        <InterviewsQuestionsHeading> {Question.title} </InterviewsQuestionsHeading>
                        {Question.details.map((resources, id) => {
                            return <InterviewsQuestionsTitle key={id}>{resources.questions}</InterviewsQuestionsTitle>;
                        })}
                    </InterviewsQuestionsCard>
                );
            })}
        </InterviewQuestionSection>
    );
};

export default InterviewQuestions;
