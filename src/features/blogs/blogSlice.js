import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";

const initialState = {
    blogs: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
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

// Get all blogs
export const getAllBlogs = createAsyncThunk("blogs/getAllBlogs", async (_, thunkAPI) => {
    try {
        return await blogService.getAllBlogs();
    } catch (error) {
        console.error(error);
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

// Add comment to blog
export const addComment = createAsyncThunk("blog/addComment", async ({ blogId, addCommentData }, thunkAPI) => {
    try {
        const commentData = addCommentData.comment;
        const token = thunkAPI.getState().auth.user.token;
        return await blogService.addComment(blogId, commentData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blogs.push(action.payload);
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blogs = state.blogs.map((blog) =>
                    blog._id === action.payload._id ? { ...blog, ...action.payload } : blog,
                );
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.isLoading = false;
                // Check if the new comment has been added to the blog
                if (action.payload.comment) {
                    state.isSuccess = true;
                    // Find the index of the blog in the state.blogs array that needs to be updated
                    const blogIndex = state.blogs.findIndex((blog) => blog._id === action.payload._id);
                    // If the blog is found, update it in the state.blogs array by pushing the new comment to the comments array
                    if (blogIndex !== -1) {
                        state.blogs[blogIndex] = {
                            ...state.blogs[blogIndex],
                            comments: [...(state.blogs[blogIndex].comments || []), action.payload.comment],
                        };
                    }
                    // If the blog is not found, push the updated blog object to the state.blogs array
                    else {
                        state.blogs.push(action.payload);
                    }
                } else {
                    state.isSuccess = false;
                }
            })
            .addCase(addComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blogs = action.payload;
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blogs = action.payload;
            })
            .addCase(deleteBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blogs = state.blogs.filter((blog) => blog._id !== action.payload.id);
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = blogSlice.actions;
export default blogSlice.reducer;
