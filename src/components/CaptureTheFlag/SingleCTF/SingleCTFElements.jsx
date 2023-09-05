import styled from "styled-components";

export const SingleCTFContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1500px;
`;

export const ChallengeContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 5px;
`;

export const ChallengeName = styled.h2`
    background: #0c0c0c;
    padding: 15px 15px;
    white-space: pre-line;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 5px;
`;
export const ChallengeDescription = styled.p`
    background: #0c0c0c;
    padding: 15px;
    white-space: pre-line;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 5px;
`;

export const CTFRegistration = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    max-width: 500px;
    background: #0c0c0c;
    padding: 25px;
    border-radius: 5px;
`;

export const ButtonCTFRegister = styled.button`
    background: #2a2a2a;
    white-space: nowrap;
    padding: 10px 10px;
    color: #fff;
    outline: none;

    border: 1px solid #252525;
    border-radius: 5px;

    font-family: "Ubuntu", sans-serif;
    font-size: 16px;

    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    margin: 10px 0;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #ff6b08;
        color: #0e0e0e;
    }
`;

export const CTFMachineLink = styled.a`
    background: #101010;
    white-space: pre-wrap;
    padding: 7px 25px;
    color: #fff;
    font-size: 14px;
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    border-radius: 5px;

    &:hover {
        transition: all 0.2s ease-in-out;
        color: #00b2ff;
        scale: 1.01;
    }
`;

export const CTFSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
    gap: 25px;
    background: #090909;
    padding: 5px;
`;

export const SingleCTFSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    width: 100%;
    gap: 25px;

    @media screen and (max-width: 860px) {
        flex-direction: column;
    }
`;

export const MainCTFSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const LikesAndViewsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 50px;
    background: #0c0c0c;
    width: 100%;
    padding: 15px 0;
    border-radius: 5px;
`;

export const LikesContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 1.5rem;
`;

export const ViewsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 1.5rem;
`;
