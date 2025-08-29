import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "@/api/postApi";
import { likesApi } from "@/api/likeApi";
import {commentApi} from "@/api/commentApi";

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        [likesApi.reducerPath]: likesApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postsApi.middleware, likesApi.middleware, commentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
