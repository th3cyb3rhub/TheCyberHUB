import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import likeService from "./blogLikesServices";

const initialState = {
    blogLikes: [],
    isBlogLikeError: false,
    isBlogLikeSuccess: false,
    isBlogLikeLoading: false,
    blogLikeMessage: "",
};

// Create new like
export const addBlogLike = createAsyncThunk("blogLikes/add", async (likeData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await likeService.addBlogLike(likeData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete user like
export const removeBlogLike = createAsyncThunk("blogLikes/remove", async (likeData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await likeService.removeBlogLike(likeData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user blogLikes
export const getBlogLikes = createAsyncThunk("blogLikes/get", async (blogLikesData, thunkAPI) => {
    try {
        return await likeService.getBlogLikes(blogLikesData);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const blogLikesSlice = createSlice({
    name: "blogLikes",
    initialState,
    reducers: {
        BlogLikeReset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addBlogLike.pending, (state) => {
                state.isBlogLikeLoading = true;
            })
            .addCase(addBlogLike.fulfilled, (state, action) => {
                state.isBlogLikeLoading = false;
                state.isBlogLikeSuccess = true;
                state.blogLikes.push(action.payload);
            })
            .addCase(addBlogLike.rejected, (state, action) => {
                state.isBlogLikeLoading = false;
                state.isBlogLikeError = true;
                state.message = action.payload;
            })
            .addCase(removeBlogLike.pending, (state) => {
                state.isBlogLikeLoading = true;
            })
            .addCase(removeBlogLike.fulfilled, (state, action) => {
                state.isBlogLikeLoading = false;
                state.isBlogLikeSuccess = true;
                state.blogLikes = state.blogLikes.filter((like) => like._id !== action.payload._id);
            })
            .addCase(removeBlogLike.rejected, (state, action) => {
                state.isBlogLikeLoading = false;
                state.isBlogLikeError = true;
                state.message = action.payload;
            })
            .addCase(getBlogLikes.pending, (state) => {
                state.isBlogLikeLoading = true;
            })
            .addCase(getBlogLikes.fulfilled, (state, action) => {
                state.isBlogLikeLoading = false;
                state.isBlogLikeSuccess = true;
                state.blogLikes = action.payload;
            })
            .addCase(getBlogLikes.rejected, (state, action) => {
                state.isBlogLikeLoading = false;
                state.isBlogLikeError = true;
                state.message = action.payload;
            });
    },
});

export const { BlogLikeReset } = blogLikesSlice.actions;
export default blogLikesSlice.reducer;
