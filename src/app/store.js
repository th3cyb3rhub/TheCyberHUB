import { configureStore } from "@reduxjs/toolkit";
import authReducer from "src/features/auth/authSlice";
import userDetailReducer from "src/features/userDetail/userDetailSlice";
import goalReducer from "src/features/goals/goalSlice";
import blogReducer from "src/features/blogs/blogSlice";
import notesReducer from "src/features/notes/notesSlice";
import notesCategoriesReducer from "src/features/notes/notesCategory/notesCategorySlice";
import forumReducer from "src/features/forum/forumSlice";
import viewReducer from "src/features/feeds/views/viewSlice";
import feedReducer from "src/features/feeds/feedsSlice";
import feedLikeReduces from "src/features/feeds/feedLikes/feedLikesSlice";
import blogLikeReduces from "src/features/blogs/blogLikes/blogLikesSlice";

import blogCommentsReducer from "src/features/blogs/blogComments/blogCommentSlice";

import ctfReducer from "src/features/ctf/ctfSlice";
import bookmarkReduces from "src/features/bookmarks/bookmarkSlice";
import resetPasswordReducer from "src/features/resetPassword/resetPasswordSlice";
import followReducer from "src/features/userDetail/follow/followSlice";
import connectionReducer from "src/features/userDetail/connections/connectionSlice";

import eventsReducer from "src/features/events/eventsSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        goals: goalReducer,

        blogs: blogReducer,
        blogComments: blogCommentsReducer,

        notes: notesReducer,
        notesCategories: notesCategoriesReducer,

        forums: forumReducer,

        feeds: feedReducer,

        views: viewReducer,
        bookmarks: bookmarkReduces,
        feedLikes: feedLikeReduces,
        blogLikes: blogLikeReduces,

        userDetail: userDetailReducer,
        ctfs: ctfReducer,
        resetPassword: resetPasswordReducer,
        follow: followReducer,
        connectionData: connectionReducer,

        events: eventsReducer,
    },
});
