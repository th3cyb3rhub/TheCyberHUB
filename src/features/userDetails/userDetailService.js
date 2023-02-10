import axios from "axios";
import getApiUrl from "../apiUrl";

const API_URL = getApiUrl("api/userDetails/");

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
