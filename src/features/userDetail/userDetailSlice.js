import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userDetailService from "./userDetailService";
import { addParticipant, removeParticipant } from "src/features/events/eventsSlice";

const initialState = {
    userDetail: [],
    userDetails: [],
    isUserDetailError: false,
    isUserDetailSuccess: false,
    isUserDetailLoading: false,
    userDetailMessage: "",
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
export const getUserDetail = createAsyncThunk("userDetail/getUserDetail", async (username, thunkAPI) => {
    try {
        return await userDetailService.getUserDetail(username);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const getAllUserDetails = createAsyncThunk("userDetail/getAllUserDetails", async (_, thunkAPI) => {
    try {
        return await userDetailService.getAllUserDetails();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
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

export const updateUserDetail = createAsyncThunk("userDetail/update", async ({ userData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await userDetailService.updateUserDetail(userData, token);
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
        userDetailReset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserDetail.pending, (state) => {
                state.isUserDetailLoading = true;
            })
            .addCase(createUserDetail.fulfilled, (state, action) => {
                state.isUserDetailLoading = false;
                state.isUserDetailSuccess = true;
                state.userDetail.push(action.payload);
            })
            .addCase(createUserDetail.rejected, (state, action) => {
                state.isUserDetailLoading = false;
                state.isUserDetailError = true;
                state.userDetailMessage = action.payload;
            })
            .addCase(getUserDetail.pending, (state) => {
                state.isUserDetailLoading = true;
                state.isUserDetailSuccess = false;
                state.isUserDetailError = false;
                state.userDetailMessage = "";
            })
            .addCase(getUserDetail.fulfilled, (state, action) => {
                state.isUserDetailLoading = false;
                state.isUserDetailSuccess = true;
                state.isUserDetailError = false;
                state.userDetailMessage = "";
                state.userDetail = action.payload;
            })
            .addCase(getUserDetail.rejected, (state, action) => {
                state.isUserDetailLoading = false;
                state.isUserDetailSuccess = false;
                state.isUserDetailError = true;
                state.userDetailMessage = action.payload;
            })
            .addCase(getAllUserDetails.pending, (state) => {
                state.isUserDetailLoading = true;
                state.isUserDetailSuccess = false;
                state.isUserDetailError = false;
                state.userDetailMessage = "";
            })
            .addCase(getAllUserDetails.fulfilled, (state, action) => {
                state.isUserDetailLoading = false;
                state.isUserDetailSuccess = true;
                state.isUserDetailError = false;
                state.userDetailMessage = "";
                state.userDetails = action.payload;
            })
            .addCase(getAllUserDetails.rejected, (state, action) => {
                state.isUserDetailLoading = false;
                state.isUserDetailSuccess = false;
                state.isUserDetailError = true;
                state.userDetailMessage = action.payload;
            })
            .addCase(updateUserDetail.pending, (state) => {
                state.isUserDetailLoading = true;
            })
            .addCase(updateUserDetail.fulfilled, (state, action) => {
                state.isUserDetailLoading = false;
                state.isUserDetailSuccess = true;
                state.userDetail = { ...state.userDetail, ...action.payload };
            })
            .addCase(updateUserDetail.rejected, (state, action) => {
                state.isUserDetailLoading = false;
                state.isUserDetailError = true;
                state.userDetailMessage = action.payload;
            })
            .addCase(deleteUserDetail.pending, (state) => {
                state.isUserDetailLoading = true;
            })
            .addCase(deleteUserDetail.fulfilled, (state, action) => {
                state.isUserDetailLoading = false;
                state.isUserDetailSuccess = true;
                state.userDetail = state.userDetail.filter((userDetail) => userDetail._id !== action.payload.id);
            })
            .addCase(deleteUserDetail.rejected, (state, action) => {
                state.isUserDetailLoading = false;
                state.isUserDetailError = true;
                state.userDetailMessage = action.payload;
            })
            // listen to reducers from events that related to userDetail
            .addCase(addParticipant.pending, (state) => {
                state.isUserDetailLoading = true;
            })
            .addCase(addParticipant.fulfilled, (state, action) => {
                state.isUserDetailLoading = false;
                state.isUserDetailError = false;
                state.isUserDetailSuccess = true;
                if (state.userDetail._id === action.payload.userDetail._id) {
                    state.userDetail = action.payload.userDetail;
                }
            })
            .addCase(addParticipant.rejected, (state, action) => {
                state.isUserDetailLoading = false;
                state.isUserDetailSuccess = false;
                state.isUserDetailError = true;
                state.userDetailMessage = action.payload;
            })
            .addCase(removeParticipant.pending, (state) => {
                state.isUserDetailLoading = true;
            })
            .addCase(removeParticipant.fulfilled, (state, action) => {
                state.isUserDetailLoading = false;
                state.isUserDetailError = false;
                state.isUserDetailSuccess = true;
                if (state.userDetail._id === action.payload.userDetail._id) {
                    state.userDetail = action.payload.userDetail;
                }
            })
            .addCase(removeParticipant.rejected, (state, action) => {
                state.isUserDetailLoading = false;
                state.isUserDetailSuccess = false;
                state.isUserDetailError = true;
                state.userDetailMessage = action.payload;
            });
    },
});

export const { userDetailReset } = userDetailSlice.actions;
export default userDetailSlice.reducer;
