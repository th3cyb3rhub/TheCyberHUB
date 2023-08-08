import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import viewService from "./viewServices";

const initialState = {
    views: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new view
export const updateView = createAsyncThunk("views/add", async (viewData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await viewService.updateView(viewData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user views
export const getViews = createAsyncThunk("views/get", async (_, thunkAPI) => {
    try {
        return await viewService.getViews();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const viewSlice = createSlice({
    name: "views",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateView.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateView.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.views = [...state.views, action.payload];
            })
            .addCase(updateView.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getViews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getViews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.views = action.payload;
            })
            .addCase(getViews.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = viewSlice.actions;
export default viewSlice.reducer;
