import axios from "axios";
import { getApiUrl } from "../apiUrl";

const API_URL = getApiUrl("api/users/");

// Register user
const sendEmailCode = async (userData) => {
    const response = await axios.post(API_URL + `reg-email-code`, userData);
    return response.data;
};

const verifyEmailCode = async (userData) => {
    const response = await axios.post(API_URL + `verify-email-code`, userData);
    return response.data;
};

const registerUser = async (userData) => {
    const response = await axios.post(API_URL, userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem("user");
};

// Update User
const updateUser = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + "user", userData, config);
    return response.data;
};

const authService = {
    sendEmailCode,
    registerUser,
    verifyEmailCode,
    login,
    logout,
    updateUser,
};

export default authService;
