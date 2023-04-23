import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import goalReducer from "../features/goals/goalSlice";
import blogReducer from "../features/blogs/blogSlice";
import userDetailReducer from "../features/userDetail/userDetailSlice";
import ctfReducer from "../features/ctf/ctfSlice";

// import { cyberNewsApi } from "../services/cyberNewsApi";

export default configureStore({
    reducer: {
        auth: authReducer,
        goals: goalReducer,
        blogs: blogReducer,
        userDetail: userDetailReducer,
        ctf: ctfReducer,
        // [cyberNewsApi.reducerPath]: cyberNewsApi.reducer,
    },
});
