import React from "react";

import { TSSQQuestions } from "./TSSQData";
import RenderProgressIndicator from "../../../../../utils/components/RenderProgressIndicator";

export default function TSSQ({
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
    currentQuestion,
    showScore,
    score,
    // scoreList,
    handleAnswerButtonClick,
    handleResetButton,
}) {
    return (
        <QuizSection>
            {showScore ? (
                <ScoreSection>
                    <ScoreInfo>
                        You scored {score} out of {TSSQQuestions.length}
                    </ScoreInfo>
                    <ResetButton onClick={() => handleResetButton(score)}>Start again</ResetButton>
                </ScoreSection>
            ) : (
                <QuizBody>
                    <QuestionSection>
                        <QuestionCount>
                            <RenderProgressIndicator questionsArray={TSSQQuestions} currentQuestion={currentQuestion} />
                            <span>Question {currentQuestion + 1}</span>
                        </QuestionCount>
                        <QuestionText>{TSSQQuestions[currentQuestion].questionText}</QuestionText>
                    </QuestionSection>
                    <AnswerSection>
                        {TSSQQuestions[currentQuestion].answerOptions.map((answerOption, i) => (
                            <QuestionButton
                                key={i}
                                onClick={() => handleAnswerButtonClick(answerOption.isCorrect, TSSQQuestions.length)}
                            >
                                {answerOption.answerText}
                            </QuestionButton>
                        ))}
                    </AnswerSection>
                </QuizBody>
            )}
        </QuizSection>
    );
}
