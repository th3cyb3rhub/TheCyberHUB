import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
    AnswerSection,
    QuestionButton,
    QuestionCount,
    QuestionSection,
    QuestionText,
    QuizBody,
    QuizSection,
    ResetButton,
    ScoreInfo,
    SkipButton,
    ScoreSection,
    InfoButton,
    TooltipText,
} from "./CategoriesElements";
import PopUpWindow from "src/components/Common/PopUpWindow";
import { BsInfoCircle } from "react-icons/bs";
import {
    CBQQuestions,
    PhishingQuestions,
    PSQQuestions,
    RansomwareQuestions,
    SRAQQuestions,
    TSSQQuestions,
    VSQQuestions,
} from "src/components/Resources/Quiz/CategoriesData";
import RenderProgressIndicator from "src/utils/components/RenderProgressIndicator";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { useNavigate } from "react-router-dom";
import HeadingBanner from "src/components/Common/HeadingBanner/HeadingBanner";
import { CategoriesButtonData } from "./CategoriesButtonData";

export default function QuizPage() {
    const [questions, setQuestions] = useState(CBQQuestions);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [clickedAnswerIndex, setClickedAnswerIndex] = useState(null);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [disableSkipButton, setDisableSkipButton] = useState(true);
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const { type } = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        // Set questions based on the type parameter when the component mounts
        if (type === "CBQ") {
            setQuestions(CBQQuestions);
        } else if (type === "Phishing") {
            setQuestions(PhishingQuestions);
        } else if (type === "PSQ") {
            setQuestions(PSQQuestions);
        } else if (type === "Ransomware") {
            setQuestions(RansomwareQuestions);
        } else if (type === "SRAQ") {
            setQuestions(SRAQQuestions);
        } else if (type === "TSSQ") {
            setQuestions(TSSQQuestions);
        } else if (type === "VSQ") {
            setQuestions(VSQQuestions);
        } else {
            navigator("/NotFound");
        }
    }, [type]);

    const handleAnswerButtonClick = (isCorrect, length, i) => {
        const nextQuestion = currentQuestion;

        if (isCorrect === true) {
            setShowAnswer(true);
            setClickedAnswerIndex(null);
            setButtonClicked(true);
            setDisableSkipButton(true);
        } else if (isCorrect === false) {
            setScore(score - 1);
            setShowAnswer(true);
            setClickedAnswerIndex(i);
            setButtonClicked(true);
            if (showAdditionalInfo) {
                setShowAdditionalInfo(false);
            }
        }

        if (nextQuestion < length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const handleAdditionalInfoButton = (event) => {
        event.stopPropagation();
        setShowAdditionalInfo((prevState) => !prevState);
    };

    const handleClosePopup = () => {
        setShowAdditionalInfo(false);
    };
    const handleSkipButton = (length) => {
        const nextQuestion = currentQuestion + 1;
        setScore(score + 1);
        setCurrentQuestion(nextQuestion);
        setShowAnswer(false);
        setButtonClicked(false);
        if (showAdditionalInfo) {
            setShowAdditionalInfo(false);
        }
        if (nextQuestion < length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };
    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    const handleResetButton = () => {
        // Reset the state and start the quiz again
        setScore(0);
        setCurrentQuestion(0);
        setShowScore(false);
    };

    const category = CategoriesButtonData.find((category) => category.type === type);

    return (
        <Wrapper>
            <HeadingBanner heading={category.value} />
            <QuizSection>
                {showScore ? (
                    <ScoreSection>
                        <ScoreInfo>
                            You scored {score} out of {questions.length}
                        </ScoreInfo>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <ResetButton onClick={handleResetButton}>Start again</ResetButton>
                            <ResetButton
                                onClick={() => {
                                    navigator("/quiz");
                                }}
                                style={{ marginLeft: "10px" }}
                            >
                                Quiz
                            </ResetButton>
                        </div>
                    </ScoreSection>
                ) : (
                    <QuizBody style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column" }}>
                        <QuestionSection>
                            <QuestionCount>
                                <RenderProgressIndicator length={questions.length} currentQuestion={currentQuestion} />
                                <span>Question {currentQuestion + 1}</span>
                            </QuestionCount>
                            <QuestionText>{questions[currentQuestion].questionText}</QuestionText>
                            {showAnswer && disableSkipButton ? (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignSelf: "end",
                                        margin: "10px",
                                        maxWidth: "100%",
                                    }}
                                >
                                    {showAdditionalInfo && showAnswer ? (
                                        <PopUpWindow onClose={handleClosePopup}>
                                            <div
                                                style={{
                                                    backgroundColor: "#282828",
                                                    padding: "30px",
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                {questions[currentQuestion].additionalInfo}
                                            </div>
                                        </PopUpWindow>
                                    ) : (
                                        ""
                                    )}
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignSelf: "end",
                                            margin: "10px",
                                            maxWidth: "100%",
                                        }}
                                    ></div>
                                </div>
                            ) : (
                                ""
                            )}
                        </QuestionSection>
                        <AnswerSection>
                            {questions[currentQuestion].answerOptions.map((answerOption, i) => (
                                <div key={i} style={{ position: "relative", zIndex: 0 }}>
                                    {showAnswer && answerOption.isCorrect && (
                                        <div style={{ height: "0px" }}>
                                            <InfoButton
                                                onClick={(event) => handleAdditionalInfoButton(event)}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <BsInfoCircle />
                                            </InfoButton>
                                            {showTooltip && (
                                                <TooltipText>Click here for additional information</TooltipText>
                                            )}
                                        </div>
                                    )}
                                    <QuestionButton
                                        onClick={() =>
                                            handleAnswerButtonClick(answerOption.isCorrect, questions.length, i)
                                        }
                                        style={{
                                            backgroundColor:
                                                showAnswer && !answerOption.isCorrect && i === clickedAnswerIndex
                                                    ? "red"
                                                    : showAnswer && answerOption.isCorrect
                                                      ? "green"
                                                      : "",
                                        }}
                                        disabled={buttonClicked}
                                    >
                                        {answerOption.answerText}
                                    </QuestionButton>
                                </div>
                            ))}
                        </AnswerSection>
                        <SkipButton onClick={() => handleSkipButton(questions.length)}>
                            next question {`>>>`}
                        </SkipButton>
                    </QuizBody>
                )}
            </QuizSection>
        </Wrapper>
    );
}
