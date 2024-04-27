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
    const [ShowAdditionalInfo, setShowAdditionalInfo] = useState(false);

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
        let nextQuestion = currentQuestion;

        if (isCorrect === true) {
            setShowAnswer(true);
            setClickedAnswerIndex(null);
            setButtonClicked(true);
            setDisableSkipButton(false);
            setTimeout(() => {
                nextQuestion = currentQuestion + 1;
                setScore(score + 1);
                setCurrentQuestion(nextQuestion);
                setShowAnswer(false);
                setButtonClicked(false);
                setDisableSkipButton(true);

                if (nextQuestion < length) {
                    setCurrentQuestion(nextQuestion);
                } else {
                    setShowScore(true);
                }
            }, 2000);
        } else if (isCorrect === false) {
            setScore(score - 1);
            setShowAnswer(true);
            setClickedAnswerIndex(i);
            setButtonClicked(true);
            if (ShowAdditionalInfo) {
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
        if (ShowAdditionalInfo) {
            setShowAdditionalInfo(false);
        }
        if (nextQuestion < length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
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
                    <QuizBody>
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
                                    {ShowAdditionalInfo && showAnswer ? (
                                        <PopUpWindow onClose={handleClosePopup}>
                                            <div
                                                style={{
                                                    backgroundColor: "#282828",
                                                    padding: "30px",
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                afezfbfibzfbzbfezbfbezzfbfbijbbfzfff iueb f f hfen c v v e vbe vebvv
                                                nnffbfefbjfnefefnejnfjenff fn fnuf i jafinevjnzkfdiezjfnz vj ejf vef ee
                                                vfeunejiuir rencnerc freuer vuire reinjznjzeof zef efiiv rjr f ervne f
                                                nvevf vfenv rf revevne fn reinvev evue vebve jveiuv h
                                                jnrjfnerjnjnijnegene vnv e vri jner v jnf erfref v feij ionz ezf &jv vi
                                                invenvvjev vnvevev iefenrbvnjre e r en n iuznfjnerzfv nn n v{" "}
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
                                    >
                                        <SkipButton onClick={() => handleSkipButton(questions.length)}>
                                            nextQuestion {`>>>`}
                                        </SkipButton>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                        </QuestionSection>
                        <AnswerSection>
                            {questions[currentQuestion].answerOptions.map((answerOption, i) => (
                                <div key={i} style={{ position: "relative", zIndex: 0 }}>
                                    {showAnswer && !answerOption.isCorrect && i === clickedAnswerIndex && (
                                        <InfoButton onClick={(event) => handleAdditionalInfoButton(event)}>
                                            <BsInfoCircle />
                                        </InfoButton>
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
                    </QuizBody>
                )}
            </QuizSection>
        </Wrapper>
    );
}
