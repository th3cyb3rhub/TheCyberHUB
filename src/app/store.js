import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userDetailReducer from "../features/userDetail/userDetailSlice";
import goalReducer from "../features/goals/goalSlice";
import blogReducer from "../features/blogs/blogSlice";
import forumReducer from "../features/forum/forumSlice";
import viewReducer from "../features/feeds/views/viewSlice";
import feedReducer from "../features/feeds/feedsSlice";
import feedLikeReduces from "../features/feeds/feedLikes/feedLikesSlice";

import blogCommentsReducer from "../features/blogs/blogComments/blogCommentSlice";
import feedCommentsReducer from "../features/feeds/feedComments/feedCommentsSlice";

import ctfReducer from "../features/ctf/ctfSlice";
import bookmarkReduces from "../features/bookmarks/bookmarkSlice";
import resetPasswordReducer from "../features/resetPassword/resetPasswordSlice";
import followReducer from "../features/follow/followSlice";

// import { cyberNewsApi } from "../services/cyberNewsApi";

export default configureStore({
    reducer: {
        auth: authReducer,
        goals: goalReducer,

        blogs: blogReducer,
        blogComments: blogCommentsReducer,

        forums: forumReducer,

        feeds: feedReducer,
        feedComments: feedCommentsReducer,

        views: viewReducer,
        bookmarks: bookmarkReduces,
        feedLikes: feedLikeReduces,

        userDetail: userDetailReducer,
        ctf: ctfReducer,
        resetPassword: resetPasswordReducer,
        followData: followReducer,
        // [cyberNewsApi.reducerPath]: cyberNewsApi.reducer,
    },
});
