import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, reset } from "../../../features/userDetail/userDetailSlice";
import { StreakContainer, StreakIcon, Streaks } from "./StreakElements";
import { CircleSpinner } from "react-spinners-kit";

const Streak = () => {
    const { user } = useSelector((state) => state.auth);
    const { userDetail, isLoading, isError, message } = useSelector((state) => state.userDetail);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (user) dispatch(getUserDetail());
        return () => dispatch(reset());
    }, [isError, message, dispatch, user]);

    if (!isLoading) {
        return (
            <StreakContainer>
                <Streaks>
                    <CircleSpinner size={20} color={"#1fc10d"} /> <StreakIcon />
                </Streaks>
            </StreakContainer>
        );
    }

    const userData = userDetail.find((userDetail) => user._id === userDetail.user) || null;
    if (!userData) {
        return null;
    }

    return (
        <StreakContainer>
            <Streaks>
                {user && userData ? userData.streak : 0}
                <StreakIcon />
            </Streaks>
        </StreakContainer>
    );
};

export default Streak;
