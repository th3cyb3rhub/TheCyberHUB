import { PhishingQuestions } from "./PhishingData";

export default function Phishing({
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
            You scored {score} out of {PhishingQuestions.length}
          </ScoreInfo>
          <ResetButton onClick={() => handleResetButton(score)}>
            Start again
          </ResetButton>
        </ScoreSection>
      ) : (
        <QuizBody>
          <QuestionSection>
            <QuestionCount>
              <span>Question {currentQuestion + 1}</span>/
              {PhishingQuestions.length}
            </QuestionCount>
            <QuestionText>
              {PhishingQuestions[currentQuestion].questionText}
            </QuestionText>
          </QuestionSection>
          <AnswerSection>
            {PhishingQuestions[currentQuestion].answerOptions.map(
              (answerOption, i) => (
                <QuestionButton
                  key={i}
                  onClick={() =>
                    handleAnswerButtonClick(
                      answerOption.isCorrect,
                      PhishingQuestions.length
                    )
                  }
                >
                  {answerOption.answerText}
                </QuestionButton>
              )
            )}
          </AnswerSection>
        </QuizBody>
      )}
    </QuizSection>
  );
}
