import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ctfService from "./ctfService";
import { userDetailSlice } from "../userDetail/userDetailSlice";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user || null,
    isCtfError: false,
    isCtfSuccess: false,
    isCtfLoading: false,
    ctfMessage: "",
    logout: false,
    ctf: [],
};

export const getAllCTFs = createAsyncThunk("ctf/getAll", async (_, thunkAPI) => {
    try {
        return await ctfService.getAllCTFs();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const createCTF = createAsyncThunk("ctfs/create", async (ctfData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ctfService.createCTF(token, ctfData);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const registerCTF = createAsyncThunk("ctfs/registerCTF", async ({ ctfId }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ctfService.registerCTF(token, ctfId);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateCTF = createAsyncThunk("ctfs/update", async (ctfData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ctfService.updateCTF(token, ctfData);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateLikesAndViews = createAsyncThunk(
    "ctfs/updateLikesAndViews",
    async ({ ctfId, view, like }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await ctfService.updateLikesAndViews(token, ctfId, view, like);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    },
);

// Slice

export const ctfSlice = createSlice({
    name: "ctf",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCTFs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCTFs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ctf = action.payload;
            })
            .addCase(getAllCTFs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createCTF.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createCTF.fulfilled, (state, action) => {
                state.ctf.push(action.payload);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(createCTF.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(registerCTF.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerCTF.fulfilled, (state, action) => {
                // Update state as needed after successful registration
                state.isLoading = false;
                state.error = null;
                state.ctf = { ...state.ctf, ...action.payload };
            })
            .addCase(registerCTF.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateLikesAndViews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateLikesAndViews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateLikesAndViews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.ctf = { ...state.ctf, ...action.payload };
            });
    },
});
export const { reset } = userDetailSlice.actions;

export default ctfSlice.reducer;
