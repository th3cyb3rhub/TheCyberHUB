import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "./blogCommentServices";

const initialState = {
    blogComments: [],
    isLoading: false,
    isError: false,
    message: "",
};

// Fetch comments for a blog
export const getBlogComments = createAsyncThunk("comments/fetchComments", async ({ blogId }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await blogService.getComments(blogId, token);
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
        return await blogService.addComment(blogId, commentData, token);
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
        return await blogService.updateComment(commentId, content, token);
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
        await blogService.deleteComment(commentId, token);
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
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBlogComments.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getBlogComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogComments = action.payload;
            })
            .addCase(getBlogComments.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addBlogComment.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(addBlogComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogComments.push(action.payload);
            })
            .addCase(addBlogComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateComment.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogComments = state.blogComments.map((comment) =>
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
                state.blogComments = state.blogComments.filter((comment) => comment._id !== action.payload);
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
