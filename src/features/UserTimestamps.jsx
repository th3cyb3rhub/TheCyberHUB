import checkTimestamps from "./checkTimestamps";
import { updateUserDetail } from "./userDetail/userDetailSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const UserTimestamps = ({ user }) => {
    const userTimestamps = checkTimestamps({ user });

    const TodayDate = new Date().toISOString();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userTimestamps) {
            return;
        }

        const checkTodayTimestamp = userTimestamps?.map(
            (timestamp) => timestamp?.split("T")[0] === TodayDate?.split("T")[0],
        );

        if (!checkTodayTimestamp?.includes(true)) {
            dispatch(
                updateUserDetail({
                    id: user._id,
                    userData: { visitTimestamps: TodayDate },
                }),
            );
        }
    }, [dispatch, TodayDate, user._id, userTimestamps]);

    return null;
};

export default UserTimestamps;
