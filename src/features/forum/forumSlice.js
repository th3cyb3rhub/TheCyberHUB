import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import forumService from "./forumService";

const initialState = {
    forums: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new forum
export const createForum = createAsyncThunk("forums/create", async (forumData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await forumService.createForum(forumData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update existing forum
export const updateForum = createAsyncThunk("forums/update", async ({ id, forumData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await forumService.updateForum(id, forumData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user forums
export const getForums = createAsyncThunk("forums/getUserForums", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await forumService.getForums(token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get all forums
export const getAllForums = createAsyncThunk("forums/getAllForums", async (_, thunkAPI) => {
    try {
        return await forumService.getAllForums();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete user forum
export const deleteForum = createAsyncThunk("forums/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await forumService.deleteForum(id, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const forumSlice = createSlice({
    name: "forums",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createForum.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createForum.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.forums.push(action.payload);
            })
            .addCase(createForum.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(updateForum.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateForum.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.forums = state.forums.map((forum) =>
                    forum._id === action.payload._id ? { ...forum, ...action.payload } : forum,
                );
            })
            .addCase(updateForum.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getForums.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getForums.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.forums = action.payload;
            })
            .addCase(getForums.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllForums.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllForums.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.forums = action.payload;
            })
            .addCase(getAllForums.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteForum.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteForum.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.forums = state.forums.filter((forum) => forum._id !== action.payload.id);
            })
            .addCase(deleteForum.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = forumSlice.actions;
export default forumSlice.reducer;
