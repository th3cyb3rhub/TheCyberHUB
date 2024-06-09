import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout, userReset } from "src/features/auth/authSlice";
import { toast } from "react-toastify";

// Function to extract expiration time from JWT
const getTokenExpirationTime = (token) => {
    try {
        const decoded = jwtDecode(token);

        if (decoded.exp) {
            return decoded.exp;
        }
    } catch (error) {
        console.error("Error decoding JWT:", error);
    }
    return null;
};

const SessionExpireLogout = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isTokenExpired, setIsTokenExpired] = useState(false);

    const onLogout = () => {
        dispatch(logout());
        dispatch(userReset());
        toast.warn("Your session has expired. Please login again to continue.", {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    useEffect(() => {
        const token = user.token;
        if (token) {
            const tokenExpTime = getTokenExpirationTime(token);
            if (tokenExpTime) {
                setTimeout(() => {
                    setIsTokenExpired(true);
                }, [tokenExpTime * 1000 - Date.now()]);
            }
        }
    }, [user]);

    useEffect(() => {
        if (isTokenExpired) {
            onLogout();
        }
    }, [isTokenExpired]);

    return null;
};

export default SessionExpireLogout;
