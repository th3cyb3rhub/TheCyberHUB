import styled from "styled-components";
import { BiGitRepoForked } from "react-icons/bi";
import { AiTwotoneStar } from "react-icons/ai";
import { GoIssueOpened } from "react-icons/go";

export const IconStar = styled(AiTwotoneStar)`
    color: #ff6b08;
    font-size: 25px;
`;

export const IconFork = styled(BiGitRepoForked)`
    color: #ff6b08;
    font-size: 25px;
`;

export const IconIssue = styled(GoIssueOpened)`
    color: #ff6b08;
    font-size: 25px;
`;

export const OpenSecProjectsContainer = styled.div`
    max-width: 1500px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;

    gap: 25px;
    transition: all 1.3s ease-in-out;

    .cards {
        padding: 25px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 25px;
        background-color: #090909;

        transition: all 1.3s ease-in-out;
        @media (max-width: 1000px) {
            transition: all 1.3s ease-in-out;
            grid-template-columns: repeat(1, 1fr);
        }
    }

    .card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: start;
        background-color: #0c0c0c;
        border-radius: 10px;

        border: 1px solid #2c2c2c;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 16px;
        width: 100%;

        transition: all 0.3s ease-in-out;

        &:hover {
            transform: scale(1.02);
        }
    }

    .card span {
        width: 100%;
    }

    .card-header {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        transition: all 0.3s ease-in-out;

        @media (max-width: 620px) {
            flex-direction: column;
            justify-content: start;
            align-items: start;
        }
    }

    .card-header h2 {
        font-size: 20px;
        margin: 0;
        margin-right: 8px;
    }

    .counts {
        display: flex;
        flex-direction: row;
        justify-content: end;
        align-items: center;
        text-align: center;
        gap: 15px;
    }

    .icon {
        font-size: 20px;
    }

    .card-header .star-count,
    .card-header .fork-count {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: center;
        width: 100%;
    }

    .card-body {
        color: #c7c7c7;
        width: 100%;
    }

    .card-body p {
        margin-bottom: 12px;
    }

    .card-footer a {
        color: #ff6b08;
        transition: all 0.3s ease-in-out;

        width: 100%;
        text-decoration: none;

        &:hover {
            color: #ff6b08;
            text-decoration: underline;
            transition: all 0.3s ease-in-out;
            scale: 1.1;
        }
    }
`;
