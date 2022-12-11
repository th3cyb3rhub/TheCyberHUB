import React from "react";
import { useState, useEffect, useCallback } from "react";
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
    ScoreSection,
} from "./CategoriesElements";
import {
    CBQQuestions,
    PhishingQuestions,
    PSQQuestions,
    RansomwareQuestions,
    SRAQQuestions,
    TSSQQuestions,
    VSQQuestions,
} from "../CategoriesData";
import CategoriesButtons from "./CategoriesButtons";
import RenderProgressIndicator from "../../../../utils/components/RenderProgressIndicator";

export default function Categories() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [scoreList, setScoreList] = useState(0);
    const [categoryToShow, setCategoryToShow] = useState("CBQ");
    const [showDropdown, setShowDropdown] = useState(false);
    const handleAnswerButtonClick = (isCorrect, length) => {
        if (isCorrect === true) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const handleResetButton = (score) => {
        setScoreList(scoreList + score);
        setCurrentQuestion(0);
        setShowScore(false);
        setScore(0);
    };

    const showCategory = useCallback(
        (type) => {
            setCategoryToShow(type);
        },
        [categoryToShow],
    );

    const openDropdown = useCallback(() => {
        setShowDropdown(true);
    }, [showDropdown]);

    const closeDropdown = useCallback(() => {
        setShowDropdown(false);
    }, [showDropdown]);

    const [questions, setQuestions] = useState(CBQQuestions);

    useEffect(() => {
        if (categoryToShow == "CBQ") {
            setQuestions(CBQQuestions);
        } else if (categoryToShow == "Phishing") {
            setQuestions(PhishingQuestions);
        } else if (categoryToShow == "PSQ") {
            setQuestions(PSQQuestions);
        } else if (categoryToShow == "Ransomware") {
            setQuestions(RansomwareQuestions);
        } else if (categoryToShow == "SRAQ") {
            setQuestions(SRAQQuestions);
        } else if (categoryToShow == "TSSQ") {
            setQuestions(TSSQQuestions);
        } else if (categoryToShow == "VSQ") {
            setQuestions(VSQQuestions);
        }
    });
    return (
        <section>
            <CategoriesButtons
                categoryToShow={categoryToShow}
                showCategory={showCategory}
                handleResetButton={handleResetButton}
                score={score}
                openDropdown={openDropdown}
                closeDropdown={closeDropdown}
                showDropdown={showDropdown}
            />
            <QuizSection>
                {showScore ? (
                    <ScoreSection>
                        <ScoreInfo>
                            You scored {score} out of {questions.length}
                        </ScoreInfo>
                        <ResetButton onClick={() => handleResetButton(score)}>Start again</ResetButton>
                    </ScoreSection>
                ) : (
                    <QuizBody>
                        <QuestionSection>
                            <QuestionCount>
                                <RenderProgressIndicator questionsArray={questions} currentQuestion={currentQuestion} />
                                <span>Question {currentQuestion + 1}</span>
                            </QuestionCount>
                            <QuestionText>{questions[currentQuestion].questionText}</QuestionText>
                        </QuestionSection>
                        <AnswerSection>
                            {questions[currentQuestion].answerOptions.map((answerOption, i) => (
                                <QuestionButton
                                    key={i}
                                    onClick={() => handleAnswerButtonClick(answerOption.isCorrect, questions.length)}
                                >
                                    {answerOption.answerText}
                                </QuestionButton>
                            ))}
                        </AnswerSection>
                    </QuizBody>
                )}
            </QuizSection>
        </section>
    );
}
