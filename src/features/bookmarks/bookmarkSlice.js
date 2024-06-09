import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookmarkService from "./bookmarkServices";

const initialState = {
    bookmarks: [],
    isBookmarkError: false,
    isSuccess: false,
    isBookmarkLoading: false,
    bookmarkMessage: "",
};

// Create new bookmark
export const addBookmark = createAsyncThunk("bookmarks/add", async (bookmarkData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await bookmarkService.addBookmark(bookmarkData, token);
    } catch (error) {
        const bookmarkMessage =
            (error.response && error.response.data && error.response.data.bookmarkMessage) ||
            error.bookmarkMessage ||
            error.toString();
        return thunkAPI.rejectWithValue(bookmarkMessage);
    }
});

// Delete user bookmark
export const removeBookmark = createAsyncThunk("bookmarks/remove", async (bookmarkData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await bookmarkService.removeBookmark(bookmarkData, token);
    } catch (error) {
        const bookmarkMessage =
            (error.response && error.response.data && error.response.data.bookmarkMessage) ||
            error.bookmarkMessage ||
            error.toString();
        return thunkAPI.rejectWithValue(bookmarkMessage);
    }
});

// Get user bookmarks
export const getBookmarks = createAsyncThunk("bookmarks/get", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await bookmarkService.getBookmarks(token);
    } catch (error) {
        const bookmarkMessage =
            (error.response && error.response.data && error.response.data.bookmarkMessage) ||
            error.bookmarkMessage ||
            error.toString();
        return thunkAPI.rejectWithValue(bookmarkMessage);
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
                state.isBookmarkLoading = true;
            })
            .addCase(addBookmark.fulfilled, (state, action) => {
                state.isBookmarkLoading = false;
                state.isSuccess = true;
                state.bookmarks.push(action.payload);
            })
            .addCase(addBookmark.rejected, (state, action) => {
                state.isBookmarkLoading = false;
                state.isBookmarkError = true;
                state.bookmarkMessage = action.payload;
            })
            .addCase(removeBookmark.pending, (state) => {
                state.isBookmarkLoading = true;
            })
            .addCase(removeBookmark.fulfilled, (state, action) => {
                state.isBookmarkLoading = false;
                state.isSuccess = true;
                state.bookmarks = state.bookmarks.filter((bookmark) => bookmark._id !== action.payload._id);
            })
            .addCase(removeBookmark.rejected, (state, action) => {
                state.isBookmarkLoading = false;
                state.isBookmarkError = true;
                state.bookmarkMessage = action.payload;
            })
            .addCase(getBookmarks.pending, (state) => {
                state.isBookmarkLoading = true;
            })
            .addCase(getBookmarks.fulfilled, (state, action) => {
                state.isBookmarkLoading = false;
                state.isSuccess = true;
                state.bookmarks = action.payload;
            })
            .addCase(getBookmarks.rejected, (state, action) => {
                state.isBookmarkLoading = false;
                state.isBookmarkError = true;
                state.bookmarkMessage = action.payload;
            });
    },
});

export const { reset } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
