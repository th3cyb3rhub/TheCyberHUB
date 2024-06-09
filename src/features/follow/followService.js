import axios from "axios";
import { getApiUrl } from "src/features/apiUrl";

const API_URL = getApiUrl("api/follow/");

const followUser = async (followId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.post(API_URL + `followUser`, { followId }, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const unfollowUser = async (unfollowId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.post(API_URL + `unfollowUser`, { unfollowId }, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const getFollowData = async (userId) => {
    try {
        const response = await axios.get(API_URL + `getFollowData/` + userId);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const resetPasswordService = {
    followUser,
    unfollowUser,
    getFollowData,
};

export default resetPasswordService;
