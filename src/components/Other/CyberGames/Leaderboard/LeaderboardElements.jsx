import styled from "styled-components";
import { MdRefresh } from "react-icons/md";

export const LeaderboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 100%;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgb(0 0 0 / 20%);
    background: #090909;
    max-width: 1000px;
`;

export const LeaderboardHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding: 0 25px;
`;

export const LeaderboardTable = styled.table`
    border-collapse: collapse;
    width: 100%;
`;
export const LeaderboardTableRow = styled.tr`
    background-color: #181818;
    color: #dadada;
    padding: 8px;

    &:hover {
        background-color: #333;
    }
`;

export const LeaderboardTableHeader = styled.th`
    background-color: #101010;
    border: 1px solid #181818;
    text-align: start;
    padding: 12px;
`;
export const LeaderboardTableHeaderPoints = styled.th`
    background-color: #101010;
    border: 1px solid #181818;
    padding: 12px;
    text-align: right;
`;

export const LeaderboardTableData = styled.td`
    border: 1px solid #181818;
    padding: 5px 12px;
    text-align: start;
`;

export const LeaderboardTextIconData = styled.span`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 5px;
`;
export const LeaderboardFirstRow = styled.span`
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 5px;
`;

export const LeaderboardTablePoints = styled.td`
    border: 1px solid #181818;
    padding: 5px 12px;
    text-align: right;
`;

export const RefreshSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

export const RefreshButton = styled(MdRefresh)`
    color: #f5f5f5;
    cursor: pointer;
    font-size: 30px;
    margin: 0 10px;
`;

export const TopPlayerSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 5px;
`;

export const Username = styled.p`
    font-size: 1rem;
    font-weight: 550;
    color: #d5d5d5;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        color: #f5f5f5;
        scale: 1.01;
    }
`;
