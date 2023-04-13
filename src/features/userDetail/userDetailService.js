import axios from "axios";
import { getApiUrl } from "../apiUrl";

const API_URL = getApiUrl("api/userDetail/");

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

// Get user userDetail
const getUserDetail = async (username) => {
    const response = await axios.get(API_URL + username);

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

// Update user userDetail
const updateUserDetail = async (id, userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + id, userData, config);
    return response.data;
};

const userDetailService = {
    createUserDetail,
    getUserDetail,
    deleteUserDetail,
    updateUserDetail,
};

export default userDetailService;
