import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "@/api/postApi";
import { likesApi } from "@/api/likeApi";
import {commentApi} from "@/api/commentApi";
import { subscriptionsApi } from "@/api/subscriptionApi";

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        [likesApi.reducerPath]: likesApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postsApi.middleware, likesApi.middleware, commentApi.middleware, subscriptionsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
