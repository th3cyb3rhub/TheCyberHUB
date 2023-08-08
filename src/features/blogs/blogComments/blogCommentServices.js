import axios from "axios";
import { getApiUrl } from "../../apiUrl";

const API_URL = getApiUrl("api/blogs"); // Replace with the actual API endpoint for comments

// Get comments for a feed
const getComments = async () => {
    try {
        const response = await axios.get(`${API_URL}/comments`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Add a blog to a feed
const addComment = async (blogId, commentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.post(`${API_URL}/${blogId}/comment`, commentData, config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Update a blog
const updateComment = async (blogId, content, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.put(API_URL + blogId, { content }, config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Delete a blog
const deleteComment = async (blogId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.delete(API_URL + blogId, config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const blogCommentService = {
    getComments,
    addComment,
    updateComment,
    deleteComment,
};

export default blogCommentService;
