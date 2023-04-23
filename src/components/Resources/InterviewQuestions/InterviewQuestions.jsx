import React, { useState } from "react";
import {
    AnswerContainer,
    BackArrowSection,
    InterviewQuestionContainer,
    InterviewQuestionSection,
    InterviewsQuestionsCard,
    InterviewsQuestionsHeading,
    InterviewsQuestionsTitle,
} from "./InterviewQuestionsElements";
import InterviewsQuestionsData from "./InterviewQuestionsData";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { BackArrow } from "../Jobs/JobsElements";

const InterviewQuestions = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const [isShown, setIsShown] = useState(true);
    const handleIsShown = () => {
        setIsShown(!isShown);
    };
    const onQuestionClick = (questionToFind) => {
        setIsShown(!isShown);
        setSelectedQuestion(questionToFind);
        const questionObject = InterviewsQuestionsData.find((data) =>
            data.details.find((question) => question.question === questionToFind),
        );
        setSelectedAnswer(questionObject.details.find((question) => question.question === questionToFind).answer);
    };

    return (
        <Wrapper>
            <InterviewQuestionContainer>
                {window.innerWidth < 800 ? (
                    isShown ? (
                        <InterviewQuestionSection>
                            {InterviewsQuestionsData.map((Question, index) => {
                                return (
                                    <InterviewsQuestionsCard key={index}>
                                        <InterviewsQuestionsHeading> {Question.title} </InterviewsQuestionsHeading>
                                        {Question.details.map((resources, index) => {
                                            return (
                                                <InterviewsQuestionsTitle
                                                    onClick={() => onQuestionClick(resources.question)}
                                                    key={index}
                                                >
                                                    {/* {index + 1} */}
                                                    {resources.question}
                                                </InterviewsQuestionsTitle>
                                            );
                                        })}
                                    </InterviewsQuestionsCard>
                                );
                            })}
                        </InterviewQuestionSection>
                    ) : (
                        <AnswerContainer>
                            <BackArrowSection>
                                <BackArrow onClick={handleIsShown} />
                            </BackArrowSection>
                            <InterviewsQuestionsHeading>
                                {selectedQuestion && <h4>{selectedQuestion}</h4>}
                            </InterviewsQuestionsHeading>

                            {selectedAnswer && selectedAnswer.length > 0 ? <p>{selectedAnswer}</p> : "Coming soon"}
                        </AnswerContainer>
                    )
                ) : (
                    <>
                        <InterviewQuestionSection>
                            {InterviewsQuestionsData.map((Question, index) => {
                                return (
                                    <InterviewsQuestionsCard key={index}>
                                        <InterviewsQuestionsHeading> {Question.title} </InterviewsQuestionsHeading>
                                        {Question.details.map((resources, index) => {
                                            return (
                                                <InterviewsQuestionsTitle
                                                    onClick={() => onQuestionClick(resources.question)}
                                                    key={index}
                                                >
                                                    {/* {index + 1} */}
                                                    {resources.question}
                                                </InterviewsQuestionsTitle>
                                            );
                                        })}
                                    </InterviewsQuestionsCard>
                                );
                            })}
                        </InterviewQuestionSection>
                        <AnswerContainer>
                            <BackArrowSection>
                                <BackArrow onClick={handleIsShown} />
                            </BackArrowSection>
                            <InterviewsQuestionsHeading>
                                {selectedQuestion && <h4>{selectedQuestion}</h4>}
                            </InterviewsQuestionsHeading>
                            {selectedAnswer && selectedAnswer.length > 0 ? <p>{selectedAnswer}</p> : "Coming soon"}
                        </AnswerContainer>
                    </>
                )}
            </InterviewQuestionContainer>
        </Wrapper>
    );
};

export default InterviewQuestions;
