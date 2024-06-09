import styled from "styled-components";

export const QuizSection = styled.div`
    min-height: 25em;
    margin: 40px auto;
    color: white;
    font-weight: 600;
    background: #090909;
    width: auto;
    max-width: calc(70rem - 75px);
    height: min-content;
    border-radius: 10px;
    padding: 30px 40px;
    box-shadow: 10px 10px 42px 0 rgb(0 0 0 / 75%);
    display: flex;

    @media screen and (width <= 800px) {
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
    margin: 0 0 30px;
`;

export const SkipButton = styled.button`
    margin: 3%;
    align-self: end;
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #343434;
    background: transparent;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.2s ease-in-out;
    color: #ff6b08;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: transparent;
        border-color: #343434;
        font-size: 17px;
    }
`;
export const InfoButton = styled.button`
    align-self: center;
    text-decoration: none;
    cursor: pointer;
    display: flex;
    align-items: end;
    transition: all 0.2s ease-in-out;
    font-size: 18px;
    position: absolute;
    top: 35%;
    right: 101%;
    z-index: 2;

    &:hover {
        border-color: #343434;
        font-size: 19px;
    }
`;

export const QuestionInfo = styled.div`
    min-height: 2em;
    margin: 40px auto;
    color: white;
    font-weight: 1;
    font-size: 15px;
    background: #181818;
    width: auto;
    max-width: calc(70rem - 75px);
    height: min-content;
    box-shadow: 10px 10px 42px 0 rgb(0 0 0 / 75%);
    border-radius: 10px;
    padding: 30px 40px;
    display: flex;

    @media screen and (width <= 800px) {
        margin: 50px 30px;
    }
`;
export const TooltipText = styled.div`
    position: relative;
    top: 27px;
    right: 95px;
    display: flex;
    align-items: center;
    font-weight: 100;
    width: 65px;
    font-size: 10px;
`;
export const ResetButton = styled.button`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 16px;
    color: #fff;
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
    display: flex;
    flex-direction: column;
`;

export const QuizProgressIndicator = styled.div`
    width: 100%;
    height: 20px;
    margin: 5px 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;
`;

export const ProgressBar = styled.progress`
    appearance: none;
    width: 100%;
    height: 10px;
    grid-column: 1 / -1;

    ::-webkit-progress-bar {
        background-color: #fff;
        border-radius: 100px;
    }

    ::-webkit-progress-value {
        background-color: #ff6b07;
        border-radius: 100px;
    }
`;

export const QuestionCount = styled.div`
    font-size: 20px;
`;

export const QuestionText = styled.div`
    color: #cecac3;
    font-size: 1.2rem;
    font-weight: normal;
    width: 90%;
    margin: 10px 0 25px;
`;

export const AnswerSection = styled.div`
    width: 100%;
    position: relative;
    z-index: 0;
`;

export const QuestionButton = styled.button`
    font-family: Poppins, sans-serif;
    text-align: left;
    width: 100%;
    font-size: 15px;
    color: #cecac3;
    background: #101010;
    border-radius: 5px;
    padding: 10px;
    margin: 7px 0;
    border: 1px solid #232323;
    border-bottom-width: 2px;
    cursor: pointer;
    transition: none;

    &:hover {
        background-color: #ff6b07;
        color: #000;
    }

    &:active {
        background-color: #222;
        transform: scale(0.98);
    }
`;

export const CategoriesSection = styled.section`
    margin: 50px auto 0;
    color: #cecac3;
    width: auto;
    max-width: 70rem;
    padding: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > span {
        cursor: pointer;
        font-size: 1.5rem;

        @media screen and (width >= 769px) {
            display: none;
        }
    }
`;

export const MobileCategories = styled(CategoriesSection)`
    background-color: #1a1c1d;
    border-radius: 1rem;
    box-shadow: 0 0 3px 1px #ff6b07;
    flex-direction: column;
    justify-content: start;
    max-width: fit-content;
    overflow-y: auto;
    height: fit-content;
    position: absolute;
    top: 4.5rem;
    left: 1rem;
    z-index: 1;

    & > button {
        width: 100%;
        margin: 0.5rem 0;
    }
`;

export const CategoriesButton = styled.button`
    background-color: transparent;
    border: 1px solid #232323;
    color: #cecac3;
    cursor: pointer;
    font-weight: bold;
    margin: 0 10px;
    padding: 10px;
    border-radius: 4px;
    letter-spacing: -0.03rem;
    transition: 0.3s ease;

    &:hover {
        background-color: #ff6b07;
        color: #000;
    }

    &:active {
        transform: scale(0.9);
    }

    @media screen and (width <= 768px) {
        display: ${(props) => (props.type === props.show ? "inline-block" : "none")};
    }
`;

export const CategoriesButtonMobile = styled(CategoriesButton)`
    @media screen and (width <= 768px) {
        display: ${(props) => (props.type === props.show ? "none" : "inline-block")};
    }
`;
