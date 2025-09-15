import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "@/api/postApi";
import { likesApi } from "@/api/likeApi";
import {commentApi} from "@/api/commentApi";
import { recommendApi } from "@/api/recommentApi";

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        [likesApi.reducerPath]: likesApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        [recommendApi.reducerPath]: recommendApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postsApi.middleware, likesApi.middleware, commentApi.middleware, recommendApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
