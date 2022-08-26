import React, {useState} from 'react';

import {questions} from './QuizData';
import {
    AnswerSection,
    QuestionButton,
    QuestionCount,
    QuestionSection,
    QuestionText, QuizBody,
    QuizSection,
    ResetButton,
    ScoreInfo,
    ScoreSection
} from "./QuizElements";

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [showScore, setShowScore] = useState(false);

    const [score, setScore] = useState(0);

    const [scoreList, setScoreList] = useState(0);

    const handleAnswerButtonClick = (isCorrect) => {

        if (isCorrect === true) {
            setScore(score + 1);

        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            setShowScore(true)
        }
    }

    const handleResetButton = (score) => {
        setScoreList(scoreList + score);
        setCurrentQuestion(0);
        setShowScore(false);
        setScore(0);
    }


    return (
        <QuizSection>
            {showScore ? (
                <ScoreSection>
                    <ScoreInfo>You scored {score} out of {questions.length}</ScoreInfo>
                    <ResetButton onClick={() => handleResetButton(score)}>
                        Start again
                    </ResetButton>
                </ScoreSection>
            ) : (
                <QuizBody>
                    <QuestionSection>
                        <QuestionCount>
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </QuestionCount>
                        <QuestionText>{questions[currentQuestion].questionText}</QuestionText>
                    </QuestionSection>
                    <AnswerSection>
                        {questions[currentQuestion].answerOptions.map((answerOption) => (
                            <QuestionButton onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}>
                                {answerOption.answerText}
                            </QuestionButton>
                        ))}
                    </AnswerSection>
                </QuizBody>
            )}
        </QuizSection>
    );
};

export default Quiz;