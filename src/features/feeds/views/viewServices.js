import axios from "axios";
import { getApiUrl } from "../../apiUrl";

const API_URL = getApiUrl("api/views/");

// Create new View
const updateView = async (viewData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + "add", viewData, config);

    return response.data;
};

// Get user Views
const getViews = async () => {
    const response = await axios.get(API_URL + "get");
    return response.data;
};

const viewService = {
    updateView,
    getViews,
};

export default viewService;
