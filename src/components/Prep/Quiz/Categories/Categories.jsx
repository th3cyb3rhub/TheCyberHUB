import { useState, useCallback } from "react";
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
import CategoriesButtons from "./CategoriesButtons";
import CBQ from "./CBQ/CBQ";
import Phishing from "./Phishing/Phishing";
import PSQ from "./PSQ/PSQ";
import Ransomware from "./Ransomware/Ransomeware";
import SRAQ from "./SRAQ/SRAQ";
import TSSQ from "./TSSQ/TSSQ";
import VSQ from "./VSQ/VSQ";

export default function Categories() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [showScore, setShowScore] = useState(false);

  const [score, setScore] = useState(0);

  const [scoreList, setScoreList] = useState(0);

  const [categoryToShow, setCategoryToShow] = useState("CBQ");

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
    [categoryToShow]
  );

  const styles = {
    AnswerSection: AnswerSection,
    QuestionButton: QuestionButton,
    QuestionCount: QuestionCount,
    QuestionSection: QuestionSection,
    QuestionText: QuestionText,
    QuizBody: QuizBody,
    QuizSection: QuizSection,
    ResetButton: ResetButton,
    ScoreInfo: ScoreInfo,
    ScoreSection: ScoreSection,
  };

  const statesAndFunctions = {
    currentQuestion: currentQuestion,
    showScore: showScore,
    score: score,
    scoreList: scoreList,
    handleAnswerButtonClick: handleAnswerButtonClick,
    handleResetButton: handleResetButton,
  };

  return (
    <section>
      <CategoriesButtons
        categoryToShow={categoryToShow}
        showCategory={showCategory}
        handleResetButton={handleResetButton}
        score={score}
      />
      {categoryToShow === "CBQ" && <CBQ {...styles} {...statesAndFunctions} />}
      {categoryToShow === "Phishing" && (
        <Phishing {...styles} {...statesAndFunctions} />
      )}
      {categoryToShow === "PSQ" && <PSQ {...styles} {...statesAndFunctions} />}
      {categoryToShow === "Ransomware" && (
        <Ransomware {...styles} {...statesAndFunctions} />
      )}
      {categoryToShow === "SRAQ" && (
        <SRAQ {...styles} {...statesAndFunctions} />
      )}
      {categoryToShow === "TSSQ" && (
        <TSSQ {...styles} {...statesAndFunctions} />
      )}
      {categoryToShow === "VSQ" && <VSQ {...styles} {...statesAndFunctions} />}
    </section>
  );
}
