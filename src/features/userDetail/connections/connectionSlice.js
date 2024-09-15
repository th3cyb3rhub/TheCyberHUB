import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import connectionService from "./connectionService.js";

const initialState = {
    connections: [],
    message: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
};

export const getConnections = createAsyncThunk("connections/getConnections", async (userId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await connectionService.getConnections(token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const sendConnectionRequest = createAsyncThunk(
    "connections/sendConnectionRequest",
    async (receiverId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await connectionService.sendConnectionRequest(receiverId, token);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const removeConnectionRequest = createAsyncThunk(
    "connections/removeConnectionRequest",
    async (senderId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await connectionService.removeConnectionRequest(senderId, token);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const acceptConnectionRequest = createAsyncThunk(
    "connections/acceptConnectionRequest",
    async (connectionId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await connectionService.acceptConnectionRequest(connectionId, token);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const removeConnection = createAsyncThunk("connections/removeConnection", async (connectionId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await connectionService.removeConnection(connectionId, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const connectionSlice = createSlice({
    name: "connections",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConnections.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getConnections.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = "";
                state.connections = action.payload;
            })
            .addCase(getConnections.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(sendConnectionRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendConnectionRequest.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = "";
            })
            .addCase(sendConnectionRequest.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeConnectionRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeConnectionRequest.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(removeConnectionRequest.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(acceptConnectionRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(acceptConnectionRequest.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(acceptConnectionRequest.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeConnection.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeConnection.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(removeConnection.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = connectionSlice.actions;
export default connectionSlice.reducer;
