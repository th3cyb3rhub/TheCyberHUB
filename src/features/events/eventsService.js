import axios from "axios";
import { getApiUrl } from "src/features/apiUrl";

const API_URL = getApiUrl("api/events/");

// Create new event
const createEvent = async (eventData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, eventData, config);
    return response.data;
};

// Get All Events
const getEvents = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

// Update Event
const updateEvent = async (id, eventData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + id, eventData, config);
    return response.data;
};

// Add Participant
const addParticipant = async (eventId, userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(`${API_URL}${eventId}/participant/${userId}`, {}, config);
    return response.data;
};
// Remove Participant
const removeParticipant = async (eventId, userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(`${API_URL}${eventId}/participant/${userId}`, config);
    return response.data;
};

const eventsService = {
    createEvent,
    getEvents,
    updateEvent,
    addParticipant,
    removeParticipant,
};

export default eventsService;
