import React, { useEffect } from "react";
import { ExpContainer, ExpIcon, ExpText, StreakText } from "./ExpElemenets";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, reset } from "../../features/userDetail/userDetailSlice";
import { CircleSpinner } from "react-spinners-kit";

export const getStreak = (userDetail) => {
    const ActivityDates = userDetail?.solved?.map((ctf) => ctf?.flags?.map((flag) => flag?.date)).flat() || [];
    const visitTimestamps = userDetail?.visitTimestamps || [];
    const allDates = [...ActivityDates, ...visitTimestamps];
    const dates = allDates.map((date) => date && date.split("T")[0]);
    const streak = [...new Set(dates)].length || 1;
    return streak;
};

const Exp = () => {
    const dispatch = useDispatch();
    const {
        userDetail,
        isLoading,
        // isError, message
    } = useSelector((state) => state.userDetail);

    useEffect(() => {
        dispatch(getUserDetail);
        return () => dispatch(reset());
    }, [dispatch]);

    const exp = userDetail?.exp || 0;

    if (isLoading) return <CircleSpinner size={20} color="#09ff1b" loading={isLoading} />;

    return (
        <ExpContainer>
            <ExpText> {exp} XP </ExpText>
            <StreakText>
                {getStreak(userDetail)} <ExpIcon />
            </StreakText>
        </ExpContainer>
    );
};

export default Exp;
