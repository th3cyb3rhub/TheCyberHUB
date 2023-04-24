import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails, reset } from "../../../../../features/userDetail/userDetailSlice";
import {
    LeaderboardContainer,
    LeaderboardHeader,
    LeaderboardTable,
    LeaderboardTableData,
    LeaderboardTableHeader,
    LeaderboardTableRow,
    RefreshButton,
} from "./CTFLeaderboardElements";

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
            dispatch(reset());
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
                <LeaderboardTable>
                    <tbody>
                        <LeaderboardTableRow>
                            <LeaderboardTableHeader>Flags</LeaderboardTableHeader>
                            {flags?.map((flag, index) => (
                                <LeaderboardTableData key={index}>{index + 1}</LeaderboardTableData>
                            ))}
                        </LeaderboardTableRow>
                        {userDetails &&
                            userDetails?.map(
                                (user, index) =>
                                    getRegisteredUsers.includes(user.username) && (
                                        <LeaderboardTableRow key={index}>
                                            <LeaderboardTableHeader>{user?.username}</LeaderboardTableHeader>
                                            {flags?.map((flag, index) => (
                                                <LeaderboardTableData key={index}>
                                                    {user.solved.some(
                                                        (solved) =>
                                                            solved.ctfId === ctfId &&
                                                            solved.flags.some((flags) => flags.flagId === flag._id),
                                                    )
                                                        ? "✔"
                                                        : "✘"}
                                                </LeaderboardTableData>
                                            ))}
                                        </LeaderboardTableRow>
                                    ),
                            )}
                    </tbody>
                </LeaderboardTable>
            )}
        </LeaderboardContainer>
    );
};

export default CTFLeaderboard;
