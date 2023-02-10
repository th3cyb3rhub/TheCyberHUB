import styled from "styled-components";

export const LearningPathContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 1300px;
    margin-top: 50px;
    border: #2a2a2a 1px solid;
    padding: 50px;
    @media (max-width: 780px) {
        flex-direction: column;
    }
`;

export const IFrameVideo = styled.iframe`
    width: 100%;
    height: 500px;
`;

export const LeftContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    text-align: start;
    flex-direction: column;
    width: 30%;

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
    border-radius: 5px;
    margin-bottom: 10px;
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
    width: 100%;
`;

export const RightContainer = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    width: 70%;

    @media (max-width: 1100px) {
        width: 100%;
    }
`;

export const Content = styled.div``;
export const ContentList = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Weeks = styled.div``;

export const Week = styled.h2``;
export const Days = styled.div`
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
