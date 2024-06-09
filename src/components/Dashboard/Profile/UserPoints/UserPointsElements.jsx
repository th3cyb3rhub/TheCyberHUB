import styled from "styled-components";
import { BsTrophyFill } from "react-icons/bs";

export const UserPointsContainer = styled.div`
    background: #090909;
    width: 100%;
    border-radius: 0.6rem;
    color: #d7d7d7;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 2fr));
    grid-gap: 20px;
    padding: 25px;
    box-sizing: border-box;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
`;

export const RankContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const StreakNumberContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-right: 37px;
`;

export const StreakNumber = styled.p`
    font-weight: 600;
`;
export const RankNumberContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-right: ${(props) => props.$userRank === 1 && "30px"};
`;

export const RankNumber = styled.p`
    /* color: ${(props) => (props.$userRank === 1 ? "#ff6b08" : "#d7d7d7")}; */
    margin-bottom: ${(props) => (props.$userRank === 1 ? "-5px" : "")};
    font-weight: 600;
    margin-left: ${(props) => props.$userRank === 1 && "5px"};
`;

export const RankTrophy = styled(BsTrophyFill)`
    color: white;
    font-size: 1.1rem;
`;

export const UserStreakContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
