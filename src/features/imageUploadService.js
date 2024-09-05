import axios from "axios";
import { toast } from "react-toastify";
import { getApiUrl } from "src/features/apiUrl";

const API_URL = getApiUrl("api/upload");

export const uploadImages = async (formData) => {
    try {
        await axios.post(API_URL, formData);
    } catch (err) {
        if (err.status === 429) {
            toast.error("You are uploading images too fast. Please wait a few seconds and try again.");
        }
    }
};
