import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userDetailService from "./userDetailService";

const initialState = {
    userDetail: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new userDetail
export const createUserDetail = createAsyncThunk("userDetail/create", async (userDetailData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await userDetailService.createUserDetail(userDetailData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user userDetail
export const getUserDetail = createAsyncThunk("userDetail/getUserDetail", async (username) => {
    try {
        return await userDetailService.getUserDetail(username); // Pass the username and token to the API call
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return message;
    }
});

// Delete user userDetail
export const deleteUserDetail = createAsyncThunk("userDetail/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await userDetailService.deleteUserDetail(id, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateUserDetail = createAsyncThunk("userDetail/update", async ({ id, userData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await userDetailService.updateUserDetail(id, userData, token);
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
                state.userDetail.push(action.payload);
            })
            .addCase(createUserDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserDetail.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.message = "";
            })
            .addCase(getUserDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = "";
                state.userDetail = action.payload;
            })
            .addCase(getUserDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateUserDetail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userDetail = { ...state.userDetail, ...action.payload };
            })
            .addCase(updateUserDetail.rejected, (state, action) => {
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
                state.userDetail = state.userDetail.filter((userDetail) => userDetail._id !== action.payload.id);
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
