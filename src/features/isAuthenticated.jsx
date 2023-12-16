import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "./apiUrl";
import { useDispatch, useSelector } from "react-redux";
import { logout, userReset } from "./auth/authSlice";
import { useNavigate } from "react-router-dom";

const authenticationStatus = () => {
    const [isApiLoading, setIsApiLoading] = useState(false);
    const [isUserAuthorized, setIsUserAuthorized] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuthStatus = async () => {
            setIsApiLoading(true);
            try {
                const response = await axios.get(getApiUrl("api/isAuthorized"), {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });
                if (response.data.isAuthorized === true) {
                    setIsUserAuthorized(true);
                    setIsApiLoading(false);
                } else {
                    setIsUserAuthorized(false);
                    setIsApiLoading(false);
                }
            } catch (error) {
                setIsUserAuthorized(false);
                setIsApiLoading(false);
            }

            if (!isApiLoading && !isUserAuthorized) {
                dispatch(logout());
                dispatch(userReset());
                navigate("/");
                setIsApiLoading(false);
            }
        };

        checkAuthStatus();
    }, []);
};

export default authenticationStatus;
