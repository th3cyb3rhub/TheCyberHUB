import { configureStore } from "@reduxjs/toolkit";

import { cyberNewsApi } from "../services/cyberNewsApi";

export default configureStore({
  reducer: {
    [cyberNewsApi.reducerPath]: cyberNewsApi.reducer,
  },
});
