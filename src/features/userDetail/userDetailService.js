import axios from "axios";
import { getApiUrl } from "src/features/apiUrl";

const API_URL = getApiUrl("api/userDetail/");

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
    try {
        const response = await axios.get(API_URL + username);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const getAllUserDetails = async () => {
    try {
        const response = await axios.get(API_URL + "get/all");
        return response.data;
    } catch (error) {
        console.log(error);
    }
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
const updateUserDetail = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL, userData, config);
    return response.data;
};

const userDetailService = {
    createUserDetail,
    getUserDetail,
    deleteUserDetail,
    updateUserDetail,
    getAllUserDetails,
};

export default userDetailService;
