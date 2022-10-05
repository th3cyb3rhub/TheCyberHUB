import styled from "styled-components";

export const QuizSection = styled.div`
  margin: 100px auto;
  color: #53c42e;
  background-color: #1a1c1d;
  width: auto;
  max-width: 800px;
  min-height: 350px;
  height: min-content;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 10px 10px 42px 0 rgba(0, 0, 0, 0.75);
  display: flex;
  
  @media screen and (max-width: 800px) {
    margin: 50px 30px;
  }
`;

export const ScoreSection = styled.div`
  width: 100%;
  display: inline-block;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px;
`;

export const ScoreInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 24px;
  margin: 0 0 30px 0;
`;

export const ResetButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16px;
  color: #ffffff;
  background-color: #1a1c1d;
  border-radius: 5px;
  padding: 15px 0;
  border: 1px solid #545454;
  cursor: pointer;

  &:hover {
    background-color: #2c2f30;
  }
`;

export const QuizBody = styled.div`
  width: 100%;
`;

export const QuestionSection = styled.div`
  width: 100%;
  position: relative;
`;

export const QuestionCount = styled.div`
  font-size: 20px;
`;

export const QuestionText = styled.div`
  color: #fff;
  font-size: 1.2rem;
  width: 90%;
  margin: 20px 0 20px 0;
`;

export const AnswerSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const QuestionButton = styled.button`
  text-align: left;
  width: auto;
  font-size: 16px;
  color: #cecac3;
  background-color: #1a1c1d;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  border: 1px solid #545454;
  cursor: pointer;

  &:hover {
    background-color: #2c2f30;
  }
`;

export const CategoriesSection = styled.section`
  margin: 150px auto 0;
  color: #cecac3;
  width: auto;
  max-width: 70em;
  //outline: 0.01px solid white;
  padding: 25px;
  display: flex;
  @media screen and (max-width: 800px) {
    margin: 150px 30px 0;
  }
`;

export const CategoriesButton = styled.button`
  background-color: transparent;
  //box-shadow: 2px 2px 2px #cecac3;
  color: #cecac3;
  cursor: pointer;
  font-weight: bold;
  //outline: 1px solid #cecac3;
  margin: 0 10px;
  padding: 8px;
  border: #545454 1px solid;
  border-radius: 5px;

  &:hover {
    background-color: #cecac3;
    color: #010606;
    font-size: 15px;
  }
`;
