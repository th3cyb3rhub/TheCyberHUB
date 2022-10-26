import RenderProgressIndicator from "../../../../../utils/components/RenderProgressIndicator";
import { CBQQuestions } from "./CBQData";

export default function CBQ({
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
            You scored {score} out of {CBQQuestions.length}
          </ScoreInfo>
          <ResetButton onClick={() => handleResetButton(score)}>Start again</ResetButton>
        </ScoreSection>
      ) : (
        <QuizBody>
          <QuestionSection>
           <RenderProgressIndicator questionsArray={CBQQuestions} currentQuestion={currentQuestion} />
            <QuestionCount>
              <span>Question {currentQuestion + 1}</span>
            </QuestionCount>
            <QuestionText>{CBQQuestions[currentQuestion].questionText}</QuestionText>
          </QuestionSection>
          <AnswerSection>
            {CBQQuestions[currentQuestion].answerOptions.map((answerOption, i) => (
              <QuestionButton
                key={i}
                onClick={() => handleAnswerButtonClick(answerOption.isCorrect, CBQQuestions.length)}
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
