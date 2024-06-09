import axios from "axios";
import { getApiUrl } from "src/features/apiUrl";

const API_URL = getApiUrl("api/notesCategory/");

// Create new notesCategory
const createNotesCategory = async (notesCategoryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, notesCategoryData, config);

    return response.data;
};

// Update notesCategory
const updateNotesCategory = async (id, notesCategoryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL + id, notesCategoryData, config);

    return response.data;
};

// Get user categories
const getNotesCategories = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

// Delete user notesCategory
const deleteNotesCategory = async (notesCategoryId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + notesCategoryId, config);
    return response.data;
};

const notesCategoryService = {
    createNotesCategory,
    updateNotesCategory,
    getNotesCategories,
    deleteNotesCategory,
};

export default notesCategoryService;
