import axios from "axios";
import { getApiUrl } from "../apiUrl";

const API_URL = getApiUrl("api/blogs/");
const addComment = async (blogId, commentData, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(API_URL + blogId + "/comment", { comment: commentData }, config);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

// Get All blogs
const getAllBlogs = async () => {
    try {
        const response = await axios.get(API_URL + "all");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Create new blog
const createBlog = async (blogData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, blogData, config);

    return response.data;
};

// Update blog
const updateBlog = async (id, blogData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL + id, blogData, config);

    return response.data;
};

// Get user blogs
const getBlogs = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

// Delete user blog
const deleteBlog = async (blogId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + blogId, config);

    return response.data;
};

const blogService = {
    addComment,
    getAllBlogs,
    createBlog,
    updateBlog,
    getBlogs,
    deleteBlog,
};

export default blogService;
