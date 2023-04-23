import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails, reset } from "../../../../features/userDetail/userDetailSlice";
import {
    LeaderboardContainer,
    LeaderboardHeader,
    LeaderboardTable,
    LeaderboardTableData,
    LeaderboardTableHeader,
    LeaderboardTableRow,
    RefreshButton,
} from "./LeaderboardElements";
import { Wrapper } from "../../../Dashboard/Profile/ProfileElements";

const Leaderboard = () => {
    const { userDetails, isLoading, isError, message } = useSelector((state) => state.userDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        dispatch(getAllUserDetails());

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    const handleRefresh = () => {
        dispatch(getAllUserDetails());
    };

    return (
        <Wrapper>
            <LeaderboardContainer>
                <LeaderboardHeader>
                    <h2>Leaderboard </h2> <RefreshButton onClick={handleRefresh} />
                </LeaderboardHeader>
                {isLoading ? (
                    <p>Loading...</p>
                ) : isError ? (
                    <p>{message}</p>
                ) : (
                    <LeaderboardTable>
                        <tbody>
                            <LeaderboardTableRow>
                                <LeaderboardTableHeader>Rank</LeaderboardTableHeader>
                                <LeaderboardTableHeader>Users</LeaderboardTableHeader>
                                <LeaderboardTableHeader>Points</LeaderboardTableHeader>
                            </LeaderboardTableRow>
                            {userDetails &&
                                [...userDetails]
                                    .sort((a, b) => (b?.exp || 0) - (a?.exp || 0))
                                    .map((user, index) => (
                                        <LeaderboardTableRow key={index}>
                                            <LeaderboardTableData>{index + 1}</LeaderboardTableData>
                                            <LeaderboardTableData>{user?.username}</LeaderboardTableData>
                                            <LeaderboardTableData>{user?.exp || 0}</LeaderboardTableData>
                                        </LeaderboardTableRow>
                                    ))}
                        </tbody>
                    </LeaderboardTable>
                )}
            </LeaderboardContainer>
        </Wrapper>
    );
};

export default Leaderboard;
