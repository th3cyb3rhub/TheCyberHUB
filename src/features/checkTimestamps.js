import { getUserDetail } from "./userDetail/userDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const checkTimestamps = ({ user }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserDetail(user.username));
    }, [dispatch, user.username]);

    const { userDetail, loading } = useSelector((state) => state.userDetail);

    if (loading) {
        return "loading";
    }

    if (!userDetail) {
        return null;
    }

    return userDetail.visitTimestamps;
};

export default checkTimestamps;
