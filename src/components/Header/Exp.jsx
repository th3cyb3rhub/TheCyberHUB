import React, { useEffect } from "react";
import { ExpContainer, ExpIcon, ExpText, StreakText } from "./ExpElemenets";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, userDetailReset } from "src/features/userDetail/userDetailSlice";
import { CircleSpinner } from "react-spinners-kit";
import apiStatus from "src/features/apiStatus";

export const getStreak = (userDetail) => {
    const ActivityDates = userDetail?.solved?.map((ctf) => ctf?.flags?.map((flag) => flag?.date)).flat() || [];
    const visitTimestamps = userDetail?.visitTimestamps || [];
    const allDates = [...ActivityDates, ...visitTimestamps];
    const dates = allDates.map((date) => date && date.split("T")[0]);
    const streak = [...new Set(dates)].length || 1;
    return streak - 1;
};

const Exp = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const { userDetail, isLoading } = useSelector((state) => state.userDetail);

    useEffect(() => {
        if (user) {
            dispatch(getUserDetail(user.username));
        }

        return () => dispatch(userDetailReset());
    }, [dispatch]);

    const exp = userDetail?.exp || 0;

    const { isApiLoading, isApiWorking } = apiStatus();

    if (isLoading || isApiLoading) {
        return (
            <ExpContainer>
                <CircleSpinner size={20} color={"#ff6b08"} isLoading={isLoading || isApiLoading} />
            </ExpContainer>
        );
    }

    if (!isApiWorking) return null;

    return (
        <ExpContainer>
            {userDetail && (
                <>
                    <ExpText> {exp} XP </ExpText>
                    <StreakText>
                        {getStreak(userDetail)} <ExpIcon />
                    </StreakText>
                </>
            )}
        </ExpContainer>
    );
};

export default Exp;
