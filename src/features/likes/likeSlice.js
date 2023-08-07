import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import likeService from "./likeServices";

const initialState = {
    likes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new like
export const addLike = createAsyncThunk("likes/add", async (likeData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await likeService.addLike(likeData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete user like
export const removeLike = createAsyncThunk("likes/remove", async (likeData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await likeService.removeLike(likeData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user likes
export const getLikes = createAsyncThunk("likes/get", async (likesData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await likeService.getLikes(likesData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const likeSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addLike.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addLike.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.likes.push(action.payload);
            })
            .addCase(addLike.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeLike.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeLike.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.likes = state.likes.filter((like) => like._id !== action.payload._id);
            })
            .addCase(removeLike.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getLikes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLikes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.likes = action.payload;
            })
            .addCase(getLikes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = likeSlice.actions;
export default likeSlice.reducer;
