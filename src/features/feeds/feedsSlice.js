import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import feedsService from "./feedsService";

const initialState = {
    feeds: [],
    isFeedError: false,
    isFeedSuccess: false,
    isFeedLoading: false,
    feedMessage: "",
};

// Create new feed
export const createFeed = createAsyncThunk("feed/create", async ({ feedData, parentId = "" }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await feedsService.createFeed(feedData, token, parentId);
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

export const getFeedLineage = createAsyncThunk("feed/getFeedLineage", async (feedId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await feedsService.getFeedLineage(feedId, token);
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
        feedReset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createFeed.pending, (state) => {
                state.isFeedLoading = true;
            })
            .addCase(createFeed.fulfilled, (state, action) => {
                state.isFeedSuccess = true;
                state.isFeedLoading = false;
                state.isFeedError = false;
                if (action.payload && !action.payload.parentId) {
                    state.feeds.push(action.payload);
                } else {
                    const feedIndex = state.feeds.findIndex((feed) => feed._id === action.payload?.parentId);
                    state.feeds[feedIndex].descendants.push(action.payload);
                }
            })
            .addCase(createFeed.rejected, (state, action) => {
                state.isFeedLoading = false;
                state.isError = true;
                state.isFeedSuccess = false;
                state.feedMessage = action.payload;
            })
            .addCase(updateFeed.pending, (state) => {
                state.isFeedLoading = true;
            })
            .addCase(updateFeed.fulfilled, (state, action) => {
                state.isFeedLoading = false;
                state.isFeedSuccess = true;
                state.feeds = state.feeds.map((feed) => {
                    if (feed._id === action.payload._id) {
                        return { ...feed, ...action.payload };
                    } else if (feed._id === action.payload.parentId) {
                        const findIndex = feed.descendants.findIndex((item) => item._id === action.payload._id);
                        feed.descendants[findIndex] = action.payload;
                    }
                    return feed;
                });
            })
            .addCase(updateFeed.rejected, (state, action) => {
                state.isFeedLoading = false;
                state.isError = true;
                state.feedMessage = action.payload;
            })
            .addCase(getFeeds.pending, (state) => {
                state.isFeedLoading = true;
            })
            .addCase(getFeeds.fulfilled, (state, action) => {
                state.isFeedLoading = false;
                state.isFeedSuccess = true;
                state.feeds = action.payload;
            })
            .addCase(getFeeds.rejected, (state, action) => {
                state.isFeedLoading = false;
                state.isError = true;
                state.feedMessage = action.payload;
            })
            .addCase(getAllFeeds.pending, (state) => {
                state.isFeedLoading = true;
            })
            .addCase(getAllFeeds.fulfilled, (state, action) => {
                state.isFeedLoading = false;
                state.isFeedSuccess = true;
                state.feeds = action.payload;
            })
            .addCase(getAllFeeds.rejected, (state, action) => {
                state.isFeedLoading = false;
                state.isError = true;
                state.feedMessage = action.payload;
            })
            .addCase(getFeedLineage.pending, (state) => {
                state.isFeedLoading = true;
            })
            .addCase(getFeedLineage.fulfilled, (state, action) => {
                state.isFeedLoading = false;
                state.isFeedSuccess = true;
                const feedIndex = state.feeds.findIndex((feed) => feed._id === action.payload?._id);

                if (feedIndex === -1) {
                    state.feeds.push(action.payload);
                } else {
                    state.feeds[feedIndex] = action.payload;
                }
            })
            .addCase(getFeedLineage.rejected, (state, action) => {
                state.isFeedLoading = false;
                state.isError = true;
                state.feedMessage = action.payload;
            })
            .addCase(deleteFeed.pending, (state) => {
                state.isFeedLoading = true;
            })
            .addCase(deleteFeed.fulfilled, (state, action) => {
                state.isFeedLoading = false;
                state.isFeedSuccess = true;
                state.feeds = state.feeds
                    .filter((feed) => feed._id !== action.payload._id)
                    .map((feed) => {
                        if (feed._id === action.payload.parentId) {
                            feed.descendants = feed.descendants.filter((item) => item._id !== action.payload._id);
                        }
                        return feed;
                    });
            })
            .addCase(deleteFeed.rejected, (state, action) => {
                state.isFeedLoading = false;
                state.isError = true;
                state.feedMessage = action.payload;
            });
    },
});

export const { feedReset } = feedsSlice.actions;
export default feedsSlice.reducer;
