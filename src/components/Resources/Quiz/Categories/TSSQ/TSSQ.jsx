import { TSSQQuestions } from "./TSSQData";

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
  scoreList,
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
              <span>Question {currentQuestion + 1}</span>/{TSSQQuestions.length}
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
