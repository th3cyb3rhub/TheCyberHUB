import axios from "axios";
import { getApiUrl } from "src/features/apiUrl.js";

const API_URL = getApiUrl("api/follow/");

// Helper function to create config with authorization header
const authConfig = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
});

const followUser = async (followId, token) => {
    try {
        const response = await axios.post(API_URL, { followId }, authConfig(token));
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message || "An error occurred while following the user";
    }
};

const unfollowUser = async (unfollowId, token) => {
    try {
        const response = await axios.delete(API_URL, {
            data: { unfollowId },
            ...authConfig(token),
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message || "An error occurred while unfollowing the user";
    }
};

const getFollowData = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message || "An error occurred while fetching follow data";
    }
};

const followService = {
    followUser,
    unfollowUser,
    getFollowData,
};

export default followService;
