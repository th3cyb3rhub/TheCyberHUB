import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "./blogService";

const initialState = {
    blogs: [],
    blog: {},
    isBlogError: false,
    isBlogSuccess: false,
    isBlogLoading: false,
    blogMessage: "",
};

// Create new blog
export const createBlog = createAsyncThunk("blogs/create", async (blogData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await blogService.createBlog(blogData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update existing blog
export const updateBlog = createAsyncThunk("blogs/update", async ({ id, blogData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await blogService.updateBlog(id, blogData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user blogs
export const getBlogs = createAsyncThunk("blogs/getUserBlogs", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await blogService.getBlogs(token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user blogs
export const getBlog = createAsyncThunk("blogs/id", async (id, thunkAPI) => {
    try {
        return await blogService.getBlog(id);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get all blogs
export const getAllBlogs = createAsyncThunk("blogs/getAllBlogs", async (_, thunkAPI) => {
    try {
        return await blogService.getAllBlogs();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete user blog
export const deleteBlog = createAsyncThunk("blogs/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await blogService.deleteBlog(id, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        blogReset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBlog.pending, (state) => {
                state.isBlogLoading = true;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.isBlogSuccess = true;
                state.isBlogLoading = false;
                state.isBlogError = false;
                state.blogs.push(action.payload);
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.isBlogLoading = false;
                state.isBlogError = true;
                state.isBlogSuccess = false;
                state.blogMessage = action.payload;
            })
            .addCase(updateBlog.pending, (state) => {
                state.isBlogLoading = true;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.isBlogLoading = false;
                state.isBlogSuccess = true;
                state.blogs = state.blogs.map((blog) =>
                    blog._id === action.payload._id ? { ...blog, ...action.payload } : blog,
                );
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.isBlogLoading = false;
                state.isBlogError = true;
                state.blogMessage = action.payload;
            })
            .addCase(getBlogs.pending, (state) => {
                state.isBlogLoading = true;
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.isBlogLoading = false;
                state.isBlogSuccess = true;
                state.blogs = action.payload;
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.isBlogLoading = false;
                state.isBlogError = true;
                state.blogMessage = action.payload;
            })
            .addCase(getAllBlogs.pending, (state) => {
                state.isBlogLoading = true;
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.isBlogLoading = false;
                state.isBlogSuccess = true;
                state.blogs = action.payload;
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.isBlogLoading = false;
                state.isBlogError = true;
                state.blogMessage = action.payload;
            })
            .addCase(getBlog.pending, (state) => {
                state.isBlogLoading = true;
            })
            .addCase(getBlog.fulfilled, (state, action) => {
                state.isBlogLoading = false;
                state.isBlogSuccess = true;
                state.blog = action.payload;
            })
            .addCase(getBlog.rejected, (state, action) => {
                state.isBlogLoading = false;
                state.isBlogError = true;
                state.blogMessage = action.payload;
            })
            .addCase(deleteBlog.pending, (state) => {
                state.isBlogLoading = true;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.isBlogLoading = false;
                state.isBlogSuccess = true;
                state.blogs = state.blogs.filter((blog) => blog._id !== action.payload.id);
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.isBlogLoading = false;
                state.isBlogError = true;
                state.blogMessage = action.payload;
            });
    },
});

export const { blogReset } = blogSlice.actions;
export default blogSlice.reducer;
