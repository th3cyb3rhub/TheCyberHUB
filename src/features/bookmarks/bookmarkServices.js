import axios from "axios";
import { getApiUrl } from "src/features/apiUrl";

const API_URL = getApiUrl("api/bookmarks/");

// Create new Bookmark
const addBookmark = async (bookmarkData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + "add", bookmarkData, config);

    return response.data;
};

// Delete user Bookmark
const removeBookmark = async (bookmarkData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + "remove", bookmarkData, config);

    return response.data;
};

// Get user Bookmarks
const getBookmarks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL + "get", config);

    return response.data;
};

const BookmarkService = {
    addBookmark,
    removeBookmark,
    getBookmarks,
};

export default BookmarkService;
