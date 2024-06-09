import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventsService from "./eventsService";

const initialState = {
    events: [],
    isEventError: false,
    isEventLoading: false,
    isEventSuccess: false,
    eventMessage: "",
};

export const createEvent = createAsyncThunk("events/create", async (eventData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await eventsService.createEvent(eventData, token);
    } catch (err) {
        const message =
            (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const getEvents = createAsyncThunk("events/getEvents", async (_, thunkAPI) => {
    try {
        return await eventsService.getEvents();
    } catch (err) {
        const message =
            (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const updateEvent = createAsyncThunk("events/update", async ({ id, eventData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await eventsService.updateEvent(id, eventData, token);
    } catch (err) {
        const message =
            (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const addParticipant = createAsyncThunk("events/addParticipant", async ({ eventId, userId }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await eventsService.addParticipant(eventId, userId, token);
    } catch (err) {
        const message =
            (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const removeParticipant = createAsyncThunk("events/removeParticipant", async ({ eventId, userId }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await eventsService.removeParticipant(eventId, userId, token);
    } catch (err) {
        const message =
            (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        eventsReset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createEvent.pending, (state) => {
                state.isEventLoading = true;
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.isEventError = false;
                state.isEventLoading = false;
                state.isEventSuccess = true;
                state.events.push(action.payload);
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.isEventLoading = false;
                state.isEventSuccess = false;
                state.isEventError = true;
                state.eventMessage = action.payload;
            })
            .addCase(getEvents.pending, (state) => {
                state.isEventLoading = true;
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.isEventError = false;
                state.isEventLoading = false;
                state.isEventSuccess = true;
                state.events = action.payload;
            })
            .addCase(getEvents.rejected, (state, action) => {
                state.isEventLoading = false;
                state.isEventSuccess = false;
                state.isEventError = true;
                state.eventMessage = action.payload;
            })
            .addCase(updateEvent.pending, (state) => {
                state.isEventLoading = true;
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                state.isEventError = false;
                state.isEventLoading = false;
                state.isEventSuccess = true;
                state.events = state.events.map((event) =>
                    event._id === action.payload._id ? { ...event, ...action.payload } : event,
                );
            })
            .addCase(updateEvent.rejected, (state, action) => {
                state.isEventLoading = false;
                state.isEventSuccess = false;
                state.isEventError = true;
                state.eventMessage = action.payload;
            })
            .addCase(addParticipant.pending, (state) => {
                state.isEventLoading = true;
            })
            .addCase(addParticipant.fulfilled, (state, action) => {
                state.isEventLoading = false;
                state.isEventError = false;
                state.isEventSuccess = true;
                const eventIndex = state.events.findIndex((event) => event._id === action.payload.event._id);
                state.events[eventIndex] = { ...state.events[eventIndex], ...action.payload.event };
            })
            .addCase(addParticipant.rejected, (state, action) => {
                state.isEventLoading = false;
                state.isEventSuccess = false;
                state.isEventError = true;
                state.eventMessage = action.payload;
            })
            .addCase(removeParticipant.pending, (state) => {
                state.isEventLoading = true;
            })
            .addCase(removeParticipant.fulfilled, (state, action) => {
                state.isEventLoading = false;
                state.isEventError = false;
                state.isEventSuccess = true;
                const eventIndex = state.events.findIndex((event) => event._id === action.payload.event._id);
                state.events[eventIndex] = { ...state.events[eventIndex], ...action.payload.event };
            })
            .addCase(removeParticipant.rejected, (state, action) => {
                state.isEventLoading = false;
                state.isEventSuccess = false;
                state.isEventError = true;
                state.eventMessage = action.payload;
            });
    },
});

export const { eventsReset } = eventSlice.actions;
export default eventSlice.reducer;
