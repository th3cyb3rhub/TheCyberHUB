import { VSQQuestions } from "./VSQData";

export default function VSQ({
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
            You scored {score} out of {VSQQuestions.length}
          </ScoreInfo>
          <ResetButton onClick={() => handleResetButton(score)}>
            Start again
          </ResetButton>
        </ScoreSection>
      ) : (
        <QuizBody>
          <QuestionSection>
            <QuestionCount>
              <span>Question {currentQuestion + 1}</span>/{VSQQuestions.length}
            </QuestionCount>
            <QuestionText>
              {VSQQuestions[currentQuestion].questionText}
            </QuestionText>
          </QuestionSection>
          <AnswerSection>
            {VSQQuestions[currentQuestion].answerOptions.map(
              (answerOption, i) => (
                <QuestionButton
                  key={i}
                  onClick={() =>
                    handleAnswerButtonClick(
                      answerOption.isCorrect,
                      VSQQuestions.length
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
