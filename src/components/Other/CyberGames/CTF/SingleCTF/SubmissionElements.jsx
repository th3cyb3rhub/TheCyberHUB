import styled from "styled-components";

export const SubmissionContainer = styled.div`
    background: #0c0c0c;
    padding: 25px;
    margin: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    gap: 25px;
`;

export const SubmissionFlagSection = styled.div`
    display: flex;
    gap: 5px;
`;

export const SubmissionSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
`;

export const FlagQues = styled.div`
    width: 80%;
    color: #d3d3d3;
    font-size: 14px;
    font-family: "Poppins", sans-serif;
`;

export const FlagAns = styled.input`
    width: 100%;
    padding: 5px 10px;
`;

export const FlagSolved = styled.p`
    color: #646464;
    background: #f5f5f5;
    border-radius: 3px;
    width: 100%;
    font-size: 13px;
    padding: 5px 12px;
`;

export const FlagSubmit = styled.button`
    background: #7cff2f;
    white-space: nowrap;
    padding: 5px 10px;
    color: #010606;
    font-size: 14px;
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    border-radius: 3px;

    &:hover {
        transition: all 0.2s ease-in-out;
        scale: 1.05;
    }
`;

export const FlagHintButton = styled(FlagSubmit)`
    background: #ff8100;
`;

export const ShowFlagHint = styled.div`
    background: #ffffff;
    border-radius: 3px;
    color: #646464;
    width: 100%;
    font-size: 13px;
    padding: 5px 12px;
`;
