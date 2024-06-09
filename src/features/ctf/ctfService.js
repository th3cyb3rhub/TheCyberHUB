import axios from "axios";
import { getApiUrl } from "src/features/apiUrl";

const API_URL = getApiUrl("api/ctf/");

const getAllCTFs = async () => {
    try {
        const response = await axios.get(API_URL + "getAll");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

// Create new CTF challenge
const createCTF = async (token, ctfData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.post(API_URL + "create", ctfData, config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

// Register user for a CTF challenge
const registerCTF = async (token, ctfId, userId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.post(API_URL + "register", { ctfId, userId }, config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

const updateLikesAndViews = async (token, ctfId, view, like) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.post(API_URL + "updateLikesAndViews", { ctfId, view, like }, config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

const ctfService = {
    getAllCTFs,
    createCTF,
    registerCTF,
    updateLikesAndViews,
};

export default ctfService;
