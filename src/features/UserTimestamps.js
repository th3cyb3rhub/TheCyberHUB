import checkTimestamps from "./checkTimestamps";
import { updateUserDetail } from "./userDetail/userDetailSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import apiStatus from "./apiStatus";

const UserTimestamps = ({ user }) => {
    const { isApiLoading, isApiWorking } = apiStatus();

    const userTimestamps = checkTimestamps({ user });

    const TodayDate = new Date().toISOString();
    const dispatch = useDispatch();

    if (isApiLoading) {
        // do nothing
    }

    useEffect(() => {
        if (!userTimestamps) {
            return;
        }

        const checkTodayTimestamp = userTimestamps?.map(
            (timestamp) => timestamp?.split("T")[0] === TodayDate?.split("T")[0],
        );

        if (isApiWorking && !checkTodayTimestamp?.includes(true)) {
            dispatch(
                updateUserDetail({
                    id: user?._id,
                    userData: { visitTimestamps: TodayDate },
                }),
            );
        }
    }, [dispatch, TodayDate, user?._id, userTimestamps]);

    return null;
};

export default UserTimestamps;
