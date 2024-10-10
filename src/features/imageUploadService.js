import axios from "axios";
import { toast } from "react-toastify";
import { getApiUrl } from "src/features/apiUrl";

const API_URL = getApiUrl("api/upload");

export const uploadImages = async (formData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.post(API_URL, formData, config);
        toast.success(response.data);
        return response.data;
    } catch (err) {
        if (err.response) {
            switch (err.response.status) {
                case 429:
                    toast.error("You are uploading images too fast. Please wait a few seconds and try again.");
                    break;
                case 401:
                    toast.error("Unauthorized. Please log in again.");
                    break;
                default:
                    toast.error("An error occurred while uploading images. Please try again.");
            }
        } else {
            toast.error("Network error. Please check your connection and try again.");
        }
        throw err;
    }
};
