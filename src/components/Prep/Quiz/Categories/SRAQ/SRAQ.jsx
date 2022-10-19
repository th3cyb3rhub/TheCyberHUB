import { SRAQQuestions } from "./SRAQData";

export default function SRAQ({
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
            You scored {score} out of {SRAQQuestions.length}
          </ScoreInfo>
          <ResetButton onClick={() => handleResetButton(score)}>Start again</ResetButton>
        </ScoreSection>
      ) : (
        <QuizBody>
          <QuestionSection>
            <QuestionCount>
              <span>Question {currentQuestion + 1}</span>/{SRAQQuestions.length}
            </QuestionCount>
            <QuestionText>{SRAQQuestions[currentQuestion].questionText}</QuestionText>
          </QuestionSection>
          <AnswerSection>
            {SRAQQuestions[currentQuestion].answerOptions.map((answerOption, i) => (
              <QuestionButton
                key={i}
                onClick={() => handleAnswerButtonClick(answerOption.isCorrect, SRAQQuestions.length)}
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
