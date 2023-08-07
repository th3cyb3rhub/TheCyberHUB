import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import feedService from "./feedCommentServices";

const initialState = {
    feedComments: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

// Fetch comments for a feed
export const getFeedComments = createAsyncThunk("comments/fetchComments", async ({ feedId }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await feedService.getComments(feedId, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Add a comment to a feed
export const addFeedComment = createAsyncThunk("comments/addComment", async ({ feedId, commentData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await feedService.addComment(feedId, commentData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update a comment
export const updateComment = createAsyncThunk("comments/updateComment", async ({ commentId, content }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await feedService.updateComment(commentId, content, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete a comment
export const deleteComment = createAsyncThunk("comments/deleteComment", async (commentId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        await feedService.deleteComment(commentId, token);
        return commentId;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

const commentSlice = createSlice({
    name: "feedComments",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeedComments.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getFeedComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucces = true;
                state.feedComments = action.payload;
            })
            .addCase(getFeedComments.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucces = false;
                state.message = action.payload;
            })
            .addCase(addFeedComment.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(addFeedComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSucces = true;
                state.feedComments.push(action.payload);
            })
            .addCase(addFeedComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucces = false;
                state.message = action.payload;
            })
            .addCase(updateComment.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.feedComments = state.feedComments.map((comment) =>
                    comment._id === action.payload._id ? { ...comment, ...action.payload } : comment,
                );
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteComment.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.feedComments = state.feedComments.filter((comment) => comment._id !== action.payload);
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
