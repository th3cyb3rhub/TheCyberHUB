import axios from "axios";
import { getApiUrl } from "../apiUrl";

const API_URL = getApiUrl("api/users/");

const forgotPassword = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}forgot-password`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Service function for resetting password with token
const resetPassword = async (userData) => {
    try {
        const response = await axios.put(`${API_URL}reset-password`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const resetPasswordService = {
    forgotPassword,
    resetPassword,
};

export default resetPasswordService;
