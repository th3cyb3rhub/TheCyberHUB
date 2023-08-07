import styled from "styled-components";

export const SubmissionContainer = styled.div`
    background: #0c0c0c;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    gap: 15px;
    border-radius: 5px;
`;

export const SubmissionFlagSection = styled.div`
    display: flex;
    gap: 5px;
    @media screen and (max-width: 500px) {
        flex-direction: column;
    }
`;

export const SubmissionSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    background: #0c0c0c;
    padding: 15px;
    border-radius: 5px;
    border: #1a1c1d 1px solid;
`;

export const FlagQues = styled.div`
    width: 80%;
    color: #d3d3d3;
    font-size: 14px;
    padding: 10px 5px;
    font-family: "Poppins", sans-serif;
`;

export const FlagAns = styled.input`
    background: #131313;
    border-radius: 5px;
    border: #1a1c1d 1px solid;
    color: #d3d3d3;
    width: 100%;
    padding: 10px;
    font-size: 15px;
    font-family: "Poppins", sans-serif;
`;

export const FlagSolved = styled.p`
    background: #131313;
    border-radius: 5px;
    border: #1a1c1d 1px solid;
    color: #d3d3d3;
    width: 100%;
    padding: 10px;
    font-size: 13px;
    font-family: "Poppins", sans-serif;
`;

export const FlagSubmit = styled.button`
    background: #131313;
    color: #7cff2f;
    white-space: nowrap;
    padding: 5px 10px;
    font-size: 14px;
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    border-radius: 3px;

    &:hover {
        transition: all 0.3s ease-in-out;
        scale: 1.07;
    }
`;

export const FlagHintButton = styled(FlagSubmit)`
    background: #131313;
    color: #ff8100;
`;

export const ShowFlagHint = styled.div`
    background: #131313;
    border-radius: 5px;
    border: #1a1c1d 1px solid;
    color: #d3d3d3;
    display: flex;
    align-items: center;

    width: 100%;
    padding: 8px;
    font-size: 12px;
    font-family: "Poppins", sans-serif;
`;
