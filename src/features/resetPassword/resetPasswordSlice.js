import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import resetPasswordService from "./resetPasswordService";

const initialState = {
    message: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    logout: false,
};

export const forgetPasswordWithEmail = createAsyncThunk("auth/forgetPasswordWithEmail", async (email, thunkAPI) => {
    try {
        return await resetPasswordService.forgotPassword(email);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
    }
});
export const resetPasswordWithToken = createAsyncThunk(
    "auth/resetPasswordWithToken",
    async ({ token, password }, thunkAPI) => {
        try {
            return await resetPasswordService.resetPassword({ token, password });
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const resetPasswordSlice = createSlice({
    name: "resetPassword",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(forgetPasswordWithEmail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgetPasswordWithEmail.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(forgetPasswordWithEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(resetPasswordWithToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPasswordWithToken.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(resetPasswordWithToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
