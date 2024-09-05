import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogCommentService from "./blogCommentServices";

const initialState = {
    blogComments: [],
    isBlogCommentLoading: false,
    isBlogCommentError: false,
    isBlogCommentSuccess: false,
    blogCommentMessage: "",
};

// Fetch comments for a blog
export const getBlogComments = createAsyncThunk("comments/fetchComments", async (blogId, thunkAPI) => {
    try {
        return await blogCommentService.getComments(blogId);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Add a comment to a blog
export const addBlogComment = createAsyncThunk("comments/addComment", async ({ blogId, commentData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await blogCommentService.addComment(blogId, commentData, token);
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
        return await blogCommentService.updateComment(commentId, content, token);
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
        await blogCommentService.deleteComment(commentId, token);
        return commentId;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

const commentSlice = createSlice({
    name: "blogComments",
    initialState,
    reducers: {
        blogCommentReset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBlogComments.pending, (state) => {
                state.isBlogCommentLoading = true;
                state.isBlogCommentError = false;
            })
            .addCase(getBlogComments.fulfilled, (state, action) => {
                state.isBlogCommentLoading = false;
                state.isBlogCommentError = false;
                state.isBlogCommentSuccess = true;
                state.blogComments = action.payload;
            })
            .addCase(getBlogComments.rejected, (state, action) => {
                state.isBlogCommentLoading = false;
                state.isBlogCommentError = true;
                state.isBlogCommentSuccess = false;
                state.blogCommentMessage = action.payload;
            })
            .addCase(addBlogComment.pending, (state) => {
                state.isBlogCommentLoading = true;
                state.isBlogCommentError = false;
            })
            .addCase(addBlogComment.fulfilled, (state, action) => {
                state.isBlogCommentLoading = false;
                state.isBlogCommentSuccess = true;
                state.blogComments = state.blogComments ? [...state.blogComments, action.payload] : [action.payload];
            })
            .addCase(addBlogComment.rejected, (state, action) => {
                state.isBlogCommentLoading = false;
                state.isBlogCommentError = true;
                state.isBlogCommentSucces = false;
                state.blogCommentMessage = action.payload;
            })
            .addCase(updateComment.pending, (state) => {
                state.isBlogCommentLoading = true;
                state.isBlogCommentError = false;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.isBlogCommentLoading = false;
                state.blogComments = state.blogComments.map((comment) =>
                    comment._id === action.payload._id ? { ...comment, ...action.payload } : comment,
                );
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.isBlogCommentLoading = false;
                state.isBlogCommentError = true;
                state.blogCommentMessage = action.payload;
            })
            .addCase(deleteComment.pending, (state) => {
                state.isBlogCommentLoading = true;
                state.isBlogCommentError = false;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.isBlogCommentLoading = false;
                state.blogComments = state.blogComments.filter((comment) => comment._id !== action.payload);
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.isBlogCommentLoading = false;
                state.isBlogCommentError = true;
                state.blogCommentMessage = action.payload;
            });
    },
});

export const { blogCommentReset } = commentSlice.actions;
export default commentSlice.reducer;
