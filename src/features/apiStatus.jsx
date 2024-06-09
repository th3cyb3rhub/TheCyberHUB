import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "./apiUrl";

const apiStatus = () => {
    const [isApiLoading, setIsApiLoading] = useState(false);
    const [isApiWorking, setIsApiWorking] = useState(false);

    useEffect(() => {
        const checkApiStatus = async () => {
            try {
                setIsApiLoading(true);
                const response = await axios.get(getApiUrl("api/status"));
                if (response.status === 200) {
                    setIsApiWorking(true);
                }
                setIsApiLoading(false);
            } catch (error) {
                setIsApiWorking(false);
                setIsApiLoading(false);
            }
        };

        checkApiStatus();
    }, []);

    return { isApiLoading, isApiWorking };
};

export default apiStatus;
