import axios from "axios";
import { getApiUrl } from "src/features/apiUrl";

const API_URL = getApiUrl("api/feedLikes/");

// Create new Like
const addFeedLike = async (likeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + "add", likeData, config);

    return response.data;
};

// Delete user Like
const removeFeedLike = async (likeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + "remove", likeData, config);

    return response.data;
};

// Get user Likes
const getFeedLikes = async (likesData) => {
    const response = await axios.get(API_URL + "get", likesData);

    return response.data;
};

const LikeService = {
    addFeedLike,
    removeFeedLike,
    getFeedLikes,
};

export default LikeService;
