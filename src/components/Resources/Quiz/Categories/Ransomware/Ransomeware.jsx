import { RansomwareQuestions } from "./RansomewareData";

export default function Ransomware({
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
            You scored {score} out of {RansomwareQuestions.length}
          </ScoreInfo>
          <ResetButton onClick={() => handleResetButton(score)}>Start again</ResetButton>
        </ScoreSection>
      ) : (
        <QuizBody>
          <QuestionSection>
            <QuestionCount>
              <span>Question {currentQuestion + 1}</span>/{RansomwareQuestions.length}
            </QuestionCount>
            <QuestionText>{RansomwareQuestions[currentQuestion].questionText}</QuestionText>
          </QuestionSection>
          <AnswerSection>
            {RansomwareQuestions[currentQuestion].answerOptions.map((answerOption, i) => (
              <QuestionButton
                key={i}
                onClick={() => handleAnswerButtonClick(answerOption.isCorrect, RansomwareQuestions.length)}
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
