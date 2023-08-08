import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails, getUserDetail, userDetailReset } from "../../../../features/userDetail/userDetailSlice";
import {
    LeaderboardContainer,
    LeaderboardHeader,
    LeaderboardTable,
    LeaderboardTableData,
    LeaderboardTableHeader,
    LeaderboardTableRow,
    RefreshButton,
    TopPlayerSection,
    Username,
} from "./LeaderboardElements";
import { Wrapper } from "../../../Dashboard/Profile/ProfileElements";
import { RouterLink } from "../../../Tools/ToolsElements";
import { RankCgCrown } from "../../../Dashboard/Profile/UserPoints/UserPointsElements";
import UnderMaintenance from "../../UnderMaintenance/UnderMaintenance";
import { CircleSpinner } from "react-spinners-kit";
import apiStatus from "../../../../features/apiStatus";

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
                                <LeaderboardTableHeader>Points</LeaderboardTableHeader>
                            </LeaderboardTableRow>
                            {userDetails &&
                                [...userDetails]
                                    // .sort((a, b) => a?.username.localeCompare(b?.username))
                                    .sort((a, b) => (b?.exp || 0) - (a?.exp || 0))
                                    .map((user, index) => (
                                        <LeaderboardTableRow key={index}>
                                            <LeaderboardTableData>{index + 1}</LeaderboardTableData>
                                            <LeaderboardTableData>
                                                <TopPlayerSection>
                                                    {index === 0 ? <RankCgCrown style={{ margin: "0" }} /> : null}
                                                    <RouterLink to={`/@${user?.username}`}>
                                                        <Username>{user?.username}</Username>
                                                    </RouterLink>
                                                    {index === 0 ? <RankCgCrown style={{ margin: "0" }} /> : null}
                                                </TopPlayerSection>
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
