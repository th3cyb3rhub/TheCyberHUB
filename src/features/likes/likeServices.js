import axios from "axios";
import { getApiUrl } from "../apiUrl";

const API_URL = getApiUrl("api/likes/");

// Create new Like
const addLike = async (likeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + "add", likeData, config);

    return response.data;
};

// Delete user Like
const removeLike = async (likeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + "remove", likeData, config);

    return response.data;
};

// Get user Likes
const getLikes = async (likesData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL + "get", likesData, config);

    return response.data;
};

const LikeService = {
    addLike,
    removeLike,
    getLikes,
};

export default LikeService;
