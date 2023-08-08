import axios from "axios";
import { getApiUrl } from "../../apiUrl";

const API_URL = getApiUrl("api/feeds"); // Replace with the actual API endpoint for replies

// Get replies for a feed
const getComments = async () => {
    try {
        const response = await axios.get(`${API_URL}/replies`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Add a comment to a feed
const addComment = async (feedId, replyData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.post(`${API_URL}/${feedId}/replies`, replyData, config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Update a comment
const updateComment = async (commentId, content, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.put(API_URL + commentId, { content }, config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Delete a comment
const deleteComment = async (commentId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.delete(API_URL + commentId, config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const commentService = {
    getComments,
    addComment,
    updateComment,
    deleteComment,
};

export default commentService;
