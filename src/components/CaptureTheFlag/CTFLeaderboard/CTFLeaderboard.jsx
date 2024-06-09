import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails, userDetailReset } from "src/features/userDetail/userDetailSlice";
import {
    LeaderboardContainer,
    LeaderboardHeader,
    LeaderboardTable,
    LeaderboardTableData,
    LeaderboardTableHeader,
    LeaderboardTableHeaderIndex,
    LeaderboardTableRow,
    PlayersContainer,
    RefreshButton,
} from "./CTFLeaderboardElements";
import { RouterLink } from "src/components/Tools/ToolsElements";

const CTFLeaderboard = ({ ctfId, registeredUsers, flags }) => {
    const { userDetails, isLoading, isError, message } = useSelector((state) => state.userDetail);
    const dispatch = useDispatch();
    const getRegisteredUsers = registeredUsers?.map((user) => user.username);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        dispatch(getAllUserDetails());

        return () => {
            dispatch(userDetailReset());
        };
    }, [dispatch]);

    const handleRefresh = () => {
        dispatch(getAllUserDetails());
    };

    return (
        <LeaderboardContainer>
            <LeaderboardHeader>
                <h2>Players </h2> <RefreshButton onClick={handleRefresh} />
            </LeaderboardHeader>
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>{message}</p>
            ) : (
                <PlayersContainer>
                    <LeaderboardTable>
                        <tbody>
                            <LeaderboardTableRow>
                                <LeaderboardTableHeader></LeaderboardTableHeader>
                                <LeaderboardTableHeader>Flags</LeaderboardTableHeader>
                                {flags?.map((flag, index) => (
                                    <LeaderboardTableData key={index}>{index + 1}</LeaderboardTableData>
                                ))}
                            </LeaderboardTableRow>
                            {userDetails &&
                                userDetails
                                    .filter((user) => getRegisteredUsers.includes(user.username))
                                    .sort((a, b) => {
                                        const aFlagsCount = a.solved.reduce(
                                            (count, solved) => count + solved.flags.length,
                                            0,
                                        );
                                        const bFlagsCount = b.solved.reduce(
                                            (count, solved) => count + solved.flags.length,
                                            0,
                                        );
                                        if (bFlagsCount !== aFlagsCount) {
                                            return bFlagsCount - aFlagsCount;
                                        } else {
                                            return a.username.localeCompare(b.username);
                                        }
                                    })
                                    .map((user, index) => (
                                        <LeaderboardTableRow key={index}>
                                            <LeaderboardTableHeaderIndex>
                                                {/* {index <= 10 ? (0) : null} */}
                                                {index + 1}
                                            </LeaderboardTableHeaderIndex>
                                            <LeaderboardTableHeader>
                                                <RouterLink to={`/user/${user?.username}`} style={{ color: "inherit" }}>
                                                    {user?.username}
                                                </RouterLink>
                                            </LeaderboardTableHeader>
                                            {flags?.map((flag, index) => (
                                                <LeaderboardTableData key={index}>
                                                    {user.solved.some(
                                                        (solved) =>
                                                            solved.ctfId === ctfId &&
                                                            solved.flags.some((flags) => flags.flagId === flag._id),
                                                    )
                                                        ? "✔"
                                                        : ""}
                                                </LeaderboardTableData>
                                            ))}
                                        </LeaderboardTableRow>
                                    ))}
                        </tbody>
                    </LeaderboardTable>
                </PlayersContainer>
            )}
        </LeaderboardContainer>
    );
};

export default CTFLeaderboard;
