import styled from "styled-components";

export const QuizSection = styled.div`
  margin: 200px auto;
  color: #cecac3;
  background-color: #1a1c1d;
  width: auto;
  max-width: 800px;
  min-height: 350px;
  height: min-content;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 10px 10px 42px 0 rgba(0, 0, 0, 0.75);
  display: flex;
`

export const ScoreSection = styled.div`
  width: 100%;
  display: inline-block;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px;

`
export const ScoreInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 24px;
  margin: 0 0 30px 0;
`
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
`

export const QuizBody = styled.div`
  width: 100%;
`

export const QuestionSection = styled.div`
  width: 100%;
  position: relative;
`

export const QuestionCount = styled.div`
  font-size: 20px;
`

export const QuestionText = styled.div`
  width: 90%;
  margin: 20px 0 20px 0;
`

export const AnswerSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const QuestionButton = styled.button`
  text-align: left;
  width: auto;
  font-size: 16px;
  color: #ffffff;
  background-color: #1a1c1d;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  border: 1PX solid #545454;
  cursor: pointer;
`
