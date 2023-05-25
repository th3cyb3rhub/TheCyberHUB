import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import followService from "./followService";

const initialState = {
    followData: [],
    message: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    logout: false,
};

export const followUser = createAsyncThunk("follow/followUser", async (followId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await followService.followUser(followId, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const unfollowUser = createAsyncThunk("follow/unfollowUser", async (unfollowId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await followService.unfollowUser(unfollowId, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const getFollowData = createAsyncThunk("follow/getFollowData", async (userId, thunkAPI) => {
    try {
        return await followService.getFollowData(userId);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const followSlice = createSlice({
    name: "followData",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(followUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(followUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(followUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(unfollowUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(unfollowUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(unfollowUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getFollowData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFollowData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = "";
                state.followData = action.payload;
            })
            .addCase(getFollowData.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = followSlice.actions;
export default followSlice.reducer;
