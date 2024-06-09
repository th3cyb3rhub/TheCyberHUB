import React, { useEffect, useState } from "react";
import {
    AnswerContainer,
    ArrowIcon,
    InterviewQuestionContainer,
    InterviewQuestionSection,
    InterviewsAnswerQuestionsHeading,
    InterviewsQuestionsCard,
    InterviewsQuestionsHeading,
    InterviewsQuestionsTitle,
    QuestionSection,
    SingleQuestion,
} from "./InterviewQuestionsElements";
import InterviewsQuestionsData from "./InterviewQuestionsData";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { BackArrow } from "src/components/Resources/Jobs/JobsElements";
import HeadingBanner from "src/components/Common/HeadingBanner/HeadingBanner";
import { Checkbox, CheckboxContainer } from "src/components/Courses/LearningPath/LearningPathElements.jsx";

const InterviewQuestions = () => {
    const firstQuestion = InterviewsQuestionsData[0].details[0].question;
    const firstAnswer = InterviewsQuestionsData[0].details[0].answer;

    const [selectedQuestion, setSelectedQuestion] = useState(firstQuestion);
    const [selectedAnswer, setSelectedAnswer] = useState(firstAnswer);

    useEffect(() => {
        setSelectedQuestion(firstQuestion);
        setSelectedAnswer(firstAnswer);
    }, [firstQuestion, firstAnswer]);

    const [isShown, setIsShown] = useState(true);
    const handleIsShown = () => {
        setIsShown(!isShown);
    };

    const [checkboxState, setCheckboxState] = useState(() => {
        return JSON.parse(localStorage.getItem(`interviewQuestions-localstorage`)) || {};
    });

    useEffect(() => {
        const storedCheckboxState = JSON.parse(localStorage.getItem("interviewQuestions-localstorage")) || {};
        setCheckboxState(storedCheckboxState);
    }, []);

    useEffect(() => {
        localStorage.setItem("interviewQuestions-localstorage", JSON.stringify(checkboxState));
    }, [checkboxState]);

    const onQuestionClick = (questionToFind) => {
        setIsShown(!isShown);
        setSelectedQuestion(questionToFind);
        const questionObject = InterviewsQuestionsData.find((data) =>
            data.details.find((question) => question.question === questionToFind),
        );
        setSelectedAnswer(questionObject.details.find((question) => question.question === questionToFind).answer);
    };

    const handleCheckboxChange = (question, isChecked) => {
        setCheckboxState((prevState) => ({
            ...prevState,
            [question]: isChecked,
        }));
    };

    return (
        <Wrapper>
            <InterviewQuestionContainer>
                <HeadingBanner heading={"Interview Questions"} />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "start",
                        justifyContent: "space-between",
                        gap: "25px",
                        width: "100%",
                    }}
                >
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
                                                        isSelected={selectedQuestion === resources.question}
                                                    >
                                                        <SingleQuestion> {">"} </SingleQuestion> {resources.question}
                                                    </InterviewsQuestionsTitle>
                                                );
                                            })}
                                        </InterviewsQuestionsCard>
                                    );
                                })}
                            </InterviewQuestionSection>
                        ) : (
                            <AnswerContainer>
                                <div>
                                    <BackArrow onClick={handleIsShown} />
                                </div>
                                <InterviewsAnswerQuestionsHeading>
                                    {selectedQuestion && <p>{selectedQuestion}</p>}
                                </InterviewsAnswerQuestionsHeading>
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
                                                    <InterviewsQuestionsTitle key={index}>
                                                        <QuestionSection>
                                                            <ArrowIcon> {" > "} </ArrowIcon>
                                                            <SingleQuestion
                                                                onClick={() => onQuestionClick(resources.question)}
                                                                isSelected={selectedQuestion === resources.question}
                                                            >
                                                                {resources.question}
                                                            </SingleQuestion>
                                                        </QuestionSection>

                                                        <CheckboxContainer>
                                                            <Checkbox
                                                                type="checkbox"
                                                                checked={checkboxState[resources.question] || false}
                                                                onChange={(e) =>
                                                                    handleCheckboxChange(
                                                                        resources.question,
                                                                        e.target.checked,
                                                                    )
                                                                }
                                                            />
                                                        </CheckboxContainer>
                                                    </InterviewsQuestionsTitle>
                                                );
                                            })}
                                        </InterviewsQuestionsCard>
                                    );
                                })}
                            </InterviewQuestionSection>
                            <AnswerContainer>
                                <div>
                                    <BackArrow onClick={handleIsShown} />
                                </div>
                                <InterviewsAnswerQuestionsHeading>
                                    {selectedQuestion && <div>{selectedQuestion}</div>}
                                </InterviewsAnswerQuestionsHeading>
                                {selectedAnswer && selectedAnswer.length > 0 ? <p>{selectedAnswer}</p> : "Coming soon"}
                            </AnswerContainer>
                        </>
                    )}
                </div>
            </InterviewQuestionContainer>
        </Wrapper>
    );
};

export default InterviewQuestions;
