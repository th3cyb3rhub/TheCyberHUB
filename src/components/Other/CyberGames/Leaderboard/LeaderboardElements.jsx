import styled from "styled-components";
import { MdRefresh } from "react-icons/all";

export const LeaderboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 100%;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
    text-align: center;
    align-items: center;
    padding: 8px;
`;

export const LeaderboardTableHeader = styled.th`
    background-color: #101010;
    border: 1px solid #181818;
    padding: 12px;
    text-align: center;
`;

export const LeaderboardTableData = styled.td`
    background: #131313;
    border: 1px solid #181818;
    padding: 5px;
    text-align: center;
`;

export const RefreshSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

export const RefreshButton = styled(MdRefresh)`
    color: #fff;
    cursor: pointer;
    font-size: 30px;
    margin: 0 10px;
`;
