import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import feedsService from "./feedsService";

const initialState = {
    feeds: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new feed
export const createFeed = createAsyncThunk("feed/create", async (feedData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await feedsService.createFeed(feedData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update existing feed
export const updateFeed = createAsyncThunk("feed/update", async ({ id, feedData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await feedsService.updateFeed(id, feedData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user feed
export const getFeeds = createAsyncThunk("feed/getUserFeeds", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await feedsService.getFeeds(token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get all feed
export const getAllFeeds = createAsyncThunk("feed/getAllFeeds", async (_, thunkAPI) => {
    try {
        return await feedsService.getAllFeeds();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete user feed
export const deleteFeed = createAsyncThunk("feed/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await feedsService.deleteFeed(id, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const feedsSlice = createSlice({
    name: "feeds",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createFeed.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createFeed.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.feeds.push(action.payload);
            })
            .addCase(createFeed.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(updateFeed.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateFeed.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.feeds = state.feeds.map((feed) =>
                    feed._id === action.payload._id ? { ...feed, ...action.payload } : feed,
                );
            })
            .addCase(updateFeed.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getFeeds.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeeds.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.feed = action.payload;
            })
            .addCase(getFeeds.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllFeeds.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllFeeds.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.feeds = action.payload;
            })
            .addCase(getAllFeeds.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteFeed.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteFeed.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.feed = state.feed.filter((feed) => feed._id !== action.payload.id);
            })
            .addCase(deleteFeed.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = feedsSlice.actions;
export default feedsSlice.reducer;
