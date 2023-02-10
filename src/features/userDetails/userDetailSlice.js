import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userDetailService from "./userDetailService";

const initialState = {
    userDetails: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new userDetail
export const createUserDetail = createAsyncThunk("userDetails/create", async (userDetailData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await userDetailService.createUserDetail(userDetailData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user userDetails
export const getUserDetails = createAsyncThunk("userDetails/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await userDetailService.getUserDetails(token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete user userDetail
export const deleteUserDetail = createAsyncThunk("userDetails/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await userDetailService.deleteUserDetail(id, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const userDetailSlice = createSlice({
    name: "userDetail",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserDetail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUserDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userDetails.push(action.payload);
            })
            .addCase(createUserDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userDetails = action.payload;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteUserDetail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUserDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userDetails = state.userDetails.filter((userDetail) => userDetail._id !== action.payload.id);
            })
            .addCase(deleteUserDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = userDetailSlice.actions;
export default userDetailSlice.reducer;
