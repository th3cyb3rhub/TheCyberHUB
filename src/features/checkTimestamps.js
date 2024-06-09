import { getUserDetail } from "./userDetail/userDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import apiStatus from "./apiStatus";

const checkTimestamps = ({ user }) => {
    const { isApiLoading, isApiWorking } = apiStatus();
    const dispatch = useDispatch();
    const { userDetail, isLoading } = useSelector((state) => state.userDetail);

    useEffect(() => {
        dispatch(getUserDetail(user?.username));
    }, [dispatch, user?.username]);

    if (isApiLoading || isLoading) {
        return null;
    }

    if (!isApiWorking || !userDetail) {
        return null;
    }

    return userDetail.visitTimestamps;
};

export default checkTimestamps;
