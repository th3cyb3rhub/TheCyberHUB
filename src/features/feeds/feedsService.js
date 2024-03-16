import axios from "axios";
import { getApiUrl } from "src/features/apiUrl";

const API_URL = getApiUrl("api/feeds/");
const addComment = async (feedId, commentData, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(API_URL + feedId + "/comment", { comment: commentData }, config);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

// Get All feeds
const getAllFeeds = async () => {
    try {
        const response = await axios.get(API_URL + "all");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Create new feed
const createFeed = async (feedData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, feedData, config);

    return response.data;
};

// Update feed
const updateFeed = async (id, feedData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL + id, feedData, config);

    return response.data;
};

// Get user feeds
const getFeeds = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

// Delete user feed
const deleteFeed = async (feedId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + feedId, config);

    return response.data;
};

const feedsService = {
    addComment,
    getAllFeeds,
    createFeed,
    updateFeed,
    getFeeds,
    deleteFeed,
};

export default feedsService;
