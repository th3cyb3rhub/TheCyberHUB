import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import feedService from "./feedCommentServices";

const initialState = {
    feedComments: [],
    isFeedReplyLoading: false,
    isFeedReplyError: false,
    isFeedReplySuccess: false,
    feedCommentMessage: "",
};

// Fetch comments for a feed
export const getFeedComments = createAsyncThunk("comments/fetchComments", async (_, thunkAPI) => {
    try {
        return await feedService.getComments();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Add a comment to a feed
export const addFeedComment = createAsyncThunk("comments/addComment", async ({ feedId, replyData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await feedService.addComment(feedId, replyData, token);
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
        feedReplyReset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeedComments.pending, (state) => {
                state.isFeedReplyLoading = true;
                state.isFeedReplyError = false;
            })
            .addCase(getFeedComments.fulfilled, (state, action) => {
                state.isFeedReplyLoading = false;
                state.isFeedReplyError = false;
                state.isFeedReplySuccess = true;
                state.feedComments = action.payload;
            })
            .addCase(getFeedComments.rejected, (state, action) => {
                state.isFeedReplyLoading = false;
                state.isFeedReplyError = true;
                state.isFeedReplySuccess = false;
                state.feedCommentMessage = action.payload;
            })
            .addCase(addFeedComment.pending, (state) => {
                state.isFeedReplyLoading = true;
                state.isFeedReplyError = false;
            })
            .addCase(addFeedComment.fulfilled, (state, action) => {
                state.isFeedReplyLoading = false;
                state.isFeedReplySuccess = true;
                state.feedComments = [...state.feedComments, action.payload];
            })
            .addCase(addFeedComment.rejected, (state, action) => {
                state.isFeedReplyLoading = false;
                state.isFeedReplyError = true;
                state.isFeedReplySucces = false;
                state.feedCommentMessage = action.payload;
            })
            .addCase(updateComment.pending, (state) => {
                state.isFeedReplyLoading = true;
                state.isFeedReplyError = false;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.isFeedReplyLoading = false;
                state.feedComments = state.feedComments.map((comment) =>
                    comment._id === action.payload._id ? { ...comment, ...action.payload } : comment,
                );
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.isFeedReplyLoading = false;
                state.isFeedReplyError = true;
                state.feedCommentMessage = action.payload;
            })
            .addCase(deleteComment.pending, (state) => {
                state.isFeedReplyLoading = true;
                state.isFeedReplyError = false;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.isFeedReplyLoading = false;
                state.feedComments = state.feedComments.filter((comment) => comment._id !== action.payload);
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.isFeedReplyLoading = false;
                state.isFeedReplyError = true;
                state.feedCommentMessage = action.payload;
            });
    },
});

export const { feedReplyReset } = commentSlice.actions;
export default commentSlice.reducer;
