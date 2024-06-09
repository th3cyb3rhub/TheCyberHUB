import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails, getUserDetail, userDetailReset } from "src/features/userDetail/userDetailSlice";
import {
    LeaderboardContainer,
    LeaderboardHeader,
    LeaderboardTable,
    LeaderboardTableData,
    LeaderboardTablePoints,
    LeaderboardTableHeader,
    LeaderboardTableHeaderPoints,
    LeaderboardTableRow,
    RefreshButton,
    TopPlayerSection,
    Username,
    LeaderboardTextIconData,
    LeaderboardFirstRow,
} from "./LeaderboardElements";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { RouterLink } from "src/components/Tools/ToolsElements";
import { RankTrophy } from "src/components/Dashboard/Profile/UserPoints/UserPointsElements";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
import { CircleSpinner } from "react-spinners-kit";
import apiStatus from "src/features/apiStatus";

const Leaderboard = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
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
            dispatch(userDetailReset());
        };
    }, [dispatch]);

    const handleRefresh = () => {
        dispatch(getAllUserDetails());
    };

    if (isLoading || isApiLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={20} color={"#ff6b08"} isLoading={isLoading || isApiLoading} />
            </Wrapper>
        );
    }

    if (!isApiWorking) return <UnderMaintenance />;

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
                                <LeaderboardTableHeaderPoints>Points</LeaderboardTableHeaderPoints>
                            </LeaderboardTableRow>
                            {userDetails &&
                                [...userDetails]
                                    // .sort((a, b) => a?.username?.localeCompare(b?.username))
                                    .sort((a, b) => (b?.exp || 0) - (a?.exp || 0))
                                    .map((user, index) => (
                                        <LeaderboardTableRow key={index}>
                                            <LeaderboardTableData>
                                                <LeaderboardTextIconData>
                                                    {index === 0 ? (
                                                        <LeaderboardFirstRow>
                                                            <RankTrophy style={{ color: "#FFD700" }} />
                                                            {index + 1}
                                                        </LeaderboardFirstRow>
                                                    ) : (
                                                        <>
                                                            <RankTrophy /> {index + 1}
                                                        </>
                                                    )}
                                                </LeaderboardTextIconData>
                                            </LeaderboardTableData>
                                            <LeaderboardTableData>
                                                <TopPlayerSection>
                                                    <RouterLink to={`/user/${user?.username}`}>
                                                        {index === 0 ? (
                                                            <Username>
                                                                <LeaderboardFirstRow>
                                                                    {user?.username}
                                                                </LeaderboardFirstRow>
                                                            </Username>
                                                        ) : (
                                                            <Username>{user?.username}</Username>
                                                        )}
                                                    </RouterLink>
                                                </TopPlayerSection>
                                            </LeaderboardTableData>
                                            <LeaderboardTablePoints>
                                                {index === 0 ? (
                                                    <LeaderboardFirstRow>{user?.exp || 0}</LeaderboardFirstRow>
                                                ) : (
                                                    <>{user?.exp || 0}</>
                                                )}
                                            </LeaderboardTablePoints>
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
