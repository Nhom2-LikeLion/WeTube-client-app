import { commentApi } from "@/app/api/commentApi";
import { likesApi } from "@/app/api/likeApi";
import { postsApi } from "@/app/api/postApi";
import { videoApi } from "@/app/api/videoApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [likesApi.reducerPath]: likesApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [videoApi.reducerPath]: videoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postsApi.middleware,
      likesApi.middleware,
      commentApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
