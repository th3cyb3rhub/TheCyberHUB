import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import likeService from "./feedLikesServices";

const initialState = {
    feedLikes: [],
    isFeedLikeError: false,
    isFeedLikeSuccess: false,
    isFeedLikeLoading: false,
    feedLikeMessage: "",
};

// Create new like
export const addFeedLike = createAsyncThunk("feedLikes/add", async (likeData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await likeService.addFeedLike(likeData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete user like
export const removeFeedLike = createAsyncThunk("feedLikes/remove", async (likeData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await likeService.removeFeedLike(likeData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user feedLikes
export const getFeedLikes = createAsyncThunk("feedLikes/get", async (feedLikesData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await likeService.getFeedLikes(feedLikesData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const feedLikesSlice = createSlice({
    name: "feedLikes",
    initialState,
    reducers: {
        FeedLikeReset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addFeedLike.pending, (state) => {
                state.isFeedLikeLoading = true;
            })
            .addCase(addFeedLike.fulfilled, (state, action) => {
                state.isFeedLikeLoading = false;
                state.isFeedLikeSuccess = true;
                state.feedLikes.push(action.payload);
            })
            .addCase(addFeedLike.rejected, (state, action) => {
                state.isFeedLikeLoading = false;
                state.isFeedLikeError = true;
                state.message = action.payload;
            })
            .addCase(removeFeedLike.pending, (state) => {
                state.isFeedLikeLoading = true;
            })
            .addCase(removeFeedLike.fulfilled, (state, action) => {
                state.isFeedLikeLoading = false;
                state.isFeedLikeSuccess = true;
                state.feedLikes = state.feedLikes.filter((like) => like._id !== action.payload._id);
            })
            .addCase(removeFeedLike.rejected, (state, action) => {
                state.isFeedLikeLoading = false;
                state.isFeedLikeError = true;
                state.message = action.payload;
            })
            .addCase(getFeedLikes.pending, (state) => {
                state.isFeedLikeLoading = true;
            })
            .addCase(getFeedLikes.fulfilled, (state, action) => {
                state.isFeedLikeLoading = false;
                state.isFeedLikeSuccess = true;
                state.feedLikes = action.payload;
            })
            .addCase(getFeedLikes.rejected, (state, action) => {
                state.isFeedLikeLoading = false;
                state.isFeedLikeError = true;
                state.message = action.payload;
            });
    },
});

export const { FeedLikeReset } = feedLikesSlice.actions;
export default feedLikesSlice.reducer;
