import styled from "styled-components";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

export const LearningPathContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    max-width: 1500px;
    //border: #2a2a2a 1px solid;
    @media (max-width: 780px) {
        flex-direction: column;
    }
`;

export const SectionHeading = styled.p`
    font-family: "Roboto", sans-serif;
    display: flex;
    font-size: 30px;
    justify-content: center;
`;

export const LoginToAccess = styled.p`
    margin: 100px 25px 25px;
    font-family: "Roboto", sans-serif;
    display: flex;
    font-size: 30px;
    justify-content: center;
    color: #989898;
`;

export const NavigationButtonContainer = styled.div`
    width: 100%;
    max-width: 350px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 420px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const ButtonText = styled.p`
    margin: 25px 25px;
    padding: 5px 25px;
    font-size: 20px;
`;

export const NavigationButtonSection = styled.div`
    margin: 0 25px;
`;

export const LearningPathWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1300px;
    width: 100%;
`;

export const BackArrow = styled(IoMdArrowRoundBack)`
    background: #33e33c;
    border-radius: 50%;
    color: #f5f5f5;
    padding: 5px;
    font-size: 30px;
    cursor: pointer;
    transition: 260ms all;

    &:hover {
        background: linear-gradient(to right, #ffb933, #54f843);
        outline-color: #545454;
        outline-offset: 2px;
        scale: 1.1;
    }

    //@media only screen and (min-width: 1200px) {
    //    display: none;
    //}
`;
export const ForwardArrow = styled(IoMdArrowRoundForward)`
    background: #33e33c;
    border-radius: 50%;
    color: #f5f5f5;
    padding: 5px;
    font-size: 30px;
    cursor: pointer;
    transition: 260ms all;

    &:hover {
        background: linear-gradient(to right, #ffb933, #54f843);
        outline-color: #545454;
        outline-offset: 2px;
        scale: 1.1;
    }

    //@media only screen and (min-width: 1200px) {
    //    display: none;
    //}
`;

export const IFrameVideo = styled.iframe`
    width: 100%;
    height: 450px;

    @media (max-width: 767px) {
        height: 300px;
    }

    @media (min-width: 768px) {
        height: 500px;
    }
`;

export const LeftContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    text-align: start;
    flex-direction: column;
    padding: 25px;
    width: 100%;
    max-width: 350px;
    @media (max-width: 1100px) {
        width: 100%;
    }
`;

export const TopicBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #212121;
    height: 50px;
    width: 100%;
    min-width: 300px;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 0 5px;
    cursor: pointer;
    ${(props) =>
        props.isSelected &&
        `
      background: #505050;
  `}
`;

export const ContentHeading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;
export const CheckboxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;
export const Checkbox = styled.input`
    //height: 15px;
    //width: 15px;
    //border-radius: 100%;
    width: 1.3em;
    height: 1.3em;
    border-radius: 50%;
    vertical-align: middle;
    border: 1.5px solid #b0b0b0;
    appearance: none;
    cursor: pointer;

    :checked {
        background-color: #36cc24;
        border: 1.5px solid #313131;
    }
`;
export const ContentNavigation = styled.div`
    display: flex;
`;

export const RightContainer = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    width: 100%;
    @media (max-width: 1100px) {
        width: 100%;
    }
`;

export const Content = styled.div`
    //width: 800px;
`;
export const ContentList = styled.div`
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
`;

export const Weeks = styled.div``;

export const Week = styled.h2``;
export const Days = styled.div`
    margin: 25px 0;
    display: ${(props) => (props.isWrapped ? "none" : "block")};
    transition: all 0.5s ease-in-out;
`;

export const VLine = styled.hr`
    height: auto;
    border: #1a1a1a 1px solid;
    background: #1a1a1a;
    //@media (max-width: 1100px) {
    //    display: none;
    //}
`;

export const HLine = styled.hr`
    margin-top: 10px;
    margin-bottom: 10px;
    height: 1px;
`;
