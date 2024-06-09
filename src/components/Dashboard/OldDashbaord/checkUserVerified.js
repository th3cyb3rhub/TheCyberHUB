import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "src/features/apiUrl";

export const useUserData = ({ user }) => {
    const [userData, setUserData] = useState({});
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!user) {
            setUserData({});
        } else if (user.token) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(getApiUrl("api/users/getUser"), {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    });
                    setUserData(response.data);
                } catch (err) {
                    setMessage(err.message);
                }
            };
            fetchUserData();
        }
    }, [user && user.token]);

    if (message === "Network Error") {
        return message;
    }

    return userData;
};
