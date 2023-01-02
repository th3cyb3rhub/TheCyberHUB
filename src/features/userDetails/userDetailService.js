import axios from "axios";

let API_URL = "";
if (import.meta.env.VITE_WEB_ENV === "dev_production") {
    API_URL = `${import.meta.env.VITE_API_URL}/api/userDetails/`;
} else API_URL = "/api/userDetails/";

// Create new userDetail
const createUserDetail = async (userDetailData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, userDetailData, config);

    return response.data;
};

// Get user userDetails
const getUserDetails = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

// Delete user userDetail
const deleteUserDetail = async (userDetailId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + userDetailId, config);

    return response.data;
};

const userDetailService = {
    createUserDetail,
    getUserDetails,
    deleteUserDetail,
};

export default userDetailService;
