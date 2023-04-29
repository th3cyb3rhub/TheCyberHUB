import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails, getUserDetail, reset } from "../../../../features/userDetail/userDetailSlice";
import {
    FirstPlace,
    LeaderboardContainer,
    LeaderboardHeader,
    LeaderboardTable,
    LeaderboardTableData,
    LeaderboardTableHeader,
    LeaderboardTableRow,
    RefreshButton,
} from "./LeaderboardElements";
import { Wrapper } from "../../../Dashboard/Profile/ProfileElements";
import { RouterLink } from "../../../Beta/Tools/ToolsElements";
import { CgCrown } from "react-icons/all";

const Leaderboard = () => {
    const { user } = useSelector((state) => state.auth);
    const { userDetails, isLoading, isError, message } = useSelector((state) => state.userDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (user) {
            dispatch(getUserDetail(user?.username));
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
                                            <LeaderboardTableData>
                                                <FirstPlace>
                                                    {index === 0 && (
                                                        <CgCrown
                                                            style={{
                                                                color: "#17f31e",
                                                                fontSize: "50px",
                                                            }}
                                                        />
                                                    )}
                                                </FirstPlace>
                                                <RouterLink to={`/@${user?.username}`}>{user?.username}</RouterLink>
                                            </LeaderboardTableData>
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
