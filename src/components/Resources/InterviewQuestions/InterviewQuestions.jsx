import React from "react";
import {
    InterviewQuestionSection,
    InterviewsQuestionsHeading,
    InterviewsQuestionsCard, InterviewsQuestionsTitle
} from "./InterviewQuestionsElements";
import InterviewsQuestionsData from "./InterviewQuestionsData";

const InterviewQuestions = () => {
    return (
        <InterviewQuestionSection>
            {InterviewsQuestionsData.map((Question) => {
                return (
                    <InterviewsQuestionsCard>
                        <InterviewsQuestionsHeading> {Question.title} </InterviewsQuestionsHeading>
                        {Question.details.map(
                            (resources) => {
                                return (
                                    <InterviewsQuestionsTitle>
                                        {resources.questions}
                                    </InterviewsQuestionsTitle>
                                )
                            }
                        )}
                    </InterviewsQuestionsCard>
                )
            })}
        </InterviewQuestionSection>
    );
};

export default InterviewQuestions;
