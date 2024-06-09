import axios from "axios";
import { getApiUrl } from "src/features/apiUrl";

const API_URL = getApiUrl("api/connections/");

const getConnections = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(API_URL, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const sendConnectionRequest = async (receiverId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.post(API_URL + `sendConnectionRequest/${receiverId}`, {}, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const removeConnectionRequest = async (senderId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.delete(API_URL + `removeConnectionRequest/${senderId}`, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const acceptConnectionRequest = async (connectionId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.post(API_URL + `acceptConnectionRequest/${connectionId}`, {}, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const removeConnection = async (connectionId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.delete(API_URL + `removeConnection/${connectionId}`, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const connectionService = {
    getConnections,
    sendConnectionRequest,
    removeConnectionRequest,
    acceptConnectionRequest,
    removeConnection,
};

export default connectionService;
