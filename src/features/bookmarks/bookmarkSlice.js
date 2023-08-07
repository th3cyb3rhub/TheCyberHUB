import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookmarkService from "./bookmarkServices";

const initialState = {
    bookmarks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new bookmark
export const addBookmark = createAsyncThunk("bookmarks/add", async (bookmarkData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await bookmarkService.addBookmark(bookmarkData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete user bookmark
export const removeBookmark = createAsyncThunk("bookmarks/remove", async (bookmarkData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await bookmarkService.removeBookmark(bookmarkData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user bookmarks
export const getBookmarks = createAsyncThunk("bookmarks/get", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await bookmarkService.getBookmarks(token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const bookmarkSlice = createSlice({
    name: "bookmarks",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addBookmark.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addBookmark.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bookmarks.push(action.payload);
            })
            .addCase(addBookmark.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeBookmark.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeBookmark.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bookmarks = state.bookmarks.filter((bookmark) => bookmark._id !== action.payload._id);
            })
            .addCase(removeBookmark.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getBookmarks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBookmarks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bookmarks = action.payload;
            })
            .addCase(getBookmarks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
