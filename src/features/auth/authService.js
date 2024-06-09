import axios from "axios";
import { getApiUrl } from "src/features/apiUrl";

const API_URL = getApiUrl("api/users/");

// Register user
const sendEmailCode = async (userData) => {
    const response = await axios.post(API_URL + `reg-email-code`, userData);
    return response.data;
};

const verifyEmailCode = async (userData) => {
    const response = await axios.post(API_URL + `verify-email-code`, userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};
const verify2FACode = async (userData) => {
    const response = await axios.post(API_URL + `verify-2fa`, userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

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

    if (response.data.message === "email sent") {
        console.log("2fa user");
        return response.data;
    }

    if (response.data.message !== "email sent" && response.data) {
        console.log("no 2fa user");
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    console.log("lastResponse");

    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem("user");
};

// Update User
const updateUser = async (userData, token) => {
    console.log(userData);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + "user", userData, config);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const authService = {
    sendEmailCode,
    registerUser,
    verifyEmailCode,
    verify2FACode,
    login,
    logout,
    updateUser,
};

export default authService;
