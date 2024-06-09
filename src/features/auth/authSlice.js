import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user || null,
    isUserLoading: false,
    isUserError: false,
    isUserSuccess: false,
    userMessage: "",
    logout: false,
};

export const sendEmailCode = createAsyncThunk("auth/sendEmailCode", async (user, thunkAPI) => {
    try {
        return await authService.sendEmailCode(user);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const verifyEmailCode = createAsyncThunk("auth/verifyEmailCode", async (userData, thunkAPI) => {
    try {
        return await authService.verifyEmailCode(userData);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const verify2FACode = createAsyncThunk("auth/verify2FACode", async (userData, thunkAPI) => {
    try {
        return await authService.verify2FACode(userData);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const registerUser = createAsyncThunk("auth/registerUser", async (user, thunkAPI) => {
    try {
        return await authService.registerUser(user);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update existing User
export const updateUser = createAsyncThunk("user/update", async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await authService.updateUser(userData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userReset: (state) => {
            state.isUserLoading = false;
            state.isUserSuccess = false;
            state.isUserError = false;
            state.userMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendEmailCode.pending, (state) => {
                state.isUserLoading = true;
            })
            .addCase(sendEmailCode.fulfilled, (state, action) => {
                state.isUserLoading = false;
                state.isUserSuccess = true;
                state.userMessage = action.payload;
            })
            .addCase(sendEmailCode.rejected, (state, action) => {
                state.isUserLoading = false;
                state.isUserError = true;
                state.userMessage = action.payload;
            })
            .addCase(verifyEmailCode.pending, (state) => {
                state.isUserLoading = true;
            })
            .addCase(verifyEmailCode.fulfilled, (state, action) => {
                state.isUserLoading = false;
                state.isUserSuccess = true;
                state.user = action.payload;
                state.userMessage = action.payload;
            })
            .addCase(verifyEmailCode.rejected, (state, action) => {
                state.isUserLoading = false;
                state.isUserError = true;
                state.userMessage = action.payload;
            })
            .addCase(verify2FACode.pending, (state) => {
                state.isUserLoading = true;
            })
            .addCase(verify2FACode.fulfilled, (state, action) => {
                state.isUserLoading = false;
                state.isUserSuccess = true;
                state.user = action.payload;
                state.userMessage = action.payload;
            })
            .addCase(verify2FACode.rejected, (state, action) => {
                state.isUserLoading = false;
                state.isUserError = true;
                state.userMessage = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.isUserLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isUserLoading = false;
                state.isUserSuccess = true;
                state.userMessage = action.payload;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isUserLoading = false;
                state.isUserError = true;
                state.userMessage = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isUserLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isUserLoading = false;
                state.isUserSuccess = true;
                state.user = action.payload;
                state.logout = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isUserLoading = false;
                state.isUserError = true;
                state.userMessage = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.logout = true;
            })
            .addCase(updateUser.pending, (state) => {
                state.isUserLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isUserLoading = false;
                state.isUserSuccess = true;
                state.user = { ...state.user, ...action.payload };
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isUserLoading = false;
                state.isUserError = true;
                state.userMessage = action.payload;
            });
    },
});

export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
});

export const { userReset } = authSlice.actions;
export default authSlice.reducer;
