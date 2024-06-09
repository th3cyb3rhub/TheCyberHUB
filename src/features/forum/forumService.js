import axios from "axios";
import { getApiUrl } from "src/features/apiUrl";

const API_URL = getApiUrl("api/forums/");

// Get All forums
const getAllForums = async () => {
    try {
        const response = await axios.get(API_URL + "all");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Create new forum
const createForum = async (forumData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, forumData, config);

    return response.data;
};

// Update forum
const updateForum = async (id, forumData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL + id, forumData, config);

    return response.data;
};

// Get user forums
const getForums = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

// Delete user forum
const deleteForum = async (forumId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + forumId, config);

    return response.data;
};

const forumService = {
    getAllForums,
    createForum,
    updateForum,
    getForums,
    deleteForum,
};

export default forumService;
