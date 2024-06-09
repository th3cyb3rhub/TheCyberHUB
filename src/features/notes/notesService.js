import axios from "axios";
import { getApiUrl } from "src/features/apiUrl";

const API_URL = getApiUrl("api/notes/");

// Create new note
const createNote = async (noteData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, noteData, config);

    return response.data;
};

// Update note
const updateNote = async (id, noteData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL + id, noteData, config);

    return response.data;
};

// Get user notes
const getNotes = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

// Delete user note
const deleteNote = async (noteId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + noteId, config);

    return response.data;
};

const notesService = {
    createNote,
    updateNote,
    getNotes,
    deleteNote,
};

export default notesService;
